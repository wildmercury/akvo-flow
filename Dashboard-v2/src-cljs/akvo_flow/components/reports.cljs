(ns akvo-flow.components.reports
  (:require 
    [cljs.core.async :as async :refer [>! <! alts! chan sliding-buffer put! close!]]
    [sablono.core :as html :refer-macros [html]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [akvo-flow.dispatch :refer [body]]))


;; charts subtab
(defmethod body ["reports" "charts"] [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "charts-subtab"]))))

;; export-reports subtab
(defmethod body ["reports" "export-reports"] [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "export-reports-subtab"]))))