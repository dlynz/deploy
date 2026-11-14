"use client";

import { useEffect, useRef, type RefObject } from "react";

const revealTargets = [
  ".section-heading",
  ".filter-row",
  ".project-list",
  ".project-detail",
  ".timeline > article",
  ".skill-grid > article",
  ".resume-header",
  ".resume-block > h3",
  ".resume-item",
  ".resume-skills",
].join(",");

export function useSubtleMotion(root: RefObject<HTMLElement | null>, enabled: boolean) {
  const seen = useRef(new WeakSet<Element>());

  useEffect(() => {
    const shell = root.current;
    if (!shell || !enabled || !("IntersectionObserver" in window)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const targets = Array.from(shell.querySelectorAll<HTMLElement>(revealTargets));
    const timers = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const element = entry.target as HTMLElement;
        element.removeAttribute("data-subtle-pending");
        if (seen.current.has(element)) return;
        seen.current.add(element);
        if (element.contains(document.activeElement)) return;
        element.setAttribute("data-subtle-reveal", "");
        timers.set(element, window.setTimeout(() => {
          element.removeAttribute("data-subtle-reveal");
          timers.delete(element);
        }, 1000));
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -12% 0px" });

    targets.forEach((element) => {
      // Keep content already in view readable when Subtle is turned on.
      if (element.getBoundingClientRect().top < window.innerHeight * 0.82) {
        seen.current.add(element);
        return;
      }
      element.setAttribute("data-subtle-pending", "");
      observer.observe(element);
    });

    const finish = () => {
      observer.disconnect();
      targets.forEach((element) => {
        element.removeAttribute("data-subtle-pending");
        element.removeAttribute("data-subtle-reveal");
      });
      timers.forEach(window.clearTimeout);
      timers.clear();
    };
    const onReducedMotion = () => { if (reducedMotion.matches) finish(); };
    shell.addEventListener("focusin", finish, { once: true });
    shell.addEventListener("pointerdown", finish, { once: true });
    window.addEventListener("beforeprint", finish, { once: true });
    reducedMotion.addEventListener("change", onReducedMotion);
    return () => {
      finish();
      shell.removeEventListener("focusin", finish);
      shell.removeEventListener("pointerdown", finish);
      window.removeEventListener("beforeprint", finish);
      reducedMotion.removeEventListener("change", onReducedMotion);
    };
  }, [root, enabled]);
}
