(ns org.akvo.flow.ajax-helpers
  (:require [ajax.core :refer (json-format)]))

(def default-ajax-config
  {:error-handler #(.error js/console %)
   :format (json-format {:keywords? false})
   :response-format :json
   :keywords? false})
