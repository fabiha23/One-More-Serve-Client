import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import bannerImg from '../../assets/banner1.jpg';

const Banner = () => {
  const titlesRef = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

    // Initial setup - hide all titles except first
    gsap.set(titlesRef.current, { opacity: 0, y: 20 });
    gsap.set(titlesRef.current[0], { opacity: 1, y: 0 });

    // Animation sequence
    titlesRef.current.forEach((el) => {
      tl.to(el, { opacity: 1, y: 0, duration: 1 })
        .to(el, { opacity: 0, y: -20, delay: 1, duration: 1 });
    });
  }, []);

  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-neutral overflow-hidden"
      style={{ backgroundImage: `url(${bannerImg}) `}}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Banner content */}
      <div className="z-10 text-center px-4 w-full">
        <div 
          ref={containerRef}
          className="max-w-3xl mx-auto relative"
          style={{ height: '200px' }} // Fixed height container
        >
          {[
            "Rescue Food, Restore Hope — Sharing Every Extra Meal",
            "One Donation, One Meal, One Community at a Time",
            "One Platform, Countless Meals — For Those in Need"
          ].map((text, index) => (
            <h1
              key={index}
              ref={(el) => (titlesRef.current[index] = el)}
              className="text-4xl md:text-5xl font-bold absolute top-0 left-0 w-full h-full flex items-center justify-center px-4 opacity-0"
              style={{ transform: 'translateY(20px)' }}
            >
              <span className="block w-full text-center leading-tight">{text}</span>
            </h1>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;