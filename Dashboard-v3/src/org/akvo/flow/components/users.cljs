(ns org.akvo.flow.components.users
  (:require [org.akvo.flow.dispatcher :refer (dispatch)]
            [org.akvo.flow.components.dialog :refer (dialog)]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]))

(defn users-table-head []
  [:tr
   [:th [:a.userName "User name"]]
   [:th [:a.emailAdr "Email"]]
   [:th 
    ;; NOTE: probably wrong classname?
    [:a.emailAdr "Permission level"]
    [:a {:class "helpIcon tooltip"
         :title "There are two permission levels: User, Administrator. Read more on the FLOW documentation site, or contact your Administrator for details."} "?"]]
   [:th.action.noArrows "Actions"]])

(defn users-table-row [owner user]
  [:tr
   [:td {:class "userName"
         :style {:text-align "left"
                 :padding "0 0 0 20px"}}
    (get user "userName")]
   [:td {:class "emailAdr"
         :style {:text-align "left"}}
    (get user "emailAddress")]
   [:td [:span {:class "Admin"}
         (if (= (get user "permissionList") "10") "Admin" "User")]]
   [:td.action 
    [:a.edit {:href (str "#/users/edit/" (get user "keyId"))} "Edit"]
    [:a.remove {:href (str "#/users/delete/" (get user "keyId"))} "Remove"]]])

;; Temp ids are negative
(let [n (atom 0)]
  (defn next-key-id []
    (swap! n dec)
    @n))

(defn create-user [username email permission-level]
  {"admin" false
   "logoutUrl" nil
   "config" nil
   "emailAddress" email
   "superAdmin" false
   "permissionList" permission-level
   "userName" username
   "keyId" (next-key-id)})

(defn by-id [id]
  (.getElementById js/document id))

(defn extract-user []
  (let [username (.-value (by-id "newUserName"))
        email (.-value (by-id "newEmail"))
        permission-level (.-value (by-id "newPermissionList"))]
    (create-user username email permission-level)))

(defn user-form 
  ([] (user-form (create-user "" "" "")))
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
                        :action #(do (dispatch :new-user (extract-user))
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
                        :action #(do (dispatch :edit-user {:new-value (extract-user)
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
             {:on-click #(dispatch :navigate "/users/add")} 
             "Add new user"]
            [:table#usersListTable.dataTable
             [:thead (users-table-head)]
             [:tbody (map #(users-table-row owner %) (:users data))]]]]
          (cond 
           (= (:dialog current-page) :add) 
           (new-user-dialog owner)
           
           (= (:dialog current-page) :edit) 
           (edit-user-dialog owner (find-user-by-id (:users data)
                                                    (:user-id current-page)))
       
           (= (:dialog current-page) :delete)
           (delete-user-dialog owner (find-user-by-id (:users data)
                                                      (:user-id current-page)))
           
           :else [:div])])))))
