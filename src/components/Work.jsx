import React, { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { BsArrowUpRight, BsLock } from "react-icons/bs";
import data from "../assets/data.json";
import { SectionHead, ease } from "./Motion";

// Dates in data.json are dd/mm/yyyy — show the year only when it's valid.
const yearOf = (date = "") => {
  const y = date.split("/")[2];
  return y && y.length === 4 ? y : null;
};

const initials = (title) =>
  title
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const ProjectCard = ({ item, index }) => {
  const [imgOk, setImgOk] = useState(Boolean(item.imgSrc));
  const url = (item.url || "").trim();
  const hasLink = url && url !== "#";
  const year = yearOf(item.date);

  // gentle 3D tilt toward the pointer
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const Wrapper = hasLink ? "a" : "div";
  const linkProps = hasLink
    ? { href: url, target: "_blank", rel: "noreferrer", "data-cursor": "View" }
    : { "data-cursor": "Private" };

  return (
    <motion.article
      className="project"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease, delay: (index % 2) * 0.12 }}
    >
      <Wrapper className="project__link" {...linkProps}>
        <motion.div
          className={`project__media ${item.logo && imgOk ? "project__media--logo" : ""}`}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        >
          {imgOk ? (
            <img src={item.imgSrc} alt={item.title} loading="lazy" onError={() => setImgOk(false)} />
          ) : (
            <div className="project__fallback" aria-hidden="true">
              <span>{initials(item.title)}</span>
            </div>
          )}
          <div className="project__shade" />
          <span className="project__index mono">{String(index + 1).padStart(2, "0")}</span>
          {year && <span className="project__year mono">{year}</span>}
          <span className="project__view">{hasLink ? <BsArrowUpRight /> : <BsLock />}</span>
        </motion.div>

        <div className="project__body">
          <div className="project__row">
            <h3>{item.title}</h3>
            <span className="project__cta">
              {hasLink ? "View Demo" : "Private build"} {hasLink ? <BsArrowUpRight /> : null}
            </span>
          </div>
          <p>{item.description}</p>
        </div>
      </Wrapper>
    </motion.article>
  );
};

const Work = () => (
  <section id="work" className="section work">
    <div className="container">
      <SectionHead
        index="03"
        label={`Work — ${String(data.projects.length).padStart(2, "0")} projects`}
        title="Selected"
        accent="work."
        aside="Products I've engineered end to end — live events, fintech, insurance, commerce and more."
      />

      <div className="work__grid">
        {data.projects.map((item, i) => (
          <ProjectCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Work;
