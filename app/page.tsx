"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";

type Project = {
  name: string;
  type: string;
  year: string;
  summary: string;
  impact: string;
  tags: string[];
  link?: string;
};

const projects: Project[] = [
  {
    name: "Corporate Culture Monitor",
    type: "Employee analytics platform",
    year: "2026",
    summary: "Analysed thousands of employee reviews across corporate culture dimensions.",
    impact: "NLP pipeline, sentiment analysis, theme classification, Rio Tinto capstone.",
    tags: ["AI", "Data", "Next.js", "FastAPI"],
    link: "http://34-40-199-30.sslip.io",
  },
  {
    name: "Groveify",
    type: "AI productivity tab page",
    year: "2024",
    summary: "Generated isometric map assets from completed tasks.",
    impact: "DALL-E pipeline, draggable widgets, canvas performance.",
    tags: ["AI", "Canvas", "React", "Express"],
    link: "https://groveify.com",
  },
  {
    name: "Notangles",
    type: "UNSW timetabler",
    year: "2024-2025",
    summary: "Class planning for UNSW students.",
    impact: "Landing page, friends feature, Puppeteer course updates.",
    tags: ["UX", "React", "MongoDB", "Docker"],
    link: "https://notangles.devsoc.app",
  },
  {
    name: "TasteBuds",
    type: "Realtime voting app",
    year: "2025",
    summary: "Live restaurant voting for groups.",
    impact: "Lobby flow, vote logic, reactions, Socket.io sync.",
    tags: ["Realtime", "Next.js", "Socket.io", "Mobile"],
    link: "https://taste-buds.live",
  },
  {
    name: "TrueState AI Platform",
    type: "AI data platform",
    year: "2025-2026",
    summary: "Dataset exploration and LLM inference workflows.",
    impact: "React, FastAPI, Postgres, dataset tooling.",
    tags: ["AI", "Data", "FastAPI", "Postgres"],
  },
];

const timeline = [
  {
    role: "Software Engineer",
    place: "TrueState",
    date: "Sep 2025 - 2026",
    body: "React, TypeScript, FastAPI, PostgreSQL, Docker, Gemini API, OpenAI API.",
  },
  {
    role: "Casual Academic",
    place: "UNSW COMP2041",
    date: "May 2024 - Present",
    body: "Shell, Python, regular expressions, Unix tools, marking, support.",
  },
  {
    role: "Platforms Director",
    place: "CSESoc",
    date: "2026",
    body: "Platforms Director 2026. IT Director 2025. DevSoc Bridges developer.",
  },
];

const skillClusters = [
  {
    name: "Interfaces",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Material UI", "dnd-kit"],
  },
  {
    name: "Systems",
    skills: ["FastAPI", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker"],
  },
  {
    name: "AI + Tools",
    skills: ["OpenAI API", "Gemini API", "DALL-E", "Vim", "GitHub Actions", "Linux", "Tmux"],
  },
  {
    name: "Languages",
    skills: ["Python", "JavaScript", "C", "Java", "SQL", "Bash", "Rust", "RegEx"],
  },
];

const filters = ["All", "AI", "UX", "Realtime", "Data"] as const;
const navItems = [
  { label: "Work", href: "#work", target: "work" },
  { label: "Experience", href: "#experience", target: "experience" },
  { label: "Resume", href: "#resume", target: "resume" },
] as const;

const resumeExperience = [
  {
    title: "Software Engineer",
    place: "TrueState",
    location: "Sydney, NSW",
    date: "September 2025 - 2026",
    bullets: [
      "Designed and implemented full-stack features for a data-driven AI platform, building responsive UIs in React (TypeScript) and FastAPI backend services to support LLM inference pipelines.",
      "Developed interactive pipeline and dataset visualisation components, improving user task completion speed by upwards of 40% and enabling intuitive exploration of complex datasets.",
      "Engineered REST APIs and backend AI data processing pipelines, enabling efficient analysis and retrieval across datasets exceeding 10k rows while maintaining responsive performance.",
      "Collaborated in a small engineering team to ship production features end-to-end, contributing to weekly releases used by active internal and enterprise users/companies.",
    ],
    technologies: "React, TypeScript, FastAPI, PostgreSQL, Gemini API / OpenAI API, Docker",
  },
  {
    title: "Casual Academic - UNSW",
    place: "COMP2041 - Software Construction Tools & Techniques",
    location: "Sydney, NSW",
    date: "May 2024 - Present",
    bullets: [
      "Taught shell scripting, Python fundamentals, regular expressions, and Unix development tools.",
      "Supported hundreds of students by diagnosing complex programming issues and providing structured feedback.",
      "Handled assessment marking, teaching, and exam invigilation duties.",
    ],
  },
];

const resumeProjects = [
  {
    title: "Corporate Culture Monitor",
    subtitle: "Employee Analytics Platform",
    link: "34-40-199-30.sslip.io",
    date: "Jun. 2026 - Aug. 2026",
    bullets: [
      "Built a full-stack analytics platform that transformed 4,000+ employee reviews into actionable insights across 11 corporate culture dimensions as part of the capstone COMP3900 course in collaboration with Rio Tinto.",
      "Selected as one of 4 COMP3900 projects to be showcased at UNSW Open Day in 26T2.",
      "Engineered an NLP pipeline combining sentence embeddings, sentiment analysis, and hierarchical theme classification to automatically analyse and categorise employee feedback.",
    ],
    technologies: "Next.js, TypeScript, FastAPI, PostgreSQL, Docker, Gemini API, VADER",
  },
  {
    title: "Groveify",
    subtitle: "2D Gamified AI Productivity Dashboard",
    link: "groveify.com",
    date: "Feb. 2024 - May. 2024",
    bullets: [
      "Full-stack productivity web app leveraging generative AI to create dynamic isometric map assets linked to task completion and productivity.",
      "Developed an AI-powered image generation pipeline that transformed user tasks into dynamic in-game assets.",
      "Built interactive draggable widgets with dnd-kit and TailwindCSS to enhance user engagement.",
      "Optimised HTML Canvas rendering to handle hundreds of images while maintaining smooth performance.",
    ],
    technologies: "React, Vite, TypeScript, Express.js, TailWindCSS, DALL-E",
  },
  {
    title: "Notangles",
    subtitle: "Drag and Drop University Class Timetabler",
    link: "notangles.devsoc.app",
    date: "Feb. 2024 - Dec. 2025",
    bullets: [
      "Contributed to a platform used by 5000+ UNSW students each term.",
      "Led UI/UX improvements including redesigned landing page and improved workflows.",
      "Implemented a friends feature for cooperative timetabling.",
      "Automated course updates by scraping UNSW timetable data using Puppeteer.",
    ],
    technologies: "React, Material-UI, Git, MongoDB, Express, Docker",
  },
  {
    title: "TasteBuds",
    subtitle: "Real-Time Group Restaurant Finder",
    link: "taste-buds.live",
    date: "Apr. 2025",
    bullets: [
      "Built an interactive real-time voting app for group restaurant selection.",
      "Enabled live lobby participation with instant vote updates.",
      "Integrated Socket.io for real-time communication and optimised mobile responsiveness.",
      "Designed core voting logic and reaction display system.",
    ],
    technologies: "React, Next.js, Git, Socket.io, TailWindCSS",
  },
];

const skillRows = [
  ["Languages", "JavaScript/TypeScript, Python, C, Java, SQL (Postgres), HTML/CSS, Bash, RegEx, Rust"],
  ["Frameworks", "React, Node.js, TailWindCSS, JUnit, Material-UI, Express, Vite, Next.js, FastAPI"],
  ["Developer Tools", "Git, Linux, Docker, Vim, Tmux, Jira, Cursor, Codex, GitHub Actions"],
  ["CSESoc", "Platforms Director (2026), IT Director (2025), Culture Subcommittee (2023)"],
  ["DevSoc", "Bridges Developer (2025), Notangles Contributor (2024)"],
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [activeSection, setActiveSection] = useState("home");
  const [navItemsVisible, setNavItemsVisible] = useState(false);
  const shellRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const navLogoRef = useRef<HTMLSpanElement>(null);
  const heroBrandRef = useRef<HTMLSpanElement>(null);
  const handoffLogoRef = useRef<HTMLAnchorElement>(null);
  const navItemsVisibleRef = useRef(false);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.tags.includes(activeFilter));
  }, [activeFilter]);

  function chooseFilter(filter: (typeof filters)[number]) {
    setActiveFilter(filter);
    const nextProjects =
      filter === "All" ? projects : projects.filter((project) => project.tags.includes(filter));
    setActiveProject(nextProjects[0] ?? projects[0]);
  }

  function scrollToTarget(target: string) {
    const element = target === "home" ? document.body : document.getElementById(target);
    const nextTop =
      target === "home" ? 0 : (element?.getBoundingClientRect().top ?? 0) + window.scrollY;
    const endTop = Math.max(nextTop, 0);

    window.scrollTo({ top: endTop, behavior: "smooth" });

    window.history.replaceState(null, "", target === "home" ? window.location.pathname : `#${target}`);
    setActiveSection(target);
  }

  function scrollToSection(event: MouseEvent<HTMLAnchorElement>, target: string) {
    event.preventDefault();
    scrollToTarget(target);
  }

  useEffect(() => {
    let animationFrame = 0;

    function updateNavState() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const shell = shellRef.current;
        const handoffLogo = handoffLogoRef.current;
        const progress = Math.min(window.scrollY / 120, 1);
        const navLogoRect = navLogoRef.current?.getBoundingClientRect();
        const heroBrandRect = heroBrandRef.current?.getBoundingClientRect();

        let reveal = 0;

        if (navLogoRect && heroBrandRect && handoffLogo) {
          const travel = navLogoRect.height + heroBrandRect.height;
          const rawHandoff = (navLogoRect.bottom - heroBrandRect.top) / travel;
          const handoff = Math.min(Math.max(rawHandoff, 0), 1);
          const easedHandoff = handoff * handoff * (3 - 2 * handoff);
          const logoLeft = heroBrandRect.left + (navLogoRect.left - heroBrandRect.left) * easedHandoff;
          const logoTop = heroBrandRect.top + (navLogoRect.top - heroBrandRect.top) * easedHandoff;

          reveal = Math.min(Math.max((handoff - 0.35) / 0.65, 0), 1);
          handoffLogo.style.opacity = "1";
          handoffLogo.style.transform = `translate3d(${logoLeft}px, ${logoTop}px, 0)`;
        }

        shell?.style.setProperty("--nav-progress", String(progress));
        shell?.style.setProperty("--nav-reveal", String(reveal));
        shell?.style.setProperty("--hero-nav-handoff", String(Math.max(1 - reveal * 1.65, 0)));

        const nextNavItemsVisible = reveal > 0.08;
        if (navItemsVisibleRef.current !== nextNavItemsVisible) {
          navItemsVisibleRef.current = nextNavItemsVisible;
          setNavItemsVisible(nextNavItemsVisible);
        }
      });
    }

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
    window.addEventListener("resize", updateNavState);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateNavState);
      window.removeEventListener("resize", updateNavState);
    };
  }, []);

  useEffect(() => {
    const sectionIds = ["work", "experience", "resume"];

    function updateActiveSection() {
      if (window.scrollY < window.innerHeight * 0.5) {
        setActiveSection("home");
        return;
      }

      const currentSection =
        sectionIds
          .map((sectionId) => {
            const section = document.getElementById(sectionId);
            return {
              id: sectionId,
              distance: section ? Math.abs(section.getBoundingClientRect().top - 96) : Number.POSITIVE_INFINITY,
              top: section?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY,
            };
          })
          .filter((section) => section.top < window.innerHeight * 0.72)
          .sort((a, b) => a.distance - b.distance)[0]?.id ?? "home";

      setActiveSection(currentSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <main className="portfolio-shell" ref={shellRef}>
      <div className="grain" />
      <a
        className="handoff-logo"
        ref={handoffLogoRef}
        href="#home"
        onClick={(event) => scrollToSection(event, "home")}
        aria-label="dlyn.dev home"
      >
        dlyn<span>.dev</span>
        <i aria-hidden="true" />
      </a>
      <section className="hero-section" id="home" ref={heroSectionRef} aria-labelledby="hero-title">
        <nav
          className={`site-nav ${navItemsVisible ? "show-links" : ""}`}
          aria-label="Primary navigation"
        >
          <span
            className="nav-logo-slot site-logo-slot"
            ref={navLogoRef}
            aria-hidden="true"
          >
            dlyn<span>.dev</span>
            <i aria-hidden="true" />
          </span>
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.target}
                href={item.href}
                aria-current={activeSection === item.target ? "page" : undefined}
                onClick={(event) => scrollToSection(event, item.target)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="hero-layout">
          <div className="hero-content">
            <div className="hero-visual">
              <Image src="/hero-prism-loop.webp" alt="" fill priority sizes="min(82vw, 53rem)" />
              <div className="spectral-ring" aria-hidden="true" />
            </div>
            <p className="eyebrow">Dylan Zhang</p>
            <h1 id="hero-title">Software engineer.</h1>
            <p className="hero-copy">Interactive experiences, data interfaces, realtime apps.</p>
            <div className="hero-links" aria-label="Contact links">
              <a href="mailto:dylan.zhang15@gmail.com">dylan.zhang15@gmail.com</a>
              <a href="https://github.com/dlynz" target="_blank" rel="noreferrer">
                github.com/dlynz
              </a>
              <a
                href="https://linkedin.com/in/dylan-zhang-18a990262"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/dylan-zhang-18a990262
              </a>
            </div>
            <span
              className="hero-brand-slot site-logo-slot"
              ref={heroBrandRef}
              aria-hidden="true"
            >
              dlyn<span>.dev</span>
              <i aria-hidden="true" />
            </span>
          </div>
          <div
            className={`page-nav ${navItemsVisible ? "is-docked" : ""}`}
            aria-label="Page navigation"
          >
            <span>Index</span>
            {navItems.map((item) => (
              <a key={item.target} href={item.href} onClick={(event) => scrollToSection(event, item.target)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">Projects.</h2>
        </div>

        <div className="filter-row" role="tablist" aria-label="Project filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => chooseFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="project-lab">
          <div className="project-list" aria-label="Projects">
            {visibleProjects.map((project) => (
              <button
                key={project.name}
                type="button"
                className={activeProject.name === project.name ? "project-card active" : "project-card"}
                onClick={() => setActiveProject(project)}
              >
                <span>{project.year}</span>
                <strong>{project.name}</strong>
                <small>{project.type}</small>
              </button>
            ))}
          </div>

          <article className="project-detail">
            <Image
              className="project-caustic"
              src="/caustic-field.png"
              alt=""
              fill
              sizes="50vw"
              aria-hidden="true"
            />
            <div className="detail-orb" aria-hidden="true" />
            <p>{activeProject.type}</p>
            <h3>{activeProject.name}</h3>
            <p>{activeProject.summary}</p>
            <p>{activeProject.impact}</p>
            <div className="tag-row">
              {activeProject.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {activeProject.link ? (
              <a href={activeProject.link} target="_blank" rel="noreferrer">
                Open project
              </a>
            ) : null}
          </article>
        </div>
      </section>

      <section className="experience-section" id="experience" aria-labelledby="experience-title">
        <div className="section-heading">
          <p className="eyebrow">Where I&apos;ve worked</p>
          <h2 id="experience-title">Experience.</h2>
        </div>

        <div className="timeline">
          {timeline.map((item) => (
            <article key={`${item.role}-${item.place}`}>
              <span>{item.date}</span>
              <h3>{item.role}</h3>
              <p>{item.place}</p>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="skills-section" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">Skill spectrum</p>
          <h2 id="skills-title">Technologies.</h2>
        </div>
        <div className="skill-grid">
          {skillClusters.map((cluster, clusterIndex) => (
            <article key={cluster.name} style={{ "--cluster": clusterIndex } as CSSProperties}>
              <h3>{cluster.name}</h3>
              <div>
                {cluster.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section" id="resume" aria-labelledby="resume-title">
        <div className="section-heading">
          <p className="eyebrow">Full resume</p>
          <h2 id="resume-title">Background.</h2>
        </div>

        <div className="resume-document">
          <header className="resume-header">
            <div>
              <h3>Dylan Zhang</h3>
              <p>Software Engineer</p>
            </div>
            <address>
              <a href="mailto:dylan.zhang15@gmail.com">dylan.zhang15@gmail.com</a>
              <a href="https://linkedin.com/in/dylan-zhang-18a990262" target="_blank" rel="noreferrer">
                linkedin.com/in/dylan-zhang-18a990262
              </a>
              <a href="https://github.com/dlynz" target="_blank" rel="noreferrer">
                github.com/dlynz
              </a>
            </address>
          </header>

          <div className="resume-block">
            <h3>Education</h3>
            <article className="resume-item compact">
              <div>
                <h4>University of New South Wales</h4>
                <p>Bachelor of Computer Science</p>
              </div>
              <div>
                <span>Sydney, NSW</span>
                <span>Feb. 2023 - Oct. 2027</span>
              </div>
            </article>
            <article className="resume-item compact">
              <div>
                <h4>Normanhurst Boys High School</h4>
              </div>
              <div>
                <span>Sydney, NSW</span>
                <span>Feb. 2017 - Nov. 2022</span>
              </div>
            </article>
          </div>

          <div className="resume-block">
            <h3>Experience</h3>
            {resumeExperience.map((item) => (
              <article className="resume-item" key={`${item.title}-${item.place}`}>
                <div className="resume-item-head">
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.place}</p>
                  </div>
                  <div>
                    <span>{item.date}</span>
                    <span>{item.location}</span>
                  </div>
                </div>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {item.technologies ? <p className="tech-line">Technologies: {item.technologies}</p> : null}
              </article>
            ))}
          </div>

          <div className="resume-block">
            <h3>Projects</h3>
            {resumeProjects.map((item) => (
              <article className="resume-item" key={item.title}>
                <div className="resume-item-head">
                  <div>
                    <h4>
                      {item.title} <span>{item.subtitle}</span>
                    </h4>
                    <p>{item.link}</p>
                  </div>
                  <div>
                    <span>{item.date}</span>
                  </div>
                </div>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <p className="tech-line">Technologies: {item.technologies}</p>
              </article>
            ))}
          </div>

          <div className="resume-block">
            <h3>Technical Skills & Volunteering</h3>
            <div className="resume-skills">
              {skillRows.map(([label, value]) => (
                <p key={label}>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
