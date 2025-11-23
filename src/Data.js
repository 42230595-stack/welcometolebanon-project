import beirut1 from './assets/beirut_landmark1.jpg';
import beirut2 from './assets/beirut_landmark2.jpg';
import beirut3 from './assets/beirut_landmark3.jpg';
import legray from './assets/legray.jpg';
import phoenicia from './assets/phoenicia.jpg';
import beirutGrill from './assets/beirut_grill.jpg';
import seaView from './assets/sea_view.jpg';

import byblos1 from './assets/byblos_landmark1.jpg';
import byblos2 from './assets/byblos_landmark2.jpg';
import byblos3 from './assets/byblos_landmark3.jpg';
import byblosSurMer from './assets/byblos_surmer.jpg';
import lePalais from './assets/le_palais.jpg';
import portside from './assets/portside.jpg';

import tripoli1 from './assets/tripoli_landmark1.jpg';
import tripoli2 from './assets/tripoli_landmark2.jpg';
import tripoli3 from './assets/tripoli_landmark3.jpg';
import safir from './assets/safir.jpg';
import oldTown from './assets/oldtown.jpg';

import baalbek1 from './assets/baalbek_landmark1.jpg';
import baalbek2 from './assets/baalbek_landmark2.jpg';
import baalbek3 from './assets/baalbek_landmark3.jpg';
import baalbekHotel from './assets/baalbek_hotel.jpg';
import templeView from './assets/temple_view.jpg';

import tyre1 from './assets/tyre_landmark1.jpg';
import tyre2 from './assets/tyre_landmark2.jpg';
import tyre3 from './assets/tyre_landmark3.jpg';
import tyreHotel from './assets/tyre_hotel.jpg';
import seaBreeze from './assets/seabreeze.jpg';


export const cities = [
  {
    name: "Beirut",
    images: [
      { src: beirut1, name: "Corniche" },
      { src: beirut2, name: "Mohammad Al-Amin Mosque" },
      { src: beirut3, name: "National Museum" }
    ],
    hotels: [
      { name: "Le Gray", image: legray, stars: 5, pricePerNight: 180, services: [
          { name: "Breakfast", price: 20 },
          { name: "Airport Pickup", price: 40 },
          { name: "Spa Access", price: 35 }
        ]
      },
      { name: "Phoenicia", image: phoenicia, stars: 5, pricePerNight: 220, services: [
          { name: "Breakfast", price: 25 },
          { name: "Suite Upgrade", price: 60 }
        ]
      }
    ],
    restaurants: [
      { name: "Beirut Grill", image: beirutGrill, reservationPrice: 10, times: ["18:00","19:00","20:00","21:00"] },
      { name: "Sea View Bistro", image: seaView, reservationPrice: 15, times: ["17:30","19:30","21:00"] }
    ],
    description: "Beirut is the capital and largest city of Lebanon."
  },
  {
    name: "Byblos",
    images: [
      { src: byblos1, name: "Old Souk" },
      { src: byblos2, name: "Byblos Castle" },
      { src: byblos3, name: "Historic Port" }
    ],
    hotels: [
      { name: "Byblos Sur Mer", image: byblosSurMer, stars: 4, pricePerNight: 140, services: [
          { name: "Breakfast", price: 15 },
          { name: "Guided Tour", price: 30 }
        ]
      },
      { name: "Le Palais", image: lePalais, stars: 4, pricePerNight: 160, services: [
          { name: "Breakfast", price: 18 },
          { name: "Sea View Upgrade", price: 40 }
        ]
      }
    ],
    restaurants: [
      { name: "Portside Cafe", image: portside, reservationPrice: 8, times: ["18:30","20:00","21:30"] }
    ],
    description: "Byblos is one of the oldest continuously inhabited cities in the world."
  },
  {
    name: "Tripoli",
    images: [
      { src: tripoli1, name: "Al-Mina" },
      { src: tripoli2, name: "Citadel" },
      { src: tripoli3, name: "Old Souk" }
    ],
    hotels: [
      { name: "Safir Hotel", image: safir, stars: 4, pricePerNight: 110, services: [
          { name: "Breakfast", price: 12 },
          { name: "City Tour", price: 25 }
        ]
      }
    ],
    restaurants: [
      { name: "Old Town Restaurant", image: oldTown, reservationPrice: 5, times: ["18:00","19:00","20:00"] }
    ],
    description: "Tripoli is famous for its traditional souks and historic architecture."
  },
  {
    name: "Baalbek",
    images: [
      { src: baalbek1, name: "Temple of Bacchus" },
      { src: baalbek2, name: "Temple of Jupiter" },
      { src: baalbek3, name: "Roman Ruins" }
    ],
    hotels: [
      { name: "Baalbek Hotel", image: baalbekHotel, stars: 3, pricePerNight: 95, services: [
          { name: "Breakfast", price: 10 },
          { name: "Guide to Ruins", price: 35 }
        ]
      }
    ],
    restaurants: [
      { name: "Temple View", image: templeView, reservationPrice: 7, times: ["17:00","18:30","20:00"] }
    ],
    description: "Baalbek is famous for its Roman temples and archaeological sites."
  },
  {
    name: "Tyre",
    images: [
      { src: tyre1, name: "Al-Bass Archaeological Park" },
      { src: tyre2, name: "Roman Hippodrome" },
      { src: tyre3, name: "Mediterranean Beach" }
    ],
    hotels: [
      { name: "Tyre Beach Hotel", image: tyreHotel, stars: 4, pricePerNight: 120, services: [
          { name: "Breakfast", price: 12 },
          { name: "Beach Umbrella", price: 10 }
        ]
      }
    ],
    restaurants: [
      { name: "Sea Breeze", image: seaBreeze, reservationPrice: 12, times: ["18:00","19:30","21:00"] }
    ],
    description: "Tyre is known for its ancient ruins and beautiful Mediterranean beaches."
  }
];