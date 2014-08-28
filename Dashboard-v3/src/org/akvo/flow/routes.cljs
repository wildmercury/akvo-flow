(ns org.akvo.flow.routes
  (:require [org.akvo.flow.app-state :refer (app-state)]
            [org.akvo.flow.dispatcher :as dispatcher]
            [secretary.core :as secretary :include-macros true :refer (defroute)]
            [om.core :as om :include-macros true]
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

(defn active-page
  "Returns the keyword name for the active page"
  [data]
  (-> data :current-page :path first))

(defn active-component
  "TODO: explain this"
  [data owner]
  (if-let [page (active-page data)]
    (let [data (update-in data [:current-page :path] subvec 1)]
      (reify om/IRender
         (render [this]
           (om/build (-> data :pages page) data))))
    ;; Render default?
    (reify om/IRender
      (render [this]
        nil))))


(defn parse-sort-params [query-params]
  (let [query-params (if-let [idx (:sort-idx query-params)]
                       {:sort-idx (js/parseInt idx)
                        :sort-order (if (= (:sort-order query-params) "descending")
                                      :descending
                                      :ascending)})]
    query-params))

(defroute surveys "/surveys" {:as params}
  (swap! app-state assoc :current-page {:path [:surveys]}))

(defroute devices-list "/devices/devices-list" [query-params]
  (let [query-params (parse-sort-params query-params)]
    (swap! app-state assoc :current-page {:path [:devices :devices-list]
                                          :query-params query-params})))

(defroute assignments-list "/devices/assignments-list" {:as params}
  (swap! app-state assoc :current-page {:path [:devices :assignments-list]}))

(defroute manual-survey-transfer "/devices/manual-survey-transfer" {:as params}
  (swap! app-state assoc :current-page {:path [:devices :manual-survey-transfer]}))

(defroute data-inspect "/data/inspect" {:as params}
  (swap! app-state assoc :current-page {:path [:data :inspect]}))

(defroute data-bulk-upload "/data/bulk-upload" {:as params}
  (swap! app-state assoc :current-page {:path [:data :bulk-upload]}))

(defroute data-cleaning "/data/data-cleaning" {:as params}
  (swap! app-state assoc :current-page {:path [:data :data-cleaning]}))

(defroute data-monitoring "/data/monitoring" {:as params}
  (swap! app-state assoc :current-page {:path [:data :monitoring]}))


(defroute reports "/reports" {:as params}
  (swap! app-state assoc :current-page {:path [:reports]}))

(defroute maps "/maps" {:as params}
  (swap! app-state assoc :current-page {:path [:maps]}))

(defroute users "/users" [query-params]
  (let [query-params (parse-sort-params query-params)]
    (swap! app-state assoc :current-page {:path [:users]
                                          :query-params query-params})))

(defroute users-add "/users/add" {:as params}
  (swap! app-state assoc :current-page {:path [:users :add]}))

(defroute users-edit "/users/edit/:id" [id]
  (swap! app-state assoc :current-page {:path [:users :edit]
                                        :user-id (js/parseInt id)}))

(defroute users-delete "/users/delete/:id" [id]
  (swap! app-state assoc :current-page {:path [:users :delete]
                                        :user-id (js/parseInt id)}))

(defroute users-manage-apikeys "/users/manage-apikeys/:id" [id]
  (swap! app-state assoc :current-page {:path [:users :manage-apikeys]
                                        :user-id (js/parseInt id)}))

(defroute messages "/messages" {:as params}
  (swap! app-state assoc :current-page {:path [:messages]}))

(let [h (History.)]
  (goog.events/listen h EventType/NAVIGATE #(secretary/dispatch! (.-token %)))
  (doto h (.setEnabled true)))
