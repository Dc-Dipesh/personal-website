"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * One place that answers "how much motion may this device have?".
 *
 * Everything here is read through `useSyncExternalStore`, so the server and the
 * first client render always agree on the conservative defaults and the real
 * values arrive in the same commit as hydration.
 */
export type Environment = {
  /** True once the client has measured the device. */
  ready: boolean;
  reducedMotion: boolean;
  /** Touch / stylus — no hover, no custom cursor, no magnetic buttons. */
  coarsePointer: boolean;
  /** Under the lg breakpoint. */
  compact: boolean;
  /** WebGL is allowed: not reduced-motion, not a low-core device, has a context. */
  allowWebGL: boolean;
  /** Heavier scroll choreography (pinned horizontal sections). */
  allowPinning: boolean;
};

const FALLBACK: Environment = {
  ready: false,
  reducedMotion: false,
  coarsePointer: false,
  compact: false,
  allowWebGL: false,
  allowPinning: false,
};

const EnvironmentContext = createContext<Environment>(FALLBACK);

const neverChanges = () => () => {};

function subscribeToMedia(query: string) {
  return (onChange: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  };
}

function useMedia(query: string): boolean {
  const subscribe = useMemo(() => subscribeToMedia(query), [query]);
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Probing WebGL costs a canvas allocation, so do it once per document. */
let gpuCapable: boolean | null = null;
function isGpuCapable(): boolean {
  if (gpuCapable !== null) return gpuCapable;
  try {
    const canvas = document.createElement("canvas");
    const hasContext = Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
    gpuCapable = hasContext && (navigator.hardwareConcurrency ?? 4) >= 4;
  } catch {
    gpuCapable = false;
  }
  return gpuCapable;
}

export function EnvironmentProvider({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );
  const capable = useSyncExternalStore(
    neverChanges,
    isGpuCapable,
    () => false,
  );

  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)");
  const coarsePointer = useMedia("(hover: none), (pointer: coarse)");
  const compact = useMedia("(max-width: 1023px)");

  const value = useMemo<Environment>(
    () => ({
      ready: mounted,
      reducedMotion,
      coarsePointer,
      compact,
      allowWebGL: mounted && capable && !reducedMotion,
      allowPinning: mounted && !reducedMotion && !compact,
    }),
    [mounted, capable, reducedMotion, coarsePointer, compact],
  );

  return <EnvironmentContext.Provider value={value}>{children}</EnvironmentContext.Provider>;
}

export const useEnvironment = () => useContext(EnvironmentContext);
