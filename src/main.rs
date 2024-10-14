use gloo_net::http::Request;
use yew::prelude::*;
use yew_router::prelude::*;

use json_resume::JsonResume;
use yewdux::prelude::*;

mod json_resume;

#[derive(Clone, Routable, PartialEq)]
enum Route {
    #[not_found]
    #[at("/")]
    Me,
    #[at("/work")]
    Work,
    #[at("/projects")]
    Projects,
    #[at("/education")]
    Education,
}

fn switch(routes: Route) -> Html {
    match routes {
        Route::Me => html! { <Me/> },
        Route::Work => html! { <Work/> },
        Route::Projects => html! { <Projects/> },
        Route::Education => html! { <Education/> },
    }
}

#[derive(Debug, Default, Clone, PartialEq, Store)]
struct State {
    pub resume: JsonResume,
}

fn is_route_active(current_route: &Route, target_route: &Route) -> Option<String> {
    if current_route == target_route {
        Some("active".to_string())
    } else {
        None
    }
}

#[function_component(Sidebar)]
fn sidebar() -> Html {
    let route: Route = use_route().unwrap_or_default();
    html! {
        <div class="sidebar">
            <Link<Route> classes={classes!(is_route_active(&route, &Route::Me))} to={Route::Me}>{ "Me" }</Link<Route>>
            <Link<Route> classes={classes!(is_route_active(&route, &Route::Projects))} to={Route::Projects}>{ "Projects" }</Link<Route>>
            <Link<Route> classes={classes!(is_route_active(&route, &Route::Work))} to={Route::Work}>{ "Work" }</Link<Route>>
            <Link<Route> classes={classes!(is_route_active(&route, &Route::Education))} to={Route::Education}>{ "Education" }</Link<Route>>
        </div>
    }
}

#[function_component(UserHeader)]
fn user_header() -> Html {
    let (state, _dispatch) = use_store::<State>();
    let gitconnected_url = format!(
        "https://gitconnected.com/{}",
        state.resume.basics.username.to_string()
    );
    let gitconnected_resume_url = format!("{}/resume", gitconnected_url);
    html! {
        <div class="d-flex justify-content-space-between">
            <div class="d-flex">
                <img class="resume-img" src={state.resume.basics.image.to_string()} alt="resume"/>
                <div>
                    <h2>{state.resume.basics.name.to_string()}</h2>
                    <h4>
                        <a target="_blank" rel="noreferrer noopener"
                          href={gitconnected_url}>
                          {"@"}{state.resume.basics.username.to_string()}
                        </a>
                    </h4>
                    <p>{state.resume.basics.label.to_string()}</p>
                    <p>{"Coding in "}{state.resume.basics.region.to_string()}</p>
                    <p>{state.resume.basics.years_of_experience.to_string()}{" years of experience as a developer"}</p>
                    <p>{state.resume.basics.headline.to_string()}</p>
                </div>
            </div>
            <div class="d-flex align-items-start">
                <a class="view-resume-link"
                    href={gitconnected_resume_url}
                    target="_blank"
                    rel="noopener noreferrer">
                    {"View Résumé ➜"}
                </a>
            </div>
        </div>
    }
}

#[function_component(Me)]
fn me() -> Html {
    let (state, _dispatch) = use_store::<State>();
    html! {
        <>
            <div>
                <h3 class="section-title">{"About Me"}</h3>
                <p class="pre-wrap">{ state.resume.basics.summary.to_string() }</p>
            </div>
            <div>
                <h3 class="section-title">{"Skills"}</h3>
                <div class="chip-wrapper">
                    {state.resume.skills.iter().map(|skill| {
                        html! {<div class="chip" key={skill.name.to_string()}> {skill.name.to_string()} </div>}
                    }).collect::<Html>()}
                </div>
            </div>
            <div>
                <h3 class="section-title">{"Profiles"}</h3>
                <ul>
                    {state.resume.basics.profiles.iter().enumerate().map(|(i, profile)| {
                        html! {
                            <li class="profile-link" key={profile.network.to_string()}>
                                if i != 0 {{" | "}}
                                <a href={profile.url.to_string()} target="_blank" rel="noreferrer noopener">{profile.network.to_string()}</a>
                            </li>
                        }
                    }).collect::<Html>()}
                </ul>
            </div>
        </>
    }
}

#[function_component(Work)]
fn work() -> Html {
    let (state, _dispatch) = use_store::<State>();
    html! {
        <div>
            <h3 class="section-title">{"Work"}</h3>
            <ul>
                {state.resume.work.iter().enumerate().map(|(i, work)| {
                    /* if the date doesn't start with YYYY-, this won't work as intended and may
                    panic if the string is too short or index 4 is not on a UTF-8 character boundary */
                    let start_date = work.start_date.to_string();
                    let (start_year, _) = start_date.split_at(4);

                    let end_date = work.end_date.to_string();
                    let end_year = if end_date.is_empty() {
                       None
                    } else {
                        let (end_year, _) = end_date.split_at(4);
                        Some(end_year)
                    };
                    html! {
                        <li class="work-item" key={i}>
                            <h4 class="bold">{work.position.to_string()}</h4>
                            <div>
                                // Should be a non breaking space
                                <p class="d-inline-block bold">{work.name.to_string()}{" "}</p>
                                <span>{work.location.to_string()}</span>
                                <span>{" ⋅ "}</span>
                                <span>
                                    if let Some(end) = end_year {
                                        {start_year}{" to "}{end}
                                    } else {
                                        {"since "}{start_year}
                                    }
                                </span>
                            </div>
                            <p class="pre-wrap">{work.summary.to_string()}</p>
                        </li>
                    }
                }).collect::<Html>()}
            </ul>
        </div>
    }
}

#[function_component(Projects)]
fn projects() -> Html {
    let (state, _dispatch) = use_store::<State>();
    html! {
        <div>
            <h3 class="section-header">{"Projects"}</h3>
            <ul>
                {state.resume.projects.iter().enumerate().map(|(i, project)| {
                    html! {
                        <li class="project-item" key={i.to_string()}>
                            <h4 class="bold">{project.name.to_string()}</h4>
                            <p>{project.description.to_string()}</p>
                            <div class="chip-wrapper justify-content-start">
                                {project.languages.iter().map(|item| {
                                    html ! {<div class="chip" key={item.to_string()} > {item} </div>}
                                }).collect::<Html>()}
                                {project.libraries.iter().map(|item| {
                                    html ! {<div class="chip" key={item.to_string()} > {item} </div>}
                                }).collect::<Html>()}
                            </div>
                        </li>
                    }
                }).collect::<Html>()}
            </ul>
        </div>
    }
}

#[function_component(Education)]
fn education() -> Html {
    let (state, _dispatch) = use_store::<State>();
    html! {
        <div>
            <h3 class="section-title">{"Education"}</h3>
            <ul>
                {state.resume.education.iter().enumerate().map(|(i, education)| {
                    let start_date = education.start_date.to_string();
                    let end_date = education.end_date.to_string();
                    /* if the date doesn't start with YYYY-, this won't work as intended and may
                    panic if the string is too short or index 4 is not on a UTF-8 character boundary */
                    let (start_year, _) = start_date.split_at(4);
                    let (end_year, _) = end_date.split_at(4);
                    html! {
                        <li class="education-item" key={i.to_string()}>
                            <h4 class="bold">{education.institution.to_string()}</h4>
                            <div>
                                <p class="bold d-inline-block">
                                    {education.study_type.to_string()}{", "}{education.area.to_string()}
                                </p>
                                <span>{" ⋅ "}</span>
                                <span>
                                    {start_year}{" to "}{end_year}
                                </span>
                            </div>
                            <p class="pre-wrap">{str::replace(&education.description, "\n\n", "\n")}</p>
                        </li>
                    }
                }).collect::<Html>()}
            </ul>
        </div>
    }
}

#[function_component(App)]
fn app() -> Html {
    let (_state, dispatch) = use_store::<State>();
    {
        use_effect_with(
            (),
            move |_| {
                wasm_bindgen_futures::spawn_local(async move {
                    let fetched_resume: JsonResume =
                        Request::get("https://gitconnected.com/v1/portfolio/ToyVo")
                            .send()
                            .await
                            .unwrap()
                            .json()
                            .await
                            .unwrap();
                    dispatch.set(State {
                        resume: fetched_resume,
                    });
                });
                || ()
            },
        );
    }
    html! {
        <BrowserRouter>
            <div class="d-flex">
                <Sidebar/>
                <div class="p2 flex-grow-1">
                    <UserHeader/>
                    <Switch<Route> render={switch} />
                </div>
            </div>
        </BrowserRouter>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
