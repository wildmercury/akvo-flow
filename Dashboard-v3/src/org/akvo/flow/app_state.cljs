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

(defn index-users-by-id [users]
  (reduce-kv (fn [res k v]
               (assoc res k (first v)))
             {}
             (group-by #(get % "keyId") users)))

(GET "/rest/users"
     (merge default-ajax-config
            {:handler (fn [{:strs [users]}]
                        (swap! app-state
                               assoc
                               :users
                               (index-users-by-id users)))}))


(let [chan (dispatcher/register :new-user)]
  (go-loop []
    (let [[_ new-user] (<! chan)]
      (POST "/rest/users"
            (merge default-ajax-config
                   {:params {"user" new-user}
                    :handler (fn [response]
                               (let [user (get response "user")]
                                 (swap! app-state assoc-in [:users (get user "keyId")] user)))})))
    (recur)))

(let [chan (dispatcher/register :edit-user)]
  (go-loop []
    (let [[_ {:keys [user]}] (<! chan)
          user-id (get user "keyId")]
      (PUT (str "/rest/users/" user-id)
           (merge default-ajax-config
                  {:params {"user" user}
                   :handler (fn [response]
                              (swap! app-state assoc-in [:users user-id] user))})))
    (recur)))

(let [chan (dispatcher/register :delete-user)]
  (go-loop []
    (let [[_ user] (<! chan)
          user-id (get user "keyId")]
      (DELETE (str "/rest/users/" user-id)
              (merge default-ajax-config
                     {:handler (fn [response]
                                 (swap! app-state update-in [:users] dissoc user-id))})))
    (recur)))

(let [chan (dispatcher/register :new-access-key)]
  (go-loop []
    (let [[_ {:keys [user access-key]}] (<! chan)]
      (swap! app-state assoc-in [:users (get user "keyId") "accessKey"] access-key)
      (recur))))
