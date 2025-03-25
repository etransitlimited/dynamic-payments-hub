
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import UseCases from "@/components/sections/UseCases";
import MapSection from "@/components/sections/MapSection";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Header/Nav */}
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Grid */}
      <Features />
      
      {/* Use Cases Section */}
      <UseCases />
      
      {/* World Map Section */}
      <MapSection />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* CTA Section */}
      <CallToAction />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
