import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { Toaster } from "@/components/ui/sonner";

import RainbowKitAndWagmiProvider from "@/components/shared/RainbowKitAndWagmiProvider";
import DappHeader from "@/components/shared/DappHeader";
import DappFooter from "@/components/shared/DappFooter";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "BeesCover DApp",
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
				<RainbowKitAndWagmiProvider>
					<DappHeader />
					<main className="flex-grow p-5">
						{children}
					</main>
					<DappFooter />
				</RainbowKitAndWagmiProvider>
				<Toaster richColors position="top-center" expand={true}/>
			</body>
		</html>
	);
}