import React, { useEffect, useRef } from "react";
import { FaUtensils, FaHandshake, FaHandsHelping } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: <FaUtensils size={30} className="text-primary" />,
    title: "Restaurants Donate",
    description: "Restaurants list surplus food with details and pickup times.",
    bgClass: "bg-secondary/20",
    hoverBgClass: "group-hover:bg-secondary/30",
  },
  {
    icon: <FaHandshake size={30} className="text-primary" />,
    title: "Charities Request",
    description: "Verified charities browse donations and request pickups.",
    bgClass: "bg-secondary/20",
    hoverBgClass: "group-hover:bg-secondary/30",
  },
  {
    icon: <FaHandsHelping size={30} className="text-primary" />,
    title: "We Connect Them",
    description: "We link restaurants and charities for smooth handovers.",
    bgClass: "bg-secondary/20",
    hoverBgClass: "group-hover:bg-secondary/30",
  },
];

const HowItWorks = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current[0].parentNode, // the grid container
            start: "top 130%",
          },
        }
      );
    }
  }, []);

  return (
    <section className="text-center py-10">
      <h2 className="text-3xl font-bold mb-8 text-accent">How It Works</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="flex flex-col items-center p-6 border border-neutral rounded-lg shadow hover:shadow-lg transition group relative overflow-hidden bg-base-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div
              className={`w-20 h-20 flex items-center justify-center rounded-full mb-4 transition-colors duration-300 ${step.bgClass} ${step.hoverBgClass}`}
            >
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-accent">{step.title}</h3>
            <p className="text-accent/80">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
