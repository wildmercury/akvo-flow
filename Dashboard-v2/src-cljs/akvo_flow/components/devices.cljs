(ns akvo-flow.components.devices
  (:require 
    [cljs.core.async :as async :refer [>! <! alts! chan sliding-buffer put! close!]]
    [sablono.core :as html :refer-macros [html]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [akvo-flow.dispatch :refer [body]]))

;; manual-survey-transfer subtab
(defmethod body ["devices" "manual-survey-transfer"] [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "manual-survey-transfer-subtab"]))))

;; devices-list subtab
(defmethod body ["devices" "devices-list"] [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "devices-list-subtab"]))))

;; assignment-list subtab
(defmethod body ["devices" "assignments-list"] [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "assignment-list-subtab"]))))