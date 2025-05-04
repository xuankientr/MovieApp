import FeatureMovies from '../components/FeatureMovies';

import MediaList from '../components/MediaList';
import { TOP_RATED_TABS, TRENDING_TABS } from '../libs/constants';

function HomePage() {
  return (
    <div>
      <FeatureMovies />
      <MediaList title='Trending' tabs={TRENDING_TABS} />
      <MediaList title='Top Rated' tabs={TOP_RATED_TABS} />
    </div>
  );
}

export default HomePage;
