(ns org.akvo.flow.ajax-helpers)

(def default-ajax-config
  {:error-handler #(.error js/console %)
   :format (json-format {:keywords? false})
   :response-format :json
   :keywords? false})
