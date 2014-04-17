(ns akvo-flow.core
  (:require 
    [cljs.core.async :as async :refer [<! >! chan close! sliding-buffer put! alts!]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [sablono.core :as html :refer-macros [html]]
    [akvo-flow.remote]
    [akvo-flow.components :refer [app nav-tabs]])
  (:require-macros [cljs.core.async.macros :as m :refer [go alt!]]))

(enable-console-print!)
  
(def controls-ch
  (chan))

(def api-ch
  (chan))


;; ------------------- event handling -----------------
(defmulti handle-control-event (fn [event state] (first event)))

(defmethod handle-control-event :tab-selected
  [event state]
  (let [[_ e-data] event
        tab-content (keep #(if (= e-data (:id %)) %) nav-tabs)
        subtabs (:subtabs (first tab-content))
        first-subtab-id (:id (first subtabs))] 
    (swap! state assoc :tab e-data :subtab first-subtab-id)))

(defmethod handle-control-event :subtab-selected
  [event state]
  (let [[_ e-data] event]
    (swap! state assoc :subtab e-data)))

(defmethod handle-control-event :default
  [event state]
  (print "Can't handle this control event"))

;; -------------------- setup of main loop ---------------
(defn main [target]
  (let [state (atom {
         :tab "devices"
         :subtab "devices-list"
         :comms {:control controls-ch
                 :api api-ch}
         :datastore {:users [{:id 1 :display-name "mark westra"}{:id 2 :display-name "Linda Porsius"}]}})]
    (om/root app state {:target target})
    (go (while true
          (alt!
            controls-ch ([v]
                             (handle-control-event v state))
            api-ch ([v]
                          (print "api:" (pr-str v))))))))

(defn setup! []
  (main (. js/document (getElementById "root"))))

(set! (.-onload js/window) setup!)