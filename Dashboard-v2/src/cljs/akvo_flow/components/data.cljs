(ns akvo-flow.components.data
  (:require 
    [cljs.core.async :as async :refer [>! <! alts! chan sliding-buffer put! close!]]
    [sablono.core :as html :refer-macros [html]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [akvo-flow.dispatch :refer [body]]))

;; inspect-data subtab
(defmethod body ["data" "inspect-data"] [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "inspect-data-subtab"]))))

;; bulk-upload-data subtab
(defmethod body ["data" "bulk-upload-data"] [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "bulk-upload-data-subtab"]))))

;; data-cleaning subtab
(defmethod body ["data" "data-cleaning"] [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "data-cleaning-subtab"]))))