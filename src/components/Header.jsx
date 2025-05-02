import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  return (
    <header className='h-14 lg:h-20 bg-slate-950 flex justify-between text-white items-center px-8 '>
      <div className='flex items-center gap-4 lg:gap-6'>
        <img src='./netflix.png' alt='' className='w-16 sm:w-28' />
        <a href='#' className='lg:text-xl'>
          Phim
        </a>
        <a href='#' className='lg:text-xl'>
          Truyền hình
        </a>
      </div>
      <div>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='cursor-pointer' />
      </div>
    </header>
  );
};
export default Header;
