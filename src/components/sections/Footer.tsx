
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Instagram, Twitter, Facebook, Github } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <footer className="bg-[#081526] py-6 md:py-10 relative z-10">
      <div className="container mx-auto px-4 text-blue-400">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5 md:gap-8 mb-5 sm:mb-6 md:mb-8">
          <div className="col-span-1 mb-4 md:mb-0">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-4 text-left">SagerSuper</h3>
            <p className="text-blue-200 text-xs md:text-base pr-0 md:pr-4 text-left leading-relaxed">
              {t("footer.description")}
            </p>
            
            <div className="flex space-x-3 md:space-x-4 mt-3 md:mt-4 justify-start">
              {[
                { Icon: Twitter, color: 'text-blue-300 hover:text-cyan-300' },
                { Icon: Facebook, color: 'text-blue-300 hover:text-cyan-300' },
                { Icon: Instagram, color: 'text-blue-300 hover:text-cyan-300' },
                { Icon: Github, color: 'text-blue-300 hover:text-cyan-300' }
              ].map(({ Icon, color }, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className={`${color} transition-colors`}
                >
                  <Icon size={isMobile ? 18 : 24} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-3 col-span-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { title: "footer.product", items: ["features", "solutions", "security"] },
              { title: "footer.company", items: ["about", "careers", "contact"] },
              { title: "footer.resources", items: ["blog", "documentation", "support"] }
            ].map(({ title, items }, index) => (
              <div key={index}>
                <h3 className="text-sm md:text-lg font-bold text-white mb-2 md:mb-4 text-left">
                  {t(title)}
                </h3>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-left">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a 
                        href="#" 
                        className="hover:text-cyan-300 transition-colors block py-0.5 sm:py-1"
                      >
                        {t(`footer.${item}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-blue-900/50 pt-3 sm:pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[10px] md:text-sm mb-2 md:mb-0 text-blue-200">
            © 2024 SagerSuper. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-3 md:space-x-4 text-[10px] md:text-sm">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-blue-300 hover:text-cyan-300 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
