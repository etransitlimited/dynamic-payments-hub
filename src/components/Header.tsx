
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
      <div className="text-4xl font-bold font-display text-[#D946EF] tracking-[0.2em] select-none transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-[0_5px_15px_rgba(217,70,239,0.25)]">
        ZoraCard
      </div>
      <div className="flex items-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
