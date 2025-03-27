
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useIsMobile } from "@/hooks/use-mobile";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "@/components/OptimizedImage";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="container mx-auto py-4 px-4 sm:py-5 md:py-6 flex justify-between items-center relative z-10">
      <div className="flex items-center">
        <div className="w-24 sm:w-32 md:w-40 relative"> {/* Reduced width classes */}
          <AspectRatio ratio={3 / 0.8}>
            <OptimizedImage
              src="/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png"
              alt="Zora Virtual Card Logo"
              className="object-contain object-left"
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
