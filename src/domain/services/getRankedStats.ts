import { buildUserStats } from '../builders/userStats.factory';
import { UserStats } from '../models/UserStats';

export const getRankedStats = async (
  gameName: string,
  tagLine: string,
  region?: string,
): Promise<UserStats> => {
  const regionParam = region ? region : 'euw';
  const response = await fetch(
    `/api/riot/ranked?gameName=${gameName}&tagLine=${tagLine}&region=${regionParam}`,
  );
  const { rankedStats, profileIconId } = await response.json();

  return buildUserStats(rankedStats, profileIconId);
};
