import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Horizone — Rent a Car for Every Journey",
  description:
    "Premium car rentals for every kind of journey. Explore our top picks and best deals.",
  openGraph: {
    title: "Horizone — Rent a Car for Every Journey",
    description: "Premium car rentals for every kind of journey.",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@Horizone",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          {/* <main className=""> */}

          <TooltipProvider>{children}</TooltipProvider>
          {/* </main>
          <Toaster /> */}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
