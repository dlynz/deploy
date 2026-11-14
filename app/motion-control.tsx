"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import type { MotionMode } from "./motion-preference";

const modes: { value: MotionMode; label: string }[] = [
  { value: "subtle", label: "Subtle" },
  { value: "showcase", label: "Showcase" },
  { value: "off", label: "Off" },
];

export function MotionControl({ mode, ready, onChange }: {
  mode: MotionMode; ready: boolean; onChange: (mode: MotionMode) => void;
}) {
  const index = modes.findIndex((entry) => entry.value === mode);
  const dragging = useRef(false);
  function selectAt(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(2, Math.floor(((event.clientX - bounds.left) / bounds.width) * 3)));
    onChange(modes[position].value);
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!ready || event.button !== 0) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    selectAt(event);
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (dragging.current) selectAt(event);
  }
  function endDrag(event: PointerEvent<HTMLDivElement>) {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!ready) return;
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(index + 1, modes.length - 1);
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(index - 1, 0);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = modes.length - 1;
    else return;
    event.preventDefault();
    onChange(modes[next].value);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  }

  return (
    <div className="motion-control">
      <div className={`motion-slider ${ready ? "" : "is-loading"}`} role="radiogroup"
        aria-label="Motion setting" aria-busy={!ready} data-index={Math.max(index, 0)}
        onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
        <span className="motion-slider-thumb" aria-hidden="true" />
        {modes.map((entry) => <button key={entry.value} type="button" role="radio"
          aria-checked={mode === entry.value} tabIndex={ready && mode === entry.value ? 0 : -1}
          aria-label={`Motion: ${entry.label}`} onClick={() => { if (ready) onChange(entry.value); }} onKeyDown={onKeyDown}>
          <svg className="motion-slider-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {entry.value === "off" ? <path d="M9 6v12M15 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              : entry.value === "subtle" ? <path d="M3 12c3-10 6 10 9 0s6 10 9 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              : <><path d="m5 4 3.5 15 3.8-6 6.7-1L5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M18 3v3m-1.5-1.5h3M21 17v3m-1.5-1.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>}
          </svg>
        </button>)}
      </div>
    </div>
  );
}
