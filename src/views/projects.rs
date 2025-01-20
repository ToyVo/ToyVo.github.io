use crate::MyState;
use dioxus::prelude::*;

#[component]
pub fn Projects() -> Element {
    let resume = use_context::<MyState>().resume.cloned().unwrap_or_default();
    rsx! {
        div {
            h3 { class: "section-header", "Projects" }
            ul {
                for project in resume.projects {
                    li { class: "project-item",
                        h4 { class: "bold", "{project.name}" }
                        p { "{project.description}" }
                        div { class: "chip-wrapper justify-content-start",
                            for item in project.languages {
                                div {
                                    class: "chip",
                                    "{item}"
                                }
                            }
                            for item in project.libraries {
                                div {
                                    class: "chip",
                                    "{item}"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
