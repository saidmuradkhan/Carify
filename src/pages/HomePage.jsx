import Hero from '../Components/Home/Hero';
import Process from '../Components/Home/Process';
import WhyUs from '../Components/Home/WhyUs';
import Services from '../Components/Home/Services';
import HomeCards from '../Components/Home/HomeCards';
import Shipments from '../Components/Home/Shipments';
import Brands from '../Components/Home/Brands';
import Stats from '../Components/Home/Stats';
import Reviews from '../Components/Home/Reviews';
import BlogSection from '../Components/Home/BlogSection';

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <Process />
      <WhyUs />
      <Services />
      <HomeCards />
      <Shipments />
      <Brands />
      <Stats />
      <Reviews />
      <BlogSection />
    </div>
  );
}

export default HomePage;
