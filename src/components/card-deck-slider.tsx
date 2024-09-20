"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardDeckSliderProps {
  children: ReactNode[];
}

export default function CardDeckSlider({ children }: CardDeckSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + children.length) % children.length,
      );
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 500000000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div className="perspective-1000 relative mx-auto max-h-[450px] w-full max-w-[400px] md:max-h-[600px]">
      {React.Children.map(children, (child, index) => {
        const offset =
          (index - currentIndex + children.length) % children.length;
        return (
          <div
            key={index}
            className="absolute h-full w-full transition-all duration-500 ease-in-out"
            style={{
              transform: `
                translateX(-50%)
                translateY(-50%)
                translateZ(${-offset * 10}px)
                rotateX(${offset * 2}deg)
              `,
              top: `calc(50% + ${offset * 5}px)`,
              left: "50%",
              zIndex: children.length - offset,
              opacity: 1 - Math.abs(offset) * 0.2,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {child}
          </div>
        );
      })}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-2/3 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-2/3 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );
}
