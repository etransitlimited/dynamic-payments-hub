
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import TranslatedText from "@/components/translation/TranslatedText";

const typeBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        deposit: "bg-green-400/10 text-green-400 border border-green-500/20",
        expense: "bg-red-400/10 text-red-400 border border-red-500/20",
        transfer: "bg-blue-400/10 text-blue-400 border border-blue-500/20",
        payment: "bg-amber-400/10 text-amber-400 border border-amber-500/20",
        withdrawal: "bg-purple-400/10 text-purple-400 border border-purple-500/20",
        default: "bg-gray-100 text-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TransactionTypeBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typeBadgeVariants> {
  type: string;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({
  type,
  className,
  ...props
}) => {
  const transactionType = type.toLowerCase();
  let variant = transactionType as any;
  
  if (!["deposit", "expense", "transfer", "payment", "withdrawal"].includes(transactionType)) {
    variant = "default";
  }

  return (
    <div className={typeBadgeVariants({ variant, className })} {...props}>
      <TranslatedText
        keyName={`wallet.fundDetails.transactionTypes.${transactionType}`}
        fallback={type}
        className="capitalize"
      />
    </div>
  );
};

export default TransactionTypeBadge;
