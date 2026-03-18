import { useState, useEffect } from "react";
import { Menu, Moon, Sun, Search, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import { programsAPI } from "../services/api";
import { toast } from "sonner";
import logoImage from "../../assets/585c7e67ec4a0d2a6033cfedd11d8f5a61fd753f.png";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Trainers", href: "#trainers" },
  { name: "Plans", href: "#plans" },
  { name: "Contact", href: "#contact" },
];

interface Program {
  id: number;
  name: string;
  description: string;
  goal: string;
  level: string;
  duration: string;
  price: number;
  image_url?: string;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Program[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search functionality
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        handleSearch();
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500); // Debounce search

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await programsAPI.search({
        query: searchQuery,
      });

      if (response.success) {
        setSearchResults(response.data);
        setShowResults(true);
      }
    } catch (error: any) {
      console.error('Search error:', error);
      toast.error('Failed to search programs');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? theme === 'dark'
              ? "bg-[#040304]/95 backdrop-blur-md shadow-lg border-b border-[#d5a310]/20"
              : "bg-[#f1f0eb]/95 backdrop-blur-md shadow-lg border-b border-[#d5a310]/30"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#hero"
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 z-10"
            >
              <img 
                src={logoImage} 
                alt="FITNESS SPORT CENTER" 
                className="h-12 w-auto"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  href={link.href}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`hover:text-[#d5a310] transition-colors duration-200 font-medium relative group text-sm ${
                    theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                  }`}
                >
                  {link.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d5a310] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                  />
                </motion.a>
              ))}
            </div>

            {/* Right Side - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Search - Toggle */}
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 250, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden"
                  >
                    <Input
                      type="text"
                      placeholder="Search programs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      autoFocus
                      className={`w-[250px] pr-10 ${
                        theme === 'dark'
                          ? 'bg-[#292113] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                          : 'bg-white border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                      } focus:border-[#d5a310]`}
                    />
                    {isSearching ? (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d5a310] animate-spin" />
                    ) : (
                      <button
                        onClick={closeSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <X className="h-4 w-4 text-[#d5a310] hover:text-[#b88a0d] transition-colors" />
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(true)}
                    className={`hover:text-[#d5a310] hover:bg-[#d5a310]/10 transition-all duration-200 ${
                      theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                    }`}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </AnimatePresence>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`hover:text-[#d5a310] hover:bg-[#d5a310]/10 transition-all duration-200 ${
                  theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                }`}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              {isAuthenticated ? (
                <>
                  <span className={`text-sm ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                    Hi, {user?.fullName?.split(' ')[0]}
                  </span>
                  <Button
                    onClick={logout}
                    variant="outline"
                    className={`border-[#d5a310] hover:bg-[#d5a310] hover:text-[#040304] transition-all duration-300 ${
                      theme === 'dark' ? 'text-[#d5a310] bg-transparent' : 'text-[#040304] bg-transparent' 
                    }`}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    asChild
                    className={`border-[#d5a310] hover:bg-[#d5a310] hover:text-[#040304] hover:border-[#d5a310] transition-all duration-300 ${
                      theme === 'dark' ? 'text-[#d5a310] bg-transparent' : 'text-[#f1f0eb] bg-[#2c2c2c] border-2'
                    }`}
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button 
                    asChild
                    className="bg-[#d5a310] text-[#040304] hover:bg-[#b88a0d] transition-all duration-300 shadow-lg shadow-[#d5a310]/20 hover:shadow-[#d5a310]/40 hover:scale-105"
                  >
                    <Link to="/signup">Join Now</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className={`hover:text-[#d5a310] hover:bg-[#d5a310]/10 ${
                  theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                }`}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`hover:text-[#d5a310] hover:bg-[#d5a310]/10 ${
                  theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                }`}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}>
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className={`w-[300px] border-[#d5a310]/20 ${
                  theme === 'dark' ? 'bg-[#040304]' : 'bg-[#f1f0eb]'
                }`}>
                  <div className="flex flex-col space-y-6 mt-8">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`hover:text-[#d5a310] transition-colors duration-200 font-medium ${
                          theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                        }`}
                        style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.25rem', letterSpacing: '0.5px' }}
                      >
                        {link.name}
                      </a>
                    ))}
                    <div className="pt-4 border-t border-[#d5a310]/20 space-y-3">
                      {isAuthenticated ? (
                        <>
                          <p className={`text-sm ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                            Hi, {user?.fullName}
                          </p>
                          <Button
                            onClick={() => {
                              logout();
                              setMobileOpen(false);
                            }}
                            variant="outline"
                            className={`w-full border-2 border-[#d5a310] hover:bg-[#d5a310] hover:text-[#040304] transition-all duration-300 ${
                              theme === 'dark' ? 'text-[#d5a310] bg-transparent' : 'text-[#040304] bg-transparent'
                            }`}
                          >
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            asChild
                            className={`w-full border-2 border-[#d5a310] hover:bg-[#d5a310] hover:text-[#040304] transition-all duration-300 ${
                              theme === 'dark' ? 'text-[#d5a310] bg-transparent' : 'text-[#040304] bg-transparent'
                            }`}
                          >
                            <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                          </Button>
                          <Button 
                            asChild
                            className="w-full bg-[#d5a310] text-[#040304] hover:bg-[#b88a0d] transition-all duration-300"
                          >
                            <Link to="/signup" onClick={() => setMobileOpen(false)}>Join Now</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          {/* Mobile Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden pb-4"
              >
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`${
                      theme === 'dark'
                        ? 'bg-[#292113] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                        : 'bg-white border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                    } focus:border-[#d5a310]`}
                  />
                  {isSearching ? (
                    <Loader2 className="absolute right-3 top-3 h-4 w-4 text-[#d5a310] animate-spin" />
                  ) : (
                    <Search className="absolute right-3 top-3 h-4 w-4 text-[#d5a310]" />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 left-0 right-0 z-40 px-4 lg:px-8"
          >
            <div className="container mx-auto">
              <div className={`max-w-2xl mx-auto rounded-2xl shadow-2xl border overflow-hidden ${
                theme === 'dark'
                  ? 'bg-[#292113] border-[#d5a310]/20'
                  : 'bg-white border-[#d5a310]/30'
              }`}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                      Search Results ({searchResults.length})
                    </h3>
                    <button
                      onClick={closeSearch}
                      className="text-[#d5a310] hover:text-[#b88a0d]"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {searchResults.map((program) => (
                      <motion.div
                        key={program.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                          theme === 'dark'
                            ? 'bg-[#040304] border-[#d5a310]/20 hover:border-[#d5a310]/50'
                            : 'bg-[#f1f0eb] border-[#d5a310]/30 hover:border-[#d5a310]/60'
                        }`}
                        onClick={() => {
                          closeSearch();
                          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                              {program.name}
                            </h4>
                            <p className={`text-sm mb-2 line-clamp-2 ${
                              theme === 'dark' ? 'text-[#f1f0eb]/70' : 'text-[#040304]/70'
                            }`}>
                              {program.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-[#d5a310]/20 text-[#d5a310] rounded text-xs">
                                {program.goal}
                              </span>
                              <span className="px-2 py-1 bg-[#d5a310]/20 text-[#d5a310] rounded text-xs">
                                {program.level}
                              </span>
                              <span className="px-2 py-1 bg-[#d5a310]/20 text-[#d5a310] rounded text-xs">
                                {program.duration}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <span className="text-[#d5a310] font-bold text-xl">
                              ${program.price}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay when search results are shown */}
      <AnimatePresence>
        {showResults && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/50 z-30 top-20"
          />
        )}
      </AnimatePresence>
    </>
  );
}