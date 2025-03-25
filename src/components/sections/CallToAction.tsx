
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const CallToAction = () => {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto py-16 px-4 relative z-10 mb-20">
      <div className="bg-gradient-to-r from-blue-900/60 to-cyan-900/60 backdrop-blur-md p-12 rounded-2xl text-center max-w-4xl mx-auto border border-blue-500/20">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">{t("cta.title")}</h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
        <Button 
          className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 text-lg px-8 py-6 rounded-lg hover:opacity-90 transition-all"
        >
          {t("cta.button")}
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
