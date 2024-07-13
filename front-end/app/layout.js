
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import CrispProvider from "@/components/CrispProvider";
import RecoilRootWrapper from "./RecoilRootWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YouTube",
  description: "AI FOR YOUTUBE",
};

export default function RootLayout({ children }) {
  return (
    <RecoilRootWrapper>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ClerkProvider>{children}</ClerkProvider>
        </body>
      </html>
    </RecoilRootWrapper>
  );
}
