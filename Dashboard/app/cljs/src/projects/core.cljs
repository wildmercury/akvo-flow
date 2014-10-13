(ns projects.core
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [ajax.core :as ajax :refer (GET POST)]
            [sablono.core :as html :refer-macros (html)]))

(enable-console-print!)

(defn empty-folder []
  {"code" "New folder - Change my name"
   "name" "New folder - Change my name"
   "description" ""
   "displayName" ""
   "keyId" nil
   "createdDateTime" ""
   "lastUpdateDateTime" ""
   "parent" nil
   "monitoringGroup" false
   "newLocaleSurveyId" nil
   "projectType" "PROJECT_FOLDER"})

(defn empty-project [parent-id]
  {"code" "New project - Change my name"
   "description" ""
   "displayName" "none"
   "monitoringGroup" false
   "projectType" "PROJECT_FOLDER"
   "parent" parent-id})

;; TODO: move to stores/projects
(def app-state (atom {:projects nil
                      :page {:data {:current-project nil}}}))

(defn fetch-survey-groups []
  (GET "/rest/survey_groups"
       {:handler (fn [survey-groups]
                   (swap! app-state assoc :projects (get survey-groups "survey_groups")))
        :format (ajax/json-response-format {:keywords? false})}))

(defn save-new-survey-group [project]
  (POST "/rest/survey_groups"
        {:params {"survey_group" project}
         :handler (fn [survey-group]
                    (swap! app-state update-in [:projects] conj (get survey-group "survey_group")))
         :response-format :json
         :keywords? false
         :format (ajax/json-request-format)}))

(defn get-bread-crumbs* [project projects]
  (if-let [parent-id (get project "parent")]
    (let [parent (first (get projects parent-id))]
      (cons project (get-bread-crumbs* parent projects)))
    (list project)))

(defn get-bread-crumbs [project projects]
  (cons nil
        (when project
          (let [projects (group-by #(get % "keyId") projects)]
            (reverse (get-bread-crumbs* project projects))))) )

(defn navigate-to [project]
  (fn [evt]
    (swap! app-state assoc-in [:page :data :current-project] project)))

(defn folder? [project]
  (or (nil? project) ;; Root folder
      (= (get project "projectType")
         "PROJECT_FOLDER")))

;; TODO... pub/sub
(defn dispatch! [tag data]
  (condp = tag
    :projects/add-folder
    (save-new-survey-group data)

    :projects/show-add-folder-dialog?
    (swap! app-state assoc-in [:page :show-add-folder-dialog?] data)))

(defn show-add-folder-dialog? [page]
  (:show-add-folder-dialog? page))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;; Components
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn project-link [project]
  (om/component
   (html
    [:a {:href "#" :on-click (navigate-to project)}
     (if project (get project "code") "root")])))

(defn projects-list [{:keys [projects page]} owner]
  (om/component
   (html
    [:div "Projects: "
     [:ul (for [project projects
                :when (= (get project "parent")
                         (get (-> page :data :current-project) "keyId"))]
            [:li (om/build project-link project)])]])))

(defn edit-project [p owner]
  (om/component
   (html [:div
          [:div
           [:label "Title"]
           [:input {:type "text" :value (get p "code")}]]
          [:div
           [:label "Description"]
           [:input {:type "text" :value (get p "description" "")}]]
          [:div
           [:label "Privacy type"]]
          [:div
           [:label "Language"]]
          [:div
           [:label "Enable monitoring features"]]
          [:div
           [:button "Publish project"]]])))


(defn set-folder-name! [owner name]
  (om/set-state! owner :folder-name name))

(defn add-folder [current-project owner]
  (reify
    om/IInitState
    (init-state [this]
      {:folder-name ""})
    om/IRenderState
    (render-state [this state]
      (html
       [:div
        [:label "Folder name: "]
        [:input {:type "text"
                 :value (:folder-name state)
                 :on-change #(set-folder-name! owner (-> % .-target .-value))}]
        [:button {:on-click #(do (dispatch! :projects/add-folder (merge (empty-folder)
                                                                        {"code" (:folder-name state)
                                                                         "name" (:folder-name state)
                                                                         "parent" (get current-project "keyId")}))
                                 (set-folder-name! owner "")
                                 (dispatch! :projects/show-add-folder-dialog? false))}
         "Add"]]))))

(defn bread-crumb [bread-crumbs owner]
  (om/component
   (html
    [:div (for [project bread-crumbs]
            [:span (om/build project-link project) " > "])])))

(defn projects [data owner]
  (reify
    om/IDidMount
    (did-mount [this]
      (fetch-survey-groups))
    om/IRender
    (render [this]
      (let [data (om/value data)
            page (:page data)
            current-project (-> page :data :current-project)
            bread-crumbs (get-bread-crumbs current-project (:projects data))]
        (html
         [:div
          [:div
           [:a {:href "#"
                :on-click #(dispatch! :projects/show-add-folder-dialog? true)}
            "Add folder"]
           " | "
           [:a {:href "#"}
            "Create project"]]
          (when (show-add-folder-dialog? page)
            (om/build add-folder current-project))
          [:div (om/build bread-crumb bread-crumbs)]
          [:div
           (if (folder? current-project)
             (om/build projects-list (om/value data))
             (om/build edit-project current-project))]])))))

(om/root projects
         app-state
         {:target (.getElementById js/document "app")})
