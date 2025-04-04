
import React from 'react';
import TranslatedText from '@/components/translation/TranslatedText';
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface CardStatsProps {
  cardStats: {
    total: number;
    active: number;
    pending: number;
    expired: number;
  };
  isLoading?: boolean;
}

const CardManagementStats: React.FC<CardStatsProps> = ({ cardStats, isLoading = false }) => {
  const statItems = [
    {
      title: "cards.management.totalCards",
      value: cardStats.total,
      icon: <CreditCard size={24} className="text-blue-400" />,
      bgColor: "from-blue-600/20 to-blue-700/10",
      borderColor: "border-blue-500/30"
    },
    {
      title: "cards.management.activeCards",
      value: cardStats.active,
      icon: <CheckCircle size={24} className="text-green-400" />,
      bgColor: "from-green-600/20 to-green-700/10",
      borderColor: "border-green-500/30"
    },
    {
      title: "cards.management.pendingCards",
      value: cardStats.pending,
      icon: <Clock size={24} className="text-amber-400" />,
      bgColor: "from-amber-600/20 to-amber-700/10",
      borderColor: "border-amber-500/30"
    },
    {
      title: "cards.management.expiredCards",
      value: cardStats.expired,
      icon: <XCircle size={24} className="text-red-400" />,
      bgColor: "from-red-600/20 to-red-700/10",
      borderColor: "border-red-500/30"
    }
  ];

  // Animation variants for the stats
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="animate-pulse">
            <Card className="overflow-hidden border border-blue-800/20 bg-blue-950/40">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-10 w-10 bg-blue-900/30 rounded-md" />
                  <Skeleton className="h-8 w-16 bg-blue-900/30 rounded-md" />
                </div>
                <Skeleton className="h-5 w-28 bg-blue-900/30 rounded-md mb-2" />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statItems.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className={`overflow-hidden border ${stat.borderColor} bg-gradient-to-br ${stat.bgColor}`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 rounded-md bg-charcoal-dark/40">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </div>
              <p className="text-sm text-gray-300">
                <TranslatedText keyName={stat.title} fallback={stat.title} />
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CardManagementStats;
