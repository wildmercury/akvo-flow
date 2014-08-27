(ns org.akvo.flow.components.reports
  (:require [org.akvo.flow.routes :as routes]
            [om.core :as om :include-macros true]
            [sablono.core :as html :refer-macros (html)]))

(defn reports [data owner]
  (om/component
   (html [:h1 "Reports"])))
