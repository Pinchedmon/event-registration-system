import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/lib/provider";

export const metadata: Metadata = {
  title: "Events",
  description: "A lot of events here",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Provider>{children}</Provider>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
