(ns org.akvo.flow.components.devices
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(defn devices [data owner child]
  (reify om/IRender
    (render [this]
      (dom/div nil
               (dom/h1 nil "Devices!")
               (om/build child data)))))

(defn devices-list [data owner]
  (reify om/IRender
    (render [this]
      (dom/span nil "Devices-list: " (pr-str (:current-page data))))))


