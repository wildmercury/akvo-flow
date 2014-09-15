(ns org.akvo.flow.app-state
  (:require [org.akvo.flow.dispatcher :as dispatcher]
            [org.akvo.flow.ajax-helpers :refer (default-ajax-config)]
            [cljs.core.async :as async]
            [ajax.core :refer (ajax-request json-format GET POST PUT DELETE)])
  (:require-macros [cljs.core.async.macros :refer (go go-loop)]))

(def app-state (atom {:current-page {:path [:surveys]}
                      :current-locale :en}))

(let [chan (dispatcher/register :locale-changed)]
  (go-loop []
    (let [[_ new-locale] (<! chan)]
      (swap! app-state assoc :current-locale new-locale)
      (recur))))
