(ns org.akvo.flow.app-state
  (:require [org.akvo.flow.dispatcher :as dispatcher]
            [cljs.core.async :as async]
            [ajax.core :refer (ajax-request json-format POST PUT DELETE)])
  (:require-macros [cljs.core.async.macros :refer (go go-loop)]))

(def app-state (atom {:current-page {:path [:surveys]}}))

(ajax-request "/rest/devices" :get
              {:handler (fn [[ok response]]
                          (if ok
                            (swap! app-state 
                                   assoc 
                                   :devices 
                                   (get response "devices"))
                            (.error js/console (str response))))
               :format (json-format {:keywords? false})})

(ajax-request "/rest/users" :get
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
      (POST "/rest/users"
            {:params {"user" new-user}
             :handler (fn [response]
                        (let [user (get response "user")]
                          (swap! app-state update-in [:users] conj user)))
             :error-handler #(.error js/console %)
             :format (json-format {:keywords? false})
             :response-format :json
             :keywords? false}))
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
    (let [[_ {:keys [new-value old-value]}] (<! chan)
          idx (index-of old-value (:users @app-state))]
      (PUT (str "/rest/users/" (get new-value "keyId"))
           {:params {"user" new-value}
            :handler (fn [response]
                       (if (>= idx 0)
                         (swap! app-state assoc-in [:users idx] new-value)
                         (println "No such user " old-value)))
            :error-handler #(.error js/console %)
            :format (json-format {:keywords? false})
            :response-format :json
            :keywords? :false}))
    (recur)))


(defn remove-idx 
  "Remove item at index i from vector v"
  [v i]
  (vec (concat (subvec v 0 i)
               (subvec v (inc i)))))

(let [chan (dispatcher/register :delete-user)]
  (go-loop []
    (let [[_ user] (<! chan)
          idx (index-of user (:users @app-state))]
      (DELETE (str "/rest/users/" (get user "keyId"))
              {:handler (fn [response]
                          (if (>= idx 0)
                            (swap! app-state update-in [:users] remove-idx idx)
                            (println "No such user " user)))
               :error-handler #(.error js/console %)
               :format (json-format {:keywords? false})
               :response-format :json
               :keywords? false}))
    (recur)))
