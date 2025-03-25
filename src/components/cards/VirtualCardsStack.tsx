
import MainCard from "./MainCard";
import BackgroundCard from "./BackgroundCard";
import CardDecorations from "./CardDecorations";

// Stack of virtual cards with animation
const VirtualCardsStack = () => {
  return (
    <div className="relative h-80 w-full perspective-1000">
      {/* Main Card */}
      <MainCard />
      
      {/* Background Cards */}
      <BackgroundCard index={0} />
      <BackgroundCard index={1} />
      
      {/* Decorative Elements */}
      <CardDecorations />
    </div>
  );
};

export default VirtualCardsStack;
