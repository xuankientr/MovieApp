import CircularProgressBar from '@/components/CircularProgressBar';
import ImageComponent from '@/components/ImageComponent';
import { Link } from 'react-router-dom';

const MovieCard = ({ id, title, releaseDate, poster, point, mediaType }) => {
  return (
    <Link
      to={mediaType === 'tv' ? `/tv/${id}` : `/movie/${id}`}
      className='rounded-lg border border-slate-800'
    >
      <div className='border border-slate-800 rounded-lg relative'>
        {mediaType === 'tv' && (
          <p className='absolute right-1 top-1 bg-black text-white p-1 text-sm rounded shadow-md font-bold'>
            TV Show
          </p>
        )}

        <ImageComponent
          src={`https://image.tmdb.org/t/p/original${poster}`}
          width={210}
          height={300}
          className={'rounded-lg w-full '}
        />

        <div className='px-4  relative -top-[1.5vw]'>
          <CircularProgressBar
            percent={Math.round(point * 10)}
            strokeColor={point >= 7 ? 'green' : point >= 5 ? 'orange' : 'red'}
          />
          <p className='font-bold mt-2'>{title}</p>
          <p className='text-slate-300'>{releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};
export default MovieCard;
