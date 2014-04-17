(ns akvo-flow.components.surveys 
  (:require 
    [cljs.core.async :as async :refer [>! <! alts! chan sliding-buffer put! close!]]
    [sablono.core :as html :refer-macros [html]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]
    [akvo-flow.dispatch :refer [body]]
    [akvo-flow.fixtures.fixtures :refer [survey-groups]]))

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

