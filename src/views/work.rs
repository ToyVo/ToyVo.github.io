use crate::MyState;
use dioxus::prelude::*;

#[component]
pub fn Work() -> Element {
    let resume = use_context::<MyState>().resume.cloned().unwrap_or_default();
    rsx! {
        div {
            h3 { class: "section-title", "Work" }
            ul {
                for work in resume.work {
                    li { class: "work-item",
                        h4 { class: "bold", "{work.position}" }
                        div {
                            // Should be a non breaking space
                            p { class: "d-inline-block bold", "{work.name} " }
                            span {
                                match (work.start.year, work.end.year) {
                                    (Some(start), Some(end)) => {
                                        format!("{} ⋅ {start} to {end}", work.location)
                                    },
                                    (Some(start), _) => {
                                        format!("{} ⋅ since {start}", work.location)
                                    },
                                    (_,_) => {
                                        work.location.to_string()
                                    }
                                }
                            }
                        }
                        p { class: "pre-wrap", "{work.summary}" }
                    }
                }
            }
        }
    }
}
