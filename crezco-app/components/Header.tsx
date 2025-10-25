'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { useUserRole } from '../hooks/useUserRole'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isCredcamer, loading } = useUserRole()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
              <span className="text-xl font-bold text-white">C</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              CREZCO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/projects" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Explorar Proyectos
            </Link>
            <SignedIn>
              <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                Mi Dashboard
              </Link>
              <Link href="/create" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                Crear Proyecto
              </Link>
              {!loading && isCredcamer && (
                <Link href="/credcamer" className="text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-lg hover:shadow-lg transition">
                  📈 Credcamer
                </Link>
              )}
            </SignedIn>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Sobre Nosotros
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="hidden md:flex px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition">
                  Iniciar Sesión
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="hidden md:flex px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                  Registrarse
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/projects"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explorar Proyectos
              </Link>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mi Dashboard
                </Link>
                <Link
                  href="/create"
                  className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Crear Proyecto
                </Link>
                {!loading && isCredcamer && (
                  <Link
                    href="/credcamer"
                    className="text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-lg hover:shadow-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    📈 Credcamer
                  </Link>
                )}
              </SignedIn>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
            </nav>

            <SignedOut>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <SignInButton mode="modal">
                  <button className="w-full px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition">
                    Iniciar Sesión
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                    Registrarse
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  )
}
