(ns org.akvo.flow.dashboard.users.core
  (:require [clojure.string :as s]
            [org.akvo.flow.dashboard.dispatcher :refer (dispatch)]
            [org.akvo.flow.dashboard.components.dialog :refer (dialog)]
            [org.akvo.flow.dashboard.components.grid :refer (grid)]
            [org.akvo.flow.dashboard.ajax-helpers :refer (default-ajax-config)]
            [org.akvo.flow.dashboard.users.store :as store]
            [org.akvo.flow.dashboard.app-state :refer (app-state)]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]
            [ajax.core :refer (ajax-request GET POST PUT DELETE)])
  (:require-macros [cljs.core.async.macros :refer (go)]))

(enable-console-print!)

(def empty-user
  {"admin" false
   "logoutUrl" nil
   "config" nil
   "emailAddress" ""
   "superAdmin" false
   "permissionList" "20"
   "userName" ""
   "keyId" nil})

(defn by-id [id]
  (.getElementById js/document id))

(defn extract-user-data []
  (let [username (.-value (by-id "newUserName"))
        email (.-value (by-id "newEmail"))
        permission-level (.-value (by-id "newPermissionList"))]
    {"userName" username
     "emailAddress" email
     "permissionList" permission-level}))

(defn user-form
  ([] (user-form empty-user))
  ([user]
     (fn [data owner]
       (om/component
        (html
         [:div
          [:label {:for "newUserName"} "Username:"]
          [:input#newUserName {:type "text" :size "40" :ref "new-username" :default-value (get user "userName")}]
          [:br]
          [:label {:for "newEmail"} "Email address:"]
          [:input#newEmail {:type "text" :size "40" :ref "new-email" :default-value (get user "emailAddress")}]
          [:br]
          [:label {:for "newPermissionList"} "Select permission level"]
          [:select#newPermissionList {:default-value (get user "permissionList") :ref "new-permission-level"}
           [:option {:value "10"} "Admin"]
           [:option {:value "20"} "User"]]])))))

(defn get-current-user [data]
  (let [user-id (-> data :current-page :user-id)]
    (or (get-in data [:users :by-id user-id])
        (throw (str "No such user: " user-id)))))

(defn get-current-user-id [data]
  (let [user-id (-> data :current-page :user-id)]
    user-id))

(defn parent-route [data]
  ((-> data :current-page :parent-route)))



;;
;; Dialogs
;;

(def no-such-user {:title "No such user"
                  :text (str "A user with this id has not been loaded yet")})

(defn new-user-dialog [data owner]
  (om/component
   (om/build dialog
            {:title "Add new user"
             :text "Please provide a user name, email address and permission level below."
             :content (user-form)
             :buttons [{:caption "Save"
                        :class "ok smallBtn"
                        :action #(do (dispatch :new-user (merge empty-user
                                                                (extract-user-data)))
                                     (dispatch :navigate (parent-route data)))}
                       {:caption "Cancel"
                        :class "cancel"
                        :action #(dispatch :navigate (parent-route data))}]})))

(defn edit-user-dialog [data owner]
  (om/component
   (let [user-id (get-current-user-id data)
         user (store/get-by-id user-id)]
     (if-not user
       (om/build dialog no-such-user)
       (om/build dialog
                 {:title "Edit user"
                  :text "Please edit the user name, email address and permission level below."
                  :content (user-form user)
                  :buttons [{:caption "Save"
                             :class "ok smallBtn"
                             :action #(do (dispatch :edit-user {:user (merge user (extract-user-data))})
                                          (dispatch :navigate (parent-route data)))}
                            {:caption "Cancel"
                             :class "cancel"
                             :action #(dispatch :navigate (parent-route data))}]})))))

(defn delete-user-dialog [data owner]
  (om/component
   (let [user (get-current-user data)]
     (om/build dialog
               {:title "Are you sure you want to delete this user?"
                :text "This can not be undone!!!"
                :buttons [{:caption "Ok"
                           :class "ok smallBtn"
                           :action #(do (dispatch :delete-user user)
                                        (dispatch :navigate (parent-route data)))}
                          {:caption "Cancel"
                           :class "cancel"
                           :action #(dispatch :navigate (parent-route data))}]}))))

(defn generate-apikeys [owner user]
  (POST (str "/rest/users/" (get user "keyId") "/apikeys")
        (merge default-ajax-config
               {:handler (fn [response]
                           (let [access-key (get-in response ["apikeys" "accessKey"])
                                 secret (get-in response ["apikeys" "secret"])]
                             (om/set-state! owner {:access-key access-key
                                                   :secret secret})
                             (dispatch :new-access-key {:access-key access-key
                                                        :user user})))})))

(defn revoke-apikeys [owner user]
  (DELETE (str "/rest/users/" (get user "keyId") "/apikeys")
          (merge default-ajax-config
                 {:handler (fn [response]
                             (om/set-state! owner (om/set-state! owner {:access-key nil
                                                                        :secret nil}))
                             (dispatch :new-access-key {:access-key nil
                                                        :user user}))})))

(defn manage-apikeys [{:keys [user secret access-key owner]} _]
  (om/component
   (html [:div
          [:label "Access key:"]
          [:input {:type "text" :size 40 :value access-key}]
          (when secret
            [:div
             [:label "Secret:"]
             [:input {:type "text" :size 40 :value secret}]
             [:p "The secret key will never be shown again! If it is lost a new one must be generated"]])
          [:a.ok.smallBtn {:on-click #(generate-apikeys owner user)} "(Re)generate"]
          " "
          [:a.ok.smallBtn {:on-click #(revoke-apikeys owner user)} "Revoke"]])))

(defn manage-apikeys-dialog [data owner]
  (reify
    om/IInitState
    (init-state [this]
      {:secret nil
       :access-key (get (store/get-by-id (get-current-user-id data)) "accessKey")})
    om/IRenderState
    (render-state [this {:keys [secret access-key]}]
      (let [user (store/get-by-id (get-current-user-id data))]
        (if-not user
          (om/build dialog no-such-user)
          (om/build dialog
                  {:title "Manage API keys"
                   :text "You can (re)generate or revoke an api key for this user"
                   :content-data {:user user
                                  :secret secret
                                  :access-key access-key
                                  :owner owner}
                   :content manage-apikeys
                   :buttons [{:caption "Close"
                              :class "cancel"
                              :action #(dispatch :navigate (parent-route data))}]}))))))

(def dialogs
  {:add new-user-dialog
   :edit edit-user-dialog
   :delete delete-user-dialog
   :manage-apikeys manage-apikeys-dialog})

(defn sort-idx->sort-by [idx]
  (condp = idx
    0 "userName"
    1 "emailAddress"
    2 "permissionList"
    "emailAddress"))

(defn users [data owner]
  (reify
    om/IInitState
    (init-state [this]
      {:pagination {:offset 0
                    :limit 20}
       :sort {:sort-by "emailAddress"
              :sort-order "ascending"}})

    om/IRenderState
    (render-state [this state]
      (html
       [:div
        [:div.greyBg
         [:section.fullWidth.usersList
          [:h1 "Manage users and user rights"]
          [:a.standardBtn.btnAboveTable
           {:href "#" #_(routes/users-add)}
           "Add new user"]
          (om/build grid
                    {:id "usersListTable"
                     :data (let [data (store/get-by-range (merge (:pagination state)
                                                                 (:sort state)))]
                             (when-not (= data :pending)
                               (map (fn [row row-number]
                                      (assoc row :row-number (inc row-number)))
                                    data
                                    (range))))
                     :sort (:sort state)
                     :on-sort (fn [sort-by sort-order]
                                (om/set-state! owner :sort {:sort-by sort-by :sort-order sort-order}))
                     :range (:pagination state)
                     :on-range (fn [offset limit]
                                 (om/set-state! owner :pagination {:offset offset :limit limit}))
                     :columns [{:title "#"
                                :cell-fn :row-number}
                               {:title "User name"
                                :cell-fn #(get % "userName")
                                :sort-by "userName"}
                               {:title "Email"
                                :cell-fn #(get % "emailAddress")
                                :sort-by "emailAddress"}
                               {:title "Permission list"
                                :cell-fn #(if (= (get % "permissionList") "10")
                                            "Admin"
                                            "User")}
                               {:title "Actions"
                                :class "action"
                                :cell-fn (fn [user]
                                           [:span
                                            [:a.edit {:href "#" #_(routes/users-edit {:id (get user "keyId")})} "Edit"]
                                            [:a.remove {:href "#" #_(routes/users-delete {:id (get user "keyId")})} "Remove"]
                                            [:a.api {:href "#" #_(routes/users-manage-apikeys {:id (get user "keyId")})} "api"]])}]})]]
        #_(om/build routes/active-component (assoc data :pages dialogs))]))))

(defn ^:export init []
  (om/root users
           app-state
           {:target (.getElementById js/document "app")}))
