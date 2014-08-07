(ns org.akvo.flow.routes
  (:require [org.akvo.flow.app-state :refer (app-state)]
            [org.akvo.flow.dispatcher :as dispatcher]
            [secretary.core :as secretary :include-macros true :refer (defroute)]
            [goog.events :as events]
            [goog.history.EventType :as EventType])
  (:require-macros [cljs.core.async.macros :refer (go-loop)])
  (:import goog.History))

(secretary/set-config! :prefix "#")

(let [chan (dispatcher/register :navigate)]
  (go-loop []
    (let [[_ path] (<! chan)]
      (set! js/window.location.hash path))
    (recur)))

(defroute "/surveys" {:as params}
  (swap! app-state assoc :current-page {:path [:surveys]}))

(defroute "/devices/devices-list" {:as params}
  (swap! app-state assoc :current-page {:path [:devices :devices-list]}))

(defroute "/devices/assignments-list" {:as params}
  (swap! app-state assoc :current-page {:path [:devices :assignments-list]}))

(defroute "/devices/manual-survey-transfer" {:as params}
  (swap! app-state assoc :current-page {:path [:devices :manual-survey-transfer]}))

(defroute "/data" {:as params}
  (swap! app-state assoc :current-page {:path [:data]}))

(defroute "/reports" {:as params}
  (swap! app-state assoc :current-page {:path [:reports]}))

(defroute "/maps" {:as params}
  (swap! app-state assoc :current-page {:path [:maps]}))

(defroute "/users" {:as params}
  (swap! app-state assoc :current-page {:path [:users]}))

(defroute "/users/add" {:as params}
  (swap! app-state assoc :current-page {:path [:users]
                                        :dialog :add}))

(defroute "/users/edit/:id" [id]
  (swap! app-state assoc :current-page {:path [:users]
                                        :dialog :edit
                                        :user-id (js/parseInt id)}))

(defroute "/users/delete/:id" [id]
  (swap! app-state assoc :current-page {:path [:users]
                                        :dialog :delete
                                        :user-id (js/parseInt id)}))

(defroute "/messages" {:as params}
  (swap! app-state assoc :current-page {:path [:messages]}))

(let [h (History.)]
  (goog.events/listen h EventType/NAVIGATE #(secretary/dispatch! (.-token %)))
  (doto h (.setEnabled true)))
