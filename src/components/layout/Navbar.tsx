
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2, MessageCircle, BookOpen, User, LineChart, Info, Menu, X } from "lucide-react";
import { useViewport } from "@/hooks/use-viewport";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isMobile } = useViewport();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
    { name: "Dashboard", path: "/dashboard", icon: <BarChart2 className="h-4 w-4" /> },
    { name: "Stocks", path: "/stocks", icon: <LineChart className="h-4 w-4" /> },
    { name: "Chat", path: "/chat", icon: <MessageCircle className="h-4 w-4" /> },
    { name: "Learn", path: "/learn", icon: <BookOpen className="h-4 w-4" /> },
    { name: "About Us", path: "/about-us", icon: <Info className="h-4 w-4" /> },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "py-2 bg-white/90 backdrop-blur-lg shadow-sm" 
          : "py-3 md:py-4 bg-transparent"
      )}
    >
      <div className="content-container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent">FinSage</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {isHomePage ? (
              <>
                <a href="#features" className="text-foreground/80 hover:text-primary-600 transition-colors text-sm lg:text-base">Features</a>
                <a href="#how-it-works" className="text-foreground/80 hover:text-primary-600 transition-colors text-sm lg:text-base">How It Works</a>
                <a href="#chat-interface" className="text-foreground/80 hover:text-primary-600 transition-colors text-sm lg:text-base">Try It</a>
                <Link to="/about-us" className="text-foreground/80 hover:text-primary-600 transition-colors text-sm lg:text-base">About Us</Link>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    className={cn(
                      "flex items-center gap-1.5 transition-colors text-sm lg:text-base",
                      location.pathname === link.path 
                        ? "text-primary-600 font-medium" 
                        : "text-foreground/70 hover:text-primary-600"
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </>
            )}
            
            {isHomePage ? (
              <Link to="/dashboard">
                <Button 
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-4 md:px-6 text-sm button-animation"
                  size="sm"
                >
                  Get Started
                </Button>
              </Link>
            ) : (
              <Link to="/sign-in" className="text-foreground/70 hover:text-primary-600 transition-colors flex items-center gap-1.5 text-sm lg:text-base">
                <User className="h-4 w-4" />
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2 focus:outline-none"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
            isMobileMenuOpen ? "max-h-[80vh] opacity-100 border-b border-gray-200" : "max-h-0 opacity-0"
          )}
        >
          <div className="p-4 flex flex-col space-y-3">
            {isHomePage ? (
              <>
                <a 
                  href="#features" 
                  className="text-foreground/80 hover:text-primary-600 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="w-5 h-5 flex items-center justify-center">•</span>
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-foreground/80 hover:text-primary-600 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="w-5 h-5 flex items-center justify-center">•</span>
                  How It Works
                </a>
                <a 
                  href="#chat-interface" 
                  className="text-foreground/80 hover:text-primary-600 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="w-5 h-5 flex items-center justify-center">•</span>
                  Try It
                </a>
                <Link 
                  to="/about-us" 
                  className="text-foreground/80 hover:text-primary-600 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="w-5 h-5 flex items-center justify-center">•</span>
                  About Us
                </Link>
              </>
            ) : null}
            
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={cn(
                  "flex items-center gap-2 py-2",
                  location.pathname === link.path 
                    ? "text-primary-600 font-medium" 
                    : "text-foreground/70 hover:text-primary-600"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="w-5 h-5 flex items-center justify-center">{link.icon}</span>
                {link.name}
              </Link>
            ))}
            
            {isHomePage ? (
              <Link to="/dashboard" className="mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-full w-full button-animation"
                >
                  Get Started
                </Button>
              </Link>
            ) : (
              <Link 
                to="/sign-in" 
                className="flex items-center gap-2 py-2 text-foreground/70 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="w-5 h-5 flex items-center justify-center"><User className="h-4 w-4" /></span>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
