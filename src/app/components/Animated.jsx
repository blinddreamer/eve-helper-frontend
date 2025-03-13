"use client"; // Mark this component as a Client Component

import { usePathname } from "next/navigation"; // Use usePathname for the current path
import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedContent({ children }) {
  const pathname = usePathname(); // Get the current path

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // Use pathname as the unique key
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}