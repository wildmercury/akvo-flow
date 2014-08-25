(defproject dashboard "0.1.0-SNAPSHOT"
  :description "Dashboard for Akvo FLOW"
  :url "http://akvo.org/products/akvoflow/"

  :dependencies [[org.clojure/clojure "1.7.0-alpha1"]
                 [org.clojure/clojurescript "0.0-2311"]
                 [org.clojure/core.async "0.1.319.0-6b1aca-alpha"]
                 [om "0.7.1"]
                 [secretary "1.2.0"]
                 [sablono "0.2.21"]
                 [cljs-ajax "0.2.6"]]

  :plugins [[lein-cljsbuild "1.0.4-SNAPSHOT"]]

  :source-paths ["src"]

  :cljsbuild {
    :builds [{:id "dashboard"
              :source-paths ["src"]
              :notify-command ["./postcompile.sh"]
              :compiler {
                :output-to "dashboard.js"
                :output-dir "out"
                :optimizations :none
                :source-map true}}]})
