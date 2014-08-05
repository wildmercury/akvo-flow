(ns org.akvo.flow.components.header
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(defn header [data owner]
  (reify 
    om/IRender
    (render [this]
      (dom/header 
       #js {:className "floats-in top" 
            :id "header" 
            :role "banner"}
       (dom/div 
        nil
        (dom/div 
         nil
         (dom/h1 
          nil
          "Akvo"
          (dom/abbr 
           #js {:title "field lever operations watch"}
           "Flow")))
        (dom/nav 
         #js {:id "topnav" :role "navigation"}
         (dom/ul
          #js {:className "floats-in"}
          (dom/li
           #js {:className "navSurveys"}
           (dom/a #js {:href "#/surveys"} "Surveys"))
          (dom/li
           #js {:className "navDevices"}
           (dom/a #js {:href "#/devices/devices-list"} "Devices"))
          (dom/li
           #js {:className "navData"}
           (dom/a #js {:href "#/data"} "Data"))
          (dom/li
           #js {:className "navReports"}
           (dom/a #js {:href "#/reports"} "Reports"))
          (dom/li
           #js {:className "navMaps"}
           (dom/a #js {:href "#/maps"} "Maps"))
          (dom/li
           #js {:className "navUsers"}
           (dom/a #js {:href "#/users"} "Users"))
          (dom/li
           #js {:className "navMessages"}
           (dom/a #js {:href "#/messages"} "Messages")))))))))
