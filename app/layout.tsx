import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuteo,Learn Languages by Actually Talking",
  description:
    "Tuteo is a conversational language learning app that adapts to your level, tracks your fluency, and makes practice feel like chatting with a friend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
