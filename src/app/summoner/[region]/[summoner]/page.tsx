'use client';

import { getRankedStats } from '@LeagueStatsOverlay/domain/services/getRankedStats';
import { getTierColor } from '@LeagueStatsOverlay/common/utils/getTierColor';
import { notFound, useParams } from 'next/navigation';
import { UserStats } from '@LeagueStatsOverlay/domain/models/UserStats';
import Image from 'next/image';
import useSWR from 'swr';

const fetchPlayerStats = async ([gameName, tagLine, region]: [
  string,
  string,
  string,
]) => {
  return await getRankedStats(gameName, tagLine, region);
};

function parseSummoner(
  summoner: string,
): { gameName: string; tagLine: string } | null {
  const lastDashIndex = summoner.lastIndexOf('-');
  if (lastDashIndex === -1) return null;

  const gameName = summoner.slice(0, lastDashIndex);
  const tagLine = summoner.slice(lastDashIndex + 1);
  if (!gameName || !tagLine) return null;

  return { gameName, tagLine };
}

export default function SummonerPage() {
  const params = useParams<{ region: string; summoner: string }>();
  const region = params.region;
  const parsedSummoner = parseSummoner(decodeURIComponent(params.summoner));

  const swrKey = parsedSummoner
    ? ([parsedSummoner.gameName, parsedSummoner.tagLine, region] as const)
    : null;

  const {
    data: rankedStats,
    error,
    isLoading,
  } = useSWR<UserStats>(swrKey, fetchPlayerStats, {
    refreshInterval: 30000,
    revalidateOnReconnect: true,
    errorRetryCount: 3,
    errorRetryInterval: 1000,
    keepPreviousData: true,
  });

  if (!parsedSummoner) {
    notFound();
  }

  const { gameName, tagLine } = parsedSummoner;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-[250px] h-[350px] flex flex-col items-center justify-center text-center backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl shadow-black/10 px-4 py-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-red-500 text-shadow-custom">
            Error al cargar los datos
          </h2>
          <p className="text-sm text-shadow-custom">
            Verifica que el nombre y tag sean correctos: {gameName}#{tagLine}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-[250px] h-[350px] flex flex-col items-center justify-center text-center backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl shadow-black/10 px-4 py-4 rounded-lg">
          <div className="animate-pulse">
            <h2 className="text-xl font-bold mb-4 text-shadow-custom">
              Cargando datos...
            </h2>
            <p className="text-sm text-shadow-custom">
              {gameName}#{tagLine}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!rankedStats) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-[250px] h-[350px] flex flex-col items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl shadow-black/10 px-4 py-4 rounded-lg">
        {rankedStats.tier === 'UNRANKED' ? (
          <Image
            src="/ranked/icons/unranked.png"
            alt="Unranked"
            width={120}
            height={120}
          />
        ) : (
          <div
            className="relative flex justify-center"
            style={{
              width: '208px',
              height: '210px',
              marginTop: '-120px',
            }}
          >
            <Image
              src={`/ranked/plates/icons/wings_${rankedStats.tier.toLowerCase()}.png`}
              alt={rankedStats.tier}
              width={208}
              height={270}
              className="absolute"
              style={{
                left: '50%',
                top: '0',
                transform: 'translateX(-50%)',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                zIndex: 10,
              }}
            />
            <Image
              src={`https://cdn.communitydragon.org/latest/profile-icon/${rankedStats.profileIconId}`}
              alt="Profile Icon"
              width={76}
              height={76}
              className="absolute rounded-full"
              style={{
                top: '126px',
                left: '66.5px',
                zIndex: 5,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            />
            {rankedStats.tier !== 'IRON' && (
              <video
                className="absolute w-full h-auto"
                style={{
                  left: '50%',
                  top: '0',
                  transform: 'translateX(-50%)',
                }}
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src={`/ranked/plates/animations/emblem-wings-magic-${rankedStats.tier.toLowerCase()}.webm`}
                  type="video/webm"
                />
              </video>
            )}
          </div>
        )}
        <p
          className={`ml-[5px] font-bold text-xl text-shadow-custom ${rankedStats.tier === 'UNRANKED' ? '' : 'mt-4'}`}
        >
          {gameName}
        </p>
        {rankedStats.tier === 'UNRANKED' ? (
          <p
            className={`ml-[5px] font-bold text-md text-shadow-custom ${getTierColor(rankedStats.tier)}`}
          >
            Unranked
          </p>
        ) : (
          <>
            <p className="ml-[5px] font-bold text-md text-shadow-custom">
              <span className={getTierColor(rankedStats.tier)}>
                {rankedStats.tier} {rankedStats.rank}
              </span>
              {` ${rankedStats.leaguePoints} LP`}
            </p>
            <p className="ml-[5px] font-bold text-md text-shadow-custom">
              {rankedStats.wins}W - {rankedStats.losses}L{' '}
              <span className={getTierColor(rankedStats.tier)}>
                {rankedStats.winRate}% WR
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
