"use client";

import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  // Setup global providers here later (e.g. ThemeProvider, QueryClientProvider)
  return <>{children}</>;
}
