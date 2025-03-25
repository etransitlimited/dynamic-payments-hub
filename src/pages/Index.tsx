
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ParticlesBackground from "@/components/ParticlesBackground";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { Check, ArrowRight, Star } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Header/Nav */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
        <div className="text-2xl font-bold text-blue-100">DigiPayPro</div>
        <LanguageSwitcher />
      </header>
      
      {/* Hero Section */}
      <section className="container mx-auto pt-16 pb-28 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100">
            {t("hero.subtitle")}
          </p>
          <Button 
            className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 text-lg px-8 py-6 rounded-lg hover:opacity-90 transition-all"
          >
            {t("hero.button")}
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto py-20 px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-display">{t("features.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card key={index} className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-6 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300">
              <div className="mb-4 text-cyan-300 text-4xl">
                {featuresIcons[index - 1]}
              </div>
              <h3 className="text-xl font-bold mb-2">{t(`features.${index}.title`)}</h3>
              <p className="text-blue-100">{t(`features.${index}.description`)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto py-20 px-4 relative z-10 bg-[#081526] rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center font-display">{t("pricing.title")}</h2>
        <p className="text-xl text-blue-100 mb-12 text-center max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-8 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all duration-300">
            <h3 className="text-2xl font-bold mb-2">{t("pricing.basic.title")}</h3>
            <div className="flex items-end mb-6">
              <span className="text-4xl font-bold text-cyan-300">{t("pricing.basic.price")}</span>
              <span className="text-blue-200 ml-1">{t("pricing.basic.period")}</span>
            </div>
            <p className="text-blue-100 mb-6">{t("pricing.basic.description")}</p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-start">
                <Check className="text-cyan-300 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t("pricing.basic.feature1")}</span>
              </li>
              <li className="flex items-start">
                <Check className="text-cyan-300 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t("pricing.basic.feature2")}</span>
              </li>
              <li className="flex items-start">
                <Check className="text-cyan-300 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t("pricing.basic.feature3")}</span>
              </li>
            </ul>
            <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white">
              {t("pricing.basic.cta")}
            </Button>
          </Card>
          
          {/* Pro Plan */}
          <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-cyan-600/50 p-8 rounded-xl scale-105 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.4)] transition-all duration-300">
            <h3 className="text-2xl font-bold mb-2">{t("pricing.pro.title")}</h3>
            <div className="flex items-end mb-6">
              <span className="text-4xl font-bold text-cyan-300">{t("pricing.pro.price")}</span>
              <span className="text-blue-200 ml-1">{t("pricing.pro.period")}</span>
            </div>
            <p className="text-blue-100 mb-6">{t("pricing.pro.description")}</p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-start">
                <Check className="text-cyan-300 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t("pricing.pro.feature1")}</span>
              </li>
              <li className="flex items-start">
                <Check className="text-cyan-300 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t("pricing.pro.feature2")}</span>
              </li>
              <li className="flex items-start">
                <Check className="text-cyan-300 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t("pricing.pro.feature3")}</span>
              </li>
            </ul>
            <Button className="w-full bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 hover:opacity-90">
              {t("pricing.pro.cta")}
            </Button>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-8 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all duration-300">
            <h3 className="text-2xl font-bold mb-2">{t("pricing.enterprise.title")}</h3>
            <div className="flex items-end mb-6">
              <span className="text-4xl font-bold text-cyan-300">{t("pricing.enterprise.price")}</span>
              <span className="text-blue-200 ml-1">{t("pricing.enterprise.period")}</span>
            </div>
            <p className="text-blue-100 mb-6">{t("pricing.enterprise.description")}</p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-start">
                <Check className="text-cyan-300 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t("pricing.enterprise.feature1")}</span>
              </li>
              <li className="flex items-start">
                <Check className="text-cyan-300 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t("pricing.enterprise.feature2")}</span>
              </li>
              <li className="flex items-start">
                <Check className="text-cyan-300 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                <span>{t("pricing.enterprise.feature3")}</span>
              </li>
            </ul>
            <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white">
              {t("pricing.enterprise.cta")}
            </Button>
          </Card>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="container mx-auto py-20 px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-display">{t("testimonials.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-6 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300">
              <div className="flex mb-4 text-cyan-300">
                <Star className="fill-cyan-300 stroke-none h-5 w-5" />
                <Star className="fill-cyan-300 stroke-none h-5 w-5" />
                <Star className="fill-cyan-300 stroke-none h-5 w-5" />
                <Star className="fill-cyan-300 stroke-none h-5 w-5" />
                <Star className="fill-cyan-300 stroke-none h-5 w-5" />
              </div>
              <p className="text-blue-100 mb-6 italic">"{t(`testimonials.${index}.quote`)}"</p>
              <div>
                <p className="font-bold">{t(`testimonials.${index}.author`)}</p>
                <p className="text-blue-300 text-sm">{t(`testimonials.${index}.position`)}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto py-16 px-4 relative z-10 mb-20">
        <div className="bg-gradient-to-r from-blue-900/60 to-cyan-900/60 backdrop-blur-md p-12 rounded-2xl text-center max-w-4xl mx-auto border border-blue-500/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">{t("hero.title")}</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">{t("hero.subtitle")}</p>
          <Button 
            className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 text-lg px-8 py-6 rounded-lg hover:opacity-90 transition-all"
          >
            {t("hero.button")}
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#081526] py-12 relative z-10">
        <div className="container mx-auto px-4 text-center text-blue-400">
          <p>© 2024 DigiPayPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Feature icons
const featuresIcons = [
  "🌏",
  "🛒",
  "📊",
  "🔒",
  "⚡",
  "🌐"
];

export default Index;
