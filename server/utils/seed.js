require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const Hotel    = require("../models/Hotel");
const Room     = require("../models/Room");
const User     = require("../models/User");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/restrip";

const HOTELS_DATA = [
  {
    name: "Azura Overwater Villas",
    city: "Malé",
    country: "Maldives",
    address: "North Malé Atoll, Maldives",
    description: "Suspended above the crystal lagoon, each villa offers a private plunge pool, glass floor panels revealing marine life below, and butler service at your beck and call.",
    photos: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85"],
    rating: 4.9, reviewCount: 312, cheapestPrice: 420,
    tag: "Beachfront", category: "Resort", featured: true,
    amenities: ["Private Pool","Ocean Butler","Spa","Dive Center","Sunset Dining","Helicopter Transfer"],
  },
  {
    name: "Verlaine Haussmann",
    city: "Paris",
    country: "France",
    address: "8 Rue du Faubourg Saint-Honoré, Paris 75008",
    description: "A restored Haussmann mansion steps from the Champs-Élysées. Marble corridors, Michelin-starred dining, and rooms with unobstructed Eiffel Tower views.",
    photos: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=85"],
    rating: 4.8, reviewCount: 528, cheapestPrice: 380,
    tag: "City Palace", category: "Urban", featured: true,
    amenities: ["Michelin Dining","Champagne Bar","Rooftop Terrace","Concierge","Spa","Private Chauffeur"],
  },
  {
    name: "Sakura Zen Ryokan",
    city: "Kyoto",
    country: "Japan",
    address: "Arashiyama, Ukyo Ward, Kyoto 616-0007",
    description: "Centuries-old wooden inn nestled in the bamboo groves of Arashiyama. Private onsen baths, kaiseki cuisine prepared by master chefs, and serene meditation gardens.",
    photos: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=85"],
    rating: 4.9, reviewCount: 204, cheapestPrice: 340,
    tag: "Cultural", category: "Heritage", featured: false,
    amenities: ["Private Onsen","Kaiseki Dining","Tea Ceremony","Zen Garden","Ikebana Class","Temple Tour"],
  },
  {
    name: "Meridian Sky Towers",
    city: "Dubai",
    country: "UAE",
    address: "Sheikh Zayed Road, Dubai, UAE",
    description: "The highest hotel in the Middle East. Infinity pool at 350m, seven award-winning restaurants, and butler-serviced suites that redefine the word lavish.",
    photos: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=85"],
    rating: 4.7, reviewCount: 891, cheapestPrice: 610,
    tag: "Iconic", category: "Urban", featured: true,
    amenities: ["Infinity Pool 350m","7 Restaurants","Private Beach","Helipad","Butler Service","Gold Spa"],
  },
  {
    name: "Castello Monteverdi",
    city: "Casole d'Elsa",
    country: "Italy",
    address: "Loc. Monteverdi, Casole d'Elsa, Siena, Tuscany",
    description: "A restored 12th-century Tuscan fortress crowned by olive groves and private vineyards. Wine tastings in ancient cellars, cooking with estate-grown produce.",
    photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85"],
    rating: 4.9, reviewCount: 143, cheapestPrice: 720,
    tag: "Historic", category: "Heritage", featured: false,
    amenities: ["Private Vineyard","Cooking Classes","Pool","Wine Cellar","Truffle Hunting","Helipad"],
  },
];

const ROOMS_DATA = [
  // Azura
  { title: "Lagoon Villa",         price: 420,  maxPeople: 2, beds: 1, roomNumbers: [{ number: 101 },{ number: 102 }] },
  { title: "Ocean Sunrise Suite",  price: 680,  maxPeople: 3, beds: 2, roomNumbers: [{ number: 201 }] },
  { title: "Grand Reef Pavilion",  price: 980,  maxPeople: 4, beds: 3, roomNumbers: [{ number: 301 }] },
  // Verlaine
  { title: "Classic Parisienne",   price: 380,  maxPeople: 2, beds: 1, roomNumbers: [{ number: 101 },{ number: 102 },{ number: 103 }] },
  { title: "Tour Eiffel Suite",    price: 650,  maxPeople: 2, beds: 1, roomNumbers: [{ number: 201 },{ number: 202 }] },
  { title: "Grand Penthouse",      price: 1400, maxPeople: 6, beds: 4, roomNumbers: [{ number: 501 }] },
  // Sakura
  { title: "Tatami Garden Room",   price: 340,  maxPeople: 2, beds: 1, roomNumbers: [{ number: 101 },{ number: 102 }] },
  { title: "Bamboo Forest Suite",  price: 580,  maxPeople: 4, beds: 2, roomNumbers: [{ number: 201 }] },
  // Meridian
  { title: "Sky Deluxe Room",      price: 610,  maxPeople: 2, beds: 1, roomNumbers: [{ number: 101 },{ number: 102 },{ number: 103 }] },
  { title: "Cloud Penthouse",      price: 2200, maxPeople: 6, beds: 4, roomNumbers: [{ number: 801 }] },
  // Castello
  { title: "Estate Room",          price: 720,  maxPeople: 2, beds: 1, roomNumbers: [{ number: 101 },{ number: 102 }] },
  { title: "Tower Suite",          price: 1100, maxPeople: 2, beds: 1, roomNumbers: [{ number: 301 }] },
];

const HOTEL_ROOM_MAP = [0,0,0, 1,1,1, 2,2, 3,3, 4,4]; // maps ROOMS_DATA index → HOTELS_DATA index

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Promise.all([Hotel.deleteMany({}), Room.deleteMany({}), User.deleteMany({})]);
    console.log("🗑  Cleared existing data");

    // Seed hotels
    const hotels = await Hotel.insertMany(HOTELS_DATA);
    console.log(`🏨 Inserted ${hotels.length} hotels`);

    // Seed rooms linked to hotels
    const roomsWithHotelIds = ROOMS_DATA.map((room, i) => ({
      ...room,
      hotelId: hotels[HOTEL_ROOM_MAP[i]]._id,
      description: `Elegant accommodation in ${hotels[HOTEL_ROOM_MAP[i]].name}.`,
    }));
    const rooms = await Room.insertMany(roomsWithHotelIds);
    console.log(`🛏  Inserted ${rooms.length} rooms`);

    // Seed admin user
    await User.create({
      name: "Admin",
      email: "admin@restrip.com",
      password: "Admin@123",
      role: "admin",
    });

    // Seed demo user
    await User.create({
      name: "Demo User",
      email: "demo@restrip.com",
      password: "Demo@1234",
      role: "user",
    });

    console.log("👤 Created admin (admin@restrip.com / Admin@123) and demo user (demo@restrip.com / Demo@1234)");
    console.log("✅ Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
