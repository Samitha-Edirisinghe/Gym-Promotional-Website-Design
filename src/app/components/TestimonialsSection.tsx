import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { useInView } from "./hooks/useInView";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function TestimonialsSection() {
  const { ref, inView } = useInView();

  const testimonials = [
    {
      name: "Alex Martinez",
      role: "Business Executive",
      image: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwZml0bmVzcyUyMHRyYWluZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM2ODAyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      text: "This gym has completely transformed my life. The trainers are professional, the equipment is top-notch, and the community is incredibly supportive. I've achieved results I never thought possible.",
    },
    {
      name: "Jessica Williams",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1664673531303-c933ac4cee70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjBmaXRuZXNzJTIwdHJhaW5lciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzY4MDI1NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      text: "Best investment I've made in myself. The personalized training program and nutrition coaching helped me lose 40 pounds in 6 months. The staff genuinely cares about your success.",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1758875568932-0eefd3e60090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMG1hbGUlMjBwZXJzb25hbCUyMHRyYWluZXJ8ZW58MXx8fHwxNzczNjU2MTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      text: "The premium facilities and expert trainers make this gym worth every penny. I love the variety of classes and the state-of-the-art equipment. Highly recommend!",
    },
    {
      name: "Sophia Anderson",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1758875569220-6934933d443c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMGZlbWFsZSUyMHBlcnNvbmFsJTIwdHJhaW5lcnxlbnwxfHx8fDE3NzM2ODAyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      text: "As a busy entrepreneur, I needed a gym that could accommodate my schedule and deliver results quickly. This place exceeded all my expectations. The trainers are amazing!",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="testimonials" className="py-20 bg-[#f1f0eb]" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#040304] mb-4">
            What Our Members <span className="text-[#d5a310]">Say</span>
          </h2>
          <p className="text-[#040304]/70 text-lg max-w-2xl mx-auto">
            Hear from our satisfied members about their transformation journey
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="testimonials-slider"
        >
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#d5a310]/10">
                  {/* Quote Icon */}
                  <Quote className="w-12 h-12 text-[#d5a310]/20 mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#d5a310] text-[#d5a310]" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-[#040304]/80 mb-6 leading-relaxed">{testimonial.text}</p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#d5a310]"
                    />
                    <div>
                      <h4 className="font-semibold text-[#040304]">{testimonial.name}</h4>
                      <p className="text-[#040304]/60 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>

      {/* Custom Slider Styles */}
      <style>{`
        .testimonials-slider .slick-dots {
          bottom: -50px;
        }
        .testimonials-slider .slick-dots li button:before {
          color: #d5a310;
          opacity: 0.3;
          font-size: 10px;
        }
        .testimonials-slider .slick-dots li.slick-active button:before {
          color: #d5a310;
          opacity: 1;
        }
        .testimonials-slider .slick-prev,
        .testimonials-slider .slick-next {
          z-index: 1;
        }
        .testimonials-slider .slick-prev:before,
        .testimonials-slider .slick-next:before {
          color: #d5a310;
          font-size: 30px;
        }
      `}</style>
    </section>
  );
}
