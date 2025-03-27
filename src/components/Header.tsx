
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
      <div className="text-4xl font-bold font-display text-[#33C3F0] tracking-widest select-none transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-[0_4px_6px_rgba(51,195,240,0.3)]">
        ZoraCard
      </div>
      <div className="flex items-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
