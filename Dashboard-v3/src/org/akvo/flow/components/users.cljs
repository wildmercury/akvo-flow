(ns org.akvo.flow.components.users
  (:require [org.akvo.flow.dispatcher :refer (dispatch)]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]
            ))

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
    [:a.edit {:on-click #(om/set-state! owner :edit-user-dialog user)} "Edit"]
    [:a.remove {:on-click #(om/set-state! owner :delete-user-dialog user)} "Remove"]]])

(defn dialog [& content]
  [:div.overlay.display
   [:div.blanket]
   [:div.dialogWrap
    [:div.confirmDialog.dialog
     content]]])

(defn extract-new-user [owner]
  {"userName" (->> "new-username" (om/get-node owner) .-value)
   "emailAddress" (->> "new-email" (om/get-node owner) .-value)
   "permissionList" (->> "new-permission-level" (om/get-node owner) .-value)})

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
                           (om/set-state! owner :new-user-dialog false))} 
           "Save"]]
     [:li [:a.cancel {:on-click #(om/set-state! owner :new-user-dialog false)} 
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
                           (om/set-state! owner :edit-user-dialog false))} 
           "Save"]]
     [:li [:a.cancel {:on-click #(om/set-state! owner :edit-user-dialog false)} 
           "Cancel"]]]]))

(defn delete-user-dialog [owner user]
  (dialog 
   [:h2 "Are you sure you want to delete this user?"]
   [:p.dialogMsg "This can not be undone"]
   [:div.buttons.menuCentre
    [:ul 
     [:li [:a.ok.smallBtn 
           {:on-click #(do (dispatch :delete-user @user)
                           (om/set-state! owner :delete-user-dialog false))} 
           "Ok"]]
     [:li [:a.cancel {:on-click #(om/set-state! owner :delete-user-dialog false)} 
           "Cancel"]]]]))

(defn users [data owner]
  (reify 

    om/IInitState
    (init-state [this]
      {:new-user-dialog false
       :edit-user-dialog false
       :delete-user-dialog false})

    om/IRenderState
    (render-state [this state]
      (html
       [:div 
        [:div.greyBg
         [:section.fullWidth.usersList
          [:h1 "Manage users and user rights"]
          [:a.standardBtn.btnAboveTable 
           {:on-click #(om/set-state! owner :new-user-dialog true)} 
           "Add new user"]
          [:table#usersListTable.dataTable
           [:thead (users-table-head)]
           [:tbody (map #(users-table-row owner %) (:users data))]]]]
        (cond 
         (:new-user-dialog state) (new-user-dialog owner)
         (:edit-user-dialog state) (edit-user-dialog owner (:edit-user-dialog state))
         (:delete-user-dialog state) (delete-user-dialog owner (:delete-user-dialog state))
         :else [:div])]))))
