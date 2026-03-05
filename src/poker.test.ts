import { describe, it, expect } from 'vitest';
import { Card } from './types';
import { evaluateHand, compareHands } from './poker';


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

it('should decide winner between two pairs using the best kicker', () => {
  const board: Card[] = [
    { rank: 10, suit: 'T' },
    { rank: 10, suit: 'P' },
    { rank: 8, suit: 'K' },
    { rank: 6, suit: 'C' },
    { rank: 4, suit: 'K' }
  ];

  const player1Hole: Card[] = [{ rank: 14, suit: 'C' }, { rank: 2, suit: 'P' }];
  const player2Hole: Card[] = [{ rank: 13, suit: 'T' }, { rank: 3, suit: 'K' }];

  const res1 = evaluateHand(player1Hole, board);
  const res2 = evaluateHand(player2Hole, board);

  const winner = compareHands(res1, res2);

  expect(winner).toBe(1);
});

it('should detect Two Pair and pick the two highest pairs among three', () => {
  const holeCards: Card[] = [
    { rank: 14, suit: 'P' }, { rank: 14, suit: 'C' }
  ];
  const board: Card[] = [
    { rank: 8, suit: 'K' },
    { rank: 8, suit: 'T' },
    { rank: 3, suit: 'P' },
    { rank: 3, suit: 'C' },
    { rank: 10, suit: 'K' }
  ];

  const result = evaluateHand(holeCards, board);

  expect(result.category).toBe('Two pair');

  expect(result.chosen5[0].rank).toBe(14);
  expect(result.chosen5[1].rank).toBe(14);
  expect(result.chosen5[2].rank).toBe(8);
  expect(result.chosen5[3].rank).toBe(8);
  expect(result.chosen5[4].rank).toBe(10);
});

describe('Hand Evaluator - Straight', () => {
  it('should detect a Ace-high straight (10-11-12-13-A)', () => {
    const holeCards: Card[] = [
      { rank: 14, suit: 'P' },
      { rank: 13, suit: 'C' }
    ];
    const board: Card[] = [
      { rank: 12, suit: 'K' },
      { rank: 11, suit: 'T' },
      { rank: 10, suit: 'P' },
      { rank: 2, suit: 'C' },
      { rank: 5, suit: 'K' }
    ];

    const result = evaluateHand(holeCards, board);

    expect(result.category).toBe('Straight');
    expect(result.chosen5.map(c => c.rank)).toEqual([14, 13, 12, 11, 10]);
  });

  it('should detect an Ace-low straight (A-2-3-4-5)', () => {
    const holeCards: Card[] = [
      { rank: 14, suit: 'P' },
      { rank: 2, suit: 'C' }
    ];
    const board: Card[] = [
      { rank: 3, suit: 'K' },
      { rank: 4, suit: 'T' },
      { rank: 5, suit: 'P' },
      { rank: 8, suit: 'C' },
      { rank: 9, suit: 'K' }
    ];

    const result = evaluateHand(holeCards, board);

    expect(result.category).toBe('Straight');
    expect(result.chosen5.map(c => c.rank)).toEqual([5, 4, 3, 2, 14]);
  });
});

it('should detect a Flush and pick only the 5 best cards of that suit', () => {
  const holeCards: Card[] = [
    { rank: 6, suit: 'C' },
    { rank: 13, suit: 'C' }
  ];
  const board: Card[] = [
    { rank: 14, suit: 'C' },
    { rank: 11, suit: 'C' },
    { rank: 9, suit: 'C' },
    { rank: 4, suit: 'C' },
    { rank: 2, suit: 'C' }
  ];

  const result = evaluateHand(holeCards, board);

  expect(result.category).toBe('Flush');
  const ranks = result.chosen5.map(c => c.rank);
  expect(ranks).toEqual([14, 13, 11, 9, 6]);
});