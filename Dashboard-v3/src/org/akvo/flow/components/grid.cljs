(ns ^{:doc "Reusable grid component"}
  org.akvo.flow.components.grid
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]))

(comment

  ;; Example
  
  (def the-data
    [{:user-id 134321
      :username "abc"
      :email "abc@gmail.com"}
     {:user-id 999999
      :username "xyz"
      :email "zyx@gmail.com"}])

  (om/build grid 
            {:id "deviceDataTable"
             :data the-data
             :columns [{:title "Id"
                        :cell-fn :user-id}
                       {:title "Username"
                        :cell-fn :username
                        :sort :ascending}
                       {:title "Actions"
                        :cell-fn edit-and-delete-component}]})
  
  ;; :cell-fn takes a record and returns either a string or a
  ;; react component. :title can also be a component
  
  )

(defn table-head [data owner]
  (om/component
   (html
    [:tr
     (->> (:columns data)
          (map :title)
          (map (fn [item]
                 [:th [:a (if (fn? item) (om/build item {}) item)]])))])))

(defn table-row [columns]
  (fn [data owner]
    (om/component
     (html
      [:tr
       (for [col columns]
         [:td (let [item ((:cell-fn col) data)]
                (if (fn? item) 
                  (om/build item {})
                  item))])]))))

(defn grid [data owner]
  (om/component
   (html
    [:table.dataTable {:id (:id data)}
     [:thead (om/build table-head data)]
     [:tbody (om/build-all (table-row (:columns data)) (:data data))]])))

