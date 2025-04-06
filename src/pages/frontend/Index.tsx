
import React from 'react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import MapSection from '@/components/sections/MapSection';
import UseCases from '@/components/sections/UseCases';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';
import Footer from '@/components/sections/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from "react-router-dom";
import { useSEO } from "@/utils/seo";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const { getMetadata } = useSEO({});
  const metadata = getMetadata(location.pathname, language);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Helmet>
        <title>{metadata.title}</title>
        {metadata.meta.map((meta, index) => (
          <meta key={`meta-${index}`} {...meta} />
        ))}
        {metadata.script.map((script, index) => (
          <script key={`script-${index}`} {...script} />
        ))}
      </Helmet>
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
