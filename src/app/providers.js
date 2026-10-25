'use client';
import { useRouter } from 'next/navigation';
import { HeroUIProvider } from '@heroui/react';
import {
  ThemeProvider as GravityThemeProvider,
  ToasterProvider,
  ToasterComponent,
  Toaster,
} from '@gravity-ui/uikit';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

const toaster = new Toaster();

// Keeps Gravity UI's theme in sync with the site's dark/light switch.
function GravityBridge({ children }) {
  const { theme } = useTheme();
  return (
    <GravityThemeProvider theme={theme}>
      <ToasterProvider toaster={toaster}>
        {children}
        <ToasterComponent />
      </ToasterProvider>
    </GravityThemeProvider>
  );
}

export default function Providers({ children }) {
  const router = useRouter();
  return (
    <HeroUIProvider navigate={router.push} locale="bn-BD">
      <LanguageProvider>
        <ThemeProvider>
          <GravityBridge>{children}</GravityBridge>
        </ThemeProvider>
      </LanguageProvider>
    </HeroUIProvider>
  );
}
