(ns org.akvo.flow.app-state
  (:require [org.akvo.flow.dispatcher :as dispatcher]
            [org.akvo.flow.ajax-helpers :refer (default-ajax-config)]
            [cljs.core.async :as async]
            [ajax.core :refer (ajax-request json-format GET POST PUT DELETE)])
  (:require-macros [cljs.core.async.macros :refer (go go-loop)]))

(def app-state (atom {:current-page {:path [:surveys]}}))

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
