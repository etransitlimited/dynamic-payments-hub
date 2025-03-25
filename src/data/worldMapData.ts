import { RegionData } from "@/components/map/types";

const worldMapData: RegionData[] = [
  {
    id: "northAmerica",
    name: "North America",
    coordinates: [40, -100],
    merchants: ["Amazon", "Google Ads", "Facebook Ads", "Stripe", "PayPal"]
  },
  {
    id: "europe",
    name: "Europe",
    coordinates: [50, 10],
    merchants: ["Google Ads", "Amazon EU", "Facebook Ads", "Shopify", "Adyen"]
  },
  {
    id: "asia",
    name: "Asia",
    coordinates: [30, 100],
    merchants: ["TikTok", "AliExpress", "WeChat Pay", "Temu", "Lazada"]
  },
  {
    id: "oceania",
    name: "Oceania",
    coordinates: [-25, 135],
    merchants: ["Amazon AU", "Shopify", "Google Ads", "Facebook Ads"]
  },
  {
    id: "southAmerica",
    name: "South America",
    coordinates: [-15, -60],
    merchants: ["MercadoLibre", "Google Ads", "Facebook Ads", "Amazon BR"]
  },
  {
    id: "africa",
    name: "Africa",
    coordinates: [0, 20],
    merchants: ["Jumia", "Facebook Ads", "Google Ads", "M-Pesa"]
  },
  {
    id: "hongKong",
    name: "Hong Kong",
    coordinates: [22.3, 114.2],
    merchants: ["TikTok", "WeChat Pay", "Alipay", "Taobao", "JD.com"]
  },
  {
    id: "london",
    name: "London",
    coordinates: [51.5, -0.1],
    merchants: ["Amazon UK", "Google Ads", "Facebook Ads", "PayPal", "Stripe"]
  },
  {
    id: "newYork",
    name: "New York",
    coordinates: [40.7, -74.0],
    merchants: ["Amazon US", "Google Ads", "Facebook Ads", "Stripe", "PayPal"]
  }
];

export default worldMapData;
