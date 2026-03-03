import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "inverted";
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: "button";
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps & {
  as: "link";
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-xs tracking-[0.12em] transition-all duration-300";

const variants = {
  primary:
    "border-[color:var(--line)] text-[color:var(--text-primary)] hover:bg-[color:var(--text-primary)] hover:text-[color:var(--surface)]",
  ghost:
    "border-[color:var(--line)] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]",
  inverted:
    "border-[color:var(--surface)]/40 text-[color:var(--surface)] hover:border-[color:var(--surface)]/70 hover:bg-[color:var(--surface)]/10",
} as const;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if (props.as === "link") {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { as: _, ...buttonProps } = rest as ButtonAsButton;
  void _;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
