(ns org.akvo.flow.components.devices
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(defn active [current-page page]
  (if (= current-page page) "active" ""))

(defn devices [data owner child]
  (reify om/IRender
    (render [this]
      (let [[_ current-page] (:current-page data)]
        (dom/div 
         nil
         (dom/section 
          #js {:className "devicesSection floats-in" :id "main" :role "main"}
          (dom/div 
           #js {:id "tabs"}
           (dom/nav 
            #js {:className "tabNav floats-in"}
            (dom/ul 
             nil
             (dom/li 
              #js {:className (active current-page :devices-list)}
              (dom/a #js {:href "#/devices/devices-list"} "Devices list"))
             (dom/li 
              #js {:className (active current-page :assignments-list)}
              (dom/a #js {:href "#/devices/assignments-list"} "Assignments list"))
             (dom/li 
              #js {:className (active current-page :manual-survey-transfer)}
              (dom/a #js {:href "#/devices/manual-survey-transfer"} "Manual survey transfer"))))
           (om/build child data))))))))

(defn devices-list-table-row [device]
  (dom/tr nil
          (dom/td #js {:className "selection"} (dom/input #js {:type "checkbox"}))
          (dom/td #js {:className "EMEI"} (get device "esn"))
          (dom/td #js {:className "phoneNumber"} (get device "phoneNumber"))
          (dom/td #js {:className "deviceId"} (get device "deviceIdentifier"))
          (dom/td #js {:className "deviceGroup"} (get device "deviceGroup"))
          (dom/td #js {:className "lastBeacon"} (get device "lastPositionDate"))
          (dom/td #js {:className "version"} (get device "gallatinSoftwareManifest"))))

(defn devices-list-table-head []
  (dom/tr nil
          (dom/th nil (dom/input #js {:type "checkbox"}))
          (dom/th nil (dom/a nil "IMEI"))
          (dom/th nil (dom/a nil "Phone number"))
          (dom/th nil (dom/a nil "Device id"))
          (dom/th nil (dom/a nil "Device group"))
          (dom/th nil (dom/a nil "Last contact"))
          (dom/th nil (dom/a nil "Version"))))

(defn devices-list [data owner]
  (reify om/IRender
    (render [this]
      (dom/div nil
               (dom/a #js {:className "standardBtn btnAboveTable"} "Manage device groups")
               (dom/table #js {:className "dataTable" :id "surveyDataTable"}
                          (dom/thead nil
                                     (devices-list-table-head))
                          (apply dom/tbody nil
                                 (map devices-list-table-row (:devices data))))))))

(defn assignments-list [data owner]
  (reify om/IRender
    (render [this]
      (dom/h1 nil "Assignments list"))))

(defn manual-survey-transfer [data owner]
  (reify om/IRender
    (render [this]
      (dom/h1 nil "Manual survey transfer"))))
