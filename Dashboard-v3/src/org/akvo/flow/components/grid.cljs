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

(defn table-head [data owner]
  (reify
    om/IRenderState
    (render-state [this {:keys [sort-chan sort-idx sort-order]}]
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
                   [:a {:on-click #(async/put! sort-chan {:sort-idx idx
                                                          :sort-order (if (= idx sort-idx)
                                                                        (change-direction sort-order)
                                                                        :ascending)})}
                    (if (fn? item) (om/build item {}) item)]])))]))))

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
  (reify 
    
    om/IInitState
    (init-state [this]
      {:sort-idx 0
       :sort-order :ascending
       :sort-chan (async/chan)})
    
    om/IWillMount
    (will-mount [this]
      (let [chan (om/get-state owner :sort-chan)]
        (go-loop []
          (let [{:keys [sort-idx sort-order]} (<! chan)]
            (om/set-state! owner :sort-idx sort-idx)
            (om/set-state! owner :sort-order sort-order)
            (recur)))))

    om/IRenderState
    (render-state [this state]
      (let [sort-fn (get-in data [:columns (:sort-idx state) :cell-fn])
            grid-data (sort-by sort-fn (:data data))
            grid-data (if (= (:sort-order state) :descending)
                        (reverse grid-data)
                        grid-data)]
        (html
         [:table.dataTable {:id (:id data)}
          [:thead (om/build table-head data {:state {:sort-chan (:sort-chan state)
                                                     :sort-idx (:sort-idx state)
                                                     :sort-order (:sort-order state)}})]
          [:tbody (om/build-all (table-row (:columns data)) grid-data)]])))))

