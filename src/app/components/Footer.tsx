import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "../context/ThemeContext";
import logoImage from "../../assets/585c7e67ec4a0d2a6033cfedd11d8f5a61fd753f.png";

export function Footer() {
  const { theme } = useTheme();

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Trainers", href: "#trainers" },
    { name: "Contact", href: "#contact" },
  ];

  const programs = [
    { name: "Personal Training", href: "#services" },
    { name: "Group Classes", href: "#services" },
    { name: "Nutrition Coaching", href: "#services" },
    { name: "Fat Loss Program", href: "#services" },
    { name: "Strength Training", href: "#services" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className={`border-t border-[#d5a310]/20 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#292113]' : 'bg-[#2c2c2c]'
    }`}>
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logoImage} 
                alt="FITNESS SPORT CENTER" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-[#f1f0eb]/70 mb-6">
              Your premium fitness destination for transformation, strength, and wellness. Join our community
              today.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-[#d5a310]/10 hover:bg-[#d5a310]/20 flex items-center justify-center border border-[#d5a310]/30 hover:border-[#d5a310]/50 transition-all"
                >
                  <social.icon className="w-5 h-5 text-[#d5a310]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#f1f0eb] font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#f1f0eb]/70 hover:text-[#d5a310] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-[#f1f0eb] font-semibold text-lg mb-4">Programs</h3>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.name}>
                  <a
                    href={program.href}
                    className="text-[#f1f0eb]/70 hover:text-[#d5a310] transition-colors"
                  >
                    {program.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#f1f0eb] font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-[#f1f0eb]/70 mb-4">
              Subscribe to get fitness tips, exclusive offers, and updates.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d5a310]/50" />
                <Input
                  type="email"
                  placeholder="Your email"
                  className="pl-10 bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40 focus:border-[#d5a310]"
                />
              </div>
              <Button className="w-full bg-[#d5a310] text-[#040304] hover:bg-[#d5a310]/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#d5a310]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#f1f0eb]/60 text-sm">
              © 2026 Fitness Sports Center. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-[#f1f0eb]/60 hover:text-[#d5a310] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[#f1f0eb]/60 hover:text-[#d5a310] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-[#f1f0eb]/60 hover:text-[#d5a310] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}