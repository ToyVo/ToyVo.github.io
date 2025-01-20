use dioxus::prelude::*;

use components::Navbar;
use views::{Education, Me, Projects, Work};

mod components;
mod json_resume;
mod views;
use json_resume::Resume;

#[derive(Debug, Clone, Routable, PartialEq)]
enum Route {
    #[layout(Navbar)]
    #[route("/")]
    #[redirect("/:..segments", |segments: Vec<String>| Route::Me {})]
    Me {},
    #[route("/work")]
    Work {},
    #[route("/projects")]
    Projects {},
    #[route("/education")]
    Education {},
}

const FAVICON: Asset = asset!("/assets/favicon.ico");
const MAIN_CSS: Asset = asset!("/assets/styling/main.css");

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    // Build cool things ✌️
    let resume = use_resource(|| async move {
        reqwest::get("https://gitconnected.com/v1/portfolio/ToyVo")
            .await
            .unwrap()
            .json::<Resume>()
            .await
            .unwrap()
    });

    let state = use_context_provider(|| MyState { resume });

    rsx! {
        // Global app resources
        document::Link { rel: "icon", href: FAVICON }
        document::Link { rel: "stylesheet", href: MAIN_CSS }


        Router::<Route> {}
    }
}

#[derive(Clone, Copy, Debug)]
struct MyState {
    resume: Resource<Resume>,
}
