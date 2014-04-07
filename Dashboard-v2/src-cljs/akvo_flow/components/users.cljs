(ns akvo-flow.components.users
  (:require 
    [cljs.core.async :as async :refer [>! <! alts! chan sliding-buffer put! close!]]
    [sablono.core :as html :refer-macros [html]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [akvo-flow.dispatch :refer [body]]))

;; users subtab
(defmethod body ["users" nil] [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "users-tab"]))))