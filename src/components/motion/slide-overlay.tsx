"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type SlideOverlayProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function SlideOverlay({ open, onClose, children }: SlideOverlayProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] bg-black/40 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            key="overlay-panel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-10 w-full max-w-xl"
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
