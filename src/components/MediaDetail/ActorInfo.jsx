const ActorInfo = ({ id, name, character, profilePath }) => {
  return (
    <div className='border border-slate-300 shadow-sm rounded-lg bg-black m-2'>
      <img
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
            : '/276x350.svg'
        }
        alt=''
        className='rounded-lg w-full h-auto object-cover'
      />
      <div className='p-3'>
        <p className='font-bold'>{name}</p>
        <p>{character}</p>
        {/* <p>18 Episodes</p> */}
      </div>
    </div>
  );
};
export default ActorInfo;
