import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Timeline from "./components/Timeline";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import { Marquee } from "./components/Motion";

import "./styles/app.scss";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(() => !prefersReducedMotion());

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.body.classList.toggle("no-scroll", loading || menuOpen);
  }, [loading, menuOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={() => setLoading(false)} />}</AnimatePresence>

      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Cursor />
      <div className="grain" aria-hidden="true" />

      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Home ready={!loading} />
        <Marquee
          className="band"
          speed={28}
          items={["Laravel", "PHP", "Node.js", "REST APIs", "Real-time Systems", "MySQL", "AWS", "React"]}
        />
        <About />
        <Services />
        <Work />
        <Timeline />
        <Testimonial />
        <Contact />
      </main>
      <Footer />

      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "toast",
          style: { background: "#17171e", color: "#efebe4", border: "1px solid rgba(255,255,255,.12)", borderRadius: "999px" },
          success: { iconTheme: { primary: "#ff6b3d", secondary: "#17171e" } },
        }}
      />
    </MotionConfig>
  );
}

export default App;
