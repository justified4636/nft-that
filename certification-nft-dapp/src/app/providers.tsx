"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import type { ReactNode } from "react";

const _manifestUrl = `${process.env.NEXT_PUBLIC_APP_URL}/tonconnect-manifest.json`;

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TonConnectUIProvider manifestUrl="https://peach-fast-clam-38.mypinata.cloud/ipfs/bafkreidsqkapogy6yric4zskh76r5ldsdrstwrlnvsidb2fzi2tflqzywa">
      {children}
    </TonConnectUIProvider>
  );
}
