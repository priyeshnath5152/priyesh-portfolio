import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { BsArrowUpRight, BsCheck2, BsCopy } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { db } from "../firebase";
import { notifyNewContact } from "../notify";
import profile from "../assets/profile.json";
import { Magnetic, Reveal, SplitWords, ease } from "./Motion";

const Field = ({ id, label, as = "input", value, onChange, ...rest }) => {
  const Tag = as;
  return (
    <div className={`field ${value ? "has-value" : ""}`}>
      <Tag id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder=" " {...rest} />
      <label htmlFor={id}>{label}</label>
      <span className="field__line" />
    </div>
  );
};

const Contact = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [copied, setCopied] = useState(false);

  // Same Firestore write as before: collection "contacts" with { name, contact, message }.
  const submitHandler = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    try {
      await addDoc(collection(db, "contacts"), { name, contact, message });
      notifyNewContact({ name, contact, message }); // phone alert, fire-and-forget
      setName("");
      setContact("");
      setMessage("");
      toast.success("Message Sent");
    } catch (error) {
      toast.error("Error");
      console.log(error);
    } finally {
      setDisableBtn(false);
    }
  };

  // Free click-to-chat: opens WhatsApp with the form contents pre-filled.
  const whatsappUrl = () => {
    const lines = ["Hi Priyesh, I found you through your portfolio."];
    if (name) lines.push(`Name: ${name}`);
    if (contact) lines.push(`Contact: ${contact}`);
    if (message) lines.push("", message);
    return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="section-head__label mono" y={16}>
          <b>(07)</b> Contact
        </Reveal>

        <h2 className="contact__title">
          <SplitWords text="Let's build" />
          <br />
          <SplitWords text="something" delay={0.1} /> <SplitWords className="serif" text="remarkable." delay={0.2} />
        </h2>

        <div className="contact__grid">
          <div className="contact__info">
            <Reveal className="contact__block">
              <span className="mono">Email</span>
              <div className="contact__email-row">
                <a href={`mailto:${profile.email}`} className="contact__email">
                  {profile.email}
                </a>
                <button type="button" className="contact__copy" onClick={copyEmail} aria-label="Copy email address">
                  {copied ? <BsCheck2 /> : <BsCopy />}
                </button>
              </div>
            </Reveal>

            <Reveal className="contact__block" delay={0.04}>
              <span className="mono">WhatsApp</span>
              <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="contact__wa-link">
                <FaWhatsapp /> {profile.whatsappDisplay}
              </a>
            </Reveal>

            <Reveal className="contact__block" delay={0.08}>
              <span className="mono">Based in</span>
              <p>{profile.location} — working with clients worldwide</p>
            </Reveal>

            <Reveal className="contact__block" delay={0.16}>
              <span className="mono">Elsewhere</span>
              <ul className="contact__socials">
                {profile.socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.name} <BsArrowUpRight />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <motion.form
            className="contact__form"
            onSubmit={submitHandler}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease }}
          >
            <div className="contact__form-head">
              <h3>Contact Me</h3>
              <span className="mono">
                <i /> Usually replies within a day
              </span>
            </div>
            <Field id="c-name" label="Your Name" value={name} onChange={setName} autoComplete="name" required />
            <Field
              id="c-contact"
              label="Your Contact (email or phone)"
              value={contact}
              onChange={setContact}
              autoComplete="email"
              required
            />
            <Field id="c-message" as="textarea" rows={4} label="Your Message" value={message} onChange={setMessage} required />
            <div className="contact__actions">
              <Magnetic as="button" strength={0.2} type="submit" className="btn btn--primary contact__submit" disabled={disableBtn}>
                {disableBtn ? "Sending…" : "Send"} <BsArrowUpRight />
              </Magnetic>
              <span className="contact__or mono">or</span>
              <Magnetic
                as="a"
                strength={0.2}
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn btn--whatsapp contact__submit"
              >
                <FaWhatsapp /> Send on WhatsApp
              </Magnetic>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
