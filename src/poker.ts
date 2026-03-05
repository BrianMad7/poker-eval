import { Card, HandResult } from './types';

export function evaluateHand(hand: Card[], board: Card[]): HandResult {
    const cards = [...hand, ...board];

    const cardSorted = cards.sort((a, b) => b.rank - a.rank)

    return {
        category: 'High card',
        chosen5: cardSorted.slice(0, 5)
    }
}