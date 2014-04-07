(ns akvo-flow.core
  (:require 
    [cljs.core.async :as async :refer [<! >! chan close! sliding-buffer put! alts!]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [sablono.core :as html :refer-macros [html]]
    [akvo-flow.components :refer [app nav-tabs]])
  (:require-macros [cljs.core.async.macros :as m :refer [go alt!]]))

(enable-console-print!)

(def controls-ch
  (chan))

(def api-ch
  (chan))

(def app-state 
  (atom {
         :tab "devices" 
         :subtab "devices-list"
         :comms {:control controls-ch
                 :api api-ch}}))

(defn handle-control-event 
  [event state]
  (let [[e-name e-data] event] 
    (case e-name
      :tab-selected (let [
                          tab-content (keep #(if (= e-data (:id %)) %) nav-tabs)
                          subtabs (:subtabs (first tab-content))
                          first-subtab-id (:id (first subtabs))] 
                      (swap! state assoc :tab e-data :subtab first-subtab-id))
      :subtab-selected (do
                         (swap! state assoc :subtab e-data))
      
      (print "unrecognised"))))

(defn main [target state]
  (let [comms (:comms @state)]
    (om/root app state {:target target})
    (go (while true
          (alt!
            (:control comms)([v]
                             (handle-control-event v state))
            (:api comms) ([v]
                          (print "api:" (pr-str v))))))))

(defn setup! []
  (main (. js/document (getElementById "root")) app-state))

(set! (.-onload js/window) setup!)