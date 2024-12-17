import React from 'react';
import Link from 'next/link';
import { Menu } from "lucide-react";
import ToolsDropdown from './ToolsDropdown';
import UserDropdown from '@/components/Header/UserDropdown';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Header = () => {
  const tools = [
    { name: "Compress", href: "/compress" },
    { name: "Convert", href: "/convert" },
    { name: "Merge", href: "/merge" },
    { name: "Edit", href: "/edit" },
    { name: "About", href: "/help/about" },
    { name: "AI PDF", href: "/ai-pdf" },
  ];

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation group */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              {/* Logo */}
              <Link href="/" className="font-bold text-xl">
                YOUR LOGO
              </Link>
              
              {/* Tools Dropdown */}
              <ToolsDropdown />
              </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6">
                {tools.map((tool) => (
                  <li key={tool.name}>
                    <Link
                      href={tool.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
    
          {/* Actions group (Free Trial and Mobile Menu) */}
          <div className="flex items-center gap-2">
            {/* UserDropdown and Free trial button */}
              <UserDropdown />
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="!h-6 !w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>
                    Access all tools and features
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col mt-6">
                  <ul className="space-y-4">
                    {tools.map((tool) => (
                      <li key={tool.name}>
                        <Link
                          href={tool.href}
                          className="text-lg text-gray-600 hover:text-gray-900"
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;