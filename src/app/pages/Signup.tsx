import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import heroImageDark from "../../assets/bddbe7fe892163bcb0664a91940dc0fe6656a442.png";

export function Signup() {
  const { theme } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formState.password !== formState.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    // Validate password strength
    if (formState.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        fullName: formState.fullName,
        email: formState.email,
        password: formState.password,
        phone: formState.phone || undefined,
      });
      // Redirect to home page after successful signup
      navigate('/');
    } catch (error) {
      // Error is handled in AuthContext with toast
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-[#040304]' : 'bg-[#f1f0eb]'}`}>
      {/* Left Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:block lg:w-1/2 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#040304]/40 to-[#d5a310]/20 z-10" />
        <img
          src={heroImageDark}
          alt="Fitness Training"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-bold text-[#f1f0eb] mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '1px' }}
          >
            Start Your Journey <span className="text-[#d5a310]">Today</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-[#f1f0eb]/90"
          >
            Get access to premium equipment, expert trainers, and a supportive community.
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${
          theme === 'dark' ? 'bg-[#040304]' : 'bg-[#f1f0eb]'
        }`}
      >
        <div className="w-full max-w-md space-y-8">
          {/* Logo/Brand */}
          <div>
            <Link to="/">
              <motion.h1
                whileHover={{ scale: 1.02 }}
                className="text-4xl font-bold mb-2"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '1px' }}
              >
                <span className={theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}>
                  FITNESS SPORT
                </span>{" "}
                <span className="text-[#d5a310]">CENTER</span>
              </motion.h1>
            </Link>
          </div>

          {/* Header */}
          <div>
            <h2
              className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.5px' }}
            >
              Create Account
            </h2>
            <p className={`text-base ${theme === 'dark' ? 'text-[#f1f0eb]/70' : 'text-[#040304]/70'}`}>
              Join our fitness community and start transforming your life today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className={`text-sm mb-2 block ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                Full Name
              </Label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-[#f1f0eb]/40' : 'text-[#040304]/40'}`} />
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  placeholder="John Doe"
                  className={`pl-11 h-12 ${
                    theme === 'dark'
                      ? 'bg-[#292113] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                      : 'bg-white border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                  } focus:border-[#d5a310] transition-all duration-200`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className={`text-sm mb-2 block ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                Email
              </Label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-[#f1f0eb]/40' : 'text-[#040304]/40'}`} />
                <Input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="Example@email.com"
                  className={`pl-11 h-12 ${
                    theme === 'dark'
                      ? 'bg-[#292113] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                      : 'bg-white border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                  } focus:border-[#d5a310] transition-all duration-200`}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className={`text-sm mb-2 block ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                Phone Number
              </Label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-[#f1f0eb]/40' : 'text-[#040304]/40'}`} />
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className={`pl-11 h-12 ${
                    theme === 'dark'
                      ? 'bg-[#292113] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                      : 'bg-white border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                  } focus:border-[#d5a310] transition-all duration-200`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className={`text-sm mb-2 block ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                Password
              </Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-[#f1f0eb]/40' : 'text-[#040304]/40'}`} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formState.password}
                  onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                  placeholder="At least 8 characters"
                  className={`pl-11 pr-11 h-12 ${
                    theme === 'dark'
                      ? 'bg-[#292113] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                      : 'bg-white border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                  } focus:border-[#d5a310] transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className={`w-5 h-5 ${theme === 'dark' ? 'text-[#f1f0eb]/40' : 'text-[#040304]/40'} hover:text-[#d5a310] transition-colors`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${theme === 'dark' ? 'text-[#f1f0eb]/40' : 'text-[#040304]/40'} hover:text-[#d5a310] transition-colors`} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className={`text-sm mb-2 block ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-[#f1f0eb]/40' : 'text-[#040304]/40'}`} />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formState.confirmPassword}
                  onChange={(e) => setFormState({ ...formState, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className={`pl-11 pr-11 h-12 ${
                    theme === 'dark'
                      ? 'bg-[#292113] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                      : 'bg-white border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                  } focus:border-[#d5a310] transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className={`w-5 h-5 ${theme === 'dark' ? 'text-[#f1f0eb]/40' : 'text-[#040304]/40'} hover:text-[#d5a310] transition-colors`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${theme === 'dark' ? 'text-[#f1f0eb]/40' : 'text-[#040304]/40'} hover:text-[#d5a310] transition-colors`} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#d5a310] text-[#040304] hover:bg-[#b88a0d] shadow-lg shadow-[#d5a310]/30 font-bold transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', letterSpacing: '0.5px' }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className={`absolute inset-0 flex items-center`}>
              <div className={`w-full border-t ${theme === 'dark' ? 'border-[#d5a310]/20' : 'border-[#d5a310]/30'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 ${theme === 'dark' ? 'bg-[#040304] text-[#f1f0eb]/60' : 'bg-[#f1f0eb] text-[#040304]/60'}`}>
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className={`w-full h-12 ${
                theme === 'dark'
                  ? 'bg-[#292113] border-[#d5a310]/30 text-[#f1f0eb] hover:bg-[#292113]/80'
                  : 'bg-white border-[#d5a310]/40 text-[#040304] hover:bg-[#f1f0eb]/50'
              } hover:border-[#d5a310] transition-all duration-200`}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`w-full h-12 ${
                theme === 'dark'
                  ? 'bg-[#292113] border-[#d5a310]/30 text-[#f1f0eb] hover:bg-[#292113]/80'
                  : 'bg-white border-[#d5a310]/40 text-[#040304] hover:bg-[#f1f0eb]/50'
              } hover:border-[#d5a310] transition-all duration-200`}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Sign up with Facebook
            </Button>
          </div>

          {/* Login Link */}
          <p className={`text-center text-sm ${theme === 'dark' ? 'text-[#f1f0eb]/70' : 'text-[#040304]/70'}`}>
            Already have an account?{" "}
            <Link to="/login" className="text-[#d5a310] hover:text-[#b88a0d] font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}