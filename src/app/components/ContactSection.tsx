import { motion } from "motion/react";
import { Send, Clock, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useInView } from "./hooks/useInView";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export function ContactSection() {
  const { ref, inView } = useInView();
  const { theme } = useTheme();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const businessHours = [
    { day: "Monday - Friday", hours: "10:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "11:00 AM - 5:00 PM" },
    { day: "Sunday", hours: "By Appointment Only" },
  ];

  const faqs = [
    {
      question: "Do you offer private viewings?",
      answer: "Yes, we offer exclusive private viewings by appointment in our Manhattan showroom."
    },
    {
      question: "What certifications do your trainers have?",
      answer: "All our trainers come with certifications from recognized fitness organizations."
    },
    {
      question: "Can I commission a custom program?",
      answer: "Absolutely. Our bespoke service allows you to create unique programs tailored to your vision."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide with full insurance and secure, discreet packaging."
    },
  ];

  return (
    <section id="contact" className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#040304]' : 'bg-[#f1f0eb]'
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
            • Contact Us
          </motion.span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-3 ${
            theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
          }`}>
            Get In <span className="text-[#d5a310]">Touch</span>
          </h2>
          <p className={`text-base max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-[#f1f0eb]/70' : 'text-[#040304]/70'
          }`}>
            Ready to start your fitness journey? Contact us today for a free consultation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Left - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-2xl border-2 shadow-xl ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#292113]/60 to-[#040304]/40 backdrop-blur-sm border-[#d5a310]/30'
                : 'bg-white border-[#d5a310]/40 shadow-[#d5a310]/10'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#d5a310]/20 rounded-lg flex items-center justify-center border border-[#d5a310]/40">
                <Send className="w-5 h-5 text-[#d5a310]" />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                  Send a Message
                </h3>
                <p className={`text-xs ${theme === 'dark' ? 'text-[#f1f0eb]/60' : 'text-[#040304]/60'}`}>
                  We'll respond within 24 hours
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className={`text-sm mb-1.5 block ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                    First Name <span className="text-[#d5a310]">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={formState.firstName}
                    onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                    placeholder="John"
                    className={`${
                      theme === 'dark'
                        ? 'bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                        : 'bg-[#f1f0eb]/50 border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                    } focus:border-[#d5a310] transition-all duration-200`}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className={`text-sm mb-1.5 block ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                    Last Name <span className="text-[#d5a310]">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={formState.lastName}
                    onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                    placeholder="Doe"
                    className={`${
                      theme === 'dark'
                        ? 'bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                        : 'bg-[#f1f0eb]/50 border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                    } focus:border-[#d5a310] transition-all duration-200`}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className={`text-sm mb-1.5 block ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                  Email Address <span className="text-[#d5a310]">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@example.com"
                  className={`${
                    theme === 'dark'
                      ? 'bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                      : 'bg-[#f1f0eb]/50 border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                  } focus:border-[#d5a310] transition-all duration-200`}
                />
              </div>

              <div>
                <Label htmlFor="phone" className={`text-sm mb-1.5 block ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className={`${
                    theme === 'dark'
                      ? 'bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                      : 'bg-[#f1f0eb]/50 border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                  } focus:border-[#d5a310] transition-all duration-200`}
                />
              </div>

              <div>
                <Label htmlFor="subject" className={`text-sm mb-1.5 block ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                  Subject <span className="text-[#d5a310]">*</span>
                </Label>
                <Select value={formState.subject} onValueChange={(value) => setFormState({ ...formState, subject: value })}>
                  <SelectTrigger className={`${
                    theme === 'dark'
                      ? 'bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb]'
                      : 'bg-[#f1f0eb]/50 border-[#d5a310]/40 text-[#040304]'
                  } focus:border-[#d5a310]`}>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="membership">Membership Inquiry</SelectItem>
                    <SelectItem value="training">Personal Training</SelectItem>
                    <SelectItem value="classes">Group Classes</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className={`text-sm mb-1.5 block ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                  Message <span className="text-[#d5a310]">*</span>
                </Label>
                <Textarea
                  id="message"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell us about your fitness goals or questions..."
                  rows={4}
                  className={`${
                    theme === 'dark'
                      ? 'bg-[#040304] border-[#d5a310]/30 text-[#f1f0eb] placeholder:text-[#f1f0eb]/40'
                      : 'bg-[#f1f0eb]/50 border-[#d5a310]/40 text-[#040304] placeholder:text-[#040304]/40'
                  } focus:border-[#d5a310] resize-none transition-all duration-200`}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d5a310] text-[#040304] hover:bg-[#b88a0d] shadow-lg shadow-[#d5a310]/30 flex items-center justify-center gap-2 h-12 font-bold transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#040304]/30 border-t-[#040304] rounded-full animate-spin" />
                    Sending...
                  </>
                ) : submitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message →
                  </>
                )}
              </Button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-[#d5a310]/10 border border-[#d5a310]/30 rounded-lg text-[#d5a310] text-center text-sm"
                >
                  Thank you! We'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Right - Business Hours & Private Consultations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Business Hours */}
            <div className={`p-8 rounded-2xl border-2 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#292113]/60 to-[#040304]/40 backdrop-blur-sm border-[#d5a310]/30'
                : 'bg-white border-[#d5a310]/40 shadow-lg'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#d5a310]/20 rounded-lg flex items-center justify-center border border-[#d5a310]/40">
                  <Clock className="w-5 h-5 text-[#d5a310]" />
                </div>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`}>
                  Business Hours
                </h3>
              </div>
              <div className="space-y-3">
                {businessHours.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                    className="flex justify-between items-center py-3 border-b border-[#d5a310]/20 last:border-0"
                  >
                    <span className={`text-sm ${theme === 'dark' ? 'text-[#f1f0eb]/70' : 'text-[#040304]/70'}`}>
                      {item.day}
                    </span>
                    <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#d5a310]' : 'text-[#d5a310]'}`}>
                      {item.hours}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Private Consultations */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#040304] to-[#292113] border-2 border-[#d5a310]/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#d5a310]/20 rounded-lg flex items-center justify-center border border-[#d5a310]/40">
                  <Calendar className="w-5 h-5 text-[#d5a310]" />
                </div>
                <h3 className="text-xl font-bold text-[#f1f0eb]">
                  Private Consultations
                </h3>
              </div>
              <p className="text-sm text-[#f1f0eb]/70 mb-6 leading-relaxed">
                Schedule a private consultation with our master trainers to explore our collection in an exclusive, personalized setting.
              </p>
              <Button className="w-full bg-[#d5a310] text-[#040304] hover:bg-[#b88a0d] font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#d5a310]/30">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment →
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Common Questions / FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <h3 className={`text-2xl mb-6 ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`} style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700 }}>
            Common Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#292113]/40 border-[#d5a310]/20 hover:border-[#d5a310]/50'
                    : 'bg-white border-[#d5a310]/30 hover:border-[#d5a310]/60 shadow-md hover:shadow-lg'
                }`}
              >
                <h4 className={`mb-2 text-sm ${theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'}`} style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700 }}>
                  {faq.question}
                </h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-[#f1f0eb]/60' : 'text-[#040304]/60'}`}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}