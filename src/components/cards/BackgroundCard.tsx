
import CardBase from "./CardBase";
import { useIsMobile } from "@/hooks/use-mobile";
import { CSSProperties } from "react";

interface BackgroundCardProps {
  index: number;
}

const BackgroundCard = ({ index }: BackgroundCardProps) => {
  const isMobile = useIsMobile();
  const cardSize = isMobile ? "h-44 w-72" : "h-52 w-80";
  
  // 更鲜明的颜色梯度，不区分移动端和桌面端，保持鲜明色彩
  const cardConfigs = [
    {
      className: `absolute ${cardSize} bg-gradient-to-br from-[#FF4500] via-[#FF6B6B] to-[#FF1493] rounded-xl shadow-xl z-20`, // 橙红到亮粉
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
        duration: isMobile ? 5 : 7, // 移动端动画时间缩短
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    {
      className: `absolute ${cardSize} bg-gradient-to-br from-[#00B4DB] via-[#1DE5E2] to-[#00FFFF] rounded-xl shadow-xl z-10`, // 青蓝到青绿
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
        duration: isMobile ? 6 : 8, // 移动端动画时间缩短
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
