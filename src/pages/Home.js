import React from 'react';
import Layout from '../components/layout/Layout';
import FeaturedCarousel from '../components/ui/FeaturedCarousel';
import LatestItems from '../components/ui/LatestItems';

const Home = () => {
  return (
    <Layout>
      <div className="flex gap-6 items-start px-6">
        {/* Carousel bên trái */}
        <div className="w-[62%]">
          <FeaturedCarousel />
        </div>

        {/* LatestItems bên phải */}
        <div className="w-[38%]">
          <LatestItems />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
