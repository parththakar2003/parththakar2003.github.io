import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import CyberBackground from "../components/CyberBackground";
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
  metadataBase: new URL('https://parththakar2003.github.io'),
  title: {
    default: "Parth Thakar - Cybersecurity Professional & DFIR Expert",
    template: "%s | Parth Thakar"
  },
  description: "Cybersecurity Professional specializing in Digital Forensics, DFIR, SOC Operations, VAPT, and Red Teaming. Expert in incident response and threat hunting.",
  applicationName: "Parth Thakar Portfolio",
  authors: [{ name: "Parth Thakar", url: "https://parththakar2003.github.io" }],
  generator: "Next.js",
  keywords: [
    "Parth Thakar",
    "Digital Forensics",
    "Cybersecurity Professional",
    "Information Security",
    "DFIR Specialist",
    "SOC Analyst",
    "Security Operations Center",
    "Incident Response",
    "Threat Hunting",
    "VAPT",
    "Vulnerability Assessment",
    "Penetration Testing",
    "Red Teaming",
    "Blue Teaming",
    "CTF Competitions",
    "Cyber Security Expert",
    "Forensics Investigator",
    "Malware Analysis",
    "Network Security",
    "Ethical Hacking",
    "Security Analyst",
    "Kali Linux",
    "Wireshark",
    "Python Security",
    "Security Research",
    "Ahmedabad",
    "India",
    "NSIT",
    "Cybersecurity Portfolio"
  ],
  color: "#000001",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://parththakar2003.github.io",
    siteName: "Parth Thakar - Cybersecurity Professional Portfolio",
    title: "Parth Thakar - Cybersecurity Professional & DFIR Expert",
    description: "Cybersecurity Professional specializing in Digital Forensics, DFIR, SOC Operations, VAPT, and Red Teaming. Expert in incident response and threat hunting.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Parth Thakar - Cybersecurity Professional"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@parththakar",
    creator: "@parththakar",
    title: "Parth Thakar - Cybersecurity Professional & DFIR Expert",
    description: "Cybersecurity Professional specializing in Digital Forensics, DFIR, SOC Operations, VAPT, and Red Teaming. Expert in incident response and threat hunting.",
    images: ["/images/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  appleWebApp: {
    capable: true,
    title: "Parth's Portfolio",
    statusBarStyle: "default",
    navigationBarColor: "#1e293b",
  },
  alternates: {
    canonical: "https://parththakar2003.github.io",
  },
  // Security: Referrer policy for privacy
  referrer: 'strict-origin-when-cross-origin',
  category: 'technology',
  classification: 'Cybersecurity Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" itemScope itemType="https://schema.org/WebPage">
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="KNxRncXbje4Lzo8IJzfDibkSoNXF3nVm1DMg2U3ndaE" />
        
        {/* Bing Webmaster Verification */}
        <meta name="msvalidate.01" content="EB3B8E4CA41E0107775B910C04406DDF" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* SEO Enhancement */}
        <meta name="author" content="Parth Thakar" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Ahmedabad" />
        <meta name="geo.position" content="23.0225;72.5714" />
        <meta name="ICBM" content="23.0225, 72.5714" />
        
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
            alternateName: ["parththakar2003", "Parth Mehulkumar Thakar"],
            jobTitle: "Cybersecurity Professional & Digital Forensics Specialist",
            description: "Master's student in Digital Forensics and Information Security with expertise in SOC Operations, DFIR, VAPT, Red Teaming, and CTF competitions. Specializing in incident response, threat hunting, and forensics investigation.",
            url: "https://parththakar2003.github.io",
            email: "Parththakar39@gmail.com",
            image: "https://parththakar2003.github.io/images/profile.jpg",
            sameAs: [
              "https://github.com/parththakar2003",
              "https://www.linkedin.com/in/parthmehulkumarthakar/",
            ],
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "Narnarayan Shastri Institute of Technology",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ahmedabad",
                addressRegion: "Gujarat",
                addressCountry: "IN"
              }
            },
            knowsAbout: [
              "Digital Forensics",
              "Information Security",
              "Cybersecurity",
              "SOC Operations",
              "DFIR",
              "Incident Response",
              "Threat Hunting",
              "VAPT",
              "Vulnerability Assessment",
              "Penetration Testing",
              "Red Teaming",
              "Blue Teaming",
              "Malware Analysis",
              "Network Security",
              "CTF Competitions",
              "Python Programming",
              "Kali Linux",
              "Wireshark"
            ],
            hasOccupation: {
              "@type": "Occupation",
              name: "Cybersecurity Professional",
              occupationLocation: {
                "@type": "City",
                name: "Ahmedabad"
              },
              skills: "Digital Forensics, Information Security, DFIR, SOC Operations, VAPT, Red Teaming"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://parththakar2003.github.io",
            name: "Parth Thakar - Cybersecurity Professional Portfolio",
            description: "Professional portfolio showcasing cybersecurity skills, digital forensics expertise, SOC operations experience, VAPT capabilities, and achievements in the field of information security.",
            author: {
              "@type": "Person",
              name: "Parth Thakar"
            },
            inLanguage: "en-IN",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://parththakar2003.github.io/?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              name: "Parth Thakar",
              description: "Cybersecurity Professional specializing in Digital Forensics and Information Security"
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://parththakar2003.github.io"
                }
              ]
            }
          })}
        </script>
      </head>
      <body className="min-h-screen flex flex-col bg-gray-100 transition-colors duration-300">
        <LoadingScreen />
        <ThemeProvider>
          <CyberBackground />
          <Navbar />
          <main className="flex-grow relative z-10">
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