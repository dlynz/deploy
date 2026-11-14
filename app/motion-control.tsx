"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionMode } from "./motion-preference";

const modes: { value: MotionMode; label: string; description: string }[] = [
  { value: "subtle", label: "Subtle", description: "Hero intro and soft section reveals" },
  { value: "showcase", label: "Showcase", description: "Watch the whole page being created" },
  { value: "off", label: "Off", description: "Show all content immediately" },
];

export function MotionControl({ mode, ready, onChange }: {
  mode: MotionMode; ready: boolean; onChange: (mode: MotionMode) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  function close() { setOpen(false); trigger.current?.focus(); }

  return (
    <div className="motion-control" ref={root} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button className={`motion-toggle ${ready ? "" : "is-loading"}`} ref={trigger}
        type="button" disabled={!ready} aria-busy={!ready}
        aria-label={ready ? `Motion: ${mode}` : "Loading motion preference"}
        aria-haspopup="menu" aria-expanded={open} aria-controls="motion-options"
        data-mode={mode} onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); }
        }}>
        <span aria-hidden="true" />
        {ready ? `Motion: ${modes.find((entry) => entry.value === mode)?.label}` : "Loading"}
      </button>
      {open && <div className="motion-menu" id="motion-options" role="menu" aria-label="Motion mode" ref={menu}
        onKeyDown={(event) => {
          if (event.key === "Escape") { event.preventDefault(); close(); return; }
          if (event.key === "Tab") { close(); return; }
          const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
          const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
          let next: number;
          if (event.key === "ArrowDown") next = (index + 1) % buttons.length;
          else if (event.key === "ArrowUp") next = (index - 1 + buttons.length) % buttons.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = buttons.length - 1;
          else return;
          event.preventDefault(); buttons[next]?.focus();
        }}>
        {modes.map((entry) => <button key={entry.value} type="button" role="menuitemradio"
          aria-checked={mode === entry.value} tabIndex={mode === entry.value ? 0 : -1}
          onClick={() => { onChange(entry.value); close(); }}>
          <strong>{entry.label}<span aria-hidden="true">{mode === entry.value ? "✓" : ""}</span></strong>
          <small>{entry.description}</small>
        </button>)}
      </div>}
    </div>
  );
}
