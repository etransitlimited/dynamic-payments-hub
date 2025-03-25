
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ParticlesBackground from "@/components/ParticlesBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Hero Section */}
      <section className="container mx-auto pt-20 pb-32 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            全球数字支付新势力
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100">
            60+国际卡BIN | 多币种即时激活 | 企业级安全标准
          </p>
          <Button 
            className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 text-lg px-8 py-6 rounded-lg hover:opacity-90 transition-all"
          >
            立即开通账户 →
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto py-20 px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-display">核心优势</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-6 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300">
              <div className="mb-4 text-cyan-300 text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

// Feature data
const features = [
  {
    icon: "🌏",
    title: "多币种信用卡",
    description: "支持港/美/英/欧等地区60+卡BIN"
  },
  {
    icon: "🛒",
    title: "电商支付解决方案",
    description: "一站式集成主流电商平台支付网关"
  },
  {
    icon: "📊",
    title: "企业费用管理",
    description: "多场景支出管理，实时数据分析"
  },
  {
    icon: "🔒",
    title: "安全保障",
    description: "银行级加密标准，多重风控系统"
  },
  {
    icon: "⚡",
    title: "即时激活",
    description: "秒级卡片激活，无需等待审核"
  },
  {
    icon: "🌐",
    title: "全球通用",
    description: "覆盖200+国家和地区的主流商户"
  }
];

export default Index;
