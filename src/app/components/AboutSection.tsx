import { motion } from "motion/react";
import { Lightbulb, Target, TrendingUp, Check, Star, Users } from "lucide-react";
import { useInView } from "./hooks/useInView";
import { useTheme } from "../context/ThemeContext";

export function AboutSection() {
  const { ref, inView } = useInView();
  const { theme } = useTheme();

  return (
    <section
      id="about"
      className={`py-20 transition-colors duration-300 relative overflow-hidden ${
        theme === "dark" ? "bg-[#040304]" : "bg-[#f1f0eb]"
      }`}
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${theme === 'dark' ? '#d5a310' : '#2c2c2c'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#d5a310] text-sm font-bold tracking-wider uppercase mb-3 inline-block"
            >
              • About Our Gym
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight ${
                theme === "dark" ? "text-[#f1f0eb]" : "text-[#040304]"
              }`}
            >
              Empowering your fitness
              journey <span className="text-[#d5a310]">every day</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`text-base mb-8 leading-relaxed ${
                theme === "dark" ? "text-[#f1f0eb]/70" : "text-[#040304]/70"
              }`}
            >
              We are a modern fitness center committed to helping individuals achieve strength,
              health and confidence through expert guidance and proven training methods.
            </motion.p>

            {/* Mission & Vision Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-[#292113]/50 to-[#040304]/30 border-[#d5a310]/30 hover:border-[#d5a310]/60"
                    : "bg-white border-[#d5a310]/30 hover:border-[#d5a310]/60 shadow-md hover:shadow-lg"
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-11 h-11 bg-[#d5a310]/20 rounded-full flex items-center justify-center mb-3 border-2 border-[#d5a310]/40"
                >
                  <Lightbulb className="w-5 h-5 text-[#d5a310]" />
                </motion.div>
                <h3
                  className={`text-base font-bold mb-2 ${
                    theme === "dark" ? "text-[#f1f0eb]" : "text-[#040304]"
                  }`}
                >
                  Our Mission
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-[#f1f0eb]/60" : "text-[#040304]/60"
                  }`}
                >
                  Our mission is to inspire and empower individuals to live healthier, stronger lives through expert fitness
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-[#292113]/50 to-[#040304]/30 border-[#d5a310]/30 hover:border-[#d5a310]/60"
                    : "bg-white border-[#d5a310]/30 hover:border-[#d5a310]/60 shadow-md hover:shadow-lg"
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-11 h-11 bg-[#d5a310]/20 rounded-full flex items-center justify-center mb-3 border-2 border-[#d5a310]/40"
                >
                  <Target className="w-5 h-5 text-[#d5a310]" />
                </motion.div>
                <h3
                  className={`text-base font-bold mb-2 ${
                    theme === "dark" ? "text-[#f1f0eb]" : "text-[#040304]"
                  }`}
                >
                  Our Vision
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-[#f1f0eb]/60" : "text-[#040304]/60"
                  }`}
                >
                  Our vision is to become a trusted fitness destination that transforms communities by promoting active lifestyles
                </p>
              </motion.div>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-7">
              {["Encouraging healthy", "Building Stronger Healthier"].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 bg-[#d5a310] rounded-full" />
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-[#f1f0eb]/80" : "text-[#040304]/80"
                    }`}
                  >
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#d5a310] text-[#040304] px-7 py-3 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-[#b88a0d] transition-all duration-300 shadow-lg shadow-[#d5a310]/30 hover:shadow-[#d5a310]/50"
            >
              More About Us
              <span className="text-lg">→</span>
            </motion.button>
          </motion.div>

          {/* Right Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Google Review Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`col-span-2 rounded-2xl p-6 border-2 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-[#292113]/60 to-[#040304]/40 backdrop-blur-sm border-[#d5a310]/30"
                    : "bg-white border-[#d5a310]/40 shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d5a310]/40 to-[#b88a0d]/20 border-2 border-[#d5a310]/60"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <span className="text-2xl font-bold text-[#4285f4]">G</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className={`text-3xl font-bold ${
                      theme === "dark" ? "text-[#f1f0eb]" : "text-[#040304]"
                    }`}
                  >
                    4.9/5
                  </span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d5a310] text-[#d5a310]" />
                    ))}
                  </div>
                </div>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-[#f1f0eb]/60" : "text-[#040304]/60"
                  }`}
                >
                  Based on 250 review
                </p>
              </motion.div>

              {/* Training Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative h-52 rounded-2xl overflow-hidden group border-2 border-[#d5a310]/30"
              >
                <img
                  src="https://images.unsplash.com/photo-1738523686534-7055df5858d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwY291cGxlJTIwdHJhaW5pbmclMjB0b2dldGhlciUyMGd5bXxlbnwxfHx8fDE3NzM3Mjc1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Gym Training"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040304]/70 via-[#040304]/20 to-transparent" />
              </motion.div>

              {/* Stats Card - 30+ Certified */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#040304] to-[#292113] flex flex-col items-center justify-center p-6 border-2 border-[#d5a310]/40"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 bg-[#d5a310]/20 rounded-full flex items-center justify-center mb-3 border-2 border-[#d5a310]/60"
                >
                  <TrendingUp className="w-7 h-7 text-[#d5a310]" />
                </motion.div>
                <h3 className="text-5xl font-bold text-[#d5a310] mb-1">30+</h3>
                <p className="text-white text-center text-sm font-medium">Certified Fitness</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
