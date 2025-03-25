
// Continent shapes data for the world map
export const continentsData = [
  { // North America
    points: [
      [60, -170], [70, -140], [60, -90], [50, -75], 
      [45, -80], [30, -85], [20, -100], [15, -120], [40, -130], [60, -170]
    ]
  },
  { // South America
    points: [
      [15, -80], [5, -75], [-10, -75], [-20, -70], [-30, -70], 
      [-40, -65], [-55, -70], [-50, -75], [-40, -80], [-30, -85], 
      [-20, -65], [-10, -60], [0, -65], [10, -80], [15, -80]
    ]
  },
  { // Europe
    points: [
      [35, -10], [40, 0], [45, 10], [50, 15], [55, 20], 
      [60, 30], [65, 40], [60, 50], [55, 40], [50, 30], 
      [45, 25], [40, 20], [35, 10], [35, -10]
    ]
  },
  { // Africa
    points: [
      [35, -10], [30, 0], [20, 20], [10, 40], [0, 45], 
      [-10, 40], [-20, 35], [-30, 20], [-35, 15], [-30, 0], 
      [-15, -15], [0, -15], [15, -15], [25, -10], [35, -10]
    ]
  },
  { // Asia
    points: [
      [45, 25], [50, 40], [60, 60], [70, 80], [65, 100], 
      [55, 120], [45, 130], [35, 140], [25, 125], [20, 110], 
      [15, 95], [10, 80], [25, 65], [30, 50], [35, 40], [45, 25]
    ]
  },
  { // Australia
    points: [
      [-10, 110], [-20, 120], [-30, 130], [-35, 140], [-30, 150], 
      [-20, 150], [-15, 140], [-10, 130], [-5, 120], [-10, 110]
    ]
  }
];

// Major financial hubs for connection lines
export const connectionPoints = [
  { name: "New York", lat: 40.7, lng: -74.0 },
  { name: "London", lat: 51.5, lng: -0.1 },
  { name: "Hong Kong", lat: 22.3, lng: 114.2 },
  { name: "Singapore", lat: 1.3, lng: 103.8 },
  { name: "Tokyo", lat: 35.7, lng: 139.8 },
  { name: "Shanghai", lat: 31.2, lng: 121.5 },
  { name: "Dubai", lat: 25.2, lng: 55.3 },
  { name: "Sydney", lat: -33.9, lng: 151.2 },
  { name: "Mumbai", lat: 19.1, lng: 72.9 }
];

// Key global connections to render
export const keyConnections = [
  [0, 1], // NY to London
  [1, 2], // London to HK
  [2, 4], // HK to Tokyo
  [2, 3], // HK to Singapore
  [0, 6], // NY to Dubai
  [6, 8], // Dubai to Mumbai
  [3, 7]  // Singapore to Sydney
];
