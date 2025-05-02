import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const MediaList = ({ title, tabs }) => {
  const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);
  useEffect(() => {
    const url = tabs.find((tab) => tab.id === activeTabId)?.url;
    if (url) {
      fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTA1ZTRkM2FmODNjMmY3OTY1ZmQ2MTBiYzgzYTM2NCIsIm5iZiI6MTc0NDU1MDc2OC4zMDQsInN1YiI6IjY3ZmJiYjcwNzY1YzUyMjJmMzk5MWYwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SiKpo0Okch_SbEpmxteIu7OLRSCpdohwLBzm1Q-96aI`,
        },
      }).then(async (res) => {
        const data = await res.json();
        console.log({ data });
        const trendingMediaList = data.results.slice(0, 12);
        setMediaList(trendingMediaList);
      });
    }
  }, [activeTabId, tabs]);

  return (
    <div className='px-8 text-[1.2w] py-10 bg-black text-white'>
      <div className='flex items-center gap-4 mb-6'>
        <p className='text-[2vw] font-bold'>{title}</p>
        <ul className='flex border border-white rounded'>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`px-2 py-1 rounded cursor-pointer ${tab.id === activeTabId ? 'text-black bg-white' : ''}`}
              onClick={() => {
                setActiveTabId(tab.id);
              }}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6'>
        {mediaList.map((media) => (
          <MovieCard
            key={media.id}
            title={media.title || media.name}
            releaseDate={media.release_date || media.first_air_date}
            poster={media.poster_path}
            point={media.vote_average}
            mediaType={media.media_type || activeTabId}
          />
        ))}
      </div>
    </div>
  );
};
export default MediaList;
