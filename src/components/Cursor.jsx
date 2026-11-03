import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [data-cursor], input, textarea, label";

// A soft ring that trails the pointer and grows over interactive elements.
// Only mounts on devices with a precise pointer (mouse / trackpad).
const Cursor = () => {
  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  const [state, setState] = useState({ hover: false, label: "", hidden: true });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setState((s) => (s.hidden ? { ...s, hidden: false } : s));
    };
    const over = (e) => {
      const el = e.target.closest?.(INTERACTIVE);
      const label = el?.dataset?.cursor || "";
      const hover = Boolean(el);
      setState((s) => (s.hover === hover && s.label === label ? s : { ...s, hover, label }));
    };
    const leave = () => setState((s) => ({ ...s, hidden: true }));

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const cls = ["cursor", state.hover && "is-hover", state.label && "has-label", state.hidden && "is-hidden"]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div className={cls} style={{ x: sx, y: sy }} aria-hidden="true">
      <div className="cursor__ring">
        <span>{state.label}</span>
      </div>
    </motion.div>
  );
};

export default Cursor;
