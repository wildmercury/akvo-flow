(ns org.akvo.flow.app-state
  (:require [org.akvo.flow.dispatcher :as dispatcher]
            [cljs.core.async :as async]
            [ajax.core :refer (ajax-request json-format GET POST PUT DELETE)])
  (:require-macros [cljs.core.async.macros :refer (go go-loop)]))

(def app-state (atom {:current-page {:path [:surveys]}}))

(def default-ajax-config
  {:error-handler #(.error js/console %)
   :format (json-format {:keywords? false})
   :response-format :json
   :keywords? false})

(GET "/rest/devices"
     (merge default-ajax-config
            {:handler (fn [response]
                        (swap! app-state
                               assoc
                               :devices
                               (get response "devices")))}))

(GET "/rest/users"
     (merge default-ajax-config
            {:handler (fn [{:strs [users]}]
                        (swap! app-state
                               assoc
                               :users
                               users))}))


(let [chan (dispatcher/register :new-user)]
  (go-loop []
    (let [[_ new-user] (<! chan)]
      (POST "/rest/users"
            (merge default-ajax-config
                   {:params {"user" new-user}
                    :handler (fn [response]
                               (let [user (get response "user")]
                                 (swap! app-state update-in [:users] conj user)))})))
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
           (merge default-ajax-config
                  {:params {"user" new-value}
                   :handler (fn [response]
                              (if (>= idx 0)
                                (swap! app-state assoc-in [:users idx] new-value)
                                (println "No such user " old-value)))})))
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
              (merge default-ajax-config
                     {:handler (fn [response]
                                 (if (>= idx 0)
                                   (swap! app-state update-in [:users] remove-idx idx)
                                   (println "No such user " user)))})))
    (recur)))

(let [chan (dispatcher/register :new-access-key)]
  (go-loop []
    (let [[_ {:keys [user access-key]}] (<! chan)
          idx (index-of user (:users @app-state))]
      (swap! app-state assoc-in [:users idx "accessKey"] access-key)
      (recur))))
