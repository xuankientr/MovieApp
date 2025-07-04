import PaginateIndicator from './PaginateIndicator';
import Movie from './Movie';
import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';

//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTA1ZTRkM2FmODNjMmY3OTY1ZmQ2MTBiYzgzYTM2NCIsIm5iZiI6MTc0NDU1MDc2OC4zMDQsInN1YiI6IjY3ZmJiYjcwNzY1YzUyMjJmMzk5MWYwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SiKpo0Okch_SbEpmxteIu7OLRSCpdohwLBzm1Q-96aI

const FeatureMovies = () => {
  const [activeMovieId, setActiveMovieId] = useState();
  // useEffect(() => {
  //   fetch('https://api.themoviedb.org/3/movie/popular', {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTA1ZTRkM2FmODNjMmY3OTY1ZmQ2MTBiYzgzYTM2NCIsIm5iZiI6MTc0NDU1MDc2OC4zMDQsInN1YiI6IjY3ZmJiYjcwNzY1YzUyMjJmMzk5MWYwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SiKpo0Okch_SbEpmxteIu7OLRSCpdohwLBzm1Q-96aI`,
  //     },
  //   }).then(async (res) => {
  //     const data = await res.json();
  //     console.log({ data });
  //     const popularMovies = data.results.slice(0, 4);
  //     setMovies(popularMovies);
  //     setActiveMovieId(popularMovies[0].id);
  //   });
  // }, []);

  const { data: popularMoviesResponse } = useFetch({
    url: '/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&include_video=true',
  });

  const { data: videoResponse } = useFetch(
    {
      url: `/movie/${activeMovieId}/videos`,
    },
    { enabled: !!activeMovieId }
  );

  const movies = (popularMoviesResponse.results || []).slice(0, 4);
  useEffect(() => {
    if (movies[0]?.id) {
      setActiveMovieId(movies[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(movies)]);

  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      setActiveMovieId((prevId) => {
        const currentIndex = movies.findIndex((m) => m.id === prevId);
        const nextIndex = (currentIndex + 1) % movies.length;
        return movies[nextIndex].id;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div className='relative text-white'>
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie
            key={movie.id}
            data={movie}
            trailerVideoKey={
              (videoResponse?.results || []).find(
                (video) => video.type == 'Trailer' && video.site === 'YouTube'
              )?.key
            }
          />
        ))}
      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};
export default FeatureMovies;
