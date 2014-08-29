(ns org.akvo.flow.components.users
  (:require [clojure.string :as s]
            [org.akvo.flow.dispatcher :as dispatcher :refer (dispatch)]
            [org.akvo.flow.routes :as routes]
            [org.akvo.flow.components.dialog :refer (dialog)]
            [org.akvo.flow.components.grid :refer (grid)]
            [org.akvo.flow.ajax-helpers :refer (default-ajax-config)]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]
            [ajax.core :refer (ajax-request json-format GET POST PUT DELETE)])
  (:require-macros [cljs.core.async.macros :refer (go)]))

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
    (or (get (:users data) user-id)
        (throw (str "No such user: " user-id)))))

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
                                     (dispatch :navigate "/users"))}
                       {:caption "Cancel"
                        :class "cancel"
                        :action #(dispatch :navigate "/users")}]})))

(defn edit-user-dialog [data owner]
  (om/component
   (let [user (get-current-user data)]
     (om/build dialog
               {:title "Edit user"
                :text "Please edit the user name, email address and permission level below."
                :content (user-form user)
                :buttons [{:caption "Save"
                           :class "ok smallBtn"
                           :action #(do (dispatch :edit-user {:user (merge user
                                                                           (extract-user-data))})
                                        (dispatch :navigate "/users"))}
                          {:caption "Cancel"
                           :class "cancel"
                           :action #(dispatch :navigate "/users")}]}))))

(defn delete-user-dialog [data owner]
  (om/component
   (let [user (get-current-user data)]
     (om/build dialog
               {:title "Are you sure you want to delete this user?"
                :text "This can not be undone!!!"
                :buttons [{:caption "Ok"
                           :class "ok smallBtn"
                           :action #(do (dispatch :delete-user user)
                                        (dispatch :navigate "/users"))}
                          {:caption "Cancel"
                           :class "cancel"
                           :action #(dispatch :navigate "/users")}]}))))

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
       :access-key (get (get-current-user data) "accessKey")})
    om/IRenderState
    (render-state [this {:keys [secret access-key]}]
      (let [user (get-current-user data)]
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
                              :action #(dispatch :navigate "/users")}]})))))

(def dialogs
  {:add new-user-dialog
   :edit edit-user-dialog
   :delete delete-user-dialog
   :manage-apikeys manage-apikeys-dialog})

(def default-fetch-params
  {:sort-order "ascending"
   :sort-by "emailAddress"
   :offset 0
   :limit 20})

(defn query-str [params]
  (->> params
       (map (fn [[k v]] (str (name k) "=" v)))
       (s/join "&")
       (str "?")))

(defn sort-idx->sort-by [idx]
  (condp = idx
    0 "userName"
    1 "emailAddress"
    2 "permissionList"
    "emailAddress"))

(defn fetch-users [data callback]
  (let [query-params (-> data :current-page :query-params)
        sort-idx (:sort-idx query-params)
        query-params (-> query-params
                         (assoc :sort-by (sort-idx->sort-by sort-idx))
                         (dissoc :sort-idx))]
    (GET (str "/rest/users/fetch" (query-str (merge default-fetch-params
                                                    query-params)))
         (merge default-ajax-config
                {:handler (fn [response] (callback (get response "users")))}))))

(defn users [data owner]
  (reify

    om/IInitState
    (init-state [this]
      {:users []})

    om/IWillReceiveProps
    (will-receive-props [this next-props]
      (fetch-users next-props #(om/set-state! owner :users %)))

    om/IRenderState
    (render-state [this state]
      (let [current-page (:current-page data)]
        (html
         [:div
          [:div.greyBg
           [:section.fullWidth.usersList
            [:h1 "Manage users and user rights"]
            [:a.standardBtn.btnAboveTable
             {:href (routes/users-add)}
             "Add new user"]
            (om/build grid
                      {:id "usersListTable"
                       :route-fn routes/users
                       :data (:users state)
                       :query-params (-> current-page :query-params)
                       :columns [{:title "User name"
                                  :cell-fn #(get % "userName")}
                                 {:title "Email"
                                  :cell-fn #(get % "emailAddress")}
                                 {:title "Permission list"
                                  :cell-fn #(if (= (get % "permissionList") "10")
                                              "Admin"
                                              "User")}
                                 {:title "Actions"
                                  :class "action"
                                  :cell-fn (fn [user]
                                             [:span
                                              [:a.edit {:href (routes/users-edit {:id (get user "keyId")})} "Edit"]
                                              [:a.remove {:href (routes/users-delete {:id (get user "keyId")})} "Remove"]
                                              [:a.api {:href (routes/users-manage-apikeys {:id (get user "keyId")})} "api"]])}]})]]
          (om/build routes/active-component (assoc data :pages dialogs))])))))
