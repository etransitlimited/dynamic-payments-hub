
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useIsMobile } from "@/hooks/use-mobile";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const { t } = useSafeTranslation();
  const isMobile = useIsMobile();

  // Ensure we use the correct key format for translation
  const translationKey = `transactions.${type.toLowerCase()}`;

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${
      type === "deposit" ? "bg-green-900/60 text-green-200" : "bg-blue-900/60 text-blue-200"
    } ${isMobile ? 'inline-flex justify-center min-w-[70px]' : ''}`}>
      {t(translationKey)}
    </span>
  );
};

export default React.memo(TypeBadge);
