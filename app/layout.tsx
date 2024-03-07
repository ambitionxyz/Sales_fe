import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";
import AuthProvider from "@/components/providers/AuthProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import MatineProvider from "@/components/providers/MatineProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { SignalProvider } from "@/components/providers/SignalrProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextAuth.js Example",
  description:
    "This is an example site to demonstrate how to use NextAuth.js for authentication",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MatineProvider>
          <QueryProvider>
            <AuthProvider>
              <SignalProvider>
                <div className="flex flex-col justify-between w-full h-full min-h-screen">
                  <Header />
                  <main className="flex-auto w-full max-w-3xl px-4 py-4 mx-auto sm:px-6 md:py-6">
                    {children}
                  </main>
                  <Footer />
                </div>
                <ModalProvider />
              </SignalProvider>
            </AuthProvider>
          </QueryProvider>
        </MatineProvider>
      </body>
    </html>
  );
}
