(ns org.akvo.flow.components.users
  (:require [org.akvo.flow.dispatcher :as dispatcher :refer (dispatch)]
            [org.akvo.flow.routes :as routes]
            [org.akvo.flow.components.dialog :refer (dialog)]
            [org.akvo.flow.components.grid :refer (grid)]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]
            [ajax.core :refer (ajax-request json-format POST PUT DELETE)])
  (:require-macros [cljs.core.async.macros :refer (go)]))

(def empty-user
  {"admin" false
   "logoutUrl" nil
   "config" nil
   "emailAddress" ""
   "superAdmin" false
   "permissionList" ""
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
          [:select#newPermissionList {:default-value (get user "permissionList") :ref "new-permission-level"}
           [:option {:value "0"} "Select permission level"]
           [:option {:value "10"} "Admin"]
           [:option {:value "20"} "User"]]])))))

(defn new-user-dialog [owner]
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
                        :action #(dispatch :navigate "/users")}]}))

(defn edit-user-dialog [owner user]
  (om/build dialog
            {:title "Edit user"
             :text "Please edit the user name, email address and permission level below."
             :content (user-form user)
             :buttons [{:caption "Save"
                        :class "ok smallBtn"
                        :action #(do (dispatch :edit-user {:new-value (merge @user
                                                                             (extract-user-data))
                                                           :old-value @user})
                                     (dispatch :navigate "/users"))}
                       {:caption "Cancel"
                        :class "cancel"
                        :action #(dispatch :navigate "/users")}]}))

(defn delete-user-dialog [owner user]
  (om/build dialog
            {:title "Are you sure you want to delete this user?"
             :text "This can not be undone!!!"
             :buttons [{:caption "Ok"
                        :class "ok smallBtn"
                        :action #(do (dispatch :delete-user @user)
                                     (dispatch :navigate "/users"))}
                       {:caption "Cancel"
                        :class "cancel"
                        :action #(dispatch :navigate "/users")}]}))

(defn generate-apikeys [owner user]
  (POST (str "/rest/users/" (get user "keyId") "/apikeys")
        {:handler (fn [response]
                    (let [access-key (get-in response ["apikeys" "accessKey"])
                          secret (get-in response ["apikeys" "secret"])]
                      (om/set-state! owner {:access-key access-key
                                            :secret secret})
                      ;; Wait until we navigate away from the dialog
                      ;; before updating the app-state with the new
                      ;; access-key, otherwise we do an immidiate
                      ;; re-render and the secret key is immediately
                      ;; hidden from the user.
                      (let [nav-chan (dispatcher/register :navigate)]
                        (go (<! nav-chan)
                            (dispatcher/unregister :navigate nav-chan)
                            (dispatch :new-access-key {:access-key access-key
                                                       :user user})))))
         :error-handler #(.error js/console %)
         :format (json-format {:keywords? false})
         :response-format :json
         :keywords? false}))

(defn revoke-apikeys [owner user]
  (DELETE (str "/rest/users/" (get user "keyId") "/apikeys")
          {:handler (fn [response]
                      (om/set-state! owner (om/set-state! owner {:access-key nil
                                                                 :secret nil}))
                      (dispatch :new-access-key {:access-key nil
                                                 :user user}))
           :error-handler #(.error js/console %)
           :format (json-format {:keywords? false})
           :response-format :json
           :keywords? false}))

(defn manage-apikeys [user]
  (fn [data owner]
    (reify
      om/IInitState
      (init-state [this]
        {:secret nil
         :access-key (get user "accessKey")})

      om/IRenderState
      (render-state [this {:keys [secret access-key]}]
        (html [:div
               [:label "Access key:"]
               [:input {:type "text" :size 40 :value access-key}]
               (when secret
                 [:div
                  [:label "Secret:"]
                  [:input {:type "text" :size 40 :value secret}]
                  [:p "The secret key will never be shown again! If it is lost a new one must be generated"]])
               [:a.ok.smallBtn {:on-click #(generate-apikeys owner @user)} "(Re)generate"]
               " "
               [:a.ok.smallBtn {:on-click #(revoke-apikeys owner @user)} "Revoke"]])))))

(defn manage-apikeys-dialog [owner user]
  (om/build dialog
            {:title "Manage API keys"
             :text "You can (re)generate or revoke an api key for this user"
             :content (manage-apikeys user)
             :buttons [{:caption "Close"
                        :class "cancel"
                        :action #(dispatch :navigate "/users")}]}))

;; TODO index on keyId
(defn find-user-by-id [users id]
  (some (fn [user]
          (when (= id (get user "keyId"))
            user))
        users))

(defn users [data owner]
  (reify

    om/IRender
    (render [this]
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
                       :data (:users data)
                       :sort-idx (-> data :current-page :query-params :sort-idx)
                       :sort-order (-> data :current-page :query-params :sort-order)
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
          (cond
           (= (:dialog current-page) :add)
           (new-user-dialog owner)

           (= (:dialog current-page) :edit)
           (edit-user-dialog owner (find-user-by-id (:users data)
                                                    (:user-id current-page)))

           (= (:dialog current-page) :delete)
           (delete-user-dialog owner (find-user-by-id (:users data)
                                                      (:user-id current-page)))

           (= (:dialog current-page) :manage-apikeys)
           (manage-apikeys-dialog owner (find-user-by-id (:users data)
                                                         (:user-id current-page)))

           :else [:div])])))))
