(ns ^{:doc "Reusable grid component"}
  org.akvo.flow.components.grid
  (:require [cljs.core.async :as async] 
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)])
  (:require-macros [cljs.core.async.macros :refer (go-loop)]))

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

(def change-direction
  {:ascending :descending
   :descending :ascending})

(defn table-head [{:keys [sort-idx sort-order] :as data} owner]
  (om/component
   (html
    [:tr
     (->> (:columns data)
          (map :title)
          (map-indexed 
           (fn [idx item]
             [:th {:class (if (= sort-idx idx)
                            (if (= sort-order :ascending)
                              "sorting_asc"
                              "sorting_desc")
                            "")} 
              [:a {:href (str "#/devices/devices-list?sort-idx=" idx "&sort-order=" (if (= idx sort-idx)
                                                                                      (name (change-direction sort-order))
                                                                                      "ascending"))}
               (if (fn? item) (om/build item {}) item)]])))])))

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
   (let [sorted? (boolean (:sort-idx data))
         sort-fn (get-in data [:columns (:sort-idx data) :cell-fn])
         grid-data (:data data)
         grid-data (if sorted? 
                     (sort-by sort-fn grid-data)
                     grid-data)
         grid-data (if sorted?
                      (if (= (:sort-order data) :descending)
                        (reverse grid-data)
                        grid-data)
                      grid-data)]
     (html
      [:table.dataTable {:id (:id data)}
       [:thead (om/build table-head data)]
       [:tbody (om/build-all (table-row (:columns data)) grid-data)]]))))

