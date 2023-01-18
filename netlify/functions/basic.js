import { groupByProp } from './util.js';
import { basicStrategy } from './data/basicStrategy.js';

const summarizeHandVal = (hand) => {
    const { total, aces } = summarizeHand(hand);
    let totalWAces = total;
    for (let i = 0; i < aces; i++) {
        totalWAces = addAce(totalWAces);
    }

    return {
        totalWAces,
        hard: aces === 0 || total + aces === 0 || total + aces > 11
    }
}

const groupedByScore = groupByProp('score', basicStrategy);

export const getRecommendation = (player, dealer, hard) => {
    const options = groupedByScore[player] || [];
    return options.find((opt) => opt['score_dealer'] === dealer && opt.hard === hard) || ''
}
