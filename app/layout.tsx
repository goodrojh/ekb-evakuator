import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";
import { site, asset } from "@/lib/site";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `Эвакуатор Екатеринбург 24/7 — подача ${site.arrivalMinutes} минут, от 2 500 ₽ | ${site.name}`,
  description:
    "Срочный вызов эвакуатора в Екатеринбурге и области круглосуточно. Подача 10–20 минут, честная фиксированная цена, оплата после работы. Легковые, внедорожники, коммерческий транспорт, межгород.",
  keywords: [
    "эвакуатор екатеринбург",
    "вызвать эвакуатор",
    "эвакуатор круглосуточно",
    "эвакуатор дешево",
    "эвакуатор межгород",
    "эвакуатор цена",
  ],
  openGraph: {
    title: `Эвакуатор Екатеринбург 24/7 — ${site.name}`,
    description: "Подача 10–20 минут. Честная цена от 2 500 ₽. Оплата после работы.",
    type: "website",
    locale: "ru_RU",
    images: [{ url: asset("/img/og.jpg"), width: 1200, height: 675 }],
  },
  icons: { icon: asset("/favicon.svg") },
  metadataBase: new URL(site.url),
};

export const viewport: Viewport = {
  themeColor: "#0b0d11",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  additionalType: "https://schema.org/EmergencyService",
  name: site.name,
  description: "Круглосуточный эвакуатор в Екатеринбурге и Свердловской области.",
  telephone: "+79826558543",
  url: site.url,
  areaServed: ["Екатеринбург", "Свердловская область"],
  openingHours: "Mo-Su 00:00-24:00",
  priceRange: "от 2500 ₽",
  address: { "@type": "PostalAddress", addressLocality: "Екатеринбург", addressCountry: "RU" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
