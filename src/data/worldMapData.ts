
import { RegionData } from "@/components/map/types";
import { PlatformType } from "@/components/map/PlatformLogo";

const worldMapData: RegionData[] = [
  {
    id: "northAmerica",
    name: "北美洲",
    coordinates: [40, -100],
    merchants: ["Amazon", "Google Ads", "Facebook Ads", "Stripe", "PayPal"] as PlatformType[]
  },
  {
    id: "europe",
    name: "欧洲",
    coordinates: [50, 10],
    merchants: ["Google Ads", "Amazon", "Facebook Ads", "Shopify", "PayPal"] as PlatformType[]
  },
  {
    id: "asia",
    name: "亚洲",
    coordinates: [30, 100],
    merchants: ["TikTok", "AliExpress", "WeChat Pay", "Temu", "Alipay"] as PlatformType[]
  },
  {
    id: "oceania",
    name: "大洋洲",
    coordinates: [-25, 135],
    merchants: ["Amazon", "Shopify", "Google Ads", "Facebook Ads", "PayPal"] as PlatformType[]
  },
  {
    id: "southAmerica",
    name: "南美洲",
    coordinates: [-15, -60],
    merchants: ["MercadoLibre", "Google Ads", "Facebook Ads", "Amazon"] as PlatformType[]
  },
  {
    id: "africa",
    name: "非洲",
    coordinates: [0, 20],
    merchants: ["Jumia", "Facebook Ads", "Google Ads", "M-Pesa"] as PlatformType[]
  },
  {
    id: "hongKong",
    name: "香港",
    coordinates: [22.3, 114.2],
    merchants: ["TikTok", "WeChat Pay", "Alipay", "Taobao", "JD.com"] as PlatformType[]
  },
  {
    id: "london",
    name: "伦敦",
    coordinates: [51.5, -0.1],
    merchants: ["Amazon", "Google Ads", "Facebook Ads", "PayPal", "Stripe"] as PlatformType[]
  },
  {
    id: "newYork",
    name: "纽约",
    coordinates: [40.7, -74.0],
    merchants: ["Amazon", "Google Ads", "Facebook Ads", "Stripe", "PayPal"] as PlatformType[]
  }
];

export default worldMapData;
