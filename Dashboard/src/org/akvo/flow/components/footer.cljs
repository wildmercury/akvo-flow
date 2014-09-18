(ns org.akvo.flow.components.footer
  (:require [om.core :as om :include-macros true]
            [sablono.core :as html :refer-macros (html)])
  (:require-macros [org.akvo.flow.locale :refer (t)]))

(defn footlink [attrs]
  (let [text (:title attrs)]
    [:li.footLink
     [:a attrs text]]))

(defn footer [data owner]
  (om/component
   (html
    [:div
     [:footer.floats-in.bottomPage {:role "contentinfo"}
      [:div.widthConstraint
       [:nav#footerNav.floatsIn.footItems
        [:ul
         (map footlink
              [{:href "/app" :title "Download FLOW app" :target "_blank"}
               {:href "https://github.com/akvo/akvo-flow/releases" :title "News and software updates" :target "_blank"}
               {:href "http://flowhelp.akvo.org" :title "Support" :target "_blank"}
               {:href "http://flow.readthedocs.org/en/latest/index.html" :title "Documentation and User Guides" :target "_blank"}
               {:href "http://akvo.org/help/akvo-policies-and-terms-2/akvo-flow-terms-of-use/" :title "Terms of Service" :target "_blank"}
               {:href "http://www.akvo.org" :title "akvo.org" :target "_blank"}
               {:href "/admin/logout" :title "Log out"}])]]]
      [:div
       [:small "_version_ - Copyright (c) 2014 akvo.org"]]]])))
