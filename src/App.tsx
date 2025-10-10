import AOS from 'aos';
import 'aos/dist/aos.css';
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LandingPage from './pages/LandingPage'
import AboutUs from './pages/AboutUs'
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);
  return (
    <>
      <Routes>
        {/* the / route is the landing page */}
        {/* the reason i have this index page is because there are some component that will be consistent accross other pages
        like the header, footer, etc, so i have the index page so i can use to hold other component that are consistent
        in my landing page, so any other pages that are not going to have the header and footer, the route has to be outside of this / routes
         */}
        <Route path='/' element={<MainPage />}>
          <Route index element={<LandingPage />} />
          <Route path='/about-us' element={<AboutUs />} />
        </Route>
        {/* other pages routes that won't have the header and footer will be defined here */}
      </Routes>
    </>
  )
}

export default App