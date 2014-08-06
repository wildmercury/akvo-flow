(ns org.akvo.flow.app-state
  (:require [ajax.core :refer (ajax-request json-format)]))

(def app-state (atom {:current-page :surveys}))

(ajax-request "devices.json" :get
              {:handler (fn [[ok response]]
                          (if ok
                            (swap! app-state 
                                   assoc 
                                   :devices 
                                   (get response "devices"))
                            (.error js/console (str response))))
               :format (json-format {:keywords? false})})

(ajax-request "users.json" :get
              {:handler (fn [[ok response]]
                          (if ok
                            (swap! app-state 
                                   assoc 
                                   :users 
                                   (get response "users"))
                            (.error js/console (str response))))
               :format (json-format {:keywords? false})})
