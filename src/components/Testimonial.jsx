import React from "react";
import { motion } from "framer-motion";
import UserImg from "../assets/User.png";
import { SectionHead, ease, trackPointer } from "./Motion";

const testimonials = [
  {
    name: "RAZORSE",
    feedback:
      "From strategy to execution, Priyesh demonstrated unmatched professionalism and expertise. They truly understand our industry and our needs.",
    link: "https://razorse.com",
  },
  { name: "Riya Pawar", feedback: "Your backend development skill is amazing." },
  { name: "Rakesh", feedback: "Your frontend development skill is good." },
];

const Testimonial = () => (
  <section id="testimonial" className="section testimonials">
    <div className="container">
      <SectionHead index="06" label="Testimonial" title="Kind words from" accent="kind people." />

      <div className="testimonials__grid">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            className={`quote spotlight ${i === 0 ? "quote--feature" : ""}`}
            onMouseMove={trackPointer}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease, delay: i * 0.12 }}
          >
            <span className="quote__mark" aria-hidden="true">
              “
            </span>
            <blockquote>{t.feedback}</blockquote>
            <figcaption>
              <img src={UserImg} alt="" />
              <div>
                <strong>{t.name}</strong>
                {t.link ? (
                  <a href={t.link} target="_blank" rel="noreferrer" className="link-underline">
                    {t.link.replace("https://", "")}
                  </a>
                ) : (
                  <span>Client</span>
                )}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonial;
