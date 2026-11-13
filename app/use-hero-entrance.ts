"use client";

import { useLayoutEffect, type RefObject } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const tracks = [
  { selector: ".hero-content > .eyebrow", delay: 0, duration: 1000, cursor: false },
  { selector: "h1", delay: 100, duration: 2400, cursor: true },
  { selector: ".hero-copy", delay: 850, duration: 1700, cursor: true },
  { selector: ".hero-links", delay: 1200, duration: 1700, cursor: true },
  { selector: ".page-nav > span", delay: 800, duration: 2000, cursor: true },
  { selector: ".page-nav > a", delay: 1000, duration: 1850, cursor: true },
];

export function useHeroEntrance(root: RefObject<HTMLElement | null>, enabled: boolean) {
  useLayoutEffect(() => {
    const hero = root.current;
    if (!hero || !enabled || window.scrollY > 64 || window.location.hash) return;
    const layer = hero.querySelector<HTMLElement>(".hero-authoring");
    if (!layer) return;
    const items = tracks.flatMap((track, index) => {
      const elements = hero.querySelectorAll<HTMLElement>(track.selector);
      return Array.from(elements).flatMap((element, itemIndex) => {
        let total = 0;
        const texts = Array.from(element.querySelectorAll<HTMLElement>(".written-text")).map((text) => {
          const glyphs = Array.from(text.querySelectorAll<HTMLElement>(".written-letter"));
          const entry = { element: text, glyphs, offset: total, count: 0 };
          total += glyphs.length;
          text.style.setProperty("--typed", "0");
          return entry;
        });
        const cursor = track.cursor ? document.createElement("div") : null;
        if (cursor) {
          const cursorColors = ["var(--rose)", "var(--cyan)", "var(--mint)"];
          cursor.className = "design-cursor";
          cursor.dataset.tool = "Frame";
          const indexCursor = track.selector.startsWith(".page-nav");
          const color = track.selector === ".page-nav > span"
            ? "var(--violet)"
            : cursorColors[itemIndex % cursorColors.length];
          cursor.style.setProperty(
            "--cursor-color",
            indexCursor ? color : index === 2 ? "var(--cyan)" : "var(--violet)",
          );
          cursor.innerHTML = '<svg width="18" height="23" viewBox="0 0 22 27" fill="none"><path d="M4.2 3.2C3.4 2.6 2.4 3.3 2.6 4.3L6.5 22.3C6.7 23.3 8 23.5 8.5 22.6L12 16.4L19 15.6C20 15.5 20.3 14.3 19.5 13.7L4.2 3.2Z" fill="currentColor" stroke="white" stroke-width="1.5" stroke-linejoin="round" /></svg>';
          layer.appendChild(cursor);
        }
        element.dataset.build = "waiting";
        const stagger = track.selector === ".page-nav > a" ? itemIndex * 150 : 0;
        return [{ ...track, delay: track.delay + stagger, element, texts, total, pointer: cursor, x: 0, y: 0, positioned: false, alpha: 0, relocating: false }];
      });
    });
    const title = hero.querySelector<HTMLElement>("h1");
    const image = hero.querySelector(".hero-visual img");
    const imageAnimation = image?.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 1100, delay: 300, fill: "both", easing: "ease-out" },
    );
    const measure = document.createElement("div");
    measure.className = "hero-type-measure";
    layer.appendChild(measure);
    let frame = 0;
    let start: number | undefined;
    let last = 0;
    let done = false;

    function update(time: number) {
      if (done) return;
      start ??= time;
      const elapsed = time - start;
      const dt = Math.min(48, last ? time - last : 16);
      last = time;
      const writes: Array<() => void> = [];
      // Read the same title box that owns the drawing, never a duplicated title.
      if (title) {
        const bounds = title.getBoundingClientRect();
        writes.push(() => {
          measure.textContent = `${Math.round(bounds.width)} × ${Math.round(bounds.height)} · Text`;
          const right = Math.min(window.innerWidth - measure.offsetWidth - 12, bounds.right + 16);
          measure.style.transform = `translate3d(${Math.max(12, right)}px, ${bounds.top}px, 0)`;
          measure.style.opacity = String(clamp((elapsed - 100) / 250) * (1 - clamp((elapsed - 2100) / 400)));
        });
      }
      items.forEach((item) => {
        const progress = clamp((elapsed - item.delay) / item.duration);
        const outline = clamp(progress / 0.25);
        const typed = Math.floor(clamp((progress - 0.22) / 0.65) * item.total);
        writes.push(() => {
          item.element.dataset.build = progress === 1 ? "complete" : progress > 0 ? "drawing" : "waiting";
          item.element.style.setProperty("--draw-top", String(clamp(outline * 4)));
          item.element.style.setProperty("--draw-right", String(clamp(outline * 4 - 1)));
          item.element.style.setProperty("--draw-bottom", String(clamp(outline * 4 - 2)));
          item.element.style.setProperty("--draw-left", String(clamp(outline * 4 - 3)));
          item.element.style.setProperty("--finish", String(clamp((progress - 0.8) / 0.2)));
        });
        item.texts.forEach((text) => {
          const count = Math.min(text.glyphs.length, Math.max(0, typed - text.offset));
          text.count = count;
          writes.push(() => {
            text.element.style.setProperty("--typed", String(count));
            text.element.toggleAttribute("data-writing", count > 0 && count < text.glyphs.length);
          });
        });
        const pointer = item.pointer;
        if (!pointer) return;
        const active = progress > 0 && progress < 0.98;
        if (active) {
          // Read the actual rendered glyph each frame: wrapping, font loading,
          // hero transforms and responsive layout all share these coordinates.
          const text = item.texts.findLast((entry) => entry.count > 0);
          const rect = text ? text.glyphs[text.count - 1].getBoundingClientRect() : item.element.getBoundingClientRect();
          const path = outline * 4;
          const x = text ? rect.right + 4 : path < 1 ? rect.left + rect.width * path : path < 2 ? rect.right : path < 3 ? rect.right - rect.width * (path - 2) : rect.left;
          const y = text ? rect.bottom + 3 : path < 1 ? rect.top : path < 2 ? rect.top + rect.height * (path - 1) : path < 3 ? rect.bottom : rect.bottom - rect.height * (path - 3);
          if (!item.positioned) { item.x = x; item.y = y; item.positioned = true; }
          if (text && Math.hypot(x - item.x, y - item.y) > 100 && Math.abs(y - item.y) > 10) item.relocating = true;
          if (item.relocating && item.alpha < 0.06) { item.x = x; item.y = y; item.relocating = false; }
          if (!item.relocating) {
            const ease = 1 - Math.exp(-dt / 45);
            item.x += (x - item.x) * ease;
            item.y += (y - item.y) * ease;
          }
          writes.push(() => { pointer.dataset.tool = text ? "Text" : "Frame"; });
        }
        const visible = active && !item.relocating && item.y < window.innerHeight - 35;
        item.alpha += ((visible ? 0.9 : 0) - item.alpha) * (1 - Math.exp(-dt / 70));
        writes.push(() => {
          pointer.style.opacity = String(item.alpha);
          pointer.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
        });
      });
      writes.forEach((write) => write());
      if (elapsed < 3100) frame = window.requestAnimationFrame(update);
      else finish();
    }

    function finish() {
      if (done) return;
      done = true;
      window.cancelAnimationFrame(frame);
      imageAnimation?.cancel();
      measure.remove();
      items.forEach(({ element, texts, pointer }) => {
        delete element.dataset.build;
        ["--draw-top", "--draw-right", "--draw-bottom", "--draw-left", "--finish"].forEach((property) => element.style.removeProperty(property));
        texts.forEach(({ element }) => { element.style.removeProperty("--typed"); element.removeAttribute("data-writing"); });
        pointer?.remove();
      });
    }
    function onVisibility() { if (document.hidden) finish(); }
    frame = window.requestAnimationFrame(update);
    window.addEventListener("resize", finish);
    hero.addEventListener("focusin", finish);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("resize", finish);
      hero.removeEventListener("focusin", finish);
      document.removeEventListener("visibilitychange", onVisibility);
      finish();
    };
  }, [root, enabled]);
}
