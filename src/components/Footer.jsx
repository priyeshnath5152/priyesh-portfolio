import React from "react";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillYoutube, AiOutlineArrowUp } from "react-icons/ai";
import avatar from "../assets/hero-portrait.png";
import profile from "../assets/profile.json";
import { links } from "./Header";
import { Magnetic } from "./Motion";

const icons = { LinkedIn: AiFillLinkedin, GitHub: AiFillGithub, YouTube: AiFillYoutube, Instagram: AiFillInstagram };

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__top">
        <div className="footer__id">
          <img src={avatar} alt="Founder" loading="lazy" />
          <div>
            <h2>{profile.name}</h2>
            <p className="serif">{profile.tagline}</p>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="link-underline">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer__socials">
          {profile.socials.map((s) => {
            const Icon = icons[s.name];
            return (
              <Magnetic key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} strength={0.4}>
                <Icon />
              </Magnetic>
            );
          })}
        </div>
      </div>

      <div className="footer__word" aria-hidden="true">
        Priyesh
      </div>

      <div className="footer__bottom mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed & built in Mumbai</span>
        <a href="#home" className="footer__top-btn" aria-label="Back to top">
          Back to top <AiOutlineArrowUp />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
