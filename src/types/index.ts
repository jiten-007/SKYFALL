export type CityId = 'bengaluru' | 'mumbai' | 'delhi' | 'goa' | 'hyderabad';

export interface City {
  id: CityId;
  name: string;
  tagline: string;
  badge?: string;
  popularLocalities: string[];
}

export type CategoryTab = 'all' | 'movies' | 'events' | 'dining' | 'play';

export interface Movie {
  id: string;
  title: string;
  poster: string;
  banner: string;
  certificate: string;
  languages: string[];
  formats: ('2D' | '3D' | 'IMAX 3D' | '4DX' | 'ICE' | 'Dolby Atmos')[];
  rating: number;
  votes: string;
  duration: string;
  genre: string[];
  releaseDate: string;
  synopsis: string;
  trailerUrl?: string;
  cast: { name: string; role: string; avatar: string }[];
  theaters: CinemaTheater[];
}

export interface CinemaTheater {
  id: string;
  name: string;
  chain: 'PVR INOX' | 'Cinépolis' | 'District Luxe' | 'Miraj';
  locality: string;
  distance: string;
  cancellationAvailable: boolean;
  foodBeverageAvailable: boolean;
  shows: MovieShow[];
}

export interface MovieShow {
  id: string;
  time: string;
  format: '2D' | '3D' | 'IMAX 3D' | '4DX' | 'Dolby Atmos';
  language: string;
  priceStart: number;
  status: 'available' | 'almost-full' | 'filling-fast';
  screenName: string;
}

export type SeatTier = 'Classic' | 'Prime' | 'Recliner';

export interface Seat {
  id: string;
  row: string;
  number: number;
  tier: SeatTier;
  price: number;
  status: 'available' | 'selected' | 'booked' | 'locked';
}

export interface FnBItem {
  id: string;
  name: string;
  category: 'Popcorn' | 'Combos' | 'Beverages' | 'Bites';
  description: string;
  price: number;
  isVeg: boolean;
  image: string;
  tag?: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Concerts' | 'Comedy' | 'Nightlife' | 'Sports' | 'Experiences' | 'Gaming';
  date: string;
  time: string;
  venue: string;
  locality: string;
  cityId: CityId;
  image: string;
  banner: string;
  minPrice: number;
  fillingFast?: boolean;
  featured?: boolean;
  artists: { name: string; avatar: string; role: string }[];
  about: string;
  guidelines: string[];
  tiers: {
    id: string;
    name: string;
    description: string;
    price: number;
    availableCount: number;
    benefits: string[];
  }[];
}

export interface RestaurantItem {
  id: string;
  name: string;
  cuisines: string[];
  locality: string;
  cityId: CityId;
  rating: number;
  reviewsCount: string;
  costForTwo: number;
  image: string;
  photos: string[];
  discountText: string;
  discountPercentage: number;
  maxDiscount?: number;
  features: string[];
  timing: string;
  menuHighlights: { name: string; price: number; isVeg: boolean; isBestseller?: boolean }[];
  ambience: string;
  address: string;
}

export interface PlayActivity {
  id: string;
  title: string;
  category: 'Bowling' | 'Arcade' | 'Go-Karting' | 'VR & Escape Rooms';
  locality: string;
  cityId: CityId;
  pricePerPerson: number;
  rating: number;
  image: string;
  duration: string;
  tag?: string;
}

export type BookingType = 'movie' | 'event' | 'dining' | 'play';

export interface Booking {
  id: string;
  bookingCode: string;
  type: BookingType;
  title: string;
  venue: string;
  locality: string;
  dateTime: string;
  city: string;
  qrPayload: string;
  seats?: string[];
  guestCount?: number;
  tierName?: string;
  totalAmount: number;
  discountAmount: number;
  fnbSummary?: { name: string; quantity: number }[];
  status: 'CONFIRMED' | 'CHECKED_IN' | 'CANCELLED';
  createdAt: string;
  posterOrImage: string;
  checkedInAt?: string;
}
