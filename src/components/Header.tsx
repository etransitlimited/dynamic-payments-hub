
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OptimizedImage from "@/components/OptimizedImage";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="container mx-auto py-4 md:py-6 px-4 flex justify-between items-center relative z-10">
      <div className="flex items-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <OptimizedImage
          src="/lovable-uploads/210afb0c-e7a8-4827-b6eb-153a96b5eb34.png"
          alt="ZoraCard Logo"
          width={isMobile ? 180 : 240}
          height={isMobile ? 63 : 84}
          className="h-9 xs:h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
          priority={true}
        />
      </div>
      <div className="flex items-center self-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
