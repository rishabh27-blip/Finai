import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finai",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className} bg-gradient-to-b from-blue-50/20 to-white`}>
          <Header />
          <main className="min-h-screen container mx-auto px-4 py-24 md:py-28">
            {children}
          </main>
          <Toaster 
            richColors 
            position="top-center"
            toastOptions={{
              style: {
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          />

          <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <Image
                    src="/logo-white.png"
                    alt="Finai Logo"
                    width={160}
                    height={48}
                    className="h-12 w-auto"
                  />
                  <p className="mt-4 text-blue-100 max-w-md">
                    The intelligent financial platform that helps you make smarter money decisions.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Product</h3>
                    <ul className="space-y-2">
                      <li><a href="#features" className="text-blue-100 hover:text-white">Features</a></li>
                      <li><a href="#how-it-works" className="text-blue-100 hover:text-white">How It Works</a></li>
                      <li><a href="#pricing" className="text-blue-100 hover:text-white">Pricing</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Company</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-blue-100 hover:text-white">About</a></li>
                      <li><a href="#" className="text-blue-100 hover:text-white">Careers</a></li>
                      <li><a href="#" className="text-blue-100 hover:text-white">Contact</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Legal</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-blue-100 hover:text-white">Privacy</a></li>
                      <li><a href="#" className="text-blue-100 hover:text-white">Terms</a></li>
                      <li><a href="#" className="text-blue-100 hover:text-white">Security</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border-t border-blue-500/30 mt-8 pt-8 text-center text-blue-100 text-sm">
                <p>&copy; {new Date().getFullYear()} Finai. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}