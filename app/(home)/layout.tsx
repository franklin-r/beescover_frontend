import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import HomeHeader from "@/components/shared/HomeHeader";
import HomeFooter from "@/components/shared/HomeFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeesCover",
  description: "A decentralized insurance protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
				<div className="relative min-h-screen overflow-hidden">
					<img
						src="/beescover_home_bg.png"
						alt="BeesCover Background"
						className="fixed top-0 left-0 w-screen h-screen object-cover z-0"
					/>
					<div className="relative z-20 flex flex-col min-h-screen">
						<HomeHeader />
						<main className="flex-grow p-5">
							{children}
						</main>
						<HomeFooter />
					</div>
				</div>
      </body>
    </html>
  );
}
