import { Seat, SeatTier } from '@/types';

export const generateCinemaSeats = (showId: string): Seat[] => {
  const rows: { row: string; tier: SeatTier; price: number }[] = [
    { row: 'K', tier: 'Recliner', price: 650 },
    { row: 'J', tier: 'Recliner', price: 650 },
    { row: 'H', tier: 'Prime', price: 420 },
    { row: 'G', tier: 'Prime', price: 420 },
    { row: 'F', tier: 'Prime', price: 420 },
    { row: 'E', tier: 'Prime', price: 420 },
    { row: 'D', tier: 'Classic', price: 260 },
    { row: 'C', tier: 'Classic', price: 260 },
    { row: 'B', tier: 'Classic', price: 260 },
    { row: 'A', tier: 'Classic', price: 260 }
  ];

  const seatsPerRow = 14;
  const seats: Seat[] = [];

  // Deterministic seed based on showId so seats don't jitter randomly on re-renders
  let seed = 0;
  for (let i = 0; i < showId.length; i++) {
    seed = (seed * 31 + showId.charCodeAt(i)) % 1000;
  }

  rows.forEach((rInfo) => {
    for (let num = 1; num <= seatsPerRow; num++) {
      const seatId = `${rInfo.row}${num}`;
      
      // Calculate pseudo-random booking status
      const pseudoRandom = Math.sin(seed + num * 7 + rInfo.row.charCodeAt(0) * 13) * 10000;
      const isBooked = (pseudoRandom - Math.floor(pseudoRandom)) < 0.28; // ~28% booked
      const isLocked = !isBooked && (pseudoRandom - Math.floor(pseudoRandom)) > 0.88; // occasional locked seat

      seats.push({
        id: seatId,
        row: rInfo.row,
        number: num,
        tier: rInfo.tier,
        price: rInfo.price,
        status: isBooked ? 'booked' : isLocked ? 'locked' : 'available'
      });
    }
  });

  return seats;
};
