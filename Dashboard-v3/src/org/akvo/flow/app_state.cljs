(ns org.akvo.flow.app-state
  (:require [ajax.core :refer (ajax-request json-format)]))

(def app-state (atom {:current-page :surveys}))

(defn handler [[ok response]]
  (if ok
    (swap! app-state assoc :devices (get response "devices"))
    (.error js/console (str response))))

(ajax-request "devices.json" :get
              {:handler handler
               :format (json-format {:keywords? false})})
