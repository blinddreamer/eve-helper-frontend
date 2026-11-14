"use client";

import { motion } from "framer-motion";

// Short opacity-only fade on page entry. Navigation happens constantly, so it must stay quick;
// opacity is fine under reduced motion (nothing moves).
export default function AnimatedContent({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
