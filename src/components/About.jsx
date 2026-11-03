import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import photo from "../assets/about-portrait.jpg";
import downloadResume from "../assets/Priyesh_Nath_Tiwari_Resume.pdf";
import profile from "../assets/profile.json";
import { Magnetic, Reveal, ScrollText, SectionHead, ease } from "./Motion";

const facts = [
  { k: "Based in", v: profile.location },
  { k: "Experience", v: "4+ years" },
  { k: "Education", v: "MCA, University of Mumbai" },
  { k: "Speaks", v: profile.languages.join(" · ") },
  { k: "Off-screen", v: profile.hobbies.join(" & ") },
];

const About = () => {
  const media = useRef(null);
  const { scrollYProgress } = useScroll({ target: media, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHead index="01" label="About me" title="Engineering the" accent="invisible layer." />

        <div className="about__grid">
          {/* observe the wrapper: the frame starts fully clipped, so it can't trigger itself */}
          <motion.div
            className="about__media"
            ref={media}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="about__frame"
              variants={{
                hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.4, ease } },
              }}
            >
              <motion.img src={photo} alt="Priyesh Nath Tiwari" loading="lazy" style={{ y: imgY }} />
            </motion.div>

            <div className="about__badge" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <text>
                  <textPath href="#badge-circle">BACKEND · FULL-STACK · DEVELOPER · </textPath>
                </text>
              </svg>
              <span>✦</span>
            </div>

            <p className="about__caption mono">
              <span>Mumbai, IN</span>
              <span>Shipping since 2021</span>
            </p>
          </motion.div>

          <div className="about__content">
            <ScrollText className="about__statement" text={profile.summary} />

            <Reveal as="p" className="about__lead">
              {profile.intro}
            </Reveal>

            <Reveal as="blockquote" className="about__quote" delay={0.1}>
              <span className="serif">“{profile.tagline}”</span>
            </Reveal>

            <dl className="about__facts">
              {facts.map((f, i) => (
                <Reveal key={f.k} className="about__fact" delay={i * 0.06} y={20}>
                  <dt className="mono">{f.k}</dt>
                  <dd>{f.v}</dd>
                </Reveal>
              ))}
            </dl>

            <Reveal className="about__cta" delay={0.1}>
              <Magnetic href={downloadResume} download="Priyesh_Nath_Tiwari_Resume.pdf" className="btn btn--primary">
                Download Resume <FiDownload />
              </Magnetic>
              <a href="#contact" className="link-underline">
                Let's talk <BsArrowUpRight />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
