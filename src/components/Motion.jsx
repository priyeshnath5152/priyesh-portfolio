import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1];

// Fades and lifts its children into place once they scroll into view.
export const Reveal = ({ children, as = "div", delay = 0, y = 40, className, ...rest }) => {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

// Each word slides up from behind a mask. The outer span is what's observed —
// the words themselves start clipped by their mask, so they'd never count as "in view".
const wordVariants = {
  hidden: { y: "110%" },
  show: (d) => ({ y: "0%", transition: { duration: 1, ease, delay: d } }),
};

export const SplitWords = ({ text, className, delay = 0, stagger = 0.07 }) => {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="word-mask">
            <motion.span variants={wordVariants} custom={delay + i * stagger}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.span>
  );
};

export const SectionHead = ({ index, label, title, accent, aside }) => (
  <div className="section-head">
    <Reveal className="section-head__label mono" y={16}>
      <b>({index})</b> {label}
    </Reveal>
    <h2 className="section-head__title">
      <SplitWords text={title} /> {accent && <SplitWords className="serif" text={accent} delay={0.15} />}
    </h2>
    {aside && (
      <Reveal as="p" className="section-head__aside" delay={0.2}>
        {aside}
      </Reveal>
    )}
  </div>
);

// Pulls toward the pointer while hovered.
export const Magnetic = ({ children, as = "a", strength = 0.3, className, ...rest }) => {
  const ref = useRef(null);
  const spring = { stiffness: 220, damping: 16, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const Comp = motion[as];

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Comp ref={ref} className={className} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
    </Comp>
  );
};

// Words light up one by one as the paragraph scrolls through the viewport.
export const ScrollText = ({ text, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
};

// Sets --mx / --my so .spotlight cards can light up under the pointer.
export const trackPointer = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export const Marquee = ({ items, speed = 30, reverse = false, className = "" }) => (
  <div className={`marquee ${className}`}>
    <div
      className="marquee__track"
      style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      {[0, 1].map((k) => (
        <div className="marquee__group" key={k} aria-hidden={k === 1}>
          {items.map((t, i) => (
            <span className="marquee__item" key={i}>
              {t}
              <i className="marquee__star">✦</i>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
