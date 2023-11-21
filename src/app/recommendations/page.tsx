import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  IDiscogsRelease,
  getDiscogsRecommendations,
} from '@/lib/utils/discogsUtils';
import { getSpotifyUserAlbums } from '@/lib/utils/spotifyUtils';
import Recommendation from '@/components/Recommendation';
import LogoView from '@/components/LogoView';
import Header from '@/components/Header';

export default async function Recommendations() {
  const spotifyToken = getSpotifyCookie();
  // const spotifyToken = parseCookies(document.cookie)?.spotify_access_token;
  if (!spotifyToken) redirect('/');
  let userAlbums = await getSpotifyUserAlbums(spotifyToken);
  // console.log('userAlbums[0] :>> ', userAlbums[0]);

  let discogsRecommendations: IDiscogsRelease[] = [];
  if (userAlbums)
    discogsRecommendations = await getDiscogsRecommendations(userAlbums);
  console.log('discogsRecommendations[0] :>> ', discogsRecommendations[0]);
  // console.log('userAlbums[0] :>> ', (userAlbums) ? userAlbums[0].title : 'NO ALBUMS');
  // console.log('discogsRecommendations.length :>> ', discogsRecommendations.length);

  const imgInfo = {
    width: 4912 / 10,
    height: 3264 / 10,
    alt: 'Collection image',
    src: '/record-recommendations.jpg',
  };

  return (
    <>
      <Header img={imgInfo} type="dashboard" />

      <div className="mx-12 mt-6 flex flex-col justify-between align-middle">
        <h1 className="text-3xl font-extrabold">Recommendations</h1>
        <div className="flex flex-col gap-3 mt-8">
          {discogsRecommendations &&
            discogsRecommendations.map((reco, index) => (
              <Recommendation
                key={reco.id}
                recommendation={reco}
              ></Recommendation>
            ))}
        </div>
      </div>
      <LogoView></LogoView>
    </>
  );
}

function getSpotifyCookie(): string | undefined {
  const cookieJar = cookies();
  const spotifyToken = cookieJar.get('spotify_access_token')?.value;
  return spotifyToken;
}
