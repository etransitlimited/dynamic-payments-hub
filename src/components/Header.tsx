
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const { language } = useLanguage();
  
  const getStartedText = language === "zh-CN" ? "开始使用" : 
                          language === "zh-TW" ? "開始使用" : 
                          "Get Started";

  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
      <div className="text-2xl font-bold text-blue-100">SagerSuper</div>
      <div className="flex items-center gap-4">
        <Button 
          asChild
          variant="secondary" 
          className="bg-blue-700/40 hover:bg-blue-600/60 text-blue-50 border-blue-600/30"
        >
          <Link to="/login">{getStartedText}</Link>
        </Button>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
