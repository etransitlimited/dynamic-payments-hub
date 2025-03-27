
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
              src="/lovable-uploads/afad098a-c535-4cf6-8c4c-3a9bd67182d7.png"
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
