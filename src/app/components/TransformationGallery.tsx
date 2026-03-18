import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { useTheme } from "../context/ThemeContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function TransformationGallery() {
  const { ref, inView } = useInView();
  const { theme } = useTheme();

  const transformations = [
    {
      name: "John Davis",
      period: "6 Months",
      weightLost: "45 lbs",
      image: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhbnNmb3JtYXRpb24lMjBiZWZvcmUlMjBhZnRlcnxlbnwxfHx8fDE3NzM2NzEwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Sarah Thompson",
      period: "4 Months",
      weightLost: "30 lbs",
      image: "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWlnaHQlMjBsb3NzJTIwc3VjY2VzcyUyMHRyYW5zZm9ybWF0aW9ufGVufDF8fHx8MTc3MzY1ODE4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Mike Rodriguez",
      period: "8 Months",
      weightLost: "60 lbs",
      image: "https://images.unsplash.com/photo-1765303191119-89d0221d5c0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNjdWxhciUyMGF0aGxldGUlMjBpbnRlbnNlJTIwZ3ltJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzczNjgwMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Emily Chen",
      period: "5 Months",
      weightLost: "35 lbs",
      image: "https://images.unsplash.com/photo-1758875569220-6934933d443c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMGZlbWFsZSUyMHBlcnNvbmFsJTIwdHJhaW5lcnxlbnwxfHx8fDE3NzM2ODAyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="transformations" className={`py-24 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#040304]' : 'bg-white'
    }`} ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
          }`}>
            Success <span className="text-[#d5a310]">Stories</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-[#f1f0eb]/70' : 'text-[#040304]/70'
          }`}>
            Real transformations from real people who trusted us with their fitness journey
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="transformation-slider"
        >
          <Slider {...settings}>
            {transformations.map((transformation, index) => (
              <div key={index} className="px-4">
                <div className={`relative group rounded-2xl overflow-hidden border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#292113] border-[#d5a310]/20 hover:border-[#d5a310]/50'
                    : 'bg-white border-[#d5a310]/30 hover:border-[#d5a310]/60 shadow-lg'
                }`}>
                  {/* Image */}
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={transformation.image}
                      alt={transformation.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      theme === 'dark'
                        ? 'from-[#040304] via-[#040304]/30'
                        : 'from-white via-white/30'
                    } to-transparent`} />
                    
                    {/* Stats Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className={`text-xl font-semibold mb-2 ${
                        theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                      }`}>
                        {transformation.name}
                      </h3>
                      <div className="flex gap-4">
                        <div className="bg-[#d5a310]/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#d5a310]/30">
                          <p className="text-[#d5a310] text-sm">Duration</p>
                          <p className={`font-semibold ${
                            theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                          }`}>{transformation.period}</p>
                        </div>
                        <div className="bg-[#d5a310]/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#d5a310]/30">
                          <p className="text-[#d5a310] text-sm">Lost</p>
                          <p className={`font-semibold ${
                            theme === 'dark' ? 'text-[#f1f0eb]' : 'text-[#040304]'
                          }`}>{transformation.weightLost}</p>
                        </div>
                      </div>
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
        .transformation-slider .slick-dots {
          bottom: -50px;
        }
        .transformation-slider .slick-dots li button:before {
          color: #d5a310;
          opacity: 0.3;
          font-size: 10px;
        }
        .transformation-slider .slick-dots li.slick-active button:before {
          color: #d5a310;
          opacity: 1;
        }
        .transformation-slider .slick-prev,
        .transformation-slider .slick-next {
          z-index: 1;
        }
        .transformation-slider .slick-prev:before,
        .transformation-slider .slick-next:before {
          color: #d5a310;
          font-size: 30px;
        }
      `}</style>
    </section>
  );
}