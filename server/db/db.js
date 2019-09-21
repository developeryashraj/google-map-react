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
  style: { height: "100%", position: "relative", width: "50%" },
  initialCenter: {
    lat: 52.52,
    lng: 13.405
  },
  zoom: 14
};

module.exports = {
  locations: locations,
  initialMapSettings: initialMapSettings
};
