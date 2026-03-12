"use client"

import Link from 'next/link'
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Trophy } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/standings", label: "Standings" },
  { href: "/teams", label: "Teams" },
  { href: "/news", label: "News" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container flex items-center justify-between h-[10vh]">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos/mnba.webp" // <-- add leading slash for public folder
              alt="MBA Logo"
              width={90}
              height={40}
              className="object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-card pb-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-3 text-sm font-medium ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card/50 py-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* League Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10">
                  <Image
                    src="/logos/mba-logo.png"
                    alt="MBA Logo"
                    fill
                    className="object-contain"
                  />
                </div>

                <span className="font-display text-lg font-bold">
                  MartNorth Basketball Association
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                The official digital home of the MBA. Where champions are made.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-sm font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-sm font-semibold mb-3">Contact</h4>
              <p className="text-sm text-muted-foreground">info@mba-league.com</p>
              <p className="text-sm text-muted-foreground mt-1">
                Follow us on social media for updates.
              </p>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground space-y-2">
            <p>© 2026 MartNorth Basketball Association. All rights reserved.</p>

            <p>
              Developed & Maintained by{" "}
              <a
                href="https://kuntech.co.zw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Kun Technologies
              </a>
            </p>
          </div>

        </div>
      </footer>




    </div>
  );
}
