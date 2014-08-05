(ns org.akvo.flow.routes
  (:require [org.akvo.flow.app-state :refer (app-state)]
            [secretary.core :as secretary :include-macros true :refer (defroute)]
            [goog.events :as events]
            [goog.history.EventType :as EventType])
  (:import goog.History))

(secretary/set-config! :prefix "#")

(defroute "/surveys" {:as params}
  (swap! app-state assoc :current-page [:surveys]))

(defroute "/devices/devices-list" {:as params}
  (swap! app-state assoc :current-page [:devices :devices-list]))

(defroute "/devices/assignments-list" {:as params}
  (swap! app-state assoc :current-page [:devices :assignments-list]))

(defroute "/devices/manual-survey-transfer" {:as params}
  (swap! app-state assoc :current-page [:devices :manual-survey-transfer]))

(defroute "/data" {:as params}
  (swap! app-state assoc :current-page [:data]))

(defroute "/reports" {:as params}
  (swap! app-state assoc :current-page [:reports]))

(defroute "/maps" {:as params}
  (swap! app-state assoc :current-page [:maps]))

(defroute "/users" {:as params}
  (swap! app-state assoc :current-page [:users]))

(defroute "/messages" {:as params}
  (swap! app-state assoc :current-page [:messages]))

(let [h (History.)]
  (goog.events/listen h EventType/NAVIGATE #(secretary/dispatch! (.-token %)))
  (doto h (.setEnabled true)))
