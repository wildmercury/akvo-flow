(ns org.akvo.flow.components.messages
  (:require [org.akvo.flow.components.grid :refer (grid)]
            [org.akvo.flow.ajax-helpers :as ajax]
            [om.core :as om :include-macros true]
            [sablono.core :as html :refer-macros (html)]
            [ajax.core :refer (GET)]))


(defn sort-messages-for [owner]
  (fn [sort-by sort-order]
    (doto owner
      (om/set-state! :sort-by sort-by)
      (om/set-state! :sort-order sort-order)
      (om/update-state! :messages
                        (fn [messages]
                          (let [messages (cljs.core/sort-by #(get % sort-by) messages)]
                            (if (= sort-order "ascending")
                              messages
                              (reverse messages))))))))

(defn messages [data owner]
  (reify
    om/IInitState
    (init-state [this]
      {:messages []
       :sort-by "lastUpdateDateTime"
       :sort-order "descending"})

    om/IDidMount
    (did-mount [this]
      (GET (str "/rest/messages")
           (merge ajax/default-ajax-config
                  {:handler #(om/set-state! owner :messages (get % "messages"))})))

    om/IRenderState
    (render-state [this {:keys [messages sort-by sort-order]}]
      (html [:div
             [:div.greyBg
              [:section.fullWidth.messagesList
               [:h1 "Messages"]
               (om/build grid
                         {:id "messageListTable"
                          :sort {:sort-by sort-by
                                 :sort-order sort-order}
                          :on-sort (sort-messages-for owner)
                          :data messages
                          :columns [{:title "Date"
                                     :cell-fn #(-> %
                                                   (get "lastUpdateDateTime")
                                                   js/Date.
                                                   str)
                                     :sort-by "lastUpdateDateTime"}
                                    {:title "Survey Id"
                                     :cell-fn #(get % "objectId")
                                     :sort-by "objectId"}
                                    {:title "Survey"
                                     :cell-fn #(get % "objectTitle")
                                     :sort-by "objectTitle"}
                                    {:title "Type"
                                     :cell-fn #(get % "actionAbout")
                                     :sort-by "actionAbout"}
                                    {:title "Message"
                                     :cell-fn #(get % "shortMessage")
                                     :sort-by "shortMessage"}
                                    {:title "User"
                                     :cell-fn #(get % "userName")
                                     :sort-by "userName"}]})]]]))))
