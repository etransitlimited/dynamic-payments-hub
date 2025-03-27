
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OptimizedImage from "@/components/OptimizedImage";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="container mx-auto py-4 md:py-6 px-4 relative z-10">
      {/* Logo as a separate layer */}
      <div className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-20">
        <div className="transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <OptimizedImage
            src="/lovable-uploads/210afb0c-e7a8-4827-b6eb-153a96b5eb34.png"
            alt="ZoraCard Logo"
            width={isMobile ? 720 : 960} // 4x larger than original (180->720, 240->960)
            height={isMobile ? 252 : 336} // 4x larger than original (63->252, 84->336)
            className="h-16 xs:h-20 sm:h-24 md:h-32 lg:h-40 w-auto object-contain" // Increased height classes
            priority={true}
          />
        </div>
      </div>
      
      {/* Language switcher aligned to the right */}
      <div className="flex justify-end items-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
