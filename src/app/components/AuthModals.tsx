import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Facebook, Mail } from "lucide-react";

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export function AuthModals({ isOpen, onClose, initialMode = "login" }: AuthModalsProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    termsAccepted: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onClose();
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
      termsAccepted: false,
    });
  };

  const switchMode = (newMode: "login" | "signup") => {
    setMode(newMode);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#292113] border-[#d5a310]/20 text-[#f1f0eb] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Full Name - Sign Up Only */}
          {mode === "signup" && (
            <div>
              <Label htmlFor="fullName" className="text-[#f1f0eb]">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
                className="bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40 focus:border-[#d5a310]"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-[#f1f0eb]">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40 focus:border-[#d5a310]"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-[#f1f0eb]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40 focus:border-[#d5a310]"
            />
          </div>

          {/* Confirm Password - Sign Up Only */}
          {mode === "signup" && (
            <div>
              <Label htmlFor="confirmPassword" className="text-[#f1f0eb]">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40 focus:border-[#d5a310]"
              />
            </div>
          )}

          {/* Remember Me / Terms */}
          <div className="flex items-center justify-between">
            {mode === "login" ? (
              <>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, rememberMe: checked as boolean })
                    }
                  />
                  <label htmlFor="remember" className="text-sm text-[#f1f0eb]/70">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-[#d5a310] hover:underline">
                  Forgot password?
                </a>
              </>
            ) : (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  required
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, termsAccepted: checked as boolean })
                  }
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-[#f1f0eb]/70">
                  I accept the{" "}
                  <a href="#" className="text-[#d5a310] hover:underline">
                    Terms & Conditions
                  </a>
                </label>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#d5a310] text-[#040304] hover:bg-[#d5a310]/90 shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-[#040304]/30 border-t-[#040304] rounded-full animate-spin" />
                {mode === "login" ? "Signing In..." : "Creating Account..."}
              </div>
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>

          {/* Social Login */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d5a310]/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#292113] text-[#f1f0eb]/60">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] hover:bg-[#d5a310]/10"
            >
              <Mail className="w-5 h-5 mr-2" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] hover:bg-[#d5a310]/10"
            >
              <Facebook className="w-5 h-5 mr-2" />
              Facebook
            </Button>
          </div>

          {/* Switch Mode */}
          <div className="text-center text-sm">
            <span className="text-[#f1f0eb]/60">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              type="button"
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
              className="text-[#d5a310] hover:underline font-medium"
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
