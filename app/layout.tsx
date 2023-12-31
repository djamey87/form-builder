import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavMenu from "./NavMenu";

import styles from "./page.module.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles.main}>
          <NavMenu />

          {children}
        </main>
      </body>
    </html>
  );
}
