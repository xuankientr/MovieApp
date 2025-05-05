import CircularProgressBar from '@/components/CircularProgressBar';
import ImageComponent from '@/components/ImageComponent';

const SeasonList = ({ seasons = [] }) => {
  return (
    <div className='text-[1.3vw] mt-8'>
      <p className='font-bold text-[1.4vw] mb-4'>Season</p>
      <div className='space-y-4'>
        {seasons.map((season) => (
          <div
            key={season.id}
            className='flex gap-4 p-3 rounded-lg shadow-md border border-slate-200'
          >
            <div>
              <ImageComponent
                src={`https://media.themoviedb.org/t/p/w300${season.poster_path}`}
                width={300}
                height={195}
                className='rounded-lg w-full '
              />
            </div>
            <div className='space-y-1'>
              <p className='font-bold text-[1.4vw]'>{season.name}</p>
              <div className='flex items-center gap-2'>
                <p className='font-bold'>Rating</p>
                <CircularProgressBar
                  percent={Math.round(season.vote_average * 10)}
                  size={2.5}
                  strokeWidth={0.2}
                />
              </div>
              <p>
                {' '}
                <span className='font-bold'>Release Date:</span>{' '}
                {season.air_date}
              </p>
              <p>{season.episode_count} Episodes</p>
              <p>{season.overview} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SeasonList;
