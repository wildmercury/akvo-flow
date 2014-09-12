(ns org.akvo.flow.components.reports
  (:require [org.akvo.flow.routes :as routes]
            [org.akvo.flow.ajax-helpers :as ajax]
            [om.core :as om :include-macros true]
            [sablono.core :as html :refer-macros (html)]
            [ajax.core :refer (GET)]))


(defn handle-survey-group-selected
  [owner]
  (fn [evt]
    (let [id (-> evt .-target .-value)]
      (GET (str "/rest/surveys?surveyGrouId=" id)
         (merge ajax/default-ajax-config
                {:handler #(om/set-state! owner :surveys (get % "surveys"))})))))

(defn handle-survey-selected [owner]
  (fn [evt]
    (let [id (-> evt .-target .-value)]
      (println id)
      (GET (str "/rest/questions?optionQuestionsOnly=true&surveyId=" id)
           (merge ajax/default-ajax-config
                  {:handler #(om/set-state! owner :questions (get % "questions"))})))))

(defn options-for [objects]
  (for [o objects]
    [:option {:value (get o "keyId")} (get o "displayName")]))

(defn charts [data owner]
  (reify
    om/IInitState
    (init-state [this]
      {:survey-groups []
       :surveys []
       :questions []})

    om/IDidMount
    (did-mount [this]
      (GET (str "/rest/survey_groups")
           (merge ajax/default-ajax-config
                  {:handler #(om/set-state! owner :survey-groups (get % "survey_groups"))})))

    om/IRenderState
    (render-state [this state]
      (html
       [:section#reportBlocks.fullWidth.reportTools
        [:h1 "Chart Builder"]
        [:select {:on-change (handle-survey-group-selected owner)}
         [:option {:value "" :disabled true} "Select survey group"]
         (options-for (:survey-groups state))]
        [:select {:on-change (handle-survey-selected owner)}
         [:option {:value "" :disabled true} "Select survey"]
         (options-for (:surveys state))]
        [:select
         [:option {:value "" :disabled true} "Select question"]
         (options-for (:questions state))]
        [:div.chartSettings
         [:select
          [:option {:value "" :disabled true} "Select chart type"]
          [:option "Doughnut chart"]
          [:option "Vertical bar chart"]
          [:option "Horizontal bar chart"]]]]))))

(defn export [data owner]
  (om/component
   (html [:h2 "exports"])))

(def pages
  {:charts charts
   :export export})

(defn active [data current-page]
  (if (= (routes/active-page data)
         current-page)
    "active"
    ""))

(defn reports [data owner]
  (om/component
   (html [:div
          [:section {:class "devicesSection floats-in" :id "main" :role "main"}
           [:div {:id "tabs"}
            [:nav {:class "tabNav floats-in"}
             [:ul
              [:li {:class (active data :charts)}
               [:a {:href (routes/reports-charts)} "Charts"]]
              [:li {:class (active data :export)}
               [:a {:href (routes/reports-export)} "Export reports"]]]]]
           (om/build routes/active-component (assoc data :pages pages))]])))
