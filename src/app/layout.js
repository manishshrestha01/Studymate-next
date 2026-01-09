import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyMate - PU Computer Engineering Notes",
  description: "Access comprehensive notes, study materials, and resources for all 8 semesters of Computer Engineering at Pokhara University.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link id="dynamic-favicon" rel="icon" href="/black.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-87XJ0JZSRN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-87XJ0JZSRN');
          `}
        </Script>
        {/* Dynamic Favicon */}
        <Script id="favicon-theme" strategy="afterInteractive">
          {`
            function setFaviconByTheme(e) {
              const favicon = document.getElementById('dynamic-favicon');
              if (favicon) {
                if (e.matches) {
                  favicon.href = '/white.svg';
                } else {
                  favicon.href = '/black.svg';
                }
              }
            }
            const darkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            setFaviconByTheme(darkScheme);
            darkScheme.addEventListener('change', setFaviconByTheme);
          `}
        </Script>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
