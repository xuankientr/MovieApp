import ImageComponent from '@/components/ImageComponent';

const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <div className='border border-slate-300 shadow-sm rounded-lg bg-black m-2'>
      <ImageComponent
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
            : '/276x350.svg'
        }
        className={'rounded-lg w-full h-auto object-cover'}
        width={276}
        height={350}
      />
      <div className='p-3'>
        <p className='font-bold'>{name}</p>
        <p>{character}</p>
        {episodeCount && <p>{episodeCount} Episodes</p>}
      </div>
    </div>
  );
};
export default ActorInfo;
