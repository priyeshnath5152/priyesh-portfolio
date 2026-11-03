import React, { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";

const Preloader = ({ onDone }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer;
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        timer = setTimeout(onDone, 250);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <div className="preloader__top mono">
        <span>Portfolio ©{new Date().getFullYear()}</span>
        <span>Mumbai, IN</span>
      </div>
      <div className="preloader__bottom">
        <motion.div
          className="preloader__name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Priyesh Nath
          <em>Tiwari</em>
        </motion.div>
        <div className="preloader__count">{count}</div>
      </div>
      <div className="preloader__bar">
        <span style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </motion.div>
  );
};

export default Preloader;
