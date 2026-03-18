import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { readData } from "@/app/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export async function generateMetadata(): Promise<Metadata> {
  let data;
  try {
    data = await readData();
  } catch (error) {
    data = { settings: {} };
  }

  const title =
    data?.settings?.seoTitle ||
    "Miftah Fadhlih | Product Manager & AI Engineer";
  const description =
    data?.settings?.seoDescription ||
    "Interactive portfolio of Miftah Fadhlih, Product Manager and AI Engineer based in Bekasi, Indonesia.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://miftahfadhlih.com",
      siteName: "Miftah Fadhlih Portfolio",
      images: [
        {
          url:
            data?.profile?.photo ||
            "https://picsum.photos/seed/miftah/1200/630",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        data?.profile?.photo || "https://picsum.photos/seed/miftah/1200/630",
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-slate-900 text-slate-300 antialiased selection:bg-blue-500/30 selection:text-blue-200`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
