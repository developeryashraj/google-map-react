const settings = {
  mapCenter: {
    lat: 52.52,
    lng: 13.405
  }, //berlin
  mapZoom: 12,
  mapDimension: { height: "100%", position: "relative", width: "50%" },
  apiURL: "https://maps.googleapis.com/maps/api/",
  apiKey: "AIzaSyDzNXOyvyeah6R5UxpG5ECSUEIkY7slLNQ",
  region: "DE" //ISO 3166-1 Germany,
};

const locations = [
  {
    id: 1,
    name: "Tiergarten",
    position: { lat: 52.5145, lng: 13.3501 }
  },
  {
    id: 2,
    name: "Madame Tussauds",
    position: { lat: 52.5169, lng: 13.3816 }
  }
];

const initialMapSettings = {
  style: settings.mapDimension,
  initialCenter: settings.mapCenter,
  zoom: settings.mapZoom
};

const sampleResponse = {
  results: [
    {
      address_components: [
        {
          long_name: "1600",
          short_name: "1600",
          types: ["street_number"]
        },
        {
          long_name: "Amphitheatre Pkwy",
          short_name: "Amphitheatre Pkwy",
          types: ["route"]
        },
        {
          long_name: "Mountain View",
          short_name: "Mountain View",
          types: ["locality", "political"]
        },
        {
          long_name: "Santa Clara County",
          short_name: "Santa Clara County",
          types: ["administrative_area_level_2", "political"]
        },
        {
          long_name: "California",
          short_name: "CA",
          types: ["administrative_area_level_1", "political"]
        },
        {
          long_name: "United States",
          short_name: "US",
          types: ["country", "political"]
        },
        {
          long_name: "94043",
          short_name: "94043",
          types: ["postal_code"]
        }
      ],
      formatted_address:
        "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
      geometry: {
        location: {
          lat: 52.5373,
          lng: 13.3603
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 37.4238253802915,
            lng: -122.0829009197085
          },
          southwest: {
            lat: 37.4211274197085,
            lng: -122.0855988802915
          }
        }
      },
      place_id: "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
      types: ["street_address"]
    }
  ],
  status: "OK"
};

module.exports = {
  locations: locations,
  initialMapSettings: initialMapSettings,
  settings: settings,
  sampleResponse: sampleResponse
};
