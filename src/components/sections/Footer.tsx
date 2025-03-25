
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#081526] py-12 relative z-10">
      <div className="container mx-auto px-4 text-blue-400">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">DigiPayPro</h3>
            <p className="text-blue-200">{t("footer.description")}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">{t("footer.product")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-cyan-300 transition-colors">{t("footer.features")}</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">{t("footer.solutions")}</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">{t("footer.security")}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-cyan-300 transition-colors">{t("footer.about")}</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">{t("footer.careers")}</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">{t("footer.contact")}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-cyan-300 transition-colors">{t("footer.blog")}</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">{t("footer.documentation")}</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">{t("footer.support")}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-900/50 pt-8 text-center">
          <p>© 2024 DigiPayPro. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
