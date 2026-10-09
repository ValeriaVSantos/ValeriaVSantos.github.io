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
        <div className="tag"><span className="tag-dot"></span>Computational Pragmatics · LLM Evaluation</div>
      </Reveal>
      <Reveal delay={1}>
        <h1>
          Valéria<br />
          Vieira dos <span className="italic accent">Santos</span>
        </h1>
      </Reveal>
      <Reveal delay={2}>
        <p className="lead">
          I build evidence-based evaluation frameworks for conversational AI, with a focus on
          {' '}<em style={{ fontStyle: 'italic', color: 'var(--violet)' }}>pragmatic uncertainty</em>,
          {' '}calibration, and Brazilian Portuguese.
        </p>
      </Reveal>
      <Reveal delay={3}>
        <div className="hero-meta">
          <div className="row"><span className="label">// role</span><span className="val">Ph.D. Candidate · Linguistics</span></div>
          <div className="row"><span className="label">// at</span><span className="val">UFSCar — Federal University of São Carlos</span></div>
          <div className="row"><span className="label">// advisor</span><span className="val">Prof. Dr. Oto Araújo Vale</span></div>
          <div className="row"><span className="label">// based</span><span className="val">São Paulo, BR · 22.0184° S, 47.8908° W</span></div>
        </div>
      </Reveal>
      <Reveal delay={4}>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#research">View research →</a>
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
          <div className="ps-label">// open question</div>
          <div className="ps-val">How do we know when an LLM is <span>bluffing?</span></div>
          <div className="ps-sub">— recurring thesis question</div>
        </div>
        <div className="portrait-badge">
          <span className="pulse"></span>
          <span>Open to AI evaluation, NLP &amp; research collaborations</span>
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
            When humans are uncertain, we hesitate. <em>Models, by contrast, are trained to sound confident.</em>
          </h2>
        </Reveal>
        <div className="about-grid" style={{ marginTop: 48 }}>
          <Reveal delay={1}>
            <div className="about-prose">
              <p>
                I'm a Ph.D. candidate in Linguistics at the <strong>Federal University of São Carlos (UFSCar)</strong>,
                advised by Prof. Dr. Oto Araújo Vale. My research examines whether language-model confidence
                reflects pragmatic uncertainty in spontaneous Brazilian Portuguese. I combine linguistic annotation,
                human evaluation, calibration analysis, and reproducible experiments.
              </p>
              <p>
                Before the Ph.D., I spent seven years working with conversational AI in industry. At
                <strong> Serasa Experian</strong>, I progressed from Digital Channels Manager to AI Projects
                Specialist II. I previously worked as a Conversational Intelligence Coordinator and Chapter Lead
                at <strong>Blip</strong>, and founded Langue, a chatbot and voicebot studio. In 2025, I completed a
                research internship at the University of West Bohemia.
              </p>
              <p>
                I care about bridging linguistic methodology with the messy reality of production NLP.
                The questions I find most interesting tend to emerge when a model is failing in front of a real user.
              </p>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="card interests">
              <h4>// research interests</h4>
              <div className="interest-list">
                {[
                ['LLM calibration & hallucination', 1.00],
                ['Computational pragmatics', 0.92],
                ['Prompt engineering & evaluation', 0.85],
                ['Conversational AI & dialogue systems', 0.78],
                ['Human evaluation & annotation', 0.88],
                ['NLP for Brazilian Portuguese', 0.95]].
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

// ---------- Research / Viz ----------
function Research() {
  return (
    <section id="research">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal>
              <div className="section-eyebrow">002 · Research focus</div>
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
          <div className="section-eyebrow">003 · News</div>
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
                {p.links && p.links.map(([label, href]) => <a key={label} href={href}>{label} ↗</a>)}
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
              <div className="section-eyebrow">004 · Publications</div>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="section-title">Papers, theses, <em>and a few essays.</em></h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <p className="section-sub">Filter by tag to narrow by topic — calibration sits between NLP and pragmatics.</p>
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
          <div className="section-eyebrow">005 · Talks & presentations</div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">Workshops & symposia.</h2>
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
          <a className="proj-link" href={p.link[1]} onClick={(e) => e.stopPropagation()}>
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
            <p className="section-sub">Click any card to expand the abstract. Most projects are tied to the dissertation in some way.</p>
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
  { when: 'Aug 2022 – Aug 2025', role: 'Digital Channels Manager → AI Projects Specialist II', org: '<em>Serasa Experian</em> · São Paulo', desc: 'Led conversational-AI and digital-transformation initiatives in a regulated financial-services environment, coordinating multidisciplinary teams and translating business, linguistic, and technical requirements into deployed solutions.' },
  { when: 'Aug 2021 – Aug 2022', role: 'Conversational Intelligence Coordinator · Chapter Lead', org: '<em>Blip</em> · Brazil', desc: 'Led multidisciplinary squads developing conversational systems and established shared practices for linguistic data curation, corpus validation, and NLP quality.' },
  { when: '2018 – 2021', role: 'Founder · Conversational AI Specialist', org: '<em>Langue</em> · São Carlos', desc: 'Built bespoke chatbot and voicebot solutions for SMEs end-to-end — from discovery to deployment and post-launch performance analysis.' },
  { when: 'Jan – Apr 2025', role: 'Visiting Research Intern', org: '<em>University of West Bohemia</em> · Czech Republic', desc: 'Conducted research on prompt engineering and LLM evaluation for specialized engineering tasks and co-authored a peer-reviewed conference paper.' }];

  const edu = [
  { when: '2025 – present', role: 'Ph.D. in Linguistics', org: '<em>Federal University of São Carlos (UFSCar)</em>', desc: 'Advisor: Prof. Dr. Oto Araújo do Vale. Dissertation on LLM calibration via pragmatic hesitation markers.' },
  { when: '2026', role: 'Specialization · Applied Statistics', org: '<em>Anhanguera</em>', desc: 'Quantitative methods and statistical modeling.' },
  { when: '2023 – 2025', role: 'M.A. in Linguistics', org: '<em>UFSCar</em>', desc: 'Advisor: Prof. Dr. Joceli Catarina Stassi-Sé. Thesis: <em>O papel da hesitação na interação humano-máquina: uma análise no atendimento via chat</em>.' },
  { when: '2020 – 2021', role: 'MBA · Business Management', org: '<em>University of São Paulo (USP/ESALQ)</em>', desc: 'Business management, finance, and quantitative methods.' },
  { when: '2015 – 2019', role: 'B.A. in Linguistics', org: '<em>UFSCar</em>', desc: 'Training in language analysis, semantics, pragmatics, and discourse.' }];


  return (
    <section id="experience">
      <div className="container">
        <Reveal>
          <div className="section-eyebrow">008 · Experience & education</div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">A path through <em>industry</em> and the academy.</h2>
        </Reveal>
        <div className="exp-grid" style={{ marginTop: 48 }}>
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
          <Reveal delay={2}>
            <div className="exp-col">
              <h4>// education</h4>
              <div className="exp-list">
                {edu.map((x, i) =>
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

// ---------- Contact ----------
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <div className="section-eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>009 · Get in touch</div>
        </Reveal>
        <Reveal delay={1}>
          <h2>Let's <em>talk</em> about uncertainty.</h2>
        </Reveal>
        <Reveal delay={2}>
          <p>If you're working on calibration, hallucination, conversational AI in Portuguese, or
            any of the corners where linguistics meets production NLP — I'd love to hear from you.</p>
        </Reveal>
        <Reveal delay={2}>
          <a className="contact-email" href="mailto:valeriavieira@estudante.ufscar.br">
            valeriavsantos93@gmail.com<span className="arrow">→</span>
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
          <a href="#research">research</a>
          <a href="#publications">publications</a>
          <a href="#projects">projects</a>
          <a href="#experience">cv</a>
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
        <span>© 2026 Valéria V. Santos</span>
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
        <Research />
        <News />
        <Publications />
        <Talks />
        <Projects />
        <LiveFeed />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </React.Fragment>);

}

export default App;
