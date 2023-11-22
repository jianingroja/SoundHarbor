import {
  IDiscogsRelease,
  getDiscogsRecommendations,
} from '@/lib/utils/discogsUtils';
import {
  getSpotifyCookie,
  getSpotifyUserAlbums,
} from '@/lib/utils/spotifyUtils';
import Recommendation from '@/components/Recommendation';

const RecommendationList = async () => {
  const spotifyToken = getSpotifyCookie();

  let userAlbums = await getSpotifyUserAlbums(spotifyToken!);
  let recommendations: IDiscogsRelease[] = [];
  if (userAlbums) {
    recommendations = await getDiscogsRecommendations(userAlbums);
  }

  return (
    <>
      {recommendations.map(recommendation => {
        const { id } = recommendation;

        return <Recommendation key={id} recommendation={recommendation} />;
      })}
    </>
  );
};
export default RecommendationList;
