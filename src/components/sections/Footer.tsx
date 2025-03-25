import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Instagram, Twitter, Facebook, Github } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <footer className="bg-[#081526] py-6 md:py-12 relative z-10">
      <div className="container mx-auto px-4 text-blue-400">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="col-span-2 mb-4 md:mb-0 md:col-span-1">
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
          
          <div className="grid grid-cols-2 col-span-2 md:grid-cols-3 md:col-span-3 gap-4 md:gap-6">
            {[
              { title: "footer.product", items: ["features", "solutions", "security"] },
              { title: "footer.company", items: ["about", "careers", "contact"] },
              { title: "footer.resources", items: ["blog", "documentation", "support"] }
            ].map(({ title, items }, index) => (
              <div key={index}>
                <h3 className="text-sm md:text-lg font-bold text-white mb-2 md:mb-4 text-left">
                  {t(title)}
                </h3>
                <ul className="space-y-1 md:space-y-2.5 text-xs md:text-base text-left">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a 
                        href="#" 
                        className="hover:text-cyan-300 transition-colors block py-1"
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
        
        <div className="border-t border-blue-900/50 pt-4 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[10px] md:text-sm mb-3 md:mb-0 text-blue-200">
            © 2024 SagerSuper. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-3 md:space-x-4 text-[10px] md:text-sm">
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
