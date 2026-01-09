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
  metadataBase: new URL('https://www.manishshrestha012.com.np'),
  title: {
    default: "StudyMate - PU Computer Engineering Notes",
    template: "%s | StudyMate"
  },
  description: "Access comprehensive notes, study materials, and resources for all 8 semesters of Computer Engineering at Pokhara University. Free PDF downloads, lecture notes, and exam preparation materials.",
  keywords: [
    "Pokhara University",
    "PU Notes",
    "Computer Engineering",
    "Engineering Notes",
    "Study Materials",
    "Nepal",
    "BE Computer",
    "Semester Notes",
    "Exam Notes",
    "PDF Notes",
    "Lecture Notes",
    "PU Computer Engineering",
    "StudyMate"
  ],
  authors: [{ name: "Manish Shrestha" }],
  creator: "Manish Shrestha",
  publisher: "StudyMate",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.manishshrestha012.com.np",
    siteName: "StudyMate",
    title: "StudyMate - PU Computer Engineering Notes",
    description: "Access comprehensive notes, study materials, and resources for all 8 semesters of Computer Engineering at Pokhara University.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StudyMate - PU Computer Engineering Notes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyMate - PU Computer Engineering Notes",
    description: "Access comprehensive notes, study materials, and resources for all 8 semesters of Computer Engineering at Pokhara University.",
    images: ["/og-image.png"],
    creator: "@manishshrestha",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "G-87XJ0JZSRN",
  },
  alternates: {
    canonical: "https://www.manishshrestha012.com.np",
  },
  category: "education",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "StudyMate",
    description: "Access comprehensive notes, study materials, and resources for all 8 semesters of Computer Engineering at Pokhara University.",
    url: "https://www.manishshrestha012.com.np",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.manishshrestha012.com.np/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    publisher: {
      "@type": "Organization",
      name: "StudyMate",
      logo: {
        "@type": "ImageObject",
        url: "https://www.manishshrestha012.com.np/black.svg"
      }
    }
  };

  return (
    <html lang="en">
      <head>
        <link id="dynamic-favicon" rel="icon" href="/black.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/black.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#007AFF" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
