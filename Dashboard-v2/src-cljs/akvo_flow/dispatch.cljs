(ns akvo-flow.dispatch)

(defmulti body (fn [state owner] [(:tab state) (:subtab state)]))