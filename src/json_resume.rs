use serde::Deserialize;

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
pub struct JsonResume {
    pub basics: Basics,
    pub work: Vec<Work>,
    pub volunteer: Vec<Volunteer>,
    pub education: Vec<Education>,
    pub awards: Vec<Award>,
    pub certificates: Vec<Certificate>,
    pub publications: Vec<Publication>,
    pub skills: Vec<Skill>,
    pub languages: Vec<Language>,
    pub interests: Vec<Interest>,
    pub references: Vec<Reference>,
    pub projects: Vec<Project>,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Basics {
    pub name: String,
    pub label: String,
    pub image: String,
    pub email: String,
    pub phone: String,
    pub url: String,
    pub summary: String,
    // gitconnected doesn't actually provide this object
    pub location: Option<Location>,
    pub profiles: Vec<Profile>,
    // Not a part of the official json resume schema, but is used by gitconnected.
    pub region: String,
    // Not a part of the official json resume schema, but is used by gitconnected
    pub username: String,
    // Not a part of the official json resume schema, but is used by gitconnected
    pub headline: String,
    // Not a part of the official json resume schema, but is used by gitconnected
    pub years_of_experience: u8,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Location {
    pub address: String,
    pub postal_code: String,
    pub city: String,
    pub country_code: String,
    pub region: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
pub struct Profile {
    pub network: String,
    pub username: String,
    pub url: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Work {
    pub name: String,
    pub position: String,
    pub url: String,
    pub start_date: String,
    pub end_date: String,
    pub summary: String,
    pub highlights: Vec<String>,
    // Not a part of the official json resume schema, but is used by gitconnected
    pub location: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Volunteer {
    pub organization: String,
    pub position: String,
    pub url: String,
    pub start_date: String,
    pub end_date: String,
    pub summary: String,
    pub highlights: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Education {
    pub institution: String,
    pub url: String,
    pub area: String,
    pub study_type: String,
    pub start_date: String,
    pub end_date: String,
    pub score: String,
    pub courses: Vec<String>,
    // Not a part of the official json resume schema, but is used by gitconnected
    pub description: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
pub struct Award {
    pub title: String,
    pub date: String,
    pub awarder: String,
    pub summary: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
pub struct Certificate {
    pub name: String,
    pub date: String,
    pub issuer: String,
    pub url: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Publication {
    pub name: String,
    pub publisher: String,
    pub release_date: String,
    pub url: String,
    pub summary: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
pub struct Skill {
    pub name: String,
    pub level: String,
    pub keywords: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
pub struct Language {
    pub language: String,
    pub fluency: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
pub struct Interest {
    pub name: String,
    pub keywords: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
pub struct Reference {
    pub name: String,
    pub reference: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    pub name: String,
    pub description: String,
    pub highlights: Vec<String>,
    pub keywords: Vec<String>,
    pub start_date: String,
    pub end_date: String,
    pub url: String,
    pub roles: Vec<String>,
    pub entity: String,
    // Due to type being a protected keyword
    #[serde(rename = "type")]
    pub project_type: String,
    // Not a part of the official json resume schema, but is used by gitconnected
    pub languages: Vec<String>,
    // Not a part of the official json resume schema, but is used by gitconnected
    pub libraries: Vec<String>,
}
