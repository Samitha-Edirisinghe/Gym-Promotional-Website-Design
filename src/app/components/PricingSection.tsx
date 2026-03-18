import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useInView } from "./hooks/useInView";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export function PricingSection() {
  const { ref, inView } = useInView();
  const { theme } = useTheme();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "BASIC PLAN",
      price: billingCycle === "monthly" ? 12 : 120,
      description: "Perfect for beginners starting their fitness journey",
      features: [
        "Access to gym equipment",
        "Locker room access",
        "Free wifi access",
        "1 Group class per week",
        "Fitness assessment",
        "Mobile app access"
      ],
      popular: false,
    },
    {
      name: "PREMIUM PLAN",
      price: billingCycle === "monthly" ? 20 : 200,
      description: "Most popular plan with comprehensive benefits",
      features: [
        "All Basic Plan features",
        "Unlimited group classes",
        "Personal trainer consultation",
        "Nutrition guidance",
        "Free guest passes (2/month)",
        "Priority booking",
        "Sauna & steam room"
      ],
      popular: true,
    },
    {
      name: "PRO PLAN",
      price: billingCycle === "monthly" ? 30 : 300,
      description: "Ultimate package for serious fitness enthusiasts",
      features: [
        "All Premium Plan features",
        "4 Personal training sessions",
        "Advanced body composition",
        "Meal planning service",
        "Massage therapy (1/month)",
        "VIP locker room",
        "24/7 gym access"
      ],
      popular: false,
    },
  ];

  return (
    <section
      id="plans"
      ref={ref}
      className={`py-24 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-[#2c2c2c]"
          : "bg-gradient-to-br from-[#f1f0eb] to-[#e5e4df]"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-5xl md:text-6xl font-bold mb-4 ${
              theme === "dark" ? "text-[#f1f0eb]" : "text-[#040304]"
            }`}
          >
            SIMPLE, <span className="text-[#d5a310]">TRANSPARENT</span> PRICING
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-lg max-w-2xl mx-auto ${
              theme === "dark" ? "text-[#f1f0eb]/70" : "text-[#040304]/70"
            }`}
          >
            Choose the perfect plan that fits your fitness goals and budget
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span
              className={`text-base font-bold transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "text-[#d5a310] scale-110"
                  : theme === "dark"
                  ? "text-[#f1f0eb]/50"
                  : "text-[#040304]/50"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
              }
              className={`relative w-20 h-10 rounded-full transition-all duration-300 border-2 ${
                billingCycle === "yearly" 
                  ? "bg-[#d5a310] border-[#d5a310] shadow-lg shadow-[#d5a310]/30" 
                  : theme === "dark"
                  ? "bg-[#2c2c2c] border-[#d5a310]/30"
                  : "bg-[#2c2c2c] border-[#d5a310]/30"
              }`}
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`absolute top-1 w-7 h-7 rounded-full shadow-md ${
                  billingCycle === "yearly" ? "bg-white left-[45px]" : "bg-[#d5a310] left-1"
                }`}
              />
            </button>
            <div className="flex flex-col items-start">
              <span
                className={`text-base font-bold transition-all duration-300 ${
                  billingCycle === "yearly"
                    ? "text-[#d5a310] scale-110"
                    : theme === "dark"
                    ? "text-[#f1f0eb]/50"
                    : "text-[#040304]/50"
                }`}
              >
                Yearly
              </span>
              <span className="text-[#d5a310] text-xs font-bold">(Save 17%)</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{
                y: -12,
                transition: { duration: 0.3 },
              }}
              style={{
                marginTop: plan.name === "PRO PLAN" ? "-5px" : "0px"
              }}
              className={`relative rounded-3xl p-8 border-2 transition-all duration-500 flex flex-col ${
                plan.popular
                  ? `bg-gradient-to-br from-[#d5a310] to-[#b88a0d] border-[#d5a310] shadow-2xl shadow-[#d5a310]/30 ${
                      index === 1 ? "lg:scale-105" : ""
                    }`
                  : theme === "dark"
                  ? "bg-[#2c2c2c]/50 backdrop-blur-sm border-[#d5a310]/20 hover:border-[#d5a310]/50"
                  : "bg-white/80 backdrop-blur-sm border-[#d5a310]/30 hover:border-[#d5a310]/60"
              }`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#040304] text-[#d5a310] px-4 py-1 rounded-full text-sm font-bold"
                >
                  MOST POPULAR
                </motion.div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3
                  className={`text-lg font-bold tracking-wider mb-6 ${
                    plan.popular ? "text-white" : "text-[#d5a310]"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className={`text-6xl font-bold ${
                      plan.popular ? "text-white" : theme === "dark" ? "text-[#f1f0eb]" : "text-[#040304]"
                    }`}
                  >
                    ${plan.price}
                  </motion.span>
                  <span
                    className={`text-lg ml-2 ${
                      plan.popular ? "text-white/90" : "text-[#d5a310]"
                    }`}
                  >
                    / {billingCycle === "monthly" ? "Month" : "Year"}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    plan.popular
                      ? "text-white/80"
                      : theme === "dark"
                      ? "text-[#f1f0eb]/60"
                      : "text-[#040304]/60"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Separator */}
              <div
                className={`w-full h-px mb-6 ${
                  plan.popular
                    ? "bg-white/30"
                    : theme === "dark"
                    ? "bg-[#d5a310]/20"
                    : "bg-[#d5a310]/30"
                }`}
              />

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.5 + index * 0.1 + featureIndex * 0.05,
                    }}
                    className="flex items-start gap-3"
                  >
                    <Check
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-white" : "text-[#d5a310]"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.popular
                          ? "text-white"
                          : theme === "dark"
                          ? "text-[#f1f0eb]/80"
                          : "text-[#040304]/80"
                      }`}
                    >
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 border-2 ${
                  plan.popular
                    ? "bg-[#040304] text-[#d5a310] border-[#040304] hover:bg-[#292113] shadow-lg"
                    : theme === "dark"
                    ? "bg-transparent text-[#d5a310] border-[#d5a310] hover:bg-[#d5a310] hover:text-[#040304]"
                    : "bg-transparent text-[#d5a310] border-[#d5a310] hover:bg-[#d5a310] hover:text-[#040304]"
                }`}
              >
                Learn More →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className={`text-center mt-12 text-sm ${
            theme === "dark" ? "text-[#f1f0eb]/50" : "text-[#040304]/50"
          }`}
        >
          All plans include access to our state-of-the-art facilities and equipment.
          <br />
          Cancel anytime with no hidden fees.
        </motion.p>
      </div>
    </section>
  );
}