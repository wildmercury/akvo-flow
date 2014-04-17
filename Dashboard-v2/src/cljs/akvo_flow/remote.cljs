(ns akvo-flow.remote
  (:require  
    [ajax.core :refer [GET POST]]))

(defn handler [response]
    (print response)
    (print (:users response)))

(defn error-handler [{:keys [status status-text]}]
  (.log js/console (str "something bad happened: " status " " status-text)))

(GET "http://localhost:8888/rest/users" {:handler handler
               :error-handler error-handler
               :response-format :json
               :keywords? true})