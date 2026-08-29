import { isUndefined } from '@LeagueStatsOverlay/common/utils/isUndefined';
import { REGIONS, Region } from '@LeagueStatsOverlay/domain/constants/regions';
import { NextRequest, NextResponse } from 'next/server';

const riotApiKey = process.env.RIOT_API_KEY;

const PLATFORM_IDS = {
  euw: 'euw1',
  eune: 'eun1',
  na: 'na1',
  br: 'br1',
  lan: 'la1',
  las: 'la2',
  oce: 'oc1',
  kr: 'kr',
  jp: 'jp1',
  tr: 'tr1',
  ru: 'ru',
} as const satisfies Record<Region, string>;

type PlatformId = (typeof PLATFORM_IDS)[Region];

const ROUTING_VALUES = {
  euw1: 'europe',
  eun1: 'europe',
  tr1: 'europe',
  ru: 'europe',
  na1: 'americas',
  br1: 'americas',
  la1: 'americas',
  la2: 'americas',
  kr: 'asia',
  jp1: 'asia',
  oc1: 'sea',
} as const satisfies Record<PlatformId, string>;

function getPlatformId(regionParam: string): PlatformId | undefined {
  if (!REGIONS.includes(regionParam as Region)) {
    return undefined;
  }

  return PLATFORM_IDS[regionParam as Region];
}

export async function GET(request: NextRequest) {
  if (isUndefined(riotApiKey)) {
    throw new Error('RIOT_API_KEY is undefined');
  }

  const { searchParams } = new URL(request.url);
  const gameName = searchParams.get('gameName');
  const tagLine = searchParams.get('tagLine');
  const regionParam = searchParams.get('region')?.toLowerCase() || 'euw';

  if (!gameName || !tagLine) {
    return NextResponse.json({}, { status: 422 });
  }

  const platformId = getPlatformId(regionParam);
  if (!platformId) {
    return NextResponse.json(
      { error: `Invalid region. Allowed: ${REGIONS.join(', ')}` },
      { status: 400 },
    );
  }
  const routingValue = ROUTING_VALUES[platformId];

  try {
    const accountResponse = await fetch(
      `https://${routingValue}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
        gameName,
      )}/${tagLine}`,
      {
        headers: {
          'X-Riot-Token': riotApiKey,
        },
      },
    );

    if (!accountResponse.ok) {
      return NextResponse.json({}, { status: 500 });
    }
    const { puuid } = await accountResponse.json();

    const rankedResponse = await fetch(
      `https://${platformId}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
      {
        headers: {
          'X-Riot-Token': riotApiKey,
        },
      },
    );

    if (!rankedResponse.ok) {
      return NextResponse.json({}, { status: 500 });
    }
    const rankedStats = await rankedResponse.json();

    const profileResponse = await fetch(
      `https://${platformId}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      {
        headers: {
          'X-Riot-Token': riotApiKey,
        },
      },
    );

    if (!profileResponse.ok) {
      return NextResponse.json({}, { status: 500 });
    }

    const profile = await profileResponse.json();
    return NextResponse.json({
      rankedStats,
      profileIconId: profile.profileIconId,
    });
  } catch (error) {
    console.error('Error general en el endpoint:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
