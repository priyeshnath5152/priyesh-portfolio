import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import profile from "../assets/profile.json";
import { Magnetic, ease } from "./Motion";

export const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "timeline", label: "Experience" },
  { id: "testimonial", label: "Testimonial" },
  { id: "contact", label: "Contact" },
];

// Tracks which section is in the middle of the viewport.
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
};

const ids = links.map((l) => l.id);

const Header = ({ menuOpen, setMenuOpen }) => {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > prev && v > 500);
  });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth > 1024 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [setMenuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-menu" : ""}`}
        animate={{ y: hidden && !menuOpen ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="site-header__inner">
          <a href="#home" className="brand" onClick={close} aria-label="Priyesh Nath — home">
            <span className="brand__mark">PN</span>
            <span className="brand__name">
              PriyeshNath<i>.</i>
            </span>
          </a>

          <nav className="nav-pill" aria-label="Primary">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={active === l.id ? "is-active" : ""}>
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="nav-pill__bg"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <Magnetic href={`mailto:${profile.email}`} className="btn btn--small site-header__email">
              Email <BsArrowUpRight />
            </Magnetic>
            <button
              className={`burger ${menuOpen ? "is-open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{menuOpen && <MobileMenu active={active} close={close} />}</AnimatePresence>
    </>
  );
};

const MobileMenu = ({ active, close }) => (
  <motion.div
    id="mobile-menu"
    className="mobile-menu"
    initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
    animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
    exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
  >
    <nav className="mobile-menu__links" aria-label="Mobile">
      {links.map((l, i) => (
        <div className="word-mask" key={l.id}>
          <motion.a
            href={`#${l.id}`}
            onClick={close}
            className={active === l.id ? "is-active" : ""}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            exit={{ y: "110%" }}
            transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.05 }}
          >
            <small className="mono">0{i + 1}</small>
            {l.label}
          </motion.a>
        </div>
      ))}
    </nav>

    <motion.div
      className="mobile-menu__foot"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.55 }}
    >
      <a href={`mailto:${profile.email}`} className="mobile-menu__email">
        {profile.email}
      </a>
      <div className="mobile-menu__socials">
        {profile.socials.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="link-underline">
            {s.name}
          </a>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default Header;
