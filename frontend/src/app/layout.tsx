import Script from "next/script";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </div>

        {/* MIDTRANS SNAP SCRIPT */}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
