(ns org.akvo.flow.components.devices
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]))

(defn active [current-page page]
  (if (= current-page page) "active" ""))

(defn devices [data owner child]
  (let [[_ current-page] (:current-page data)]
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

(defn devices-list-table-row [device]
  (html 
   [:tr
    [:td.selection [:input {:type "checkbox"}]]
    [:td.EMEI (get device "esn")]
    [:td.phoneNumber (get device "phoneNumber")]
    [:td.deviceId (get device "deviceIdentifier")]
    [:td.deviceGroup (get device "deviceGroup")]
    [:td.lastBeacon (get device "lastPositionDate")]
    [:td.version (get device "gallatinSoftwareManifest")]]))

(defn devices-list-table-head []
  (html
   [:tr [:th [:input {:type "checkbox"}]]
    [:th [:a "IMEI"]]
    [:th [:a "Phone number"]]
    [:th [:a "Device id"]]
    [:th [:a "Device group"]]
    [:th [:a "Last contact"]]
    [:th [:a "Version"]]]))

(defn devices-list [data owner]
  (om/component
   (html
    [:div
     [:a.standardBtn.btnAboveTable "Manage device groups"]
     [:table#surveyDataTable.dataTable
      [:thead (devices-list-table-head)]
      [:tbody (map devices-list-table-row (:devices data))]]])))

(defn assignments-list [data owner]
  (reify om/IRender
    (render [this]
      (dom/h1 nil "Assignments list"))))

(defn manual-survey-transfer [data owner]
  (reify om/IRender
    (render [this]
      (dom/h1 nil "Manual survey transfer"))))
