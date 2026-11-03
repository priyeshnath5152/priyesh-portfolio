import React from "react";
import { motion } from "framer-motion";
import { FaAws, FaDocker, FaLaravel, FaNodeJs, FaPhp, FaProjectDiagram, FaReact } from "react-icons/fa";
import { SiApachekafka, SiJavascript, SiMysql, SiPostgresql, SiRedis } from "react-icons/si";
import profile from "../assets/profile.json";
import { SectionHead, ease, trackPointer } from "./Motion";

const skills = [
  { name: "Node.js", icon: FaNodeJs, tag: "Backend", note: "Express.js · REST · JWT auth", brand: "#6cc24a", wide: true },
  { name: "Laravel", icon: FaLaravel, tag: "Backend", brand: "#ff2d20" },
  { name: "PHP", icon: FaPhp, tag: "Language", brand: "#8892bf" },
  { name: "React.js", icon: FaReact, tag: "Frontend", note: "React · jQuery · Ajax · Bootstrap", brand: "#61dafb", wide: true },
  { name: "JavaScript", icon: SiJavascript, tag: "Language", brand: "#f7df1e" },
  { name: "PostgreSQL", icon: SiPostgresql, tag: "Database", brand: "#699eca" },
  { name: "MySQL", icon: SiMysql, tag: "Database", brand: "#5d9bd5" },
  { name: "Redis", icon: SiRedis, tag: "Caching", brand: "#ff4438" },
  { name: "AWS", icon: FaAws, tag: "Cloud", note: "Lambda · EC2 · S3", brand: "#ff9900", wide: true },
  { name: "Docker", icon: FaDocker, tag: "DevOps", brand: "#2496ed" },
  { name: "Kafka", icon: SiApachekafka, tag: "Streaming", brand: "#e8e6e3" },
  {
    name: "System Design",
    icon: FaProjectDiagram,
    tag: "Architecture",
    note: "Scalable, real-time backend architecture",
    brand: "#ff6b3d",
    wide: true,
  },
];

const tile = (i) => ({
  initial: { opacity: 0, y: 50, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, ease, delay: (i % 4) * 0.08 },
});

const Services = () => (
  <section id="services" className="section skills">
    <div className="container">
      <SectionHead
        index="02"
        label="Skills"
        title="The toolkit"
        accent="I build with."
        aside="Backend first, full-stack by nature — from database design and APIs to the interface on top."
      />

      <div className="bento">
        <motion.div className="bento__tile bento__tile--exp spotlight" onMouseMove={trackPointer} {...tile(0)}>
          <span className="mono">Since 2021</span>
          <div>
            <h3>
              4<em>+</em>
            </h3>
            <p>Years Experience</p>
          </div>
          <ul className="bento__mini">
            <li>
              <b>4</b> companies
            </li>
            <li>
              <b>10+</b> projects
            </li>
            <li>
              <b>5k</b> concurrent users
            </li>
          </ul>
        </motion.div>

        {skills.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.name}
              className={`bento__tile spotlight ${s.wide ? "bento__tile--wide" : ""}`}
              style={{ "--brand": s.brand }}
              onMouseMove={trackPointer}
              {...tile(i + 1)}
            >
              <div className="bento__top">
                <span className="bento__icon">
                  <Icon />
                </span>
                <span className="mono bento__tag">{s.tag}</span>
              </div>
              <div>
                <h4>{s.name}</h4>
                {s.note && <p>{s.note}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="stack">
        {profile.skillGroups.map((g, i) => (
          <motion.div
            className="stack__group"
            key={g.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease, delay: i * 0.07 }}
          >
            <h5 className="mono">{g.title}</h5>
            <ul>
              {g.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
