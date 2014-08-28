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

             :query-params {;; The column (zero based) index used for sorting
                            :sort-idx 2
                            ;; The sort order (either "ascending" or "descending")
                            :sort-order "ascending"
                            ;; Maximum number of rows
                            :limit 20
                            ;; Pagination offset
                            :offset 100}

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

(defn change-direction [dir]
  (if (= dir "ascending")
    "descending"
    "ascending"))

(defn table-head [{:keys [query-params route-fn] :as data} owner]
  (om/component
   (let [sort-idx (:sort-idx query-params)
         sort-order (:sort-order query-params)]
     (html
       [:tr
        (->> (:columns data)
             (map :title)
             (map-indexed
              (fn [idx item]
                [:th {:class (if (= sort-idx idx)
                               (if (= sort-order "ascending")
                                 "sorting_asc"
                                 "sorting_desc")
                               "")}
                 [:a {:href (route-fn {:query-params (assoc query-params
                                                       :offset 0
                                                       :sort-idx idx
                                                       :sort-order (if (= idx sort-idx)
                                                                     (change-direction sort-order)
                                                                     "ascending"))})}
                  (if (fn? item) (om/build item {}) item)]])))]))))

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

(defn pagination-controls [{:keys [query-params route-fn]} owner]
  (om/component
   (let [offset (or (:offset query-params) 0)
         limit (or (:limit query-params) 20)]
     (html
      [:div {:style {:padding-top "5px"
                     :font-size "1.2em"}}
       [:span "Show:"
        (if (= limit 10) " 10" [:a {:href (route-fn {:query-params (assoc query-params :limit 10)})} " 10"])
        (if (= limit 20) " 20" [:a {:href (route-fn {:query-params (assoc query-params :limit 20)})} " 20"])
        (if (= limit 50) " 50" [:a {:href (route-fn {:query-params (assoc query-params :limit 50)})} " 50"])]
       [:span {:style {:float "right"}}
        (if (zero? offset)
          "«previous"
          [:a {:href (route-fn {:query-params (assoc query-params
                                                :offset (let [new-offset (- offset limit)]
                                                          (if (neg? new-offset) 0 new-offset))
                                                :limit limit)})}
           "«previous"])
        (str " " offset " - " (+ offset limit) " ")
        [:a {:href (route-fn {:query-params (assoc query-params
                                              :offset (+ offset limit)
                                              :limit limit)})}
         "next»"]]]))))

(defn comparator-complement
  "Like cljs.core/complement for comparator functions"
  [comparator]
  (fn [x y]
    (comparator y x)))

(defn grid [data owner]
  (om/component
   (let [key-fn (or (get-in data [:columns (:sort-idx (:query-params data)) :cell-fn])
                    identity)
         descending? (boolean (= (:sort-order (:query-params data)) "descending"))
         ;; TODO optional custom comparator
         comparator (if descending? (comparator-complement compare) compare)
         grid-data (sort-by key-fn comparator (:data data))]
     (html
      [:div
       (om/build pagination-controls data)
       [:table.dataTable {:id (:id data)}
       [:thead (om/build table-head data)]
       [:tbody (om/build-all (table-row (:columns data)) grid-data)]]]))))
