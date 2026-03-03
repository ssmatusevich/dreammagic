import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
};

export function PageContainer({ children, className, as: Tag = "div" }: PageContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1320px] px-4 py-8 md:px-8 md:py-12 xl:px-[60px]", className)}>
      {children}
    </Tag>
  );
}
