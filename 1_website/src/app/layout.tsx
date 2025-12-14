import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sesame3 — Your AI College Counselor",
  description: "Get expert guidance, honest chance assessments, and a clear roadmap — all through a conversation with an AI that knows you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
