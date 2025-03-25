
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Header/Nav */}
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Grid */}
      <Features />
      
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
