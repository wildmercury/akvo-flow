(ns org.akvo.flow.components.map
  (:require [om.core :as om :include-macros true]
            [sablono.core :as html :refer-macros (html)]))

(def src "http://monkey.localhost.lan:3000/viz/37aa2e0a-3f25-11e4-ab3c-080027129698/embed_map")

(defn map-view [data owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:iframe {:width "100%"
                 :height "600"
                 :frameborder "0"
                 :src src}]))))
