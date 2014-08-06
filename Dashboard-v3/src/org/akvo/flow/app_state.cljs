(ns org.akvo.flow.app-state
  (:require [org.akvo.flow.dispatcher :as dispatcher]
            [cljs.core.async :as async]
            [ajax.core :refer (ajax-request json-format)])
  (:require-macros [cljs.core.async.macros :refer (go go-loop)]))

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


(let [chan (dispatcher/register :new-user)]
  (go-loop []
    (let [[_ new-user] (<! chan)]
      (swap! app-state update-in [:users] conj new-user))
    (recur)))
