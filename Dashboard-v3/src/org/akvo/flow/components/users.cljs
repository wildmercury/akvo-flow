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

(defn users-table-row [user]
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
    [:a.edit "Edit"]
    [:a.remove "Remove"]]])

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

(defn users [data owner]
  (reify 

    om/IInitState
    (init-state [this]
      {:new-user-dialog false})

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
           [:tbody (map users-table-row (:users data))]]]]
        (if (:new-user-dialog state)
          (new-user-dialog owner)
          [:div])] 
       
       ))))
