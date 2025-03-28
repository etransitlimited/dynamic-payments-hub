
import React from 'react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import MapSection from '@/components/sections/MapSection';
import UseCases from '@/components/sections/UseCases';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';
import Footer from '@/components/sections/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticlesBackground />
      <div className="relative z-10">
        <Hero />
        <Features />
        <MapSection />
        <UseCases />
        <Testimonials />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
