import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/yourcompany',
      icon: Facebook,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourcompany',
      icon: Twitter,
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/yourcompany',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/yourcompany',
      icon: Linkedin,
    },
  ];

  return (
    <footer className="w-full bg-background border-t" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Company</h2>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground" aria-label="Company links">
              <Link href="/about" className="hover:text-primary" aria-label="About Us page">About Us</Link>
              <Link href="/contact" className="hover:text-primary" aria-label="Contact Us page">Contact Us</Link>
              <Link href="/careers" className="hover:text-primary" aria-label="Career opportunities">Careers</Link>
              <Link href="/blog" className="hover:text-primary" aria-label="Company blog">Blog</Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Services</h2>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground" aria-label="Services links">
              <Link href="/services/web" className="hover:text-primary" aria-label="Web Development services">Web Development</Link>
              <Link href="/services/mobile" className="hover:text-primary" aria-label="Mobile App Development services">Mobile Apps</Link>
              <Link href="/services/consulting" className="hover:text-primary" aria-label="Consulting services">Consulting</Link>
              <Link href="/services/design" className="hover:text-primary" aria-label="Design services">Design</Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Legal</h2>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground" aria-label="Legal links">
              <Link href="/privacy" className="hover:text-primary" aria-label="Privacy Policy">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary" aria-label="Terms of Service">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-primary" aria-label="Cookie Policy">Cookie Policy</Link>
            </nav>
          </div>

          {/* Stay Connected */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Stay Connected</h2>
            <p className="text-sm text-muted-foreground">Follow us on social media for the latest updates and news</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <a 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <p>© {currentYear} Your Company Name. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;