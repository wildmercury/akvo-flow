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

(defn index-of 
  "Returns the index of (the first) item in coll, or -1 if not present."
  [item coll]
  (or (->> coll
           (map-indexed (fn [i val] (if (= item val) i)))
           (remove nil?)
           first)
      -1))

(let [chan (dispatcher/register :edit-user)]
  (go-loop []
    (let [[_ {:keys [new-value old-value]}] (<! chan)]
      (let [idx (index-of old-value (:users @app-state))]
        (if (>= idx 0)
          (swap! app-state assoc-in [:users idx] new-value)
          (println "No such user " old-value))))
    (recur)))
