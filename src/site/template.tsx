import type { ReactNode } from "react";

/** A template re-mounts on every navigation, so this replays the page-enter animation. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
