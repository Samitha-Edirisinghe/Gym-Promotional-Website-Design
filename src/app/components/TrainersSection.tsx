import { motion, AnimatePresence } from "motion/react";
import { Instagram, Linkedin, Twitter, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useInView } from "./hooks/useInView";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";

export function TrainersSection() {
  const { ref, inView } = useInView();
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const trainers = [
    {
      name: "Marcus Johnson",
      specialty: "Strength & Conditioning",
      experience: "12 Years Experience",
      image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5lciUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzY1MDM5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Former Olympic athlete specializing in strength training and athletic performance",
      certifications: ["NASM-CPT", "CSCS", "Olympic Lifting"],
      clients: "500+",
      rating: 4.9,
    },
    {
      name: "Sarah Mitchell",
      specialty: "Yoga & Wellness",
      experience: "8 Years Experience",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwZXJzb25hbCUyMHRyYWluZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczNzI3NzI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Certified yoga instructor and holistic wellness coach helping clients find balance",
      certifications: ["RYT-500", "Wellness Coach", "Nutrition Spec"],
      clients: "350+",
      rating: 5.0,
    },
    {
      name: "David Chen",
      specialty: "HIIT & Fat Loss",
      experience: "10 Years Experience",
      image: "https://images.unsplash.com/photo-1585757318177-0570a997dc3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZml0bmVzcyUyMGNvYWNoJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MzcyNzcyNXww&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Expert in high-intensity training with proven track record of client transformations",
      certifications: ["ACE-CPT", "TRX Certified", "Kettlebell Spec"],
      clients: "450+",
      rating: 4.8,
    },
    {
      name: "Elena Rodriguez",
      specialty: "Nutrition & Lifestyle",
      experience: "9 Years Experience",
      image: "https://images.unsplash.com/photo-1758875569897-5e214ccc4e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHRyYWluZXIlMjBjb2FjaCUyMHBvcnRyYWl0JTIwZ3ltfGVufDF8fHx8MTc3MzcyNzczMHww&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Registered dietitian specializing in sports nutrition and sustainable lifestyle changes",
      certifications: ["RD", "CSSD", "Precision Nutrition"],
      clients: "400+",
      rating: 4.9,
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trainers.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [trainers.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trainers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + trainers.length) % trainers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTrainer = trainers[currentIndex];

  return (
    <section id="trainers" className={`py-20 transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' ? 'bg-[#292113]' : 'bg-white'
    }`} ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${theme === 'dark' ? '#d5a310' : '#2c2c2c'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#d5a310] text-sm font-bold tracking-wider uppercase mb-3 inline-block"
          >
            • Our Team
          </motion.span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-3 ${
            theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
          }`}>
            Meet Our Expert <span className="text-[#d5a310]">Trainers</span>
          </h2>
          <p className={`text-base max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-[#f1f0eb]/70' : 'text-[#040304]/70'
          }`}>
            World-class certified professionals dedicated to helping you achieve your fitness goals
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              {/* Left - Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className={`relative rounded-2xl overflow-hidden border-2 shadow-2xl ${
                  theme === 'dark'
                    ? 'border-[#d5a310]/30 shadow-[#d5a310]/20'
                    : 'border-[#d5a310]/40 shadow-[#d5a310]/30'
                }`}>
                  <img
                    src={currentTrainer.image}
                    alt={currentTrainer.name}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    theme === 'dark'
                      ? 'from-[#040304]/60 via-transparent'
                      : 'from-white/60 via-transparent'
                  } to-transparent`} />
                  
                  {/* Stats Badge */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                    <div className={`flex-1 p-4 rounded-xl backdrop-blur-md border ${
                      theme === 'dark'
                        ? 'bg-[#292113]/80 border-[#d5a310]/30'
                        : 'bg-white/90 border-[#d5a310]/40'
                    }`}>
                      <p className="text-[#d5a310] text-xs font-semibold mb-1">Clients Trained</p>
                      <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                        {currentTrainer.clients}
                      </p>
                    </div>
                    <div className={`flex-1 p-4 rounded-xl backdrop-blur-md border ${
                      theme === 'dark'
                        ? 'bg-[#292113]/80 border-[#d5a310]/30'
                        : 'bg-white/90 border-[#d5a310]/40'
                    }`}>
                      <p className="text-[#d5a310] text-xs font-semibold mb-1">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-[#d5a310] text-[#d5a310]" />
                        <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                          {currentTrainer.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right - Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <motion.span
                    className="text-[#d5a310] text-sm font-bold tracking-wider uppercase mb-2 inline-block"
                  >
                    {currentTrainer.specialty}
                  </motion.span>
                  <h3 className={`text-4xl md:text-5xl font-bold mb-3 ${
                    theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                  }`}>
                    {currentTrainer.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    theme === 'dark' ? 'text-[#f1f0eb]/60' : 'text-[#040304]/60'
                  }`}>
                    {currentTrainer.experience}
                  </p>
                  <p className={`text-base leading-relaxed mb-6 ${
                    theme === 'dark' ? 'text-[#f1f0eb]/80' : 'text-[#040304]/80'
                  }`}>
                    {currentTrainer.bio}
                  </p>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className={`text-sm font-bold mb-3 ${
                    theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                  }`}>
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentTrainer.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                          theme === 'dark'
                            ? 'bg-[#d5a310]/10 border-[#d5a310]/30 text-[#d5a310]'
                            : 'bg-[#d5a310]/10 border-[#d5a310]/40 text-[#d5a310]'
                        }`}
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links & CTA */}
                <div className="flex items-center gap-4 pt-4">
                  <Button className="bg-[#d5a310] text-[#040304] hover:bg-[#b88a0d] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#d5a310]/30 px-8">
                    Book a Session →
                  </Button>
                  <div className="flex gap-2">
                    {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-[#d5a310]/10 hover:bg-[#d5a310]/20 flex items-center justify-center border border-[#d5a310]/30 hover:border-[#d5a310]/50 transition-all duration-300"
                      >
                        <Icon className="w-4 h-4 text-[#d5a310]" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className={`w-12 h-12 rounded-full border-2 border-[#d5a310] flex items-center justify-center transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#040304]/50 hover:bg-[#d5a310] text-[#d5a310] hover:text-[#040304]'
                  : 'bg-white hover:bg-[#d5a310] text-[#d5a310] hover:text-[#040304]'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {trainers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[#d5a310]'
                      : 'w-2 bg-[#d5a310]/30 hover:bg-[#d5a310]/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className={`w-12 h-12 rounded-full border-2 border-[#d5a310] flex items-center justify-center transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#040304]/50 hover:bg-[#d5a310] text-[#d5a310] hover:text-[#040304]'
                  : 'bg-white hover:bg-[#d5a310] text-[#d5a310] hover:text-[#040304]'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}