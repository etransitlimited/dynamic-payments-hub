
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OptimizedImage from "@/components/OptimizedImage";
import { useIsMobile } from "@/hooks/use-mobile";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="container mx-auto py-4 md:py-6 px-4 relative z-50">
      {/* Language switcher aligned to the right */}
      <div className="flex justify-end items-center">
        <LanguageSwitcher />
      </div>
      
      {/* Logo as a fixed positioned element in the top left */}
      <div className="fixed top-0 left-0 z-50 p-4 md:p-6">
        <div className="w-[120px] sm:w-[160px] md:w-[200px] transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <AspectRatio ratio={720/252} className="w-full">
            <OptimizedImage
              src="/lovable-uploads/210afb0c-e7a8-4827-b6eb-153a96b5eb34.png"
              alt="ZoraCard Logo"
              width={isMobile ? 720 : 960}
              height={isMobile ? 252 : 336}
              className="w-full h-auto object-contain"
              priority={true}
            />
          </AspectRatio>
        </div>
      </div>
    </header>
  );
};

export default Header;
