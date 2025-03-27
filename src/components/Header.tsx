
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent tracking-wider uppercase letter-spacing-2 font-display">
        ZoraCard
      </div>
      <div className="flex items-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
