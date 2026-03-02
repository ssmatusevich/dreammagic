"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const MotionDiv = motion.div;
const MotionSection = motion.section;
const MotionArticle = motion.article;
const MotionAside = motion.aside;
const MotionHeader = motion.header;
const MotionLi = motion.li;

const motionComponents = {
  div: MotionDiv,
  section: MotionSection,
  article: MotionArticle,
  aside: MotionAside,
  header: MotionHeader,
  li: MotionLi,
} as const;

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: keyof typeof motionComponents;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  as = "div",
}: FadeInProps) {
  const Component = motionComponents[as];

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
