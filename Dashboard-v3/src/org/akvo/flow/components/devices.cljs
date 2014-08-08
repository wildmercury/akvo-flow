(ns org.akvo.flow.components.devices
  (:require [org.akvo.flow.components.grid :refer (grid)] 
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]))

(defn active [current-page page]
  (if (= current-page page) "active" ""))

(defn devices [data owner child]
  (let [[_ current-page] (:path (:current-page data))]
    (om/component
     (html
      [:div
       [:section {:class "devicesSection floats-in" :id "main" :role "main"}
        [:div {:id "tabs"}
         [:nav {:class "tabNav floats-in"}
          [:ul
           [:li {:class (active current-page :devices-list)}
            [:a {:href "#/devices/devices-list"} "Devices list"]]
           [:li {:class (active current-page :assignments-list)}
            [:a {:href "#/devices/assignments-list"} "Assignments list"]]
           [:li {:class (active current-page :manual-survey-transfer)}
            [:a {:href "#/devices/manual-survey-transfer"} "Manual survey transfer"]]]]
         (om/build child data)]]]))))

(defn devices-list [data owner]
  (om/component
   (html
    [:div
     [:a.standardBtn.btnAboveTable "Manage device groups"]
     (om/build grid
               {:id "surveyDataTable"
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
