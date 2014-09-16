(ns org.akvo.flow.ajax-helpers
  (:require [clojure.string :as s]
            [ajax.core :refer (json-format)]))

(def default-ajax-config
  {:error-handler #(.error js/console %)
   :format (json-format {:keywords? false})
   :response-format :json
   :keywords? false})

(defn query-str [params]
  (->> params
       (map (fn [[k v]] (str (name k) "=" v)))
       (s/join "&")
       (str "?")))
