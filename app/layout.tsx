import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
import { ThemeProvider } from '../context/ThemeContext';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const viewport = {
  themeColor: "#1e293b",
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1,
  // userScalable: "no",
};

export const metadata = {
  title: "Parth Thakar - Cybersecurity Professional | Digital Forensics & InfoSec",
  description: "Explore Parth Thakar's portfolio showcasing expertise in Digital Forensics, Information Security, Cybersecurity, SOC Operations, and DFIR.",
  color: "#000001",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Parth Thakar - Cybersecurity Professional | Digital Forensics & InfoSec",
    description: "Master's student in Digital Forensics and Information Security with expertise in SOC, DFIR, and CTF competitions.",
    url: "https://parththakar2003.github.io",
    siteName: "Parth Thakar Portfolio",
    locale: "en-IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Thakar - Cybersecurity Professional",
    description: "Master's student in Digital Forensics and Information Security with expertise in SOC, DFIR, and CTF competitions.",
    creator: "@parththakar",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  appleWebApp: {
    capable: true,
    title: "Parth's Portfolio",
    statusBarStyle: "default",
    navigationBarColor: "#1e293b",
  },
  keywords: ["parth thakar, digital forensics, cybersecurity, DFIR, SOC, information security, CTF, security analyst, cyber security professional"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon for general browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        {/* Apple Touch Icon for iOS devices */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Additional favicon sizes */}
        <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Parth Thakar",
            alternateName: ["parththakar2003"],
            jobTitle: "Cybersecurity Professional & Digital Forensics Specialist",
            url: "https://parththakar2003.github.io",
            sameAs: [
              "https://github.com/parththakar2003",
            ],
            description: "Parth Thakar is a Master's student in Digital Forensics and Information Security with expertise in SOC Operations, DFIR, and CTF competitions.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://parththakar2003.github.io",
            name: "Parth Thakar Portfolio",
            description: "Explore Parth Thakar's portfolio showcasing cybersecurity skills, digital forensics expertise, and achievements.",
          })}
        </script>
        <link rel="canonical" href="https://parththakar2003.github.io" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-100 transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
            <Analytics /> {/* Vercel Analytics */}
            <SpeedInsights /> {/* Vercel Speed Insights */}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}