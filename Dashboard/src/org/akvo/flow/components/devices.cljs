(ns org.akvo.flow.components.devices
  (:require [org.akvo.flow.routes :as routes]
            [org.akvo.flow.components.grid :refer (grid)]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]))

(defn active [current-page page]
  (if (= current-page page) "active" ""))

(defn devices-list [data owner]
  (om/component
   (html
    [:div
     [:a.standardBtn.btnAboveTable "Manage device groups"]
     (om/build grid
               {:id "surveyDataTable"
                :route-fn routes/devices-list
                :sort-idx (-> data :current-page :query-params :sort-idx)
                :sort-order (-> data :current-page :query-params :sort-order)
                :data (:devices data)
                :columns [{:title [:input {:type "checkbox"}]
                           :cell-fn (constantly [:input {:type "checkbox"}])}
                          {:title "Imei"
                           :cell-fn #(get % "esn")}
                          {:title "Phone number"
                           :cell-fn #(get % "phoneNumber")}
                          {:title "Device id"
                           :cell-fn #(get % "deviceIdentifier")}
                          {:title "Device group"
                           :cell-fn #(get % "deviceGroup")}
                          {:title "Last contact"
                           :cell-fn #(get % "lastPositionDate")}
                          {:title "Version"
                           :cell-fn #(get % "gallatinSoftwareManifest")}]})])))

(defn assignments-list [data owner]
  (reify om/IRender
    (render [this]
      (dom/h1 nil "Assignments list"))))

(defn manual-survey-transfer [data owner]
  (reify om/IRender
    (render [this]
      (dom/h1 nil "Manual survey transfer"))))

(def pages
  {:devices-list devices-list
   :assignments-list assignments-list
   :manual-survey-transfer manual-survey-transfer})

(defn devices [data owner]
  (om/component
   (let [current-page (routes/active-page data)]
     (html
      [:div
       [:section {:class "devicesSection floats-in" :id "main" :role "main"}
        [:div {:id "tabs"}
         [:nav {:class "tabNav floats-in"}
          [:ul
           [:li {:class (active current-page :devices-list)}
            [:a {:href (routes/devices-list)} "Devices list"]]
           [:li {:class (active current-page :assignments-list)}
            [:a {:href (routes/assignments-list)} "Assignments list"]]
           [:li {:class (active current-page :manual-survey-transfer)}
            [:a {:href (routes/manual-survey-transfer)} "Manual survey transfer"]]]]
         (om/build routes/active-component (assoc data :pages pages))]]]))))
