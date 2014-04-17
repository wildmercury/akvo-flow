(ns akvo-flow.components
  (:require 
    [cljs.core.async :as async :refer [>! <! alts! chan sliding-buffer put! close!]]
    [sablono.core :as html :refer-macros [html]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [akvo-flow.dispatch :refer [body]]
    [akvo-flow.components.surveys]
    [akvo-flow.components.devices]
    [akvo-flow.components.data]
    [akvo-flow.components.reports]
    [akvo-flow.components.maps]
    [akvo-flow.components.users]
    [akvo-flow.components.messages]))

(def nav-tabs 
  [{:display-name "SURVEYS" :id "surveys" :class-name "navSurveys"}
   {:display-name "DEVICES" :id "devices" :class-name "navDevices"
    :subtabs [{:display-name "DEVICES LIST" :id "devices-list"}
              {:display-name "ASSIGNMENTS LIST" :id "assignments-list"}
              {:display-name "MANUAL SURVEY TRANSFER" :id "manual-survey-transfer"}]}
   {:display-name "DATA" :id "data" :class-name "navData"
    :subtabs[{:display-name "INSPECT DATA" :id "inspect-data"}
             {:display-name "BULK UPLOAD DATA" :id "bulk-upload-data"}
             {:display-name "DATA CLEANING" :id "data-cleaning"}]}
   {:display-name "REPORTS" :id "reports" :class-name "navReports"
    :subtabs [{:display-name "CHARTS" :id "charts"}
              {:display-name "EXPORT REPORTS" :id "export-reports"}]}
   {:display-name "MAPS" :id "maps" :class-name "navMaps"}
   {:display-name "USERS" :id "users" :class-name "navUsers"}
   {:display-name "MESSAGES" :id "messages" :class-name "navMessages"}])


;; Top logo
(defn logo [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:span
             [:h1 "Akvo"
              [:abbr {:title "Akvo FLOW"} "FLOW"]]]))))

;; Top navigation bar
(defn top-nav [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (let [{active-tab :tab 
             active-sub-tab :subtab} state
            control (get-in state [:comms :control])]
        (html 
          [:nav {:id "topnav" 
                 :role "navigation"} 
           [:div
            [:ul {:class "floats-in"}
             (for [t nav-tabs]
               [:li 
                {:class (str (:class-name t) (if (= (:id t) active-tab) " current"))
                 :key (:id t)}
                [:a {:on-click (comp (constantly false)
                                     #(put! control [:tab-selected (:id t)]))}
                 (:display-name t)]])]]])))))

;; sub navigation of panels
(defn sub-nav [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (let [{active-tab :tab active-sub-tab :subtab} state
            tab-content (keep #(if (= active-tab (:id %)) %) nav-tabs)
            subtabs (:subtabs (first tab-content))
            control (get-in state [:comms :control])]
        (html 
          [:nav {:class "tabNav floats-in"} 
           [:ul (for [st subtabs]
                  [:li {:class (if (= (:id st) active-sub-tab) "active")
                        :key (:id st)}
                   [:a {:on-click (comp (constantly false)
                                        #(put! control [:subtab-selected (:id st)]))}
                    (:display-name st)]])]])))))

(defn app [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div
             [:header {:class "floats-in top" :id "header" :role "banner"}
              [:div
               (om/build logo state)
               (om/build top-nav state) 
               ]]
             [:div {:id "pageWrap"}
              [:section {:class "floats-in" :id "main" :role "main"}
               [:div {:id "tabs"} (om/build sub-nav state)]
               ;; body is a multimethod that is deployed with the tab and subtab name
               [:div (om/build body state)]
               ]]
             ]))))
