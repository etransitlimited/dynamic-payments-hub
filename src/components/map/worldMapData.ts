
// World map data with major cities and connections

export const worldMapData = {
  // Major cities/hubs with coordinates
  points: [
    { id: 1, name: "New York", lat: 40.7, lng: -74.0 },
    { id: 2, name: "San Francisco", lat: 37.8, lng: -122.4 },
    { id: 3, name: "London", lat: 51.5, lng: -0.1 },
    { id: 4, name: "Paris", lat: 48.9, lng: 2.4 },
    { id: 5, name: "Berlin", lat: 52.5, lng: 13.4 },
    { id: 6, name: "Moscow", lat: 55.8, lng: 37.6 },
    { id: 7, name: "Dubai", lat: 25.2, lng: 55.3 },
    { id: 8, name: "Mumbai", lat: 19.1, lng: 72.9 },
    { id: 9, name: "Singapore", lat: 1.3, lng: 103.8 },
    { id: 10, name: "Hong Kong", lat: 22.3, lng: 114.2 },
    { id: 11, name: "Tokyo", lat: 35.7, lng: 139.8 },
    { id: 12, name: "Sydney", lat: -33.9, lng: 151.2 },
    { id: 13, name: "São Paulo", lat: -23.5, lng: -46.6 },
    { id: 14, name: "Cape Town", lat: -33.9, lng: 18.4 },
    { id: 15, name: "Shanghai", lat: 31.2, lng: 121.5 }
  ],
  
  // Network connections between hubs
  connections: [
    [0, 1],  // New York - San Francisco
    [0, 2],  // New York - London
    [0, 12], // New York - São Paulo
    [1, 10], // San Francisco - Tokyo
    [2, 3],  // London - Paris
    [2, 4],  // London - Berlin
    [2, 6],  // London - Dubai
    [2, 13], // London - Cape Town
    [3, 4],  // Paris - Berlin
    [4, 5],  // Berlin - Moscow
    [5, 6],  // Moscow - Dubai
    [6, 7],  // Dubai - Mumbai
    [7, 8],  // Mumbai - Singapore
    [8, 9],  // Singapore - Hong Kong
    [8, 11], // Singapore - Sydney
    [9, 10], // Hong Kong - Tokyo
    [9, 14]  // Hong Kong - Shanghai
  ],
  
  // Simplified continent shapes
  continents: [
    { 
      name: "North America",
      points: [
        [60, -170], [75, -100], [70, -50], 
        [50, -60], [30, -80], [10, -90],
        [15, -120], [30, -140], [60, -170]
      ]
    },
    { 
      name: "South America",
      points: [
        [10, -90], [0, -50], [-20, -40], 
        [-40, -60], [-55, -70], [-40, -80],
        [-30, -90], [-15, -80], [0, -80],
        [10, -90]
      ]
    },
    { 
      name: "Europe",
      points: [
        [40, -10], [35, 30], [40, 40], 
        [55, 40], [70, 30], [70, 10],
        [60, 0], [50, -10], [40, -10]
      ]
    },
    { 
      name: "Africa",
      points: [
        [35, -10], [30, 30], [10, 45], 
        [-10, 45], [-35, 20], [-35, -10],
        [-25, -20], [0, -15], [15, -15],
        [35, -10]
      ]
    },
    { 
      name: "Asia",
      points: [
        [40, 40], [30, 60], [30, 100], 
        [45, 140], [70, 180], [70, 70],
        [55, 40], [40, 40]
      ]
    },
    { 
      name: "Australia",
      points: [
        [-10, 110], [-20, 120], [-35, 145],
        [-30, 155], [-20, 150], [-10, 130],
        [-10, 110]
      ]
    }
  ]
};
