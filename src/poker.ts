import { Card, HandResult } from './types';

export function evaluateHand(hand: Card[], board: Card[]): HandResult {
    const cards = [...hand, ...board];

    const cardsSorted = cards.sort((a, b) => b.rank - a.rank)

    const uniqueRanks = Array.from(new Set(cardsSorted.map(c => c.rank)));

    for (let i = 0; i <= uniqueRanks.length - 5; i++) {
        if (uniqueRanks[i] - uniqueRanks[i + 4] === 4) {
        const straightRanks = uniqueRanks.slice(i, i + 5);
        return {
            category: 'Straight',
            chosen5: straightRanks.map(r => cardsSorted.find(c => c.rank === r)!)
        };
        }
    }

    const isWheel = [14, 5, 4, 3, 2].every(r => uniqueRanks.includes(r));
    if (isWheel) {
        const wheelRanks = [5, 4, 3, 2, 14];
        return {
        category: 'Straight',
        chosen5: wheelRanks.map(r => cardsSorted.find(c => c.rank === r)!)
        };
    }

    const counts = new Map<number, number>();
    cardsSorted.forEach(c => counts.set(c.rank, (counts.get(c.rank) || 0) + 1));

    const pairs = Array.from(counts.keys())
        .filter(rank => counts.get(rank) === 2)
        .sort((a, b) => b - a);

    if (pairs.length >= 2) {
        const highPairRank = pairs[0];
        const lowPairRank = pairs[1];

        const pairCards = cardsSorted.filter(c => c.rank === highPairRank || c.rank === lowPairRank);
        const kickers = cardsSorted.filter(c => c.rank !== highPairRank && c.rank !== lowPairRank);

        return {
        category: 'Two pair',
        chosen5: [...pairCards, kickers[0]]
        };
    }

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

export function compareHands(hand1: HandResult, hand2: HandResult): number {
    const categories = [
        'High card', 'One pair', 'Two pair'
    ];

    const score1 = categories.indexOf(hand1.category);
    const score2 = categories.indexOf(hand2.category);

    if (score1 > score2) return 1;
    if (score1 < score2) return -1;

    for (let i = 0; i < 5; i++) {
    if (hand1.chosen5[i].rank > hand2.chosen5[i].rank) return 1;
    if (hand1.chosen5[i].rank < hand2.chosen5[i].rank) return -1;
  }

  return 0
}