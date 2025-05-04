import { useParams } from 'react-router-dom';
import Loading from '@components/Loading';
import Banner from '@components/MediaDetail/Banner';
import ActorList from '@components/MediaDetail/ActorList';
import RelatedMediaList from '@/components/MediaDetail/RelatedMediaList';
import MovieInformation from '@/components/MediaDetail/MovieInformation';
import useFetch from '@/hooks/useFetch';

const MovieDetail = () => {
  const { id } = useParams();

  const { data: movieInfo, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits`,
    method: 'GET',
  });

  const { data: recommandationsResponse, isLoading: isRelatedMovieLoading } =
    useFetch({
      url: `/movie/${id}/recommendations`,
    });

  const relatedMovie = recommandationsResponse.results || [];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Banner mediaInfo={movieInfo} />
      <div className='bg-black text-white text-[1.2vw]'>
        <div className='flex relative w-full mx-auto p-6 sm:gap-8 py-10 gap-6 '>
          <div className='flex-[2]'>
            <ActorList actors={movieInfo.credits?.cast || []} />
            <RelatedMediaList
              mediaList={relatedMovie}
              isLoading={isRelatedMovieLoading}
            />
          </div>
          <div className='flex-1'>
            <MovieInformation movieInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;
