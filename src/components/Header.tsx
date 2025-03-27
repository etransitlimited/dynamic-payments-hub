
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
      <div className="text-4xl font-bold font-display text-[#8B5CF6] tracking-[0.15em] select-none transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-[0_6px_10px_rgba(139,92,246,0.2)]">
        ZoraCard
      </div>
      <div className="flex items-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
