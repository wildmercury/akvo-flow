(ns org.akvo.flow.components.header
  (:require [org.akvo.flow.routes :as routes]
            [org.akvo.flow.dispatcher :refer (dispatch)]
            [clojure.string :as s]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)])
  (:require-macros [org.akvo.flow.locale :refer (t)]))

(defn class-str [current-page page]
  (str "nav" (s/capitalize (name page)) (if (= current-page page) " current" "")))

(defn language-selector [{:keys [current-locale]} owner]
  (om/component
   (html
    [:div
     [:label.languageSelector
      [:span.labelText (t :language) ":"]
      [:select {:default-value (name current-locale)
                :on-change #(let [new-locale (-> % .-target .-value keyword)]
                              (dispatch :locale-changed new-locale))}
       [:option {:value "en"} "English"]
       [:option {:value "es"} "Español"]
       [:option {:value "fr"} "Français"]]]])))

(defn header [data owner]
  (let [[current-page] (:path (:current-page data))]
    (om/component
     (html
      [:header {:class "floats-in top"
                :id "header"
                :role "banner"}
       [:div
        [:h1 "Akvo" [:abbr {:title "field level operations watch"} "Flow"]]
        [:nav#topnav.appNav {:role "navigation"}
         [:ul {:class "floats-in"}
          [:li {:class (class-str current-page :surveys)}
           [:a {:href (routes/surveys)} (t :surveys)]]
          [:li {:class (class-str current-page :devices)}
           [:a {:href (routes/devices-list)} (t :devices)]]
          [:li {:class (class-str current-page :data)}
           [:a {:href (routes/data-inspect)} (t :data)]]
          [:li {:class (class-str current-page :reports)}
           [:a {:href (routes/reports-charts)} (t :reports)]]
          [:li {:class (class-str current-page :maps)}
           [:a {:href (routes/maps)} (t :maps)]]
          [:li {:class (class-str current-page :users)}
           [:a {:href (routes/users)} (t :users)]]
          [:li {:class (class-str current-page :messages)}
           [:a {:href (routes/messages)} (t :messages)]]]]
        (om/build language-selector (select-keys data [:current-locale]))]]))))
