
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OptimizedImage from "@/components/OptimizedImage";

const Header = () => {
  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
      <div className="flex items-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <OptimizedImage
          src="/lovable-uploads/210afb0c-e7a8-4827-b6eb-153a96b5eb34.png"
          alt="ZoraCard Logo"
          width={200}
          height={70}
          className="h-8 sm:h-9 md:h-11 lg:h-12 w-auto object-contain"
          priority={true}
        />
      </div>
      <div className="flex items-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
