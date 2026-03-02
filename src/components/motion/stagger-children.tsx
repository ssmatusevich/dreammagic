"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type StaggerChildrenProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function StaggerChildren({
  children,
  className,
  stagger = 0.08,
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ staggerChildren: stagger }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
