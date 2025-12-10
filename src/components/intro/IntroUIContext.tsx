"use client";

import React, { createContext, useContext, useState } from "react";

type IntroUIContextValue = {
  showLang: boolean;
  setShowLang: (value: boolean) => void;
};

const IntroUIContext = createContext<IntroUIContextValue | null>(null);

export function IntroUIProvider({ children }: { children: React.ReactNode }) {
  const [showLang, setShowLang] = useState(false);

  return (
    <IntroUIContext.Provider value={{ showLang, setShowLang }}>
      {children}
    </IntroUIContext.Provider>
  );
}

export function useIntroUI() {
  const ctx = useContext(IntroUIContext);
  if (!ctx) {
    throw new Error("useIntroUI must be used within <IntroUIProvider>");
  }
  return ctx;
}
