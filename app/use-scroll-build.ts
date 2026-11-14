"use client";

import { useEffect, useRef, type RefObject } from "react";

import { getCursorColor, getCursorName, getCursorSpeed } from "./cursor-names";

const targets = [
  ".section-heading", ".filter-row", ".project-card", ".project-detail",
  ".timeline > article", ".skill-grid > article", ".resume-header",
  ".resume-block > h3", ".resume-item", ".resume-skills > p",
].join(", ");
const clamp = (value: number) => Math.min(1, Math.max(0, value));

function layoutTop(element: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
}

export function useScrollBuild(root: RefObject<HTMLElement | null>, enabled: boolean, contentKey: string) {
  // Re-rendering project content should not restart surrounding components.
  const progressCache = useRef(new WeakMap<HTMLElement, number>());
  const previousContentKey = useRef(contentKey);

  useEffect(() => {
    const shell = root.current;
    if (!shell || !enabled) return;
    const contentChanged = previousContentKey.current !== contentKey;
    previousContentKey.current = contentKey;
    const layer = shell.querySelector<HTMLElement>(".design-cursors");
    if (!layer) return;
    const header = document.querySelector<HTMLElement>(".site-nav");
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-build-progress";
    layer.appendChild(progressBar);
    let lastPageProgress = -1;
    const items = Array.from(shell.querySelectorAll<HTMLElement>(targets)).map((element, index) => {
      let total = 0;
      const texts = Array.from(element.querySelectorAll<HTMLElement>(".written-text")).map((text) => {
        const length = Number(text.dataset.length);
        const entry = {
          element: text, length, offset: total, count: -1,
          glyphs: Array.from(text.querySelectorAll<HTMLElement>(".written-letter")),
        };
        total += length;
        return entry;
      });
      // This empty layer is owned by the effect, separate from React's content.
      const isDevSocEntry = element.matches(".resume-skills > p") &&
        element.querySelector(".written-accessible")?.textContent?.includes("DevSoc");
      let speed = 1;
      const cursor = isDevSocEntry ? null : document.createElement("div");
      if (cursor) {
        cursor.className = "design-cursor";
        // The hero uses the first nine slots; continue the shuffled palette.
        const color = getCursorColor(index + 9);
        speed = getCursorSpeed(color);
        cursor.dataset.name = getCursorName(color);
        cursor.style.setProperty("--cursor-color", color);
        element.style.setProperty("--build-accent", color);
        cursor.innerHTML = '<svg width="18" height="23" viewBox="0 0 22 27" fill="none"><path d="M4.2 3.2C3.4 2.6 2.4 3.3 2.6 4.3L6.5 22.3C6.7 23.3 8 23.5 8.5 22.6L12 16.4L19 15.6C20 15.5 20.3 14.3 19.5 13.7L4.2 3.2Z" fill="currentColor" stroke="white" stroke-width="1.5" stroke-linejoin="round" /></svg>';
        layer.appendChild(cursor);
      }
      return {
        element, texts, total, top: 0, height: 0,
        progress: (contentChanged && element.closest("#work")) || element.getBoundingClientRect().top < window.innerHeight
          ? 1 : progressCache.current.get(element) ?? 0, painted: -1,
        cursor, speed, x: 0, y: 0, opacity: 0, positioned: false, relocating: false,
      };
    });
    let frame = 0;
    let lastTime = 0;
    let viewport = window.innerHeight;
    let pageHeight = 1;
    let heroBottom = 0;
    let disposed = false;

    function update(time: number) {
      frame = 0;
      const dt = Math.min(48, lastTime ? time - lastTime : 16);
      lastTime = time;
      const pointerEase = 1 - Math.exp(-dt / 55);
      const fadeEase = 1 - Math.exp(-dt / 90);
      const scroll = window.scrollY;
      const headerReveal = header
        ? Number.parseFloat(getComputedStyle(header).getPropertyValue("--nav-reveal")) || 0
        : 1;
      const end = clamp((scroll - pageHeight + viewport * 0.3) / (viewport * 0.3));
      // Collect geometry before applying any styles to avoid forcing layout
      // repeatedly as each independent cursor moves.
      const writes: Array<() => void> = [];
      const pageProgress = clamp((scroll - heroBottom) / Math.max(1, pageHeight - heroBottom));
      if (pageProgress !== lastPageProgress) {
        writes.push(() => { progressBar.style.transform = `scaleX(${pageProgress})`; });
        lastPageProgress = pageProgress;
      }
      let moving = false;

      items.forEach((item) => {
        const progressEase = 1 - Math.exp(-dt * item.speed / 140);
        const raw = Math.max(end, clamp((viewport * 0.94 - (item.top - scroll)) / (viewport * 0.57 / item.speed)));
        const target = Math.max(item.progress, raw);
        // Focus and skipped content must be immediately readable. Visible work
        // catches up over several frames, including after the scroll stops.
        const immediate = item.element.contains(document.activeElement) || item.top + item.height < scroll;
        const remaining = target - item.progress;
        let progress = immediate ? 1 : remaining < 0.0002 ? target
          : item.progress + Math.min(remaining * progressEase, dt * item.speed / 1400);
        if (!immediate && target - progress < 0.0002) progress = target;
        if (target - progress > 0.0002) moving = true;
        item.progress = progress;
        progressCache.current.set(item.element, progress);

        if (progress !== item.painted) {
          item.painted = progress;
          const outline = clamp(progress / 0.25);
          const typed = Math.floor(clamp((progress - 0.22) / 0.65) * item.total);
          writes.push(() => {
            item.element.dataset.build = progress >= 1 ? "complete" : progress > 0 ? "drawing" : "waiting";
            item.element.style.setProperty("--draw-top", String(clamp(outline * 4)));
            item.element.style.setProperty("--draw-right", String(clamp(outline * 4 - 1)));
            item.element.style.setProperty("--draw-bottom", String(clamp(outline * 4 - 2)));
            item.element.style.setProperty("--draw-left", String(clamp(outline * 4 - 3)));
            item.element.style.setProperty("--finish", String(clamp((progress - 0.8) / 0.2)));
          });
          item.texts.forEach((text) => {
            const count = Math.min(text.length, Math.max(0, typed - text.offset));
            if (text.count === count) return;
            text.count = count;
            writes.push(() => {
              text.element.style.setProperty("--typed", String(count));
              text.element.toggleAttribute("data-writing", count > 0 && count < text.length);
            });
          });
        }

        const pointer = item.cursor;
        if (!pointer) return;
        let visible = progress > 0.005 && progress < 0.99 && item.top < scroll + viewport && item.top + item.height > scroll;
        if (visible) {
          // Keep the pointer on the last typed glyph between text fields and
          // during styling, instead of snapping back to the frame's origin.
          const text = item.texts.findLast((entry) => entry.count > 0);
          let x: number;
          let y: number;
          if (text) {
            const rect = text.glyphs[text.count - 1].getBoundingClientRect();
            x = rect.right + 5;
            y = rect.bottom + scroll + 5;
          } else {
            const rect = item.element.getBoundingClientRect();
            const path = clamp(progress / 0.25) * 4;
            x = path < 1 ? rect.left + rect.width * path : path < 2 ? rect.right : path < 3 ? rect.right - rect.width * (path - 2) : rect.left;
            y = scroll + (path < 1 ? rect.top : path < 2 ? rect.top + rect.height * (path - 1) : path < 3 ? rect.bottom : rect.bottom - rect.height * (path - 3));
          }
          if (!item.positioned) {
            item.x = x; item.y = y; item.positioned = true;
          }
          // Long returns to a new text line fade out and reappear locally.
          // Document coordinates keep scrolling itself from dragging cursors.
          if (text && Math.hypot(x - item.x, y - item.y) > 100 && Math.abs(y - item.y) > 10) item.relocating = true;
          if (item.relocating && item.opacity < 0.06) {
            item.x = x; item.y = y; item.relocating = false;
          }
          if (!item.relocating) {
            item.x += (x - item.x) * pointerEase;
            item.y += (y - item.y) * pointerEase;
            if (Math.abs(x - item.x) + Math.abs(y - item.y) > 0.4) moving = true;
          }
          // Hide offscreen cursors instead of pinning them to viewport edges.
          visible = !item.relocating && item.y - scroll > 8 && item.y - scroll < viewport - 40 && item.x < window.innerWidth - 65;
        }
        if (!visible && item.opacity === 0) return;
        const alpha = visible ? 0.9 : 0;
        if (Math.abs(alpha - item.opacity) > 0.005) {
          item.opacity += (alpha - item.opacity) * fadeEase;
          moving = true;
        } else item.opacity = alpha;
        writes.push(() => {
          pointer.style.opacity = String(item.opacity);
          pointer.style.transform = `translate3d(${item.x}px, ${item.y - scroll}px, 0)`;
        });
      });
      progressBar.style.opacity = String(headerReveal);
      writes.forEach((write) => write());
      if (moving) frame = window.requestAnimationFrame(update);
      else lastTime = 0;
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    function measure() {
      viewport = window.innerHeight;
      pageHeight = Math.max(1, document.documentElement.scrollHeight - viewport);
      const hero = shell?.querySelector<HTMLElement>(".hero-section");
      heroBottom = hero ? layoutTop(hero) + hero.offsetHeight : 0;
      items.forEach((item) => {
        item.top = layoutTop(item.element);
        item.height = item.element.offsetHeight;
      });
      schedule();
    }

    shell.setAttribute("data-scroll-build", "");
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(shell);
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    shell.addEventListener("focusin", schedule);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      shell.removeEventListener("focusin", schedule);
      shell.removeAttribute("data-scroll-build");
      progressBar.remove();
      items.forEach(({ element, texts, cursor }) => {
        cursor?.remove();
        delete element.dataset.build;
        ["--draw-top", "--draw-right", "--draw-bottom", "--draw-left", "--finish", "--build-accent"].forEach((property) => element.style.removeProperty(property));
        texts.forEach(({ element }) => {
          element.style.removeProperty("--typed");
          element.removeAttribute("data-writing");
        });
      });
    };
  }, [root, enabled, contentKey]);
}
