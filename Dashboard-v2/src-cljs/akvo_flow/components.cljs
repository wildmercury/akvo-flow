(ns akvo-flow.components
  (:require 
    [cljs.core.async :as async :refer [>! <! alts! chan sliding-buffer put! close!]]
    [sablono.core :as html :refer-macros [html]]
    [om.core :as om :include-macros true]
    [om.dom :as dom :include-macros true]))

(def nav-tabs 
  [{:key 1 :name "SURVEYS" :class-name "navSurveys"}
   {:key 2 :name "DEVICES" :class-name "navDevices"
    :subtabs [{:key 1 :name "DEVICES LIST"}
              {:key 2 :name "ASSIGNMENTS LIST"}
              {:key 3 :name "MANUAL SURVEY TRANSFER"}]}
   {:key 3 :name "DATA" :class-name "navData"
    :subtabs[{:key 1 :name "INSPECT DATA"}
             {:key 2 :name "BULK UPLOAD DATA"}
             {:key 3 :name "DATA CLEANING"}]}
   {:key 4 :name "REPORTS" :class-name "navReports"
    :subtabs [{:key 1 :name "CHARTS"}
              {:key 2 :name "EXPORT REPORTS"}]}
   {:key 5 :name "MAPS" :class-name "navMaps"}
   {:key 6 :name "USERS" :class-name "navUsers"}
   {:key 7 :name "MESSAGES" :class-name "navMessages"}])

;; fixtures
(def survey-groups 
  [{:key 1 :name "group 1" :id 121221}
   {:key 2 :name "group 2" :id 123213}
   {:key 3 :name "group 3" :id 443343}
   {:key 4 :name "group 4" :id 554343}
   {:key 5 :name "group 5" :id 553232}
   {:key 6 :name "group 6" :id 234323}
   {:key 7 :name "group 7" :id 667766}
   {:key 8 :name "group 8" :id 123455}
   {:key 9 :name "group 9" :id 323234}
   {:key 10 :name "group 10" :id 545455}
   {:key 11 :name "group 11" :id 11111}
   {:key 12 :name "group 12" :id 22222}
   {:key 13 :name "group 13" :id 33333}
   {:key 14 :name "group 14" :id 44444}
   {:key 15 :name "group 15" :id 55555}])

;; Top logo
(defn logo [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:span
             [:h1 "Akvo"
              [:abbr {:title "Akvo FLOW"} "FLOW"]]]))))

;; Top navigation bar
(defn top-nav [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (let [{active-tab :tab 
             active-sub-tab :subtab} state
            control (get-in state [:comms :control])]
        (html 
          [:nav {:id "topnav" 
                 :role "navigation"} 
           [:div
            [:ul {:class "floats-in"}
             (for [t nav-tabs]
               [:li 
                {:class (str (:class-name t) (if (= (:key t) active-tab) " current"))
                 :key (:key t)}
                [:a {:on-click (comp (constantly false)
                                     #(put! control [:tab-selected (:key t)]))}
                 (:name t)]])]]])))))

;; sub navigation of panels
(defn sub-nav [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (let [{active-tab :tab active-sub-tab :subtab} state
            tab-content (keep #(if (= active-tab (:key %)) %) nav-tabs)
            subtabs (:subtabs (first tab-content))
            control (get-in state [:comms :control])]
        (html 
          [:nav {:class "tabNav floats-in"} 
           [:ul (for [st subtabs]
                  [:li {:class (if (= (:key st) active-sub-tab) "active")
                        :key (:key st)}
                   [:a {:on-click (comp (constantly false)
                                        #(put! control [:subtab-selected (:key st)]))}
                    (:name st)]])]])))))

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
                                  [:li {:key (:key sg)}
                                   [:a (:name sg)]])]]
                [:div.scrollWrap [:a.scrollDown 
                                  {:on-click #(om/set-state! owner :skip-group (inc skip))} "down"]]]
               [:div (print loc-state)]]
              )))))

(defn surveys-tab-group-topbar [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div ""]))))

(defn surveys-tab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div 
            ;; (om/build surveys-tab-group-sidebar state)
            ;; (om/build surveys-tab-group-topbar state)
             ]))))

(defn devices-list-subtab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "devices-list-subtab"]))))

(defn assignment-list-subtab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "assignment-list-subtab"]))))

(defn manual-survey-transfer-subtab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "manual-survey-transfer-subtab"]))))

(defn inspect-data-subtab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "inspect-data-subtab"]))))

(defn bulk-upload-data-subtab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "bulk-upload-data-subtab"]))))

(defn data-cleaning-subtab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "data-cleaning-subtab"]))))

(defn charts-subtab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "charts-subtab"]))))

(defn export-reports-subtab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "export-reports-subtab"]))))

(defn maps-tab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "maps-tab"]))))

(defn users-tab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "users-tab"]))))

(defn messages-tab [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div "messages-tab"]))))

(defn body [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (let [{active-tab :tab 
             active-sub-tab :subtab} state]
        (html (case active-tab
                1 (om/build surveys-tab state)
                2 (case active-sub-tab
                    1 (om/build devices-list-subtab state)
                    2 (om/build assignment-list-subtab state)
                    3 (om/build manual-survey-transfer-subtab state))
                3 (case active-sub-tab
                    1  (om/build inspect-data-subtab state)
                    2  (om/build bulk-upload-data-subtab state)
                    3  (om/build data-cleaning-subtab state))
                4 (case active-sub-tab
                    1 (om/build charts-subtab state)
                    2 (om/build export-reports-subtab state))
                5 (om/build maps-tab state)
                6 (om/build users-tab state)
                7 (om/build messages-tab state)))))))

(defn app [state owner]
  (reify
    om/IRender
    (render 
      [this]
      (html [:div
             [:header {:class "floats-in top" :id "header" :role "banner"}
              [:div
               (om/build logo state)
               (om/build top-nav state) 
               ]]
             [:div {:id "pageWrap"}
              [:section {:class "floats-in" :id "main" :role "main"}
               [:div {:id "tabs"} (om/build sub-nav state)]
               [:div (om/build body state)]
               ]]
             ]))))
