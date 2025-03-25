
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
      <div className="text-2xl font-bold text-blue-100">SagerSuper</div>
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
