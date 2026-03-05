import { Card, HandResult } from './types';

export function evaluateHand(hand: Card[], board: Card[]): HandResult {
    const cards = [...hand, ...board];

    const cardsSorted = cards.sort((a, b) => b.rank - a.rank)

    const counts = new Map<number, number>();
    cardsSorted.forEach(c => counts.set(c.rank, (counts.get(c.rank) || 0) + 1));

    const pairRank = Array.from(counts.keys()).find(rank => counts.get(rank) === 2);

    if (pairRank) {
        const pairCards = cardsSorted.filter(c => c.rank === pairRank);
        const kickers = cardsSorted.filter(c => c.rank !== pairRank);

        return {
        category: 'One pair',
        chosen5: [...pairCards, ...kickers.slice(0, 3)]
        };
    }

    return {
        category: 'High card',
        chosen5: cardsSorted.slice(0, 5)
    }
}