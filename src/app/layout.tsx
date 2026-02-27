import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "jesus_ale43",
  description: "descripcion muy interesante",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
