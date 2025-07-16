"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
	darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
	hardhat,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'BeesCover',
  projectId: '904a8f601437e3ed92c776afb3cb3f36',
  chains: [hardhat, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const RainbowKitAndWagmiProvider = ({children}: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en" theme={darkTheme({
					accentColor: 'grey',
					accentColorForeground: 'white',
					borderRadius: 'medium',
					fontStack: 'system',
					overlayBlur: 'small',
				})}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKitAndWagmiProvider;