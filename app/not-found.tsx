"use client"

import Link from 'next/link'
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-6xl font-display font-bold text-muted-foreground mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-muted-foreground mb-8">Page Not Found</h2>
      <Link href="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
    </div>
  );
}
