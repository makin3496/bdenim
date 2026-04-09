"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale";
  delay?: number;
  stagger?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  stagger = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const variantClass = stagger
    ? "stagger-children"
    : variant === "left"
    ? "reveal-left"
    : variant === "right"
    ? "reveal-right"
    : variant === "scale"
    ? "reveal-scale"
    : "reveal";

  return (
    <div ref={ref} className={`${variantClass} ${className}`}>
      {children}
    </div>
  );
}
