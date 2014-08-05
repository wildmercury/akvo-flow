(ns org.akvo.flow.dashboard
  (:require [org.akvo.flow.app-state :refer (app-state)]
            [org.akvo.flow.routes]
            [org.akvo.flow.components.header :refer (header)]
            [org.akvo.flow.components.devices :as devices]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(enable-console-print!)

(defmulti page (fn [data owner]
                 (:current-page data)))

(defmethod page [:surveys] [data owner]
  (reify
    om/IRender
    (render [this]
      (dom/h1 nil "Surveys"))))

(defmethod page [:devices :devices-list] [data owner]
  (reify om/IRender
    (render [this]
      (om/build devices/devices data {:opts devices/devices-list}))))

(defmethod page [:devices :assignments-list] [data owner]
  (reify om/IRender
    (render [this]
      (om/build devices/devices data {:opts devices/assignments-list}))))

(defmethod page [:devices :manual-survey-transfer] [data owner]
  (reify om/IRender
    (render [this]
      (om/build devices/devices data {:opts devices/manual-survey-transfer}))))

(defmethod page [:data] [data owner]
  (reify
    om/IRender
    (render [this]
      (dom/h1 nil "Data"))))

(defmethod page [:reports] [data owner]
  (reify
    om/IRender
    (render [this]
      (dom/h1 nil "Reports"))))

(defmethod page [:maps] [data owner]
  (reify
    om/IRender
    (render [this]
      (dom/h1 nil "Maps"))))

(defmethod page [:users] [data owner]
  (reify
    om/IRender
    (render [this]
      (dom/h1 nil "Users"))))

(defmethod page [:messages] [data owner]
  (reify
    om/IRender
    (render [this]
      (dom/h1 nil "Messages"))))

(defn app [data owner]
  (reify
    om/IRender
    (render [this]
      (dom/div nil
               (om/build header data)
               (dom/div #js {:id "pageWrap"}
                        (om/build page data))))))

(om/root app
         app-state
         {:target (.getElementById js/document "app")})






