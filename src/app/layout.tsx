import 'src/global.css';

// ----------------------------------------------------------------------

import type { Viewport } from 'next';

import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';
import { LocalizationProvider } from 'src/locales';
import { detectLanguage } from 'src/locales/server';
import { ThemeProvider } from 'src/theme/theme-provider';
import { I18nProvider } from 'src/locales/i18n-provider';
import { getInitColorSchemeScript } from 'src/theme/color-scheme-script';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { detectSettings } from 'src/components/settings/server';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();
  const settings = CONFIG.isStaticExport ? defaultSettings : await detectSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {getInitColorSchemeScript}
        <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
          <LocalizationProvider>
            <AuthProvider>
              <SettingsProvider
                settings={settings}
                caches={CONFIG.isStaticExport ? 'localStorage' : 'cookie'}
              >
                <ThemeProvider>
                  <MotionLazy>
                    <ProgressBar />
                    <SettingsDrawer />
                    {children}
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </AuthProvider>
          </LocalizationProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
