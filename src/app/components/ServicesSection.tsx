import { motion } from "motion/react";
import { User, Zap, TrendingDown, Users as UsersIcon, Apple, ArrowRight, Dumbbell, Heart } from "lucide-react";
import { useInView } from "./hooks/useInView";
import { useTheme } from "../context/ThemeContext";

export function ServicesSection() {
  const { ref, inView } = useInView();
  const { theme } = useTheme();

  const services = [
    {
      icon: User,
      title: "Personal Training",
      description: "One-on-one coaching with certified trainers for customized workout plans and accountability.",
      image: "https://images.unsplash.com/photo-1758875568756-37a9c5c1a4f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5lciUyMGNvYWNoaW5nJTIwbW90aXZhdGlvbnxlbnwxfHx8fDE3NzM2ODM1Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Zap,
      title: "Strength & Conditioning",
      description: "Build muscle, increase power, and enhance athletic performance with expert-designed programs.",
      image: "https://images.unsplash.com/photo-1704223523409-016ec3b5779f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2R5YnVpbGRpbmclMjBtdXNjbGUlMjBtb3RpdmF0aW9ufGVufDF8fHx8MTc3MzY4MzU3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: TrendingDown,
      title: "Fat Loss Programs",
      description: "Scientifically-proven methods to burn fat, lose weight, and transform your physique.",
      image: "https://images.unsplash.com/photo-1434596922112-19c563067271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZpdG5lc3MlMjB3b3Jrb3V0JTIwZ3ltfGVufDF8fHx8MTc3MzY4MDAwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: UsersIcon,
      title: "Group Classes",
      description: "High-energy group workouts including HIIT, yoga, spinning, and functional training.",
      image: "https://images.unsplash.com/photo-1674834726923-3ba828d37846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9zc2ZpdCUyMHRyYWluaW5nJTIwbW90aXZhdGlvbnxlbnwxfHx8fDE3NzM2ODM1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Apple,
      title: "Nutrition Coaching",
      description: "Personalized meal plans and nutritional guidance to fuel your fitness journey.",
      image: "https://images.unsplash.com/photo-1606859191214-25806e8e2423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb24lMjBoZWFsdGh5JTIwbWVhbCUyMHByZXB8ZW58MXx8fHwxNzczNjM5Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Dumbbell,
      title: "Athletic Performance",
      description: "Sport-specific training programs designed to maximize your athletic potential and competitive edge.",
      image: "https://images.unsplash.com/photo-1739430548323-d3a55a714052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBtb3RpdmF0aW9uJTIwd29ya291dCUyMGludGVuc2V8ZW58MXx8fHwxNzczNjgzNTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section id="services" className={`py-20 transition-colors duration-300 relative overflow-hidden ${
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
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#d5a310] text-sm font-bold tracking-wider uppercase mb-3 inline-block"
          >
            • What We Offer
          </motion.span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
          }`}>
            Our Premium <span className="text-[#d5a310]">Services</span>
          </h2>
          <p className={`text-base max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-[#f1f0eb]/70' : 'text-[#040304]/70'
          }`}>
            Choose from our comprehensive range of fitness services designed to help you achieve your goals
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-[#040304]/80 to-[#2c2c2c]/40 backdrop-blur-sm border-[#d5a310]/20 hover:border-[#d5a310]/60 hover:shadow-[#d5a310]/20'
                  : 'bg-white border-[#d5a310]/30 hover:border-[#d5a310]/70 shadow-md hover:shadow-[#d5a310]/30'
              }`}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  theme === 'dark' 
                    ? 'from-[#040304] via-[#040304]/60' 
                    : 'from-white via-white/60'
                } to-transparent`} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#d5a310]/0 group-hover:bg-[#d5a310]/20 transition-all duration-300" />
                
                {/* Icon on image */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-4 left-4 w-12 h-12 bg-[#d5a310]/90 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-[#d5a310] group-hover:bg-[#d5a310] transition-all duration-300 shadow-lg"
                >
                  <service.icon className="w-6 h-6 text-[#040304]" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className={`text-lg font-bold mb-2 group-hover:text-[#d5a310] transition-colors duration-300 ${
                  theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed line-clamp-3 ${
                  theme === 'dark' ? 'text-[#f1f0eb]/70' : 'text-[#040304]/70'
                }`}>{service.description}</p>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-[#d5a310] hover:gap-3 transition-all duration-300 text-sm font-semibold group-hover:underline"
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#d5a310]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}</motion.div>
      </div>
    </section>
  );
}