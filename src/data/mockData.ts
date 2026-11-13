import { City, Movie, EventItem, RestaurantItem, PlayActivity, FnBItem } from '@/types';

export const CITIES: City[] = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    tagline: 'Silicon Valley of India',
    badge: 'Popular',
    popularLocalities: ['Indiranagar', 'Koramangala', 'Whitefield', 'Church Street', 'HSR Layout', 'MG Road']
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    tagline: 'City of Dreams & Nightlife',
    badge: 'Trending',
    popularLocalities: ['Bandra West', 'Lower Parel', 'Juhu', 'Colaba', 'BKC', 'Andheri West']
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    tagline: 'Heart of Entertainment & Dining',
    badge: 'Metro',
    popularLocalities: ['Connaught Place', 'Cyber Hub Gurugram', 'Hauz Khas', 'Saket', 'Noida Sec 18']
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    tagline: 'City of Pearls & Grand Screens',
    popularLocalities: ['Jubilee Hills', 'Banjara Hills', 'Gachibowli', 'Hitec City', 'Madhapur']
  },
  {
    id: 'goa',
    name: 'Goa',
    tagline: 'Sun, Music & Beach Clubs',
    badge: 'Weekend',
    popularLocalities: ['Anjuna', 'Vagator', 'Panaji', 'Calangute', 'Morjim']
  }
];

export const MOCK_MOVIES: Movie[] = [
  {
    id: 'mov-1',
    title: 'Dune: Part Two (IMAX Re-Release)',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    certificate: 'UA 16+',
    languages: ['English', 'Hindi (Dubbed)'],
    formats: ['IMAX 3D', '4DX', 'Dolby Atmos', '2D'],
    rating: 9.4,
    votes: '142.8K',
    duration: '2h 46m',
    genre: ['Sci-Fi', 'Action', 'Adventure'],
    releaseDate: '15 Nov 2026',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Zendaya', role: 'Chani', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
      { name: 'Austin Butler', role: 'Feyd-Rautha', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    theaters: [
      {
        id: 'th-1',
        name: 'PVR INOX Superplex: Forum Mall',
        chain: 'PVR INOX',
        locality: 'Koramangala',
        distance: '2.4 km away',
        cancellationAvailable: true,
        foodBeverageAvailable: true,
        shows: [
          { id: 'sh-101', time: '11:15 AM', format: 'IMAX 3D', language: 'English', priceStart: 450, status: 'available', screenName: 'IMAX Screen 1' },
          { id: 'sh-102', time: '02:45 PM', format: 'IMAX 3D', language: 'English', priceStart: 550, status: 'almost-full', screenName: 'IMAX Screen 1' },
          { id: 'sh-103', time: '06:30 PM', format: 'Dolby Atmos', language: 'English', priceStart: 380, status: 'filling-fast', screenName: 'Atmos Screen 3' },
          { id: 'sh-104', time: '09:45 PM', format: 'IMAX 3D', language: 'English', priceStart: 600, status: 'almost-full', screenName: 'IMAX Screen 1' }
        ]
      },
      {
        id: 'th-2',
        name: 'Cinépolis VIP: Nexus Mall',
        chain: 'Cinépolis',
        locality: 'Indiranagar',
        distance: '4.1 km away',
        cancellationAvailable: true,
        foodBeverageAvailable: true,
        shows: [
          { id: 'sh-201', time: '12:30 PM', format: '4DX', language: 'English', priceStart: 650, status: 'available', screenName: '4DX Motion Aud 2' },
          { id: 'sh-202', time: '04:00 PM', format: '2D', language: 'Hindi (Dubbed)', priceStart: 280, status: 'available', screenName: 'VIP Club Screen 4' },
          { id: 'sh-203', time: '07:15 PM', format: '4DX', language: 'English', priceStart: 750, status: 'almost-full', screenName: '4DX Motion Aud 2' }
        ]
      },
      {
        id: 'th-3',
        name: 'Skyfall Luxe Cinema: Phoenix Mall of Asia',
        chain: 'District Luxe',
        locality: 'Hebbal',
        distance: '8.2 km away',
        cancellationAvailable: true,
        foodBeverageAvailable: true,
        shows: [
          { id: 'sh-301', time: '03:15 PM', format: 'IMAX 3D', language: 'English', priceStart: 520, status: 'available', screenName: 'Skyfall Onyx Screen' },
          { id: 'sh-302', time: '08:00 PM', format: 'IMAX 3D', language: 'English', priceStart: 680, status: 'almost-full', screenName: 'Skyfall Onyx Screen' }
        ]
      }
    ]
  },
  {
    id: 'mov-2',
    title: 'Gladiator II',
    poster: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80',
    certificate: 'A',
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    formats: ['IMAX 3D', 'Dolby Atmos', '2D'],
    rating: 8.9,
    votes: '98.2K',
    duration: '2h 30m',
    genre: ['Action', 'Drama', 'Epic'],
    releaseDate: '20 Nov 2026',
    synopsis: 'Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after the powerful emperors of Rome conquer his home. With rage in his heart and the future of the empire at stake, Lucius must look to the past to find the strength to return the glory of Rome to its people.',
    cast: [
      { name: 'Paul Mescal', role: 'Lucius', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Pedro Pascal', role: 'Marcus Acacius', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80' },
      { name: 'Denzel Washington', role: 'Macrinus', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' }
    ],
    theaters: [
      {
        id: 'th-1',
        name: 'PVR INOX Superplex: Forum Mall',
        chain: 'PVR INOX',
        locality: 'Koramangala',
        distance: '2.4 km away',
        cancellationAvailable: true,
        foodBeverageAvailable: true,
        shows: [
          { id: 'sh-401', time: '01:00 PM', format: 'Dolby Atmos', language: 'English', priceStart: 320, status: 'available', screenName: 'Screen 5' },
          { id: 'sh-402', time: '05:30 PM', format: 'IMAX 3D', language: 'English', priceStart: 520, status: 'almost-full', screenName: 'IMAX Screen 1' },
          { id: 'sh-403', time: '09:00 PM', format: 'Dolby Atmos', language: 'Hindi', priceStart: 350, status: 'filling-fast', screenName: 'Screen 2' }
        ]
      }
    ]
  },
  {
    id: 'mov-3',
    title: 'Interstellar: 12th Anniversary Special',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80',
    certificate: 'U',
    languages: ['English'],
    formats: ['IMAX 3D', 'Dolby Atmos'],
    rating: 9.6,
    votes: '280K',
    duration: '2h 49m',
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    releaseDate: 'Now Showing',
    synopsis: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    cast: [
      { name: 'Matthew McConaughey', role: 'Cooper', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Anne Hathaway', role: 'Brand', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    theaters: [
      {
        id: 'th-1',
        name: 'PVR INOX Superplex: Forum Mall',
        chain: 'PVR INOX',
        locality: 'Koramangala',
        distance: '2.4 km away',
        cancellationAvailable: true,
        foodBeverageAvailable: true,
        shows: [
          { id: 'sh-501', time: '10:00 AM', format: 'IMAX 3D', language: 'English', priceStart: 500, status: 'almost-full', screenName: 'IMAX Screen 1' },
          { id: 'sh-502', time: '10:30 PM', format: 'IMAX 3D', language: 'English', priceStart: 650, status: 'almost-full', screenName: 'IMAX Screen 1' }
        ]
      }
    ]
  },
  {
    id: 'mov-4',
    title: 'Deadpool & Wolverine',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80',
    certificate: 'A',
    languages: ['English', 'Hindi', 'Telugu'],
    formats: ['3D', '4DX', '2D'],
    rating: 9.1,
    votes: '190K',
    duration: '2h 08m',
    genre: ['Action', 'Comedy', 'Sci-Fi'],
    releaseDate: 'Now Showing',
    synopsis: 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth, Deadpool. They team up to defeat a common enemy.',
    cast: [
      { name: 'Ryan Reynolds', role: 'Wade Wilson / Deadpool', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Hugh Jackman', role: 'Logan / Wolverine', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    theaters: [
      {
        id: 'th-2',
        name: 'Cinépolis VIP: Nexus Mall',
        chain: 'Cinépolis',
        locality: 'Indiranagar',
        distance: '4.1 km away',
        cancellationAvailable: true,
        foodBeverageAvailable: true,
        shows: [
          { id: 'sh-601', time: '03:30 PM', format: '4DX', language: 'English', priceStart: 600, status: 'available', screenName: 'Aud 2' },
          { id: 'sh-602', time: '09:15 PM', format: '3D', language: 'Hindi', priceStart: 320, status: 'filling-fast', screenName: 'Aud 5' }
        ]
      }
    ]
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Coldplay: Music of the Spheres World Tour',
    category: 'Concerts',
    date: 'Sat, 18 Jan 2027',
    time: '06:00 PM onwards',
    venue: 'DY Patil Stadium',
    locality: 'Navi Mumbai',
    cityId: 'mumbai',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1600&q=80',
    minPrice: 3500,
    fillingFast: true,
    featured: true,
    artists: [
      { name: 'Coldplay', role: 'Headliner', avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80' },
      { name: 'Special Guest', role: 'Opening Act', avatar: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80' }
    ],
    about: 'Coldplay return to India with their iconic, solar-powered Music of the Spheres tour featuring classic anthems like Yellow, Fix You, Viva La Vida, and spectacular kinetic wristbands, lasers, and fireworks.',
    guidelines: [
      'Age limit: 5+ years. Children under 18 must be accompanied by an adult.',
      'Gates open at 03:00 PM. Entry closes at 07:30 PM.',
      'No professional cameras or outside food permitted.',
      'Eco-friendly wristbands provided at the gate.'
    ],
    tiers: [
      { id: 'tier-1', name: 'General Floor Standing', description: 'Closest to stage, unreserved standing field access', price: 3500, availableCount: 140, benefits: ['Field Level Access', 'Eco-Wristband', 'F&B Zone Access'] },
      { id: 'tier-2', name: 'Level 1 Tiered Seating', description: 'Elevated prime view of full stadium & lasers', price: 6500, availableCount: 45, benefits: ['Reserved Seat', 'Unobstructed Stadium View', 'Express Entry Lane'] },
      { id: 'tier-3', name: 'VIP Infinity Lounge', description: 'Exclusive VIP hospitality platform with complimentary refreshments', price: 18000, availableCount: 12, benefits: ['Dedicated Lounge', 'Free Flow Snacks & Mocktails', 'VIP Parking Pass', 'Exclusive Merch Kit'] }
    ]
  },
  {
    id: 'evt-2',
    title: 'Diljit Dosanjh: Dil-Luminati Tour India',
    category: 'Concerts',
    date: 'Fri, 12 Dec 2026',
    time: '07:00 PM',
    venue: 'JLN Stadium',
    locality: 'Central Delhi',
    cityId: 'delhi',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1600&q=80',
    minPrice: 2499,
    fillingFast: true,
    featured: true,
    artists: [
      { name: 'Diljit Dosanjh', role: 'Global Icon', avatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=200&q=80' }
    ],
    about: 'The global phenomenon Diljit Dosanjh brings his explosive Dil-Luminati energy with high-octane Punjabi beats, brass horns, and electrifying stagecraft.',
    guidelines: [
      'Digital dynamic QR ticket required at the turnstile.',
      'Parking available on first-come basis with shuttle buses.'
    ],
    tiers: [
      { id: 'dl-1', name: 'Silver Fan Pit', description: 'Standing zone with great sound coverage', price: 2499, availableCount: 60, benefits: ['Standing Access', 'Dedicated Restrooms'] },
      { id: 'dl-2', name: 'Gold Front Pit', description: 'Close proximity to the runway stage', price: 5999, availableCount: 18, benefits: ['Front Row Runway', 'Early Admission', 'Commemorative Pass'] }
    ]
  },
  {
    id: 'evt-3',
    title: 'Zakir Khan Live: Papa Please',
    category: 'Comedy',
    date: 'Sun, 29 Nov 2026',
    time: '08:00 PM',
    venue: 'Good Shepherd Auditorium',
    locality: 'Residency Road',
    cityId: 'bengaluru',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1600&q=80',
    minPrice: 999,
    fillingFast: false,
    featured: false,
    artists: [
      { name: 'Zakir Khan', role: 'Comedian & Storyteller', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ],
    about: 'Sakht Launda himself returns with brand new stories about family, growing older, heartbreak, and unmatchable desi humor.',
    guidelines: ['Phones must remain on silent mode. 16+ only.'],
    tiers: [
      { id: 'zk-1', name: 'Balcony Standard', description: 'Elevated view', price: 999, availableCount: 80, benefits: ['Numbered Seating'] },
      { id: 'zk-2', name: 'Front Stall Prime', description: 'Direct eye-level with Zakir', price: 1999, availableCount: 30, benefits: ['Prime Row Seating', 'Fast Track Entrance'] }
    ]
  },
  {
    id: 'evt-4',
    title: 'Sunburn Goa 2026: The Enchanted Forest',
    category: 'Nightlife',
    date: '28-30 Dec 2026',
    time: '02:00 PM - 10:00 PM',
    venue: 'Vagator Beach Arena',
    locality: 'Vagator',
    cityId: 'goa',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80',
    minPrice: 4999,
    fillingFast: true,
    featured: true,
    artists: [
      { name: 'Martin Garrix', role: 'EDM Titan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'Charlotte de Witte', role: 'Techno Queen', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
    ],
    about: 'Asia’s premier electronic dance music festival on the shores of Vagator, Goa with 6 multi-genre stages, world-class laser mapping, and sunrise afterparties.',
    guidelines: ['3-day RFID wristband issued at box office.', '21+ for alcohol consumption.'],
    tiers: [
      { id: 'sb-1', name: 'GA 3-Day Festival Pass', description: 'Full access to all 6 stages for 3 days', price: 4999, availableCount: 200, benefits: ['3-Day Entry', 'All Stage Access'] },
      { id: 'sb-2', name: 'VIP 3-Day Sunset Deck', description: 'Elevated VIP deck, private bars, dedicated washrooms', price: 9999, availableCount: 50, benefits: ['Elevated Stage View', 'Private VIP Bars', 'Fast Lane Box Office'] }
    ]
  }
];

export const MOCK_RESTAURANTS: RestaurantItem[] = [
  {
    id: 'rest-1',
    name: 'Toit Brewpub',
    cuisines: ['Microbrewery', 'Woodfired Pizza', 'Continental', 'Finger Food'],
    locality: 'Indiranagar',
    cityId: 'bengaluru',
    rating: 4.8,
    reviewsCount: '18.4K',
    costForTwo: 1800,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    discountText: 'Skyfall Pay: Flat 20% OFF up to ₹500',
    discountPercentage: 20,
    maxDiscount: 500,
    features: ['Craft Beer on Tap', 'Pet Friendly Outdoor', 'Live Sports Screening', 'Valet Parking'],
    timing: '12:00 PM – 01:00 AM',
    ambience: 'Vibrant industrial brick pub with copper brewing kettles and lively music',
    address: '298, 100 Feet Rd, Near BDA Complex, Indiranagar, Bengaluru',
    menuHighlights: [
      { name: 'Toit Weiss (Wheat Beer 500ml)', price: 345, isVeg: true, isBestseller: true },
      { name: 'Tintin Toit (Belgian Witbier)', price: 345, isVeg: true, isBestseller: true },
      { name: 'Smoked Chicken & Jalapeño Woodfired Pizza', price: 595, isVeg: false, isBestseller: true },
      { name: 'Toit Baked Nachos Grande', price: 425, isVeg: true },
      { name: 'Beer Battered Onion Rings', price: 295, isVeg: true }
    ]
  },
  {
    id: 'rest-2',
    name: 'Bastian Bandra',
    cuisines: ['Modern Asian', 'Seafood', 'Cocktails', 'Sushi'],
    locality: 'Bandra West',
    cityId: 'mumbai',
    rating: 4.7,
    reviewsCount: '12.1K',
    costForTwo: 3500,
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    discountText: 'Skyfall Pay: Flat 15% OFF + Extra 10% on HDFC Cards',
    discountPercentage: 15,
    maxDiscount: 1000,
    features: ['Celebrity Hotspot', 'Exotic Cocktails', 'Valet Parking', 'Air Conditioned'],
    timing: '07:00 PM – 01:30 AM',
    ambience: 'Plush bohemian decor with high ceilings, artisanal lighting, and energetic crowd',
    address: 'B/1, New Kamal Building, Linking Road, Bandra West, Mumbai',
    menuHighlights: [
      { name: 'Lobster Mac & Cheese', price: 1450, isVeg: false, isBestseller: true },
      { name: 'Truffle Edamame Dim Sum', price: 750, isVeg: true, isBestseller: true },
      { name: 'Crispy Avocado Tempura Roll', price: 690, isVeg: true },
      { name: 'Bastian Lotus Biscoff Cheesecake', price: 850, isVeg: true, isBestseller: true }
    ]
  },
  {
    id: 'rest-3',
    name: 'The Social: Cyber Hub',
    cuisines: ['Continental', 'North Indian', 'Finger Food', 'Cocktails'],
    locality: 'Cyber Hub Gurugram',
    cityId: 'delhi',
    rating: 4.6,
    reviewsCount: '15.9K',
    costForTwo: 1600,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    discountText: 'Skyfall Pay: Flat 25% OFF on total food & drinks bill',
    discountPercentage: 25,
    maxDiscount: 750,
    features: ['Co-Working Space by Day', 'DJ Nights', 'Outdoor Terrace', 'Smoking Zone'],
    timing: '11:00 AM – 12:00 AM',
    ambience: 'Retro industrial co-working cafe transformed into a high-octane bar with neon signs',
    address: 'DLF Cyber City, Sector 24, Gurugram, Delhi NCR',
    menuHighlights: [
      { name: 'LIIT - The Longest Long Island Iced Tea', price: 650, isVeg: true, isBestseller: true },
      { name: 'Butter Chicken Biryani Pot', price: 520, isVeg: false, isBestseller: true },
      { name: 'Loaded Chilli Cheese Toast', price: 340, isVeg: true }
    ]
  },
  {
    id: 'rest-4',
    name: 'Thalassa Greek Taverna',
    cuisines: ['Greek', 'Mediterranean', 'Seafood', 'Sunset Bar'],
    locality: 'Vagator / Siolim',
    cityId: 'goa',
    rating: 4.9,
    reviewsCount: '21.5K',
    costForTwo: 2800,
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=800&q=80'
    ],
    discountText: 'Skyfall Table Exclusive: Welcome Cocktail on Booking',
    discountPercentage: 10,
    maxDiscount: 400,
    features: ['Panoramic Waterfront Sunset', 'Greek Fire Dancers', 'Outdoor Dining', 'Live Saxophone'],
    timing: '01:00 PM – 01:00 AM',
    ambience: 'Santorini-style white cabanas perched over the waterfront with breathtaking sunset views',
    address: 'Plot No. 301, 1, Vaddy, Siolim, Goa',
    menuHighlights: [
      { name: 'Spanakopita (Greek Spinach Pie)', price: 490, isVeg: true, isBestseller: true },
      { name: 'Grilled Tiger Prawns in Garlic Butter', price: 1150, isVeg: false, isBestseller: true },
      { name: 'Classic Greek Salad with Kalamata Olives', price: 450, isVeg: true }
    ]
  }
];

export const MOCK_PLAY_ACTIVITIES: PlayActivity[] = [
  {
    id: 'ply-1',
    title: 'Smaaash Neon Bowling & VR Arena',
    category: 'Bowling',
    locality: '1 MG-Lido Mall, MG Road',
    cityId: 'bengaluru',
    pricePerPerson: 399,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1538388149542-5e24932d11a8?auto=format&fit=crop&w=800&q=80',
    duration: '45 mins session',
    tag: 'Bestseller'
  },
  {
    id: 'ply-2',
    title: 'Torq03 Pro Go-Karting Track',
    category: 'Go-Karting',
    locality: 'Marathahalli',
    cityId: 'bengaluru',
    pricePerPerson: 650,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    duration: '6 laps racing',
    tag: 'Adrenaline Rush'
  },
  {
    id: 'ply-3',
    title: 'Mystery Rooms: The Chernobyl Escape Room',
    category: 'VR & Escape Rooms',
    locality: 'Indiranagar',
    cityId: 'bengaluru',
    pricePerPerson: 899,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    duration: '60 mins mission',
    tag: 'Brain Teaser'
  }
];

export const MOCK_FNB_ITEMS: FnBItem[] = [
  {
    id: 'fnb-1',
    name: 'Caramel & Salted Gourmet Popcorn Tub',
    category: 'Popcorn',
    description: 'Golden crunchy corn tossed in Belgian caramel & sea salt.',
    price: 380,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80',
    tag: 'Most Loved'
  },
  {
    id: 'fnb-2',
    name: 'Mexican Loaded Cheesy Nachos',
    category: 'Bites',
    description: 'Crisp corn tortilla chips with warm jalapeño cheese dip and spicy salsa.',
    price: 320,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80',
    tag: 'Chef Special'
  },
  {
    id: 'fnb-3',
    name: 'Blockbuster Duo Combo',
    category: 'Combos',
    description: '1 Large Popcorn + 2 Large Fountain Cokes + Free Nachos.',
    price: 690,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=400&q=80',
    tag: 'Save ₹210'
  },
  {
    id: 'fnb-4',
    name: 'Chilled Coke Zero (650ml)',
    category: 'Beverages',
    description: 'Ice cold carbonated zero calorie beverage.',
    price: 180,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'
  }
];
