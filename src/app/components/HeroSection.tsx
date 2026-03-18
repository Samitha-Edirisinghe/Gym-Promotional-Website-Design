import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown, Users, Star, TrendingUp, Play } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../context/ThemeContext";
import heroImageLight from "../../assets/9e4aa7029eabc282377efdcb0849b1c0f76bb91d.png";
import heroImageDark from "../../assets/bddbe7fe892163bcb0664a91940dc0fe6656a442.png";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: theme === 'dark'
              ? `url(${heroImageDark})`
              : `url(${heroImageLight})`,
          }}
        />
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-[#040304]/80 via-[#040304]/70 to-[#040304]/85'
            : 'bg-gradient-to-b from-[#f1f0eb]/70 via-[#f1f0eb]/60 to-[#f1f0eb]/80'
        }`} />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#d5a310]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#d5a310]/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="container mx-auto px-4 lg:px-8 z-10 text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          {/* Subtitle Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d5a310]/10 border border-[#d5a310]/30 backdrop-blur-sm mb-8"
          >
            <div className="w-2 h-2 bg-[#d5a310] rounded-full animate-pulse" />
            <span className="text-[#d5a310] text-sm font-bold tracking-wide">⭐ PREMIUM FITNESS CENTER</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight ${
              theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
            }`}
          >
            Transform Your Body.
            <br />
            <span className="text-[#d5a310]">Elevate Your Life.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-base md:text-lg lg:text-xl mb-10 max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-[#f1f0eb]/80' : 'text-[#040304]/80'
            }`}
          >
            Experience premium fitness training with world-class coaches, cutting-edge equipment, and
            personalized programs designed to help you achieve your ultimate fitness goals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button className="bg-[#d5a310] text-[#040304] hover:bg-[#b88a0d] px-8 py-6 text-base lg:text-lg shadow-xl shadow-[#d5a310]/30 hover:shadow-[#d5a310]/50 transition-all duration-300 hover:scale-105 font-bold">
              Start Your Journey →
            </Button>
            <Button
              variant="outline"
              className={`border-2 border-[#d5a310] text-[#d5a310] hover:bg-[#d5a310] hover:text-[#040304] px-8 py-6 text-base lg:text-lg transition-all duration-300 hover:scale-105 font-bold backdrop-blur-sm ${
                theme === 'dark' ? 'bg-[#040304]/30' : 'bg-white/30'
              }`}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Video
            </Button>
          </motion.div>

          {/* Social Proof Badges with Stagger Animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.6,
                },
              },
            }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {[
              { icon: Users, value: "5000+", label: "Active Members" },
              { icon: Star, value: "4.9/5", label: "Rating" },
              { icon: TrendingUp, value: "95%", label: "Success Rate" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.08, y: -5 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 backdrop-blur-md px-6 py-4 rounded-xl border-2 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-[#292113]/60 border-[#d5a310]/30 hover:border-[#d5a310]/60 hover:bg-[#292113]/80'
                    : 'bg-white/70 border-[#d5a310]/40 hover:border-[#d5a310]/70 hover:bg-white/90 shadow-lg'
                }`}
              >
                <div className="w-11 h-11 bg-[#d5a310]/20 rounded-lg flex items-center justify-center border border-[#d5a310]/40">
                  <item.icon className="w-6 h-6 text-[#d5a310]" />
                </div>
                <div className="text-left">
                  <p className="text-[#d5a310] font-bold text-lg">{item.value}</p>
                  <p className={`text-xs font-medium ${
                    theme === 'dark' ? 'text-[#f1f0eb]/70' : 'text-[#040304]/70'
                  }`}>{item.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-[#d5a310] hover:text-[#b88a0d] transition-colors group"
        >
          <span className="text-xs mb-2 font-medium opacity-80 group-hover:opacity-100">Explore More</span>
          <div className="w-6 h-10 border-2 border-[#d5a310] rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#d5a310] rounded-full"
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
