
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
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
  );
};

export default Hero;
