import { RankedStats } from './RankedStats';

export interface Summoner {
  puuid: string;
  gameName: string;
  tagLine: string;
  profileIconId: number;
  summonerLevel: number;
  region: string;
  rankedStats: RankedStats[];
}
