(ns org.akvo.flow.components.reports
  (:require [org.akvo.flow.routes :as routes]
            [org.akvo.flow.ajax-helpers :as ajax]
            [om.core :as om :include-macros true]
            [sablono.core :as html :refer-macros (html)]
            [ajax.core :refer (GET)])
  (:require-macros [org.akvo.flow.locale :refer (t)]))


(defn handle-survey-group-selected
  [owner]
  (fn [evt]
    (let [id (-> evt .-target .-value)]
      (GET (str "/rest/surveys?surveyGroupId=" id)
           (merge ajax/default-ajax-config
                  {:handler #(om/set-state! owner :surveys (get % "surveys"))})))))

(defn handle-survey-selected [owner]
  (fn [evt]
    (let [id (-> evt .-target .-value)]
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
        [:div
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
           [:option "Horizontal bar chart"]]]]]))))

(defn raw-data-report [{:keys [on-click]} owner]
  (reify
    om/IInitState
    (init-state [this] {:use-question-id false})

    om/IRenderState
    (render-state [this {:keys [use-question-id]}]
      (html
       [:div.rawDataReport.block
        [:h3 (t :export-raw-data-report)]
        [:p (t :raw-data-report-applet-text_)]
        [:label {:for "useQuestionId"} "Use question id as table headers?"]
        [:input {:id "useQuestionId"
                 :type "checkbox"
                 :value use-question-id
                 :on-change #(om/set-state! owner :use-question-id (not use-question-id))}]
        [:a.standardBtn {:on-click #(on-click {:use-question-id use-question-id})}
         (t :raw-data-report)]]))))

(defn comprehensive-report [{:keys [on-click]} owner]
  (om/component
   (html
    [:div.comprehensiveReport.block
     [:h3 (t :export-comprehensive-report)]
     [:p (t :comprehensive-report-applet-text)]
     [:a.standardBtn {:on-click #(on-click)} (t :comprehensive-report)]])))

(defn raw-text-file [{:keys [on-click]} owner]
  (om/component
   (html
    [:div.rawTextFile.block
     [:h3 (t :raw-text-file)]
     [:p (t :raw-text-file-text)]
     [:a.standardBtn {:on-click #(on-click)} (t :raw-text-file)]])))

(defn survey-form-export [{:keys [on-click]} owner]
  (om/component
   (html
    [:div.surveyFormExport.block
     [:h3 (t :export-survey-form)]
     [:p (t :survey-form-applet-text-)]
     [:a.standardBtn {:on-click #(on-click)} (t :survey-form)]])))

(defn export [data owner]
    (reify
      om/IInitState
      (init-state [this]
        {:survey-groups []
         :surveys []
         :language "en"})

      om/IDidMount
      (did-mount [this]
        (GET (str "/rest/survey_groups")
             (merge ajax/default-ajax-config
                    {:handler #(om/set-state! owner :survey-groups (get % "survey_groups"))})))

      om/IRenderState
      (render-state [this state]
        (html
         [:section#reportBlocks.fullWidth.reportTools
          [:h1 (t :export-data)]
          [:select {:on-change (handle-survey-group-selected owner)}
           [:option {:value "" :disabled true} (t :select-survey-group)]
           (options-for (:survey-groups state))]
          [:select {:on-change (handle-survey-selected owner)}
           [:option {:value "" :disabled true} (t :select-survey)]
           (options-for (:surveys state))]
          [:select {:default-value "en"
                    :on-change #(om/set-state! owner :language (-> % .-target .-value keyword))}
           [:option {:value "en"} "English (Default)"]
           [:option {:value "fr"} "Français"]
           [:option {:value "es"} "Español"]]
          (om/build raw-data-report {:on-click #(println "Export raw data report with" %)})
          (om/build comprehensive-report {:on-click #(println "Export comprehensive report")})
          (om/build raw-text-file {:on-click #(println "Export raw text file")})
          (om/build survey-form-export {:on-click #(println "Export survey form")})]))))

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
   (html [:section {:class "reportsSection floats-in middleSection" :id "main" :role "main"}
          [:div {:id "tabs"}
           [:nav {:class "tabNav floats-in"}
            [:ul
             [:li {:class (active data :charts)}
              [:a {:href (routes/reports-charts)} (t :charts)]]
             [:li {:class (active data :export)}
              [:a {:href (routes/reports-export)} (t :export-reports)]]]]
           (om/build routes/active-component (assoc data :pages pages))]])))
