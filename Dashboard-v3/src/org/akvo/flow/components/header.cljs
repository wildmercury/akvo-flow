(ns org.akvo.flow.components.header
  (:require [clojure.string :as s]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(defn class-str [current-page page]
  (str "nav" (s/capitalize (name page)) (if (= current-page page) " current" "")))

(defn header [data owner]
  (reify 
    om/IRender
    (render [this]
      (let [[current-page] (:current-page data)]
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
             #js {:className (class-str current-page :surveys)}
             (dom/a #js {:href "#/surveys"} "Surveys"))
            (dom/li
             #js {:className (class-str current-page :devices)}
             (dom/a #js {:href "#/devices/devices-list"} "Devices"))
            (dom/li
             #js {:className (class-str current-page :data)}
             (dom/a #js {:href "#/data"} "Data"))
            (dom/li
             #js {:className (class-str current-page :reports)}
             (dom/a #js {:href "#/reports"} "Reports"))
            (dom/li
             #js {:className (class-str current-page :maps)}
             (dom/a #js {:href "#/maps"} "Maps"))
            (dom/li
             #js {:className (class-str current-page :users)}
             (dom/a #js {:href "#/users"} "Users"))
            (dom/li
             #js {:className (class-str current-page :messages)}
             (dom/a #js {:href "#/messages"} "Messages"))))))))))
