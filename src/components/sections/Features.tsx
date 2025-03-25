
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

// Feature icons
const featuresIcons = [
  "🌏",
  "🛒",
  "📊",
  "🔒",
  "⚡",
  "🌐"
];

const Features = () => {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto py-20 px-4 relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-display">
        {t("features.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Card key={index} className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-6 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300">
            <div className="mb-4 text-cyan-300 text-4xl">
              {featuresIcons[index - 1]}
            </div>
            <h3 className="text-xl font-bold mb-2">
              {t(`features.${index}.title`)}
            </h3>
            <p className="text-blue-100">
              {t(`features.${index}.description`)}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
