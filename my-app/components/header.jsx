import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser"; 
import Image from "next/image";

const Header = async () => {
  await checkUser();
  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={"/logo.png"}
            alt="Finai Logo"
            width={160}
            height={48}
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a 
              href="#features" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Pricing
            </a>
          </SignedOut>
        </div>

        <div className="flex items-center space-x-3">
          <SignedIn>
            <Link
              href="/dashboard"
              className="flex items-center gap-2"
            >
              <Button variant="outline" className="border-gray-200 hover:bg-gray-50">
                <LayoutDashboard size={18} className="text-blue-600" />
                <span className="hidden md:inline ml-2">Dashboard</span>
              </Button>
            </Link>
            <a href="/transaction/create">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" className="border-gray-200 hover:bg-gray-50">
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 border border-blue-100",
                  userButtonPopoverCard: "shadow-lg",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;