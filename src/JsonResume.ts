export interface Resume {
  /**
   * link to the version of the schema that can validate the resume
   * @format uri
   */
  $schema?: string;

  basics?: Basics;

  work?: Work[];

  volunteer?: Volunteer[];

  education?: Education[];

  /** specify any awards you have received throughout your professional career */
  awards?: Award[];

  /** specify any certificates you have received throughout your professional career */
  certificates?: Certificate[];

  /** specify your publications through your career */
  publications?: Publication[];

  /** list out your professional skill-set */
  skills?: Skill[];

  /** list any other languages you speak */
  languages?: Language[];

  interests?: Interest[];

  /** list references you have received */
  references?: Reference[];

  /** specify career projects */
  projects?: Project[];

  /** the schema version and any other tooling configuration lives here */
  meta?: Meta;
}

export interface Location {
  /** to add multiple address lines, use \n. for example, 1234 glücklichkeit straße\nhinterhaus 5. etage li. */
  address?: string;

  postalCode?: string;

  city?: string;

  /** code as per iso-3166-1 alpha-2, e.g. us, au, in */
  countryCode?: string;

  /** The general region where you live. Can be a US state, or a province, for instance. */
  region?: string;
}

export interface Profile {
  /** e.g. facebook or Twitter */
  network?: string;

  /** e.g. neutralthoughts */
  username?: string;

  /**
   * e.g. http://twitter.example.com/neutralthoughts
   * @format uri
   */
  url?: string;
}

export interface Basics {
  name?: string;

  /** e.g. web developer */
  label?: string;

  /** url (as per rfc 3986) to a image in jpeg or png format */
  image?: string;

  /**
   * e.g. thomas@gmail.com
   * @format email
   */
  email?: string;

  /** phone numbers are stored as strings so use any format you like, e.g. 712-117-2923 */
  phone?: string;

  /**
   * url (as per rfc 3986) to your website, e.g. personal homepage
   * @format uri
   */
  url?: string;

  /** write a short 2-3 sentence biography about yourself */
  summary?: string;

  location?: Location;

  /** specify any number of social networks that you participate in */
  profiles?: Profile[];

  /** Note: part of gitconnected schema, not JSON Resume */
  username?: string;

  /** Note: part of gitconnected schema, not JSON Resume */
  yearsOfExperience?: number;

  /** Note: part of gitconnected schema, not JSON Resume */
  headline?: string;
}

export interface Work {
  /** e.g. facebook */
  name?: string;

  /** e.g. menlo park, ca */
  location?: string;

  /** e.g. social media company */
  description?: string;

  /** e.g. software engineer */
  position?: string;

  /**
   * e.g. http://facebook.example.com
   * @format uri
   */
  url?: string;

  /** using iso 8601 */
  startDate?: string;

  /** using iso 8601 */
  endDate?: string;

  /** give an overview of your responsibilities at the company */
  summary?: string;

  /**
   * specify multiple accomplishments
   * e.g. increased profits by 20% from 2011-2012 through viral advertising
   */
  highlights?: string[];
}

export interface Volunteer {
  /** e.g. facebook */
  organization?: string;

  /** e.g. software engineer */
  position?: string;

  /**
   * e.g. http://facebook.example.com
   * @format uri
   */
  url?: string;

  /** using iso 8601 */
  startDate?: string;

  /** using iso 8601 */
  endDate?: string;

  /** give an overview of your responsibilities at the company */
  summary?: string;

  /**
   * specify accomplishments and achievements
   * e.g. increased profits by 20% from 2011-2012 through viral advertising
   */
  highlights?: string[];
}

export interface Education {
  /** e.g. massachusetts institute of technology */
  institution?: string;

  /**
   * e.g. http://facebook.example.com
   * @format uri
   */
  url?: string;

  /** e.g. arts */
  area?: string;

  /** e.g. bachelor */
  studyType?: string;

  /** using iso 8601 */
  startDate?: string;

  /** using iso 8601 */
  endDate?: string;

  /** grade point average, e.g. 3.67/4.0 */
  score?: string;

  /**
   * list notable courses/subjects
   * e.g. h1302 - introduction to american history
   */
  courses?: string[];

  /** Note: part of gitconnected schema, not JSON Resume */
  description?: string;
}

export interface Award {
  /** e.g. one of the 100 greatest minds of the century */
  title?: string;

  /** using iso 8601 */
  date?: string;

  /** e.g. time magazine */
  awarder?: string;

  /** e.g. received for my work with quantum physics */
  summary?: string;
}

export interface Certificate {
  /** e.g. certified kubernetes administrator */
  name?: string;

  /**
   * e.g. 1989-06-12
   * @format date
   */
  date?: string;

  /**
   * e.g. http://example.com
   * @format uri
   */
  url?: string;

  /** e.g. cncf */
  issuer?: string;
}

export interface Publication {
  /** e.g. the world wide web */
  name?: string;

  /** e.g. ieee, computer magazine */
  publisher?: string;

  /** using iso 8601 */
  releaseDate?: string;

  /**
   * e.g. http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html
   * @format uri
   */
  url?: string;

  /** short summary of publication. e.g. discussion of the world wide web, http, html. */
  summary?: string;
}

export interface Skill {
  /** e.g. web development */
  name?: string;

  /** e.g. master */
  level?: string;

  /**
   * list some keywords pertaining to this skill
   * e.g. html
   */
  keywords?: string[];
}

export interface Language {
  /** e.g. english, spanish */
  language?: string;

  /** e.g. fluent, beginner */
  fluency?: string;
}

export interface Interest {
  /** e.g. philosophy */
  name?: string;

  /** e.g. friedrich nietzsche */
  keywords?: string[];
}

export interface Reference {
  /** e.g. timothy cook */
  name?: string;

  /** e.g. joe blogs was a great employee, who turned up to work at least once a week. he exceeded my expectations when it came to doing nothing. */
  reference?: string;
}

export interface Project {
  /** e.g. the world wide web */
  name?: string;

  /** short summary of project. e.g. collated works of 2017. */
  description?: string;

  /**
   * specify multiple features
   * e.g. directs you close but not quite there
   */
  highlights?: string[];

  /**
   * specify special elements involved
   * e.g. angularjs
   */
  keywords?: string[];

  /** using iso 8601 */
  startDate?: string;

  /** using iso 8601 */
  endDate?: string;

  /**
   * e.g. http://www.computer.org/csdl/mags/co/1996/10/rx069-abs.html
   * @format uri
   */
  url?: string;

  /**
   * specify your role on this project or in company
   * e.g. team lead, speaker, writer
   */
  roles?: string[];

  /** specify the relevant company/entity affiliations e.g. 'greenpeace', 'corporationxyz' */
  entity?: string;

  /**  e.g. 'volunteering', 'presentation', 'talk', 'application', 'conference' */
  type?: string;

  /** Note: part of gitconnected schema, not JSON Resume */
  languages?: string[];

  /** Note: part of gitconnected schema, not JSON Resume */
  libraries?: string[];
}

export interface Meta {
  /**
   * url (as per rfc 3986) to latest version of this document
   * @format uri
   */
  canonical?: string;

  /** a version field which follows semver - e.g. v1.0.0 */
  version?: string;

  /** using iso 8601 with yyyy-mm-ddthh:mm:ss */
  lastModified?: string;
}
