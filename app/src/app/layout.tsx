import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VisionProof | AI Payment Agent",
  description: "AI-powered proof-to-pay for trustless creator payments using MNEE stablecoin",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${geist.className} bg-gray-950 text-white min-h-screen overflow-x-hidden`}>
        <Providers>
          <div className="min-h-screen bg-gray-950">
            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black min-h-screen">
            <Header />
            <main className="max-w-6xl mx-auto px-4 py-8">
              {children}
            </main>
          </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
