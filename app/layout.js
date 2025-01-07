import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SmartFin",
  description: "AI based finance flatform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* Header */}
          <Header />
          <main className="min-h-screen ">{children}</main>
          {/*   // Toaster is a notification component pop up */}
          <Toaster richcolors />
          {/* Footer */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>updated @ 2025</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
