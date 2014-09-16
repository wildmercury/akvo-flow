(ns org.akvo.flow.components.data
  (:require [org.akvo.flow.routes :as routes]
            [om.core :as om :include-macros true]
            [sablono.core :as html :refer-macros (html)]))

(defn active [current-page page]
  (if (= current-page page) "active" ""))

(defn inspect [data owner]
  (om/component
   (html [:h1 "Inspect data"])))

(defn bulk-upload [data owner]
  (om/component
   (html [:h1 "Bulk upload"])))

(defn data-cleaning [data owner]
  (om/component
   (html [:h1 "Data cleaning"])))

(defn monitoring [data owner]
  (om/component
   (html [:h1 "Monitoring"])))

(def pages
  {:inspect inspect
   :bulk-upload bulk-upload
   :data-cleaning data-cleaning
   :monitoring monitoring})

(defn data [data owner]
  (om/component
   (let [page (routes/active-page data)]
     (html
      [:div
       [:section {:class "dataSection floats-in" :id "main" :role "main"}
        [:div {:id "tabs"}
         [:nav {:class "tabNav floats-in"}
          [:ul
           [:li {:class (active page :inspect)}
            [:a {:href (routes/data-inspect)} "Inspect data"]]
           [:li {:class (active page :bulk-upload)}
            [:a {:href (routes/data-bulk-upload)} "Bulk upload"]]
           [:li {:class (active page :data-cleaning)}
            [:a {:href (routes/data-cleaning)} "Data cleaning"]]
           [:li {:class (active page :monitoring)}
            [:a {:href (routes/data-monitoring)} "Monitoring"]]]]
         (om/build routes/active-component (assoc data :pages pages))]]]))))
