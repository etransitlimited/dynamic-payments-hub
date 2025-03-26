
import CardBase from "./CardBase";
import { useIsMobile } from "@/hooks/use-mobile";
import { CSSProperties } from "react";

interface BackgroundCardProps {
  index: number;
}

const BackgroundCard = ({ index }: BackgroundCardProps) => {
  const isMobile = useIsMobile();
  const cardSize = isMobile ? "h-44 w-72" : "h-52 w-80";
  
  // 更鲜明的颜色梯度，与背景形成强烈对比
  const cardConfigs = [
    {
      className: `absolute ${cardSize} ${isMobile ? 
        'bg-gradient-to-br from-[#FF4500] via-[#FF6B6B] to-[#FF1493]' : // 橙红到亮粉
        'bg-gradient-to-br from-[#4B0082] via-[#483D8B] to-[#6A5ACD]'} rounded-xl shadow-xl z-20`, // 深紫到靛蓝
      style: { 
        transform: `translateZ(-20px) translateY(20px) rotate(-5deg)`,
        transformStyle: "preserve-3d" as const
      } as CSSProperties,
      initial: { opacity: 0.8 },
      animate: {
        opacity: [0.8, 0.7, 0.8],
        rotate: [-5, -7, -5]
      },
      transition: { 
        duration: 7,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    {
      className: `absolute ${cardSize} ${isMobile ? 
        'bg-gradient-to-br from-[#00B4DB] via-[#1DE5E2] to-[#00FFFF]' : // 青蓝到青绿
        'bg-gradient-to-br from-[#BA55D3] via-[#9932CC] to-[#8B008B]'} rounded-xl shadow-xl z-10`, // 兰花紫到深紫
      style: { 
        transform: `translateZ(-40px) translateY(40px) rotate(5deg)`,
        transformStyle: "preserve-3d" as const
      } as CSSProperties,
      initial: { opacity: 0.6 },
      animate: {
        opacity: [0.6, 0.5, 0.6],
        rotate: [5, 7, 5]
      },
      transition: { 
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  ];
  
  const config = index < cardConfigs.length ? cardConfigs[index] : cardConfigs[0];
  
  return (
    <CardBase
      className={config.className}
      style={config.style}
      initial={config.initial}
      animate={config.animate}
      transition={config.transition}
    />
  );
};

export default BackgroundCard;
