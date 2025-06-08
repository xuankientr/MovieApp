import ImageComponent from '@/components/ImageComponent';
import { useModalContext } from '@/context/ModalProvider';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Movie = (props) => {
  console.log({ props });
  const {
    data: { id, backdrop_path, title, release_date, overview },
    trailerVideoKey,
  } = props;

  const { openPopup } = useModalContext();

  return (
    <>
      <ImageComponent
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt=''
        className='w-full h-auto object-cover brightness-50 aspect-video'
        width={900}
        height={500}
      />
      <div className='absolute bottom-[45%] left-8 w-1/2 sm:w-1/3'>
        <p className='font-bold sm:text-[2vw] mb-2'>{title}</p>
        <div>
          {/* <p className='text-gray-400 border border-gray-400 inline-block p-1 mb-1'>
            PG13
          </p> */}
          <p className='text-[1.2vw]'>{release_date}</p>
        </div>
        <div>
          <div className='hidden sm:block text-[1.2vw] mt-4'>
            <p className='font-bold mb-2'>Overview</p>
            <p>{overview}</p>
          </div>
          <div className='mt-4'>
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
              className='bg-white text-black py-2 px-4 rounded text-[10px] lg:text-lg mr-2'
            >
              <FontAwesomeIcon icon={faPlay} /> Trailer
            </button>
            <Link to={`/movie/${id}`}>
              <button className='bg-slate-300/35 py-2 px-4 rounded text-[10px] lg:text-lg'>
                View Detail
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Movie;
