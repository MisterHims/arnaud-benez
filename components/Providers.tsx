'use client';

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // The whole site is designed dark: force it, whatever the visitor's system
    // preference (a light OS theme used to render the sections unreadable)
    <NextThemesProvider attribute="class" forcedTheme="dark" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
