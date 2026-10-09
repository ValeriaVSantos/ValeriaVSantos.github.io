// Main app sections: about, news, pubs, projects, experience, contact
import React, { useState as sUseState, useEffect as sUseEffect, useRef as sUseRef, useMemo as sUseMemo } from 'react'
import NeuralHero from './hero.jsx'
import { SITE } from './data.js'

// Scroll reveal hook
function useReveal() {
  const ref = sUseRef(null);
  const [visible, setVisible] = sUseState(false);
  sUseEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Immediate check — if already in viewport on mount, show right away.
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.95 && r.bottom > 0;
    };
    if (inView()) {setVisible(true);return;}

    // Fallback timer in case IO never fires.
    const fallback = setTimeout(() => setVisible(true), 600);

    let obs;
    if (typeof IntersectionObserver !== 'undefined') {
      obs = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {setVisible(true);obs.disconnect();clearTimeout(fallback);}
        }
      }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });
      obs.observe(el);
    }

    // Scroll listener as a second safety net.
    const onScroll = () => {if (inView()) {setVisible(true);window.removeEventListener('scroll', onScroll);clearTimeout(fallback);if (obs) obs.disconnect();}};
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {clearTimeout(fallback);if (obs) obs.disconnect();window.removeEventListener('scroll', onScroll);};
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  const d = delay ? ` reveal-delay-${delay}` : '';
  return <div ref={ref} className={`reveal${visible ? ' visible' : ''}${d} ${className}`}>{children}</div>;
}

// ---------- Hero text ----------
function HeroText() {
  return (
    <div className="hero-text">
      <Reveal>
        <div className="tag"><span className="tag-dot"></span>Conversational AI · Digital Transformation · LLM Evaluation</div>
      </Reveal>
      <Reveal delay={1}>
        <h1>
          Valéria<br />
          Vieira dos <span className="italic accent">Santos</span>
        </h1>
      </Reveal>
      <Reveal delay={2}>
        <p className="lead">
          I lead enterprise conversational AI and digital-channel transformation programmes — and research
          {' '}<em style={{ fontStyle: 'italic', color: 'var(--violet)' }}>how language models behave under uncertainty</em>.
        </p>
      </Reveal>
      <Reveal delay={3}>
        <div className="hero-meta">
          <div className="row"><span className="label">// industry</span><span className="val">AI Deployment · Implementation · Customer Experience</span></div>
          <div className="row"><span className="label">// research</span><span className="val">Ph.D. Candidate · Computational Linguistics · UFSCar</span></div>
          <div className="row"><span className="label">// scale</span><span className="val">Enterprise operations · 100K+ monthly conversations</span></div>
          <div className="row"><span className="label">// based</span><span className="val">São Paulo, BR · 22.0184° S, 47.8908° W</span></div>
          <div className="row"><span className="label">// mobility</span><span className="val">Available for international relocation from March 2027</span></div>
        </div>
      </Reveal>
      <Reveal delay={4}>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#impact">View industry impact →</a>
          <a className="btn btn-ghost" href="#research">View research</a>
          <a className="btn btn-ghost" href="https://drive.google.com/file/d/1OMydXgdJ0B8nZa3q806-DJ9Qxu6qW_z9/view?usp=sharing" target="_blank" rel="noopener">Download CV ↗</a>
          <a className="btn btn-ghost" href="mailto:valeriavieira@estudante.ufscar.br">Get in touch</a>
        </div>
      </Reveal>
    </div>);

}

function Portrait() {
  return (
    <Reveal delay={2}>
      <div className="portrait-wrap">
        <div className="portrait-frame"></div>
        <div className="portrait">
          <img src="assets/valeria.jpg" alt="Portrait of Valéria V. Santos" />
        </div>
        <div className="portrait-stat">
          <div className="ps-label">// enterprise scale</div>
          <div className="ps-val"><span>30K</span> service interactions</div>
          <div className="ps-sub">managed monthly at Serasa Experian</div>
        </div>
        <div className="portrait-badge">
          <span className="pulse"></span>
          <span>Open to international AI deployment &amp; implementation roles</span>
        </div>
      </div>
    </Reveal>);

}

// ---------- About ----------
function About() {
  return (
    <section id="about">
      <div className="container">
        <Reveal>
          <div className="section-eyebrow">001 · About</div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">
            I turn conversational AI into <em>adopted, measurable services</em> — then study where the models still fail.
          </h2>
        </Reveal>
        <div className="about-grid" style={{ marginTop: 48 }}>
          <Reveal delay={1}>
            <div className="about-prose">
              <p>
                I am a conversational AI and digital-transformation leader with seven years of experience across
                customer service, enterprise deployment, onboarding, adoption, and multidisciplinary team leadership.
                At <strong>Serasa Experian</strong>, I led an enterprise-wide shift from predominantly analogue service
                to 70% digital channels while managing approximately 30,000 monthly customer-service interactions.
              </p>
              <p>
                Previously, as a Conversational Intelligence Coordinator and Chapter Lead at <strong>Blip</strong>,
                I directly managed 42 conversation designers across 23 enterprise accounts and supported the delivery
                of approximately 50 conversational AI projects in one year. My work sits between customers, Business,
                Product, Engineering, and the people designing the conversations themselves.
              </p>
              <p>
                I am also a Ph.D. candidate in Linguistics at <strong>UFSCar</strong>, advised by Prof. Dr. Oto Araújo Vale.
                My research examines whether language-model confidence reflects pragmatic uncertainty in spontaneous
                Brazilian Portuguese. This combination lets me connect deployment outcomes with rigorous model evaluation.
              </p>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="card interests">
              <h4>// core expertise</h4>
              <div className="interest-list">
                {[
                ['AI deployment & implementation', 1.00],
                ['Digital-channel transformation', 0.97],
                ['Conversational AI strategy', 0.95],
                ['Customer adoption & experience', 0.90],
                ['Multidisciplinary team leadership', 0.92],
                ['LLM evaluation & pragmatics', 0.88]].
                map(([label, w]) =>
                <div key={label} className="interest-row">
                    <span>{label}</span>
                    <div className="meter"><div className="meter-fill" style={{ width: `${w * 100}%` }}></div></div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>);

}

// ---------- Industry impact ----------
function Impact() {
  const metrics = [
    ['30K', 'monthly service interactions', 'Enterprise customer-service operation at Serasa Experian.'],
    ['20 → 70%', 'digital-channel share', 'A 50-percentage-point shift from predominantly analogue service.'],
    ['≈30%', 'fewer human-assisted contacts', 'Reduction achieved through digital journeys and automation.'],
    ['4.5 / 5', 'customer satisfaction', 'CSAT maintained while the operation moved to digital channels.'],
    ['42', 'direct reports', 'Conversation designers led as Chapter Lead at Blip.'],
    ['23', 'enterprise client accounts', 'A portfolio spanning telecom, media, food, and consumer brands.'],
    ['100K+', 'monthly conversations', 'Scale of a major telecommunications conversational operation.'],
    ['≈50', 'conversational AI projects', 'Projects delivered across one year at Blip.'],
  ];

  return (
    <section id="impact">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><div className="section-eyebrow">002 · Industry impact</div></Reveal>
            <Reveal delay={1}><h2 className="section-title">AI deployment measured in <em>adoption</em>, not demos.</h2></Reveal>
          </div>
          <Reveal delay={2}>
            <p className="section-sub">Selected indicators from enterprise conversational AI, customer-service transformation, and team leadership.</p>
          </Reveal>
        </div>
        <div className="impact-grid">
          {metrics.map(([value, label, desc], index) => (
            <Reveal key={label} delay={Math.min(4, index % 4 + 1)}>
              <div className="card impact-card">
                <span className="impact-value">{value}</span>
                <span className="impact-label">{label}</span>
                <p>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Industry cases ----------
function IndustryCases() {
  return (
    <section id="industry-cases">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><div className="section-eyebrow">003 · Selected industry cases</div></Reveal>
            <Reveal delay={1}><h2 className="section-title">From service strategy to <em>production scale</em>.</h2></Reveal>
          </div>
          <Reveal delay={2}>
            <p className="section-sub">Two programmes that show how I connect customer needs, operational metrics, conversation design, and technical teams.</p>
          </Reveal>
        </div>
        <div className="case-grid">
          <Reveal delay={1}>
            <article className="card case-card">
              <div className="case-kicker">Serasa Experian · 2022–2025</div>
              <h3>Enterprise digital-channel transformation</h3>
              <p>Led the company-wide transition from predominantly analogue service to digital-first customer journeys across WhatsApp, chat, IVR, and the help centre.</p>
              <ul>
                <li>Managed approximately 30,000 monthly service interactions.</li>
                <li>Shifted digital-channel share from 20% to 70%.</li>
                <li>Reduced human-assisted contacts by approximately 30%.</li>
                <li>Maintained a 4.5/5 CSAT while leading a five-person team.</li>
                <li>Connected Business, Service, Product, and Engineering across Zendesk, Salesforce, API, and AI initiatives.</li>
              </ul>
            </article>
          </Reveal>
          <Reveal delay={2}>
            <article className="card case-card">
              <div className="case-kicker">Blip · 2021–2022</div>
              <h3>Conversational AI at enterprise scale</h3>
              <p>Directed conversation-design strategy and delivery across a large portfolio of enterprise customer operations.</p>
              <ul>
                <li>Directly managed a chapter of 42 conversation designers.</li>
                <li>Supported 23 enterprise client accounts.</li>
                <li>Helped deliver approximately 50 conversational AI projects in one year.</li>
                <li>Worked with an operation exceeding 100,000 monthly conversations.</li>
                <li>Tracked adoption, NPS, CES, CSAT, clicks, and social-media impact.</li>
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Research / Viz ----------
function Research() {
  return (
    <section id="research">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal>
              <div className="section-eyebrow">005 · Research focus</div>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="section-title">The model tracked <em>length</em> more than uncertainty.</h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <p className="section-sub">A published pilot study testing whether LLM confidence responds to the
              pragmatic signals people use when they are uncertain.</p>
          </Reveal>
        </div>
        <Reveal delay={1}>
          <div className="evidence-grid">
            <div className="card evidence-card">
              <span className="evidence-value">344</span>
              <span className="evidence-label">contrastive turns</span>
              <p>Faithful and sanitized transcripts from three Roda Viva interviews.</p>
            </div>
            <div className="card evidence-card">
              <span className="evidence-value">β = +14.47</span>
              <span className="evidence-label">turn length · p &lt; .001</span>
              <p>The strongest predictor of model confidence in the multivariate analysis.</p>
            </div>
            <div className="card evidence-card">
              <span className="evidence-value">−3.09 / −0.97</span>
              <span className="evidence-label">disfluencies / lexical hedges</span>
              <p>Smaller effects that did not reach statistical significance.</p>
            </div>
          </div>
          <div className="evidence-actions">
            <a className="btn btn-primary" href="https://aclanthology.org/2026.codi-1.5/" target="_blank" rel="noopener">Read the paper ↗</a>
            <a className="btn btn-ghost" href="https://github.com/ValeriaVSantos/uncertainty-signature-audit" target="_blank" rel="noopener">Inspect code and data ↗</a>
          </div>
        </Reveal>
      </div>
    </section>);

}

// ---------- News timeline ----------
function News() {
  return (
    <section id="news">
      <div className="container">
        <Reveal>
          <div className="section-eyebrow">009 · News</div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">Recent <em>signal</em>.</h2>
        </Reveal>
        <div className="news-list" style={{ marginTop: 36 }}>
          {SITE.news.map((n, i) =>
          <Reveal key={i} delay={Math.min(4, i % 4 + 1)}>
              <div className="news-item">
                <div className="news-date">{n.date}</div>
                <div className="news-text" dangerouslySetInnerHTML={{ __html: n.text }} />
                <div className="news-tag">{n.tag}</div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

// ---------- Publications (filterable) ----------
function FilteredList({ items, allTags }) {
  const [filter, setFilter] = sUseState('All');
  const counts = sUseMemo(() => {
    const c = { All: items.length };
    for (const t of allTags) c[t] = items.filter((it) => it.tags && it.tags.includes(t)).length;
    return c;
  }, [items, allTags]);

  const filtered = filter === 'All' ? items : items.filter((it) => it.tags && it.tags.includes(filter));

  return (
    <div>
      <div className="chips">
        {['All', ...allTags].map((t) =>
        <button key={t}
        className={'chip ' + (filter === t ? 'active' : '')}
        onClick={() => setFilter(t)}>
            #{t.toLowerCase()} <span className="count">{counts[t] || 0}</span>
          </button>
        )}
      </div>
      <div className="pub-list">
        {filtered.map((p, i) =>
        <Reveal key={p.title} delay={Math.min(4, i % 3 + 1)}>
            <div className="pub-row">
              <div className="pub-year">{p.year}</div>
              <div className="pub-body">
                <div className="pub-title">{p.title}</div>
                <div className="pub-meta" dangerouslySetInnerHTML={{ __html: p.meta }} />
                <div className="pub-tags">
                  {p.tags && p.tags.map((t) => <span key={t} className="pub-tag">#{t.toLowerCase()}</span>)}
                </div>
              </div>
              <div className="pub-links">
                {p.links && p.links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener">{label} ↗</a>)}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>);

}

function Publications() {
  return (
    <section id="publications">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal>
              <div className="section-eyebrow">007 · Publications</div>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="section-title">Peer-reviewed <em>work.</em></h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <p className="section-sub">Publications are linked to the official proceedings, journal page, or DOI.</p>
          </Reveal>
        </div>
        <FilteredList items={SITE.publications} allTags={SITE.pubTags.slice(1)} />
      </div>
    </section>);

}

function Talks() {
  return (
    <section id="talks" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <div className="section-eyebrow">008 · Talks & presentations</div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">Selected presentations.</h2>
        </Reveal>
        <div style={{ marginTop: 32 }}>
          <FilteredList items={SITE.talks} allTags={SITE.pubTags.slice(1)} />
        </div>
      </div>
    </section>);

}

// ---------- Projects ----------
function ProjectCard({ p, index }) {
  const [open, setOpen] = sUseState(index === 0);
  return (
    <div className={'card proj-card' + (open ? ' open' : '')} onClick={() => setOpen((o) => !o)}>
      <div className="proj-head">
        <div className="proj-icon">{p.icon}</div>
        <div className={'proj-status ' + (p.status === 'archive' ? 'archive' : '')}>
          {p.status === 'archive' ? 'Archived' : 'Active'}
        </div>
      </div>
      <div className="proj-title">{p.title}</div>
      <div className="proj-sub">{p.sub}</div>
      <div className="proj-desc">{p.desc}</div>
      <div className="proj-stack">
        {p.stack.map((s) => <span key={s}>{s}</span>)}
      </div>
      <div className="proj-expand">
        <div className="proj-expand-inner">
          <div className="proj-abstract">{p.abstract}</div>
          <a className="proj-link" href={p.link[1]} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
            <span>↗</span>{p.link[0]}
          </a>
        </div>
      </div>
      <div className="proj-toggle">{open ? 'collapse −' : 'expand +'}</div>
    </div>);

}

function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal>
              <div className="section-eyebrow">006 · Selected projects</div>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="section-title">Things I'm <em>building</em>.</h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <p className="section-sub">Two public, documented projects connecting linguistic analysis with model evaluation.</p>
          </Reveal>
        </div>
        <div className="proj-grid">
          {SITE.projects.map((p, i) =>
          <Reveal key={p.title} delay={Math.min(4, i % 2 + 1)}>
              <ProjectCard p={p} index={i} />
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

// ---------- Experience & Education ----------
function Experience() {
  const xp = [
  { when: 'Sep 2022 – Nov 2025', role: 'Digital Channels Manager → AI Projects Specialist II', org: '<em>Serasa Experian</em> · São Paulo', desc: 'Led an enterprise-wide digital-channel transformation covering approximately 30,000 monthly customer-service interactions. Increased the digital share from 20% to 70%, reduced human-assisted contacts by approximately 30%, maintained a 4.5/5 CSAT, and directly managed a five-person team connecting Business, Service, Product, and Engineering.' },
  { when: 'Sep 2021 – Sep 2022', role: 'Conversational Intelligence Coordinator · Chapter Lead', org: '<em>Blip</em> · Brazil', desc: 'Directly managed a chapter of 42 conversation designers serving 23 enterprise clients. Led conversational strategy and supported approximately 50 projects in one year, including a telecommunications operation with more than 100,000 monthly conversations.' },
  { when: '2018 – 2021', role: 'Founder · Conversational AI Specialist', org: '<em>Langue</em> · São Carlos', desc: 'Built bespoke chatbot and voicebot solutions for SMEs end-to-end — from discovery to deployment and post-launch performance analysis.' },
  { when: 'Jan – Apr 2025', role: 'Visiting Research Intern', org: '<em>University of West Bohemia</em> · Czech Republic', desc: 'Conducted research on prompt engineering and LLM evaluation for specialized engineering tasks and co-authored a peer-reviewed conference paper.' }];


  return (
    <section id="experience">
      <div className="container">
        <Reveal>
          <div className="section-eyebrow">004 · Professional experience</div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">Seven years between <em>customers</em>, teams, and AI systems.</h2>
        </Reveal>
        <div className="exp-grid exp-grid-single" style={{ marginTop: 48 }}>
          <Reveal delay={1}>
            <div className="exp-col">
              <h4>// experience</h4>
              <div className="exp-list">
                {xp.map((x, i) =>
                <div className="exp-item" key={i}>
                    <div className="exp-when">{x.when}</div>
                    <div className="exp-role">{x.role}</div>
                    <div className="exp-org" dangerouslySetInnerHTML={{ __html: x.org }} />
                    <div className="exp-desc" dangerouslySetInnerHTML={{ __html: x.desc }} />
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>);

}

function Education() {
  const edu = [
    { when: '2025 – present', role: 'Ph.D. in Linguistics', org: '<em>Federal University of São Carlos (UFSCar)</em>', desc: 'Advisor: Prof. Dr. Oto Araújo Vale. Dissertation on LLM calibration via pragmatic hesitation markers.' },
    { when: '2026', role: 'Specialization · Applied Statistics', org: '<em>Anhanguera</em>', desc: 'Quantitative methods and statistical modeling.' },
    { when: '2023 – 2025', role: 'M.A. in Linguistics', org: '<em>UFSCar</em>', desc: 'Thesis on hesitation in human–machine interaction in customer-service chat.' },
    { when: '2020 – 2021', role: 'MBA · Business Management', org: '<em>University of São Paulo (USP/ESALQ)</em>', desc: 'Business management, finance, and quantitative methods.' },
    { when: '2015 – 2019', role: 'B.A. in Linguistics', org: '<em>UFSCar</em>', desc: 'Training in language analysis, semantics, pragmatics, and discourse.' },
  ];

  return (
    <section id="education">
      <div className="container">
        <Reveal><div className="section-eyebrow">010 · Education</div></Reveal>
        <Reveal delay={1}><h2 className="section-title">Business, linguistics, and <em>quantitative methods</em>.</h2></Reveal>
        <div className="exp-grid exp-grid-single" style={{ marginTop: 48 }}>
          <Reveal delay={1}>
            <div className="exp-col">
              <h4>// education</h4>
              <div className="exp-list">
                {edu.map((x, i) => (
                  <div className="exp-item" key={i}>
                    <div className="exp-when">{x.when}</div>
                    <div className="exp-role">{x.role}</div>
                    <div className="exp-org" dangerouslySetInnerHTML={{ __html: x.org }} />
                    <div className="exp-desc" dangerouslySetInnerHTML={{ __html: x.desc }} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Contact ----------
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <div className="section-eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>011 · Get in touch</div>
        </Reveal>
        <Reveal delay={1}>
          <h2>Let's put conversational AI <em>to work</em>.</h2>
        </Reveal>
        <Reveal delay={2}>
          <p>I am open to international roles in AI deployment, implementation, customer success,
            conversational AI, and applied model evaluation, with relocation availability from March 2027.</p>
        </Reveal>
        <Reveal delay={2}>
          <a className="contact-email" href="mailto:valeriavieira@estudante.ufscar.br">
            valeriavieira@estudante.ufscar.br<span className="arrow">→</span>
          </a>
        </Reveal>
        <Reveal delay={3}>
          <div className="contact-socials">
            <a className="social" href="https://drive.google.com/file/d/1OMydXgdJ0B8nZa3q806-DJ9Qxu6qW_z9/view?usp=sharing" target="_blank" rel="noopener">CV ↗</a>
            <a className="social" href="https://orcid.org/0009-0006-0023-6736" target="_blank" rel="noopener">ORCID</a>
            <a className="social" href="https://scholar.google.com.br/citations?user=T23u398AAAAJ&amp;hl=pt-BR" target="_blank" rel="noopener">Google Scholar</a>
            <a className="social" href="https://github.com/ValeriaVSantos" target="_blank" rel="noopener">GitHub</a>
            <a className="social" href="https://www.linkedin.com/in/valeriavieira-/" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </Reveal>
      </div>
    </section>);

}

// ---------- Nav ----------
function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#top">
          <span className="brand-dot"></span>
          <b>vvs</b><span>/ valeriavsantos.com</span>
        </a>
        <div className="nav-links">
          <a href="#impact">impact</a>
          <a href="#experience">experience</a>
          <a href="#research">research</a>
          <a href="#projects">projects</a>
          <a href="https://github.com/ValeriaVSantos" target="_blank" rel="noopener">github ↗</a>
        </div>
        <a className="nav-cta" href="https://drive.google.com/file/d/1OMydXgdJ0B8nZa3q806-DJ9Qxu6qW_z9/view?usp=sharing" target="_blank" rel="noopener">CV ↗</a>
      </div>
    </nav>);

}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="footer container">
      <div className="signature">
        <span>© 2026 Valéria Vieira dos Santos</span>
        <span>—</span>
        <span>São Paulo · Brazil</span>
      </div>
      <div className="signature">
        <span>built with <em>care</em> &amp; <em>caveats</em></span>
      </div>
    </footer>);

}

// ---------- App ----------
function App() {
  return (
    <React.Fragment>
      <div className="bg-ambient"></div>
      <div className="bg-grid"></div>
      <div className="shell">
        <Nav />
        <div id="top" className="hero">
          <NeuralHero />
          <div className="container hero-inner">
            <HeroText />
            <Portrait />
          </div>
        </div>
        <About />
        <Impact />
        <IndustryCases />
        <Experience />
        <Research />
        <Projects />
        <Publications />
        <Talks />
        <News />
        <Education />
        <Contact />
        <Footer />
      </div>
    </React.Fragment>);

}

export default App;
