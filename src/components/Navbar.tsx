'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="w-full backdrop-blur-sm shadow-sm py-3 px-6 flex justify-between items-center relative z-10" style={{ backgroundColor: 'var(--navbar-bg)', color: 'var(--navbar-text)' }}>
      {/* Left side - Logo and title */}
      <div className="flex items-center gap-4">
        <Link href="/" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://res.cloudinary.com/dyikkz1ur/image/upload/v1759488643/IMG-20251003-WA0007_u0gn8l.jpg"
            alt="League Logo"
            width={80}
            height={40}
            className="object-contain hover:opacity-80 transition pr-2"
          />
        </Link>
        <h2 className="text-lg sm:text-2xl font-bold leading-tight">
          Matabeleland <br />North Basketball League 🏀
        </h2>
      </div>

      {/* Desktop menu */}
      <nav className="hidden md:flex items-center gap-6 font-medium" style={{ color: 'var(--navbar-text)' }}>
        <Link href="/fixture" className="hover:text-blue-600 transition">Games</Link>
        <Link href="/results" className="hover:text-blue-600 transition">Standings</Link>
        <Link href="/news" className="hover:text-blue-600 transition">News</Link>
        {session?.user?.role === 'team-manager' && (
          <Link href="/register-player" className="hover:text-blue-600 transition">Register Player</Link>
        )}
        <Link href="/team/dashboard" className="hover:text-blue-600 transition">Team Dashboard</Link>
        <Link href="/players" className="hover:text-blue-600 transition">Players</Link>

        <Link
          href="/signin"
          className="flex items-center gap-2 font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
          style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)' }}
        >
          🏀
          <span>Sign In </span>
        </Link>
        <ThemeToggle />
      </nav>

      {/* Mobile menu button */}
      <button
        className="md:hidden flex items-center justify-center p-2 text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>


      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start p-4 space-y-3 md:hidden">
          <Link href="/fixture" className="w-full py-2 border-b" onClick={() => setMenuOpen(false)}>Fixture</Link>
          <Link href="/register-team" className="w-full py-2 border-b" onClick={() => setMenuOpen(false)}>Register Team</Link>
          {session?.user?.role === 'team-manager' && (
            <Link href="/register-player" className="w-full py-2 border-b" onClick={() => setMenuOpen(false)}>Register Player</Link>
          )}
          <Link href="/team/dashboard" className="w-full py-2 border-b" onClick={() => setMenuOpen(false)}>Team Dashboard</Link>
          <Link href="/signin" className="w-full py-2" onClick={() => setMenuOpen(false)}>Sign In</Link>

        </div>
      )}
    </header>
  );
}
