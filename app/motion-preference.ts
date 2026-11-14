export type MotionMode = "subtle" | "showcase" | "off";

export function readMotionMode(): MotionMode {
  try {
    const saved = window.localStorage.getItem("dlyn-motion-mode");
    if (saved === "subtle" || saved === "showcase" || saved === "off") return saved;
    return window.localStorage.getItem("dlyn-motion-enabled") === "false" ? "off" : "subtle";
  } catch {
    return "subtle";
  }
}

export function saveMotionMode(mode: MotionMode) {
  try {
    window.localStorage.setItem("dlyn-motion-mode", mode);
  } catch {
    // The selected mode still works for this visit without browser storage.
  }
}
