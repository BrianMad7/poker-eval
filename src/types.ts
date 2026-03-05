export type Suit = 'C' | 'K' | 'T' | 'P';
export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface Card {
  rank: Rank;
  suit: Suit;
}

export interface HandResult {
  category: string;
  chosen5: Card[];
}