import { describe, it, expect } from 'vitest';
import { Card } from './types';
import { evaluateHand } from './poker';


describe('Evaluate that only high card are selected', () => {
  it('should return the 5 highest cards as High Card category', () => {
    const hand: Card[] = [
      { rank: 14, suit: 'P' },
      { rank: 2, suit: 'C' }
    ];
    const board: Card[] = [
      { rank: 10, suit: 'K' },
      { rank: 8, suit: 'T' },
      { rank: 6, suit: 'P' },
      { rank: 4, suit: 'C' },
      { rank: 3, suit: 'K' }
    ];

    const result = evaluateHand(hand, board);

    expect(result.category).toBe('High card');
    expect(result.chosen5[0].rank).toBe(14); 
    expect(result.chosen5[4].rank).toBe(4);
  });
});

it('should detect a Pair and include the 3 best kickers', () => {
  const holeCards: Card[] = [
    { rank: 10, suit: 'P' },
    { rank: 10, suit: 'C' }
  ];
  const board: Card[] = [
    { rank: 14, suit: 'K' },
    { rank: 8, suit: 'T' },
    { rank: 6, suit: 'P' },
    { rank: 4, suit: 'C' },
    { rank: 2, suit: 'K' }
  ];

  const result = evaluateHand(holeCards, board);

  expect(result.category).toBe('One pair');

  expect(result.chosen5[0].rank).toBe(10);
  expect(result.chosen5[1].rank).toBe(10);

  expect(result.chosen5[2].rank).toBe(14);
  expect(result.chosen5[3].rank).toBe(8);
  expect(result.chosen5[4].rank).toBe(6);
});