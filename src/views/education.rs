use crate::MyState;
use dioxus::prelude::*;

#[component]
pub fn Education() -> Element {
    let resume = use_context::<MyState>().resume.cloned().unwrap_or_default();
    rsx! {
        div {
            h3 {
                class: "section-title",
                "Education"
            }
            ul {
                for education in resume.education.iter() {
                    li { class:"education-item",
                        h4 { class:"bold", "{education.institution}" }
                        div {
                            p {
                                class: "bold d-inline-block",
                                "{education.study_type}, {education.area}"
                            }
                            if let (Some(start), Some(end)) = (education.start.year, education.end.year) {
                                span {
                                    " ⋅ {start} to {end}"
                                }
                            }
                        }
                        p { class:"pre-wrap", "{education.description}" }
                    }
                }
            }
        }
    }
}
