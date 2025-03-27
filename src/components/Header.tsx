
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useIsMobile } from "@/hooks/use-mobile";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "@/components/OptimizedImage";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
      <div className="flex items-center">
        <div className="w-36 sm:w-44 relative">
          <AspectRatio ratio={3.5 / 1}>
            <OptimizedImage
              src="/lovable-uploads/e1af164a-21e7-4cd2-8240-633f47486eac.png"
              alt="Zora Virtual Card Logo"
              className="object-contain"
              priority={true}
            />
          </AspectRatio>
        </div>
      </div>
      <div className="flex items-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
