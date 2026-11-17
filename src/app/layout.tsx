import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Funnel Lab",
  description: "Find the offer that books calls.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {/* Inside <body> because Cache Components is on. */}
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/signup"
          signInFallbackRedirectUrl="/today"
          signUpFallbackRedirectUrl="/signup"
          afterSignOutUrl="/"
          appearance={{
            cssLayerName: "clerk",
            variables: {
              colorPrimary: "#0f756e",
              colorForeground: "#1c1c1f",
              colorMutedForeground: "#52545c",
              fontFamily: "var(--font-inter)",
              borderRadius: "6px",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
