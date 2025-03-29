
import { useLanguage } from "@/context/LanguageContext";
import FrontendLanguageSwitcher from "@/components/frontend/LanguageSwitcher";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  return (
    <header className="container mx-auto py-4 px-4 sm:py-5 md:py-6 flex justify-between items-center relative z-10">
      <div className="text-white font-medium">
        {/* Logo/brand placement */}
      </div>
      <div className="flex items-center">
        <FrontendLanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
