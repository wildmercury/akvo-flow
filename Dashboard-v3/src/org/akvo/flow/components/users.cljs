(ns org.akvo.flow.components.users
  (:require [org.akvo.flow.dispatcher :refer (dispatch)]
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

(defn dialog [& content]
  [:div.overlay.display
   [:div.blanket]
   [:div.dialogWrap
    [:div.confirmDialog.dialog
     content]]])

(let [n (atom 0)]
  (defn next-key-id []
    (swap! n dec)
    @n))

(defn create-user [username email permission-level]
  ;; Negative
  {"admin" false
   "logoutUrl" nil
   "config" nil
   "emailAddress" email
   "superAdmin" false
   "permissionList" permission-level
   "userName" username
   "keyId" (next-key-id)})

(defn extract-new-user [owner]
  (let [username (->> "new-username" (om/get-node owner) .-value)
        email (->> "new-email" (om/get-node owner) .-value)
        permission-level (->> "new-permission-level" (om/get-node owner) .-value)]
    (create-user username email permission-level)))

(defn new-user-dialog [owner]
  (dialog 
   [:h2 "Add new user"]
   [:p.dialogMsg "Please provide a user name, email address and permission level below."]
   [:label {:for "newUserName"} "Username:"]
   [:input#newUserName {:type "text" :size "40" :ref "new-username"}]
   [:br]
   [:label {:for "newEmail"} "Email address:"]
   [:input#newUserName {:type "text" :size "40" :ref "new-email"}]
   [:br]
   [:select {:default-value "20" :ref "new-permission-level"}
    [:option {:value "0"} "Select permission level"]
    [:option {:value "10"} "Admin"]
    [:option {:value "20"} "User"]]
   [:div.buttons.menuCentre
    [:ul 
     [:li [:a.ok.smallBtn 
           {:on-click #(do (dispatch :new-user (extract-new-user owner))
                           (dispatch :navigate "/users"))} 
           "Save"]]
     [:li [:a.cancel {:on-click #(dispatch :navigate "/users")} 
           "Cancel"]]]]))

(defn edit-user-dialog [owner user]
  (dialog 
   [:h2 "Edit user"]
   [:p.dialogMsg "Please edit the user name, email address and permission level below."]
   [:label {:for "newUserName"} "Username:"]
   [:input#newUserName {:type "text" :size "40" :ref "new-username" :default-value (get user "userName")}]
   [:br]
   [:label {:for "newEmail"} "Email address:"]
   [:input#newUserName {:type "text" :size "40" :ref "new-email" :default-value (get user "emailAddress")}]
   [:br]
   [:select {:default-value (get user "permissionList") :ref "new-permission-level"}
    [:option {:value "0"} "Select permission level"]
    [:option {:value "10"} "Admin"]
    [:option {:value "20"} "User"]]
   [:div.buttons.menuCentre
    [:ul 
     [:li [:a.ok.smallBtn 
           {:on-click #(do (dispatch :edit-user {:new-value (extract-new-user owner)
                                                 :old-value @user})
                           (dispatch :navigate "/users"))} 
           "Save"]]
     [:li [:a.cancel {:on-click #(dispatch :navigate "/users")} 
           "Cancel"]]]]))

(defn delete-user-dialog [owner user]
  (dialog 
   [:h2 "Are you sure you want to delete this user?"]
   [:p.dialogMsg "This can not be undone"]
   [:div.buttons.menuCentre
    [:ul 
     [:li [:a.ok.smallBtn 
           {:on-click #(do (dispatch :delete-user @user)
                           (dispatch :navigate "/users"))} 
           "Ok"]]
     [:li [:a.cancel {:on-click #(dispatch :navigate "/users")} 
           "Cancel"]]]]))

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
