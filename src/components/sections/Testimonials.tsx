
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { Star } from "lucide-react";

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto py-20 px-4 relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-display">
        {t("testimonials.title")}
      </h2>
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
  );
};

export default Testimonials;
