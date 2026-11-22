import React from 'react';
import { ChevronLeft, ChevronRight, Target, Clock, CheckCircle } from 'lucide-react';

// Focus Notes slides content - based on typical productivity dashboard design
const focusNotesSlides = [
  {
    id: 1,
    title: "Plan your day",
    description: "Organise your priorities and focus on what matters most. Start with the most important task.",
    icon: Target,
    iconColor: "primary"
  },
  {
    id: 2,
    title: "Time blocking works",
    description: "Allocate specific time slots for deep work. Protect your focus time from distractions.",
    icon: Clock,
    iconColor: "warning"
  },
  {
    id: 3,
    title: "Celebrate progress",
    description: "Track completed tasks and acknowledge your wins. Small steps lead to big achievements.",
    icon: CheckCircle,
    iconColor: "success"
  }
];

export default function FocusNotes() {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const goToPrevious = () => {
    setActiveSlide((prev) => (prev === 0 ? focusNotesSlides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveSlide((prev) => (prev === focusNotesSlides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const currentSlide = focusNotesSlides[activeSlide];
  const SlideIcon = currentSlide.icon;

  return (
    <section className="carousel-section" aria-labelledby="focus-notes-title">
      <div className="section-header">
        <h2 id="focus-notes-title" className="section-title">Focus Notes</h2>
        <span className="stat-sublabel" aria-live="polite">
          {activeSlide + 1} of {focusNotesSlides.length}
        </span>
      </div>

      <div className="carousel" role="region" aria-label="Focus Notes carousel">
        {/* Slide content */}
        <div className="carousel-slide" role="group" aria-roletype="group" aria-label={`Slide ${activeSlide + 1}: ${currentSlide.title}`}>
          <div className="carousel-slide-content">
            <h3 className="carousel-slide-title">{currentSlide.title}</h3>
            <p className="carousel-slide-desc">{currentSlide.description}</p>
          </div>
          <div className={`carousel-slide-icon ${currentSlide.iconColor}`} aria-hidden="true">
            <SlideIcon size={24} strokeWidth={2} />
          </div>
        </div>

        {/* Controls */}
        <div className="carousel-controls">
          <button
            className="carousel-btn"
            onClick={goToPrevious}
            aria-label="Previous slide"
            disabled={false}
          >
            <ChevronLeft size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>

          <div className="carousel-indicators" role="tablist" aria-label="Slide indicators">
            {focusNotesSlides.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === activeSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={index === activeSlide}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="carousel-btn"
            onClick={goToNext}
            aria-label="Next slide"
            disabled={false}
          >
            <ChevronRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}