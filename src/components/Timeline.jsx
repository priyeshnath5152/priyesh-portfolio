import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import profile from "../assets/profile.json";
import { Reveal, SectionHead, ease, trackPointer } from "./Motion";

const Job = ({ job, index }) => (
  <motion.article
    className={`xp__item ${job.current ? "is-current" : ""}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.9, ease }}
  >
    <span className="xp__dot" aria-hidden="true" />
    <div className="xp__meta">
      <span className="mono xp__num">{String(index + 1).padStart(2, "0")}</span>
      <p className="xp__period">{job.period}</p>
      <p className="xp__place">
        {job.company}
        <span>{job.location}</span>
      </p>
      {job.current && <span className="xp__now mono">Current role</span>}
    </div>
    <div className="xp__content">
      <h3>{job.role}</h3>
      <ul className="xp__points">
        {job.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <ul className="xp__stack">
        {job.stack.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>
    </div>
  </motion.article>
);

const Timeline = () => {
  const list = useRef(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="timeline" className="section experience">
      <div className="container">
        <SectionHead
          index="04"
          label="Experience"
          title="Where I've"
          accent="shipped."
          aside="Four companies and a freelance build — real-time platforms, trading systems and CRMs."
        />

        <div className="xp" ref={list}>
          <div className="xp__rail" aria-hidden="true">
            <motion.span style={{ scaleY: fill }} />
          </div>
          {profile.experience.map((job, i) => (
            <Job key={job.company} job={job} index={i} />
          ))}
        </div>

        <div className="edu">
          <SectionHead index="05" label="Education & credentials" title="Learning," accent="always." />

          <div className="edu__grid">
            {profile.education.map((e, i) => (
              <Reveal key={e.short} className="edu__card spotlight" delay={i * 0.1} onMouseMove={trackPointer}>
                <div className="edu__top">
                  <span className="edu__short">{e.short}</span>
                  <span className="mono">{e.period}</span>
                </div>
                <div>
                  <h3>{e.degree}</h3>
                  <p>{e.school}</p>
                </div>
                <div className="edu__score">
                  <span className="mono">CGPA</span>
                  <strong>
                    {e.cgpa}
                    <small>/10</small>
                  </strong>
                </div>
              </Reveal>
            ))}
          </div>

          <ul className="certs">
            {profile.certifications.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06} y={24}>
                <a href={c.url} target="_blank" rel="noreferrer" className="certs__link">
                  <span className="mono certs__type">{c.type}</span>
                  <span className="certs__title">{c.title}</span>
                  <span className="certs__issuer">{c.issuer}</span>
                  <BsArrowUpRight className="certs__arrow" />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
