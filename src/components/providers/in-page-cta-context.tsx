"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type InPageCtaContextValue = {
  hasInPageCta: boolean;
  register: () => () => void;
};

const InPageCtaContext = createContext<InPageCtaContextValue | null>(null);

export function InPageCtaProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const register = useCallback(() => {
    setCount((value) => value + 1);
    return () => setCount((value) => Math.max(0, value - 1));
  }, []);

  const value = useMemo(
    () => ({
      hasInPageCta: count > 0,
      register,
    }),
    [count, register],
  );

  return <InPageCtaContext.Provider value={value}>{children}</InPageCtaContext.Provider>;
}

export function useInPageCta() {
  const ctx = useContext(InPageCtaContext);
  if (!ctx) {
    throw new Error("useInPageCta must be used within InPageCtaProvider");
  }
  return ctx;
}

export function RegisterInPageCta({ children }: { children: ReactNode }) {
  const ctx = useContext(InPageCtaContext);

  useEffect(() => {
    if (!ctx) {
      return;
    }
    return ctx.register();
  }, [ctx]);

  return children;
}
