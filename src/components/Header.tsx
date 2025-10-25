import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">C</span>
          </div>
          <span className="text-2xl font-bold text-gradient">CREZCO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/projects" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Explorar Proyectos
          </Link>
          <Link to="/create" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Crear Proyecto
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Sobre Nosotros
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar proyectos..."
              className="pl-9 w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm" asChild className="hidden md:flex">
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
          <Button size="sm" asChild className="hidden md:flex">
            <Link to="/signup">Registrarse</Link>
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar proyectos..."
                className="pl-9 w-full"
              />
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-3">
              <Link
                to="/projects"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explorar Proyectos
              </Link>
              <Link
                to="/create"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Crear Proyecto
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mi Dashboard
              </Link>
            </nav>

            {/* Mobile Actions */}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="outline" asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Iniciar Sesión
                </Link>
              </Button>
              <Button asChild>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Registrarse
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
