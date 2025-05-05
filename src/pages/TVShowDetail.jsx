import { useParams } from 'react-router-dom';
import Loading from '@components/Loading';
import Banner from '@components/MediaDetail/Banner';
import ActorList from '@components/MediaDetail/ActorList';
import RelatedMediaList from '@/components/MediaDetail/RelatedMediaList';
import useFetch from '@/hooks/useFetch';
import TVShowInformation from '@/components/MediaDetail/TVShowInformation';
import SeasonList from '@/components/MediaDetail/SeasonList';

const TVShowDetail = () => {
  const { id } = useParams();

  const { data: tvInfo, isLoading } = useFetch({
    url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits,videos`,
    method: 'GET',
  });

  const { data: recommandationsResponse, isLoading: isRecommandationLoading } =
    useFetch({
      url: `/tv/${id}/recommendations`,
    });

  const relatedTVShow = recommandationsResponse.results || [];
  const certification = (tvInfo.content_ratings?.results || []).find(
    (result) => result.iso_3166_1 === 'US'
  )?.rating;

  const crews = (tvInfo.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ['Director', 'Writer'].some((job) => jobs.find((j) => j === job));
    })
    .slice(0, 10)
    .map((crew) => ({ id: crew.id, job: crew.jobs[0].job, name: crew.name }));

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Banner
        title={tvInfo.name}
        backdrop_path={tvInfo.backdrop_path}
        poster_path={tvInfo.poster_path}
        release_date={tvInfo.first_air_date}
        genres={tvInfo.genres}
        point={tvInfo.vote_average}
        overview={tvInfo.overview}
        certification={certification}
        crews={crews}
        trailerVideoKey={
          (tvInfo.videos?.results || []).find(
            (video) => video.type === 'Trailer'
          )?.key
        }
      />
      <div className='bg-black text-white text-[1.2vw]'>
        <div className='flex relative w-full mx-auto p-6 sm:gap-8 py-10 gap-6 '>
          <div className='flex-[2]'>
            <ActorList
              actors={(tvInfo.aggregate_credits?.cast || []).map((cast) => ({
                ...cast,
                character: cast.roles[0]?.character,
                episodeCount: cast.roles[0]?.episode_count,
              }))}
            />
            <SeasonList seasons={(tvInfo.seasons || []).reverse()} />
            <RelatedMediaList
              mediaList={relatedTVShow}
              isLoading={isRecommandationLoading}
            />
          </div>
          <div className='flex-1'>
            <TVShowInformation tvInfo={tvInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TVShowDetail;
