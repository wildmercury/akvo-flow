(defproject akvo-flow-dashboard "0.1.0-SNAPSHOT"
  :description "Akvo FLOW Dashboard"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojurescript "0.0-2173"]
                 [org.clojure/core.async "0.1.278.0-76b25b-alpha"]
                 [jayq "2.4.0"]
                 [om "0.5.3"]
                 [sablono "0.2.6"]
                 [cljs-ajax "0.2.3"]]

  :plugins [[lein-cljsbuild "1.0.2"]]

  :source-paths ["src-cljs"]

  :cljsbuild {
    :builds [{:id "flow-dashboard" 
              :source-paths ["src-cljs"]
              :compiler { 
                :output-to "app.js"
                :output-dir "out"
                :optimizations :none
                :source-map "app.js.map"}}]})
