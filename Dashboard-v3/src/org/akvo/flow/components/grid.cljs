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
            {;; The id of this table
             :id "deviceDataTable"
             ;; The data to be rendered
             :data the-data
             ;; The route to this grid. Used by e.g. sorting
             :route-fn route-fn
             ;; The column (zero based) index used for sorting
             :sort-idx 2
             ;; The sort order (either :ascending or :descending)
             :sort-order :descending
             ;; Description of the columns
             :columns [{:title "Id"
                        :cell-fn :user-id}
                       {;; The title of this column
                        :title "Username"
                        ;; A function that returns the cell value. This function can return a
                        ;; * simple value: string/number/nil etc.
                        ;; * a sablono vector
                        ;; * an om/react component
                        :cell-fn :username
                        ;; (optional) class name to add to the <td>
                        :class "some-class"
                        }
                       {:title "Actions"
                        :cell-fn edit-and-delete-component}]}))

(def change-direction
  {:ascending :descending
   :descending :ascending})

(defn table-head [{:keys [sort-idx sort-order route-fn] :as data} owner]
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
              [:a {:href (route-fn {:query-params {:sort-idx idx
                                                   :sort-order (if (= idx sort-idx)
                                                                 (name (change-direction sort-order))
                                                                 "ascending")}})}
               (if (fn? item) (om/build item {}) item)]])))])))

(defn table-row [columns]
  (fn [data owner]
    (om/component
     (html
      [:tr
       (for [col columns]
         (let [class (:class col)
               item ((:cell-fn col) data)]
           [:td {:class (if class class "")}
            (if (fn? item)
              (om/build item {})
              item)]))]))))

(defn comparator-complement
  "Like cljs.core/complement for comparator functions"
  [comparator]
  (fn [x y]
    (comparator y x)))

(defn grid [data owner]
  (om/component
   (let [key-fn (or (get-in data [:columns (:sort-idx data) :cell-fn])
                     identity)
         descending? (boolean (= (:sort-order data) :descending))
         ;; TODO optional custom comparator
         comparator (if descending? (comparator-complement compare) compare)
         grid-data (sort-by key-fn comparator (:data data))]
     (html
      [:table.dataTable {:id (:id data)}
       [:thead (om/build table-head data)]
       [:tbody (om/build-all (table-row (:columns data)) grid-data)]]))))
