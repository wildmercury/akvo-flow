(ns akvo-flow.components.surveys 
  (:require 
    [cljs.core.async :as async :refer [>! <! alts! chan sliding-buffer put! close!]]
    [sablono.core :as html :refer-macros [html]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [akvo-flow.dispatch :refer [body]]))

(defn surveys-tab-group-sidebar [state owner]
  (reify
    om/IInitState
    (init-state [_]
                {:skip-group 0})
    om/IRenderState
    (render-state 
      [this loc-state]
      (html (let [skip (:skip-group loc-state)]
              [:section.leftSidebar {:id "groupBar"}
               [:h2 "Survey groups"]
               [:a.addGroup "Add new group"]
               [:nav
                [:div.scrollWrap [:a.scrollUp 
                                  {:on-click #(om/set-state! owner :skip-group (dec skip))} "up"]]
                [:nav.menuGroupWrap
                 [:ul.menuGroup (for [sg (nthnext survey-groups skip)]
                                  [:li {:key (:id sg)}
                                   [:a (:display-name sg)]])]]
                [:div.scrollWrap [:a.scrollDown 
                                  {:on-click #(om/set-state! owner :skip-group (inc skip))} "down"]]]])))))

(defn surveys-tab-group-topbar [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div ""]))))

;; surveys tab
(defmethod body ["surveys" nil] [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div 
             (om/build surveys-tab-group-sidebar state)
             (om/build surveys-tab-group-topbar state)
             ]))))

;; fixtures
(def survey-groups 
  [{:key 1 :display-name "group 1" :id 121221}
   {:key 2 :display-name "group 2" :id 123213}
   {:key 3 :display-name "group 3" :id 443343}
   {:key 4 :display-name "group 4" :id 554343}
   {:key 5 :display-name "group 5" :id 553232}
   {:key 6 :display-name "group 6" :id 234323}
   {:key 7 :display-name "group 7" :id 667766}
   {:key 8 :display-name "group 8" :id 123455}
   {:key 9 :display-name "group 9" :id 323234}
   {:key 10 :display-name "group 10" :id 545455}
   {:key 11 :display-name "group 11" :id 11111}
   {:key 12 :display-name "group 12" :id 22222}
   {:key 13 :display-name "group 13" :id 33333}
   {:key 14 :display-name "group 14" :id 44444}
   {:key 15 :display-name "group 15" :id 55555}])
