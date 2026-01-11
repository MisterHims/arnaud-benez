// src/data/experience.ts

// 1. On définit la structure type d'une expérience
export interface Experience {
  type: string;
  date: string;
  role: string;
  company: string;
  description: string;
}

// 2. On exporte les données
export const TIMELINE_DATA: Experience[] = [
  {
    type: "Collaboration",
    date: "September 2024",
    role: "Co-Founder",
    company: "CloudCastle",
    description: "Co-founded CloudCastle in 2024 to build Questix, an AI-powered TTRPG campaign manager. Designed the front-end (Next.js 13) and UX for a web app that helps DMs and players streamline scheduling, prep, and lore with smart tools, CI/CD pipelines, and seamless offline/online play."
  },
  {
    type: "Collaboration",
    date: "March 2024",
    role: "Contributor",
    company: "HeroUI",
    description: "Supported the development of HeroUI, a component library inspired by Material Design. Worked on cross-framework portability, debugging complex UI behaviors, and aligning accessibility with EU compliance standards."
  },
  {
    type: "Formation",
    date: "August 2024",
    role: "Trainee",
    company: "ContentSquare",
    description: "Completed training on ContentSquare’s digital experience analytics platform. Learned to analyze user behavior with tools like heatmaps, session replays, and zoning analysis to optimize UX and conversion."
  },
  {
    type: "Collaboration",
    date: "June 2023",
    role: "Contributor",
    company: "MajiTV",
    description: "Designed a custom pixel-art visual identity and provided branding and layout guidance to support the launch and growth of a new Twitch channel."
  },
  {
    type: "Formation",
    date: "February 2023",
    role: "Trainee",
    company: "Google Analytics",
    description: "Earned Google Analytics 4 certification. Gained proficiency in tracking user behavior, setting up events, and leveraging data insights to optimize digital experiences."
  },
  {
    type: "Collaboration",
    date: "October 2022",
    role: "Contributor",
    company: "Foundry VTT",
    description: "Collaborated on the development of several community-driven JavaScript modules and plugins, helping expand FoundryVTT’s ecosystem and enhancing the platform’s extensibility and user experience."
  },
  {
    type: "Job",
    date: "June 2018 => Now",
    role: "UI/UX Designer",
    company: "E.Leclerc",
    description: "Handling a broad range of digital initiatives across the E.Leclerc ecosystem, from UI/UX design and front-end development (React, Next.js) to modular e-commerce components, emailing, and user testing. Notably involved in the redesign of Voyages E.Leclerc, while also contributing to cross-functional projects impacting other platforms and teams. Focused on building scalable interfaces, optimizing user flows, and improving overall digital performance in collaboration with marketing, product, and tech stakeholders."
  },
  {
    type: "Job",
    date: "September 2015 => June 2018",
    role: "UI/UX Designer & Developer",
    company: "Freelance",
    description: "As a freelance web designer, I delivered a wide array of digital services tailored to diverse client needs. My projects ranged from photo retouching for e-commerce platforms like La Plateforme du Bâtiment, crafting engaging email campaigns for DogFidelity, to website design for professional photographers, and developing brand identities for non-profit organizations like Vocajob. My role involved direct client interaction to capture vision and requirements, implementing design solutions that enhance user engagement and visually communicate each brand's unique value proposition effectively."
  },
  {
    type: "Job",
    date: "September 2012 => June 2015",
    role: "WebDesigner",
    company: "Delaveine",
    description: "Managed and enhanced the online presence of Delaveine, a men's fashion retailer. Responsibilities included website maintenance and development, creating eye-catching ads and banners for promotions, photo retouching, and assembly for online product displays. Also handled the integration of email newsletters, ensuring consistent and effective communication with customers."
  },
  {
    type: "Formation",
    date: "October 2012 => June 2013",
    role: "Front-End Developer / Integrator",
    company: "Itecom Art Design",
    description: "Received specialized training as a Front-End Developer and Integrator at Itecom Art Design, honing skills in HTML, CSS, JavaScript, and responsive web design. Focused on optimizing website ergonomics, enhancing cross-device compatibility, and improving search engine optimization (SEO). Projects involved hands-on practice with coding, layout adjustments, and integrating user-centered design principles to boost site performance and accessibility."
  },
  {
    type: "Formation",
    date: "October 2011 => June 2012",
    role: "WebDesigner & Project Manager",
    company: "Itecom Art Design",
    description: "Completed a comprehensive training program focusing on web design and project management. Developed expertise in building engaging websites, capturing user interest through innovative design and intuitive navigation. Skilled in identifying project requirements and analyzing user needs to deliver tailored digital solutions. Enhanced proficiency in managing end-to-end project lifecycles, ensuring seamless execution and optimum user engagement."
  },
  {
    type: "Formation",
    date: "October 2011",
    role: "Graphic Designer & Layout Artist",
    company: "Itecom Art Design",
    description: "Studied visual identity and graphic design at Itecom Art Design, focusing on mastering essential skills in page layout and visual composition. Gained proficiency in Adobe Creative Suite, learning to create cohesive design models that effectively communicate across various media. Engaged in practical projects that emphasized both the creative and technical aspects of design."
  },
  {
    type: "Collaboration",
    date: "October 2011",
    role: "Vector Designer",
    company: "Zigoh",
    description: "Managed and enhanced the online presence of Delaveine, a men's fashion retailer. Responsibilities included website maintenance and development, creating eye-catching ads and banners for promotions, photo retouching, and assembly for online product displays. Also handled the integration of email newsletters, ensuring consistent and effective communication with customers."
  },
];