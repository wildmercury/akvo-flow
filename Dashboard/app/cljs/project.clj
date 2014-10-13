(defproject projects "0.1.0-SNAPSHOT"
  :description "FIXME: write this!"
  :url "http://example.com/FIXME"

  :dependencies [[org.clojure/clojure "1.7.0-alpha2"]
                 [org.clojure/clojurescript "0.0-2371"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [om "0.7.3"]
                 [cljs-ajax "0.3.3"]
                 [sablono "0.2.22"]]

  :plugins [[lein-cljsbuild "1.0.4-SNAPSHOT"]]

  :source-paths ["src"]

  :cljsbuild {
    :builds [{:id "projects"
              :source-paths ["src"]
              :compiler {
                :output-to "projects.js"
                :output-dir "out"
                :optimizations :none
                :source-map true}}]})
