import { isUndefined } from '@LeagueStatsOverlay/common/utils/isUndefined';
import { LeagueEntryDTO } from '../dtos/LeagueEntryDTO';
import { UserStats } from '../models/UserStats';

export const buildUserStats = (
  entries: LeagueEntryDTO[],
  profileIconId: number,
): UserStats => {
  const rankedSoloDuoEntry = entries.find(
    entry => entry.queueType === 'RANKED_SOLO_5x5',
  );

  if (isUndefined(rankedSoloDuoEntry)) {
    return {
      tier: 'UNRANKED',
      rank: '',
      leaguePoints: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      profileIconId,
    };
  }

  const { wins, losses, tier, rank, leaguePoints } = rankedSoloDuoEntry;

  const totalGames = wins + losses;
  const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;

  return {
    tier,
    rank,
    leaguePoints,
    wins,
    losses,
    winRate: Math.round(winRate * 100) / 100,
    profileIconId,
  };
};
