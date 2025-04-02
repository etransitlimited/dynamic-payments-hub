
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export const setupAnimations = () => {
  // Add animation styles to document head
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    @keyframes pulse-subtle {
      0% {
        opacity: 0.5;
      }
      50% {
        opacity: 0.7;
      }
      100% {
        opacity: 0.5;
      }
    }
    
    .animate-pulse-subtle {
      animation: pulse-subtle 4s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    @keyframes glow {
      0%, 100% {
        filter: drop-shadow(0 0 8px rgba(242, 252, 226, 0.3));
      }
      50% {
        filter: drop-shadow(0 0 15px rgba(242, 252, 226, 0.6));
      }
    }
    
    .animate-glow {
      animation: glow 4s ease-in-out infinite;
    }
  `;
  document.head.appendChild(styleElement);
  
  console.log("Transaction animations setup complete");
  return () => {
    document.head.removeChild(styleElement);
    console.log("Transaction animations cleaned up");
  };
};
