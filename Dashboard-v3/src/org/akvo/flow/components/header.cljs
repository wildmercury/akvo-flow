(ns org.akvo.flow.components.header
  (:require [org.akvo.flow.routes :as routes]
            [clojure.string :as s]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]))

(defn class-str [current-page page]
  (str "nav" (s/capitalize (name page)) (if (= current-page page) " current" "")))

(defn header [data owner]
  (let [[current-page] (:path (:current-page data))]
    (om/component
     (html
      [:header {:class "floats-in top"
                :id "header"
                :role "banner"}
       [:div
        [:h1 "Akvo" [:abbr {:title "field level operations watch"} "Flow"]]
        [:nav {:id "topnav" :role "navigation"}
         [:ul {:class "floats-in"}
          [:li {:class (class-str current-page :surveys)}
           [:a {:href (routes/surveys)} "Surveys"]]
          [:li {:class (class-str current-page :devices)}
           [:a {:href (routes/devices-list)} "Devices"]]
          [:li {:class (class-str current-page :data)}
           [:a {:href (routes/data-inspect)} "Data"]]
          [:li {:class (class-str current-page :reports)}
           [:a {:href (routes/reports-charts)} "Reports"]]
          [:li {:class (class-str current-page :maps)}
           [:a {:href (routes/maps)} "maps"]]
          [:li {:class (class-str current-page :users)}
           [:a {:href (routes/users)} "users"]]
          [:li {:class (class-str current-page :messages)}
           [:a {:href (routes/messages)} "Messages"]]]]]]))))
