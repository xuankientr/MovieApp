import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircularProgressBar from '../CircularProgressBar';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { groupBy } from 'lodash';
import ImageComponent from '@/components/ImageComponent';

import { useModalContext } from '@/context/ModalProvider';

const Banner = ({
  title,
  backdrop_path,
  poster_path,
  certification,
  crews,
  release_date,
  genres,
  point = 0,
  overview,
  trailerVideoKey,
}) => {
  const { openPopup } = useModalContext();

  if (!title) return null;

  const groupedCrews = groupBy(crews, 'job');

  return (
    <div className='relative text-white bg-black overflow-hidden shadow-sm shadow-slate-800'>
      <ImageComponent
        className='absolute inset-0 brightness-[.2] w-full  aspect-video'
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        width={1200}
        height={800}
      />
      <div className='flex relative w-full mx-auto p-6 py-10 gap-6 lg:gap-8'>
        <ImageComponent
          src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${poster_path}`}
          alt=''
          className='flex-1 w-50'
          width={600}
          height={900}
        />
        <div className='flex-2 text-[1.2vw]'>
          <p className='font-bold mb-2 text-[2vw]'>{title}</p>
          <div className='flex gap-4 items-center'>
            <span className='text-gray-400 border border-gray-400 p-1'>
              {certification}
            </span>
            <p>{release_date}</p>
            <p>{(genres || []).map((genre) => genre.name).join(', ')}</p>
          </div>
          <div className='flex mt-4 items-center gap-4'>
            <div className='flex items-center gap-2'>
              <CircularProgressBar
                percent={Math.ceil(point * 10) || 0}
                size={3.5}
                strokeWidth={0.3}
              />{' '}
              Rating
            </div>
            <button
              onClick={() => {
                openPopup(
                  <iframe
                    title='Trailer'
                    src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                    className='aspect-video w-[50vw]'
                  />
                );
              }}
            >
              <FontAwesomeIcon icon={faPlay} className='mr-1' />
              Trailer
            </button>
          </div>
          <div className='mt-4'>
            <p className='font-bold text-[1.3vw] mb-2'>Overview</p>
            <p>{overview}</p>
          </div>
          <div className='grid grid-cols-2 gap-2 mt-4'>
            {Object.keys(groupedCrews).map((job) => (
              <div key={job}>
                <p className='font-bold'>{job}</p>
                <p>{groupedCrews[job].map((crew) => crew.name).join(', ')}</p>
              </div>
            ))}
            {/* <div>
          <p className='font-bold'>Director</p>
          <p>Kien Trinh</p>
        </div>
        <div>
          <p className='font-bold'>Writer</p>
          <p>Kien Trinh, Khoa Trinh</p>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
