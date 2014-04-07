(ns akvo-flow.core
  (:require 
    [cljs.core.async :as async :refer [<! >! chan close! sliding-buffer put! alts!]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [sablono.core :as html :refer-macros [html]]
    [akvo-flow.components :refer [app]])
  (:require-macros [cljs.core.async.macros :as m :refer [go alt!]]))

(enable-console-print!)

(def controls-ch
  (chan))

(def api-ch
  (chan))

(def app-state 
  (atom {
         :tab 2 
         :subtab 1
         :comms {:control controls-ch
                 :api api-ch}}))

(defn handle-control-event 
  [event state]
  (let [[e-name e-data] event] 
    (case e-name
      :tab-selected (do 
                      (print "tab selected: " e-data)
                      (swap! state assoc :tab e-data :subtab 1))
      :subtab-selected (do 
                      (print "subtab selected: " e-data)
                      (swap! state assoc :subtab e-data))
                      
      (print "unrecognised"))))

(defn main [target state]
  (let [comms (:comms @state)]
    (om/root app state {:target target})
    (go (while true
          (alt!
            (:control comms)([v]
                             (print "control:" (pr-str v))
                             (handle-control-event v state))
            (:api comms) ([v]
                          (print "api:" (pr-str v))))))))

(defn setup! []
  (main (. js/document (getElementById "root")) app-state))

(set! (.-onload js/window) setup!)