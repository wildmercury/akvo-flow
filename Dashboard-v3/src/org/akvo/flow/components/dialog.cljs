(ns ^{:doc "Reusable dialog component"}
  org.akvo.flow.components.dialog
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [sablono.core :as html :refer-macros (html)]))

;; Interface
(comment
  
  (om/build dialog {:title "Delete User"
                    :text "Are you sure you want to delete this user?"
                    :buttons [{:caption "Yes"
                               :action #(do (delete user)
                                            (close dialog))}
                              {:caption "No"
                               :action (close dialog)}]})

  (om/build dialog {:title "Add user"
                    :text "Fill in the form below to create a new user"
                    :content form-component
                    :content-data form-component-data
                    :buttons [{:caption "Create"
                               :class "ok smallBtn"
                               :action (do (extract user)
                                           (close dialog))}
                              {:caption "Cancel"
                               :action (close dialog)}]})

)

(defn button-item [data owner]
  (let [{:keys [caption class action]} data]
    (om/component
     (html
      [:li [:a {:class class
                :on-click action}
            caption]]))))

(defn dialog [data owner]
  (let [{:keys [title text content buttons]} data]
    (om/component
     (html 
      [:div.overlay.display
       [:div.blanket]
       [:div.dialogWrap
        [:div.confirmDialog.dialog
         [:h2 title]
         [:p.dialogMsg text]
         (if content (om/build content {}) [:div])
         [:div.buttons.menuCentre
          (apply dom/ul nil
                 (om/build-all button-item buttons))]]]]))))
