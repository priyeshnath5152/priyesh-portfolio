import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Typewriter from "typewriter-effect";
import { BsArrowDown, BsArrowUpRight } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import portrait from "../assets/hero-portrait.png";
import downloadResume from "../assets/Priyesh_Nath_Tiwari_Resume.pdf";
import profile from "../assets/profile.json";
import { Magnetic, ease } from "./Motion";

const useMumbaiTime = () => {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
};

// Counts up from 0 the first time it scrolls into view.
const Counter = ({ to }) => {
  const ref = useRef(null);
  const done = useRef(false);
  const run = () => {
    if (done.current || !ref.current) return;
    done.current = true;
    animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed();
      },
    });
  };
  return (
    <motion.span ref={ref} onViewportEnter={run} viewport={{ once: true }}>
      {to}
    </motion.span>
  );
};

const Line = ({ children, ready, delay, className, style }) => (
  <motion.span className={`hero__line ${className || ""}`} style={style}>
    <span className="word-mask">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: ready ? "0%" : "105%" }}
        transition={{ duration: 1.3, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  </motion.span>
);

const Home = ({ ready = true }) => {
  const ref = useRef(null);
  const time = useMumbaiTime();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const line1X = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const line2X = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Ember glow that follows the pointer
  const mx = useSpring(useMotionValue(50), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(35), { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(700px circle at ${mx}% ${my}%, rgba(255,107,61,0.16), transparent 60%)`;
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const enter = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1, ease, delay },
  });

  return (
    <section id="home" className="hero" ref={ref} onMouseMove={onMove}>
      <motion.div className="hero__glow" style={{ background: glow }} aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__inner container">
        <motion.div className="hero__meta mono" {...enter(0.6)}>
          <span className="hero__status">
            <i /> Available for freelance
          </span>
          <span className="hero__where">Mumbai, IN — {time} IST</span>
        </motion.div>

        <h1 className="hero__title" aria-label="Priyesh Nath">
          <Line ready={ready} delay={0.05} style={{ x: line1X }}>
            Priyesh
          </Line>
          <Line ready={ready} delay={0.18} className="hero__line--outline" style={{ x: line2X }}>
            Nath
          </Line>
        </h1>

        <motion.div
          className="hero__portrait"
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 1.6, ease, delay: 0.25 }}
        >
          <img src={portrait} alt="Priyesh Nath Tiwari" fetchpriority="high" />
        </motion.div>

        <motion.div className="hero__bottom" style={{ opacity: contentOpacity }}>
          <motion.div className="hero__intro" {...enter(0.75)}>
            <p className="hero__hello">Hi, I am Priyesh —</p>
            <div className="hero__role">
              <Typewriter
                options={{
                  strings: [
                    "NodeJs Developer",
                    "JavaScript Developer",
                    "Laravel Developer",
                    "PHP Developer",
                    "ReactJs Developer",
                    "Freelancer",
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: "|",
                  wrapperClassName: "typewriterpara",
                  cursorClassName: "typewriter-cursor",
                }}
              />
            </div>
            <p className="hero__blurb">
              Backend-focused full-stack developer crafting fast, scalable web apps, APIs and real-time systems.
            </p>
            <div className="hero__ctas">
              <Magnetic href={downloadResume} download="Priyesh_Nath_Tiwari_Resume.pdf" className="btn btn--primary">
                Download Resume <FiDownload />
              </Magnetic>
              <Magnetic href="#work" className="btn">
                Projects <BsArrowUpRight />
              </Magnetic>
            </div>
          </motion.div>

          <motion.div className="hero__stats" {...enter(0.9)}>
            <article className="stat">
              <p>
                +<Counter to={30} />
              </p>
              <span>Leetcode Problems</span>
            </article>
            <article className="stat">
              <p>
                +<Counter to={10} />
              </p>
              <span>Projects Done</span>
            </article>
            <a className="stat stat--contact" href={`mailto:${profile.email}`}>
              <p>Contact</p>
              <span>{profile.email}</span>
              <BsArrowUpRight />
            </a>
          </motion.div>
        </motion.div>

        <motion.a href="#about" className="hero__scroll mono" aria-label="Scroll to about" {...enter(1.1)}>
          <span className="hero__scroll-line" />
          Scroll <BsArrowDown />
        </motion.a>
      </div>
    </section>
  );
};

export default Home;
