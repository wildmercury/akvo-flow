(ns org.akvo.flow.dashboard
  (:require [org.akvo.flow.app-state :refer (app-state)]
            [org.akvo.flow.routes :as router]
            [org.akvo.flow.components.header :refer (header)]
            [org.akvo.flow.components.devices :as devices]
            [org.akvo.flow.components.data :as data]
            [org.akvo.flow.components.users :as users]
            [org.akvo.flow.components.reports :as reports]
            [org.akvo.flow.components.messages :as messages]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]))

(enable-console-print!)

(defn placeholder-page [title]
  (fn [data owner]
    (om/component
     (html
      [:h1 title]))))

(def pages
  {:surveys (placeholder-page "Surveys")
   :devices devices/devices
   :data    data/data
   :reports reports/reports
   :maps    (placeholder-page "Maps")
   :users users/users
   :messages messages/messages})

(defn app [data owner]
  (reify
    om/IRender
    (render [this]
      (let [data (om/-value data)]
        (html
         [:div
          (om/build header data)
          [:div.floats-in
           [:div#pageWrap.widthConstraing.belowHeader
            (om/build router/active-component (assoc data :pages pages))]]
          ])))))

(om/root app
         app-state
         {:target (.getElementById js/document "app")})
