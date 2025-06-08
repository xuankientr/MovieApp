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
    url: `/movie/${id}?append_to_response=release_dates,credits,video`,
    method: 'GET',
  });

  const { data: recommandationsResponse, isLoading: isRelatedMovieLoading } =
    useFetch({
      url: `/movie/${id}/recommendations`,
    });

  const relatedMovie = recommandationsResponse.results || [];

  const usRelease = (movieInfo.release_dates?.results || []).find(
    (result) => result.iso_3166_1 === 'US'
  );
  const certification =
    usRelease?.release_dates?.find((releaseDate) => releaseDate.certification)
      ?.certification || 'NR';

  const crews = (movieInfo.credits?.crew || [])
    .filter((crew) => ['Director', 'Screenplay', 'Writer'].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner
        title={movieInfo.title}
        backdrop_path={movieInfo.backdrop_path}
        poster_path={movieInfo.poster_path}
        release_date={movieInfo.release_date}
        genres={movieInfo.genres}
        point={movieInfo.vote_average}
        overview={movieInfo.overview}
        certification={certification}
        crews={crews}
        trailerVideoKey={
          (movieInfo.videos?.results || []).find(
            (video) => video.type === 'Trailer'
          )?.key
        }
      />
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
