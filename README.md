# 🎟️ SKYFALL — Entertainment, Movies, Live Events & Dining Super-App

> **A 1:1 production-precision replication of District by Zomato**, engineered as a comprehensive Project-Based Learning (PBL) application.

![SKYFALL Banner](https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80)

---

## 🌟 Overview

**SKYFALL** is an entertainment super-app built to consolidate all going-out experiences into a unified, high-performance web platform. From booking cinema tickets with curved-screen seat matrices and real-time concurrency locking to claiming dining discounts with **Skyfall Pay** and validating event turnstile passes with dynamic anti-counterfeit QR codes.

---

## 🚀 Key Features

### 1. 🎬 Cinema & Movie Booking Matrix
* **Formats & Screens**: Filter across `IMAX 3D`, `4DX`, `Dolby Atmos`, and standard screens at major multiplex chains (PVR INOX, Cinépolis, Skyfall Luxe).
* **Interactive Curved SVG Seat Layout**: Realistic seat selection across 3 tiers:
  * **Recliner (₹650)**
  * **Prime (₹420)**
  * **Classic (₹260)**
* **Real-Time Seat Locking (Concurrency)**: An active **8-minute countdown timer** locks selected seats during checkout, preventing double-booking.
* **F&B (Food & Beverages) Upsell**: Popcorn tubs, Mexican loaded nachos, duo combos, and beverages with real-time quantity steppers.

### 2. 🎟️ Live Events & Mega Concerts
* High-octane tours (Coldplay *Music of the Spheres*, Diljit Dosanjh *Dil-Luminati*, Zakir Khan, Sunburn Goa).
* Multi-tier ticket selection (`General Floor Standing`, `Level 1 Seating`, `VIP Infinity Lounge`) with live inventory counters.
* Artist lineups, venue directions, and entry guidelines.

### 3. 🍽️ Dining Out & Skyfall Pay
* Discover curated top-rated restaurants, craft breweries, and rooftop lounges.
* **Free Table Reservation Engine**: Select dates, guest counts (1–10), and lunch/dinner slots with instant confirmed slips.
* **Skyfall Pay Bill Calculator**: Enter any dining bill amount &rarr; calculates 20% partner discount + bank offers &rarr; simulates instant payment and generates digital receipt pass.

### 4. 🎳 Play & Activities
* Slot bookings for Neon Bowling, Pro Go-Karting, and VR Escape rooms.

### 5. 💳 Universal Checkout & Idempotency
* Full itemized breakdown: Base fare + F&B + Convenience fee + 18% Integrated GST.
* Promo code engine (`DISTRICTNEW`, `ZOMATOPAY`).
* Simulated multi-payment flow (UPI / GPay, Credit/Debit Cards, Net Banking) with celebratory confetti.

### 6. 📱 Digital Wallet & Anti-Fraud Dynamic QR
* Boarding-pass styled passes with perforation cutouts, booking codes, and seat manifests.
* **Dynamic QR Code**: Cryptographic security ring with a live second ticker to prevent screenshot counterfeiting.
* Google Maps directions, calendar sync, and social sharing.

### 7. 🔍 Gatekeeper Turnstile Scanner Suite
* In-app QR validator for box-office gatekeepers.
* Real-time pass status checks with anti-duplicate validation (rejects already scanned passes).

### 8. 🔊 Web Audio API Synthesizer
* Native-like tactile sound feedback for seat clicks, locks, payment chords, and scanner alerts without external audio assets.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
* **Library**: [React 19](https://react.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Icons**: [Lucide React](https://lucide.dev/)
* **QR Generation**: [qrcode.react](https://www.npmjs.com/package/qrcode.react)
* **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/jiten-007/SKYFALL.git
cd SKYFALL
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 🏗️ Project Architecture

```
src/
├── app/
│   ├── globals.css          # Theme styles, glassmorphism, cinema curves
│   ├── layout.tsx           # Metadata, fonts, and DistrictProvider wrapper
│   └── page.tsx             # Main orchestrated super-app screen
├── components/
│   ├── checkout/            # CheckoutModal & promo calculation
│   ├── common/              # Header, CategoryTabs, BottomNav, CityModal, SearchModal, HeroBanner
│   ├── dining/              # DiningCard, DiningDetailModal, TableBookingModal, DistrictPayCalculator
│   ├── events/              # EventCard, EventDetailModal
│   ├── movies/              # MovieCard, MovieDetailModal, SeatMatrixModal, FnBModal
│   ├── play/                # PlayCard
│   ├── scanner/             # GateScannerModal (Turnstile validation suite)
│   └── wallet/              # WalletView, TicketPassCard, TicketDetailModal, DynamicQRCode
├── context/
│   └── DistrictContext.tsx  # Global state (City, Cart, Bookings, Seat-Lock timer)
├── data/
│   └── mockData.ts          # Authentic mock data for movies, events, dining & activities
├── lib/
│   ├── seatGenerator.ts     # Procedural cinema seat matrix generator
│   └── sound.ts             # Web Audio API sound synthesizer
└── types/
    └── index.ts             # Strict TypeScript data models & contracts
```

---

## 📄 License
MIT License. Built for Project-Based Learning (PBL).
