import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LandingPage from "./pages/LandingPage";
import Contact from "./pages/Contact";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import AboutUs from "./components/AboutUs";
import ScrollToTop from "./components/ScrollTopTop";
import Profile from "./pages/Profile";
import ServicePage from "./pages/ServicePage";
import GamePage from "./pages/GamePage";
import CountdownPage from "./pages/CountdownPage";
import { DieRoller } from "./components/DieRoller";
import { SpinTheBottle } from "./components/SpinBottle";
import Coinflip from "./components/Coinflip";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* the / route is the landing page */}
        {/* the reason i have this index page is because there are some component that will be consistent accross other pages
        like the header, footer, etc, so i have the index page so i can use to hold other component that are consistent
        in my landing page, so any other pages that are not going to have the header and footer, the route has to be outside of this / routes
         */}
          <Route path="/game" element={<GamePage />} />
          <Route path="/die-roller" element={<DieRoller />} />
          <Route path="/spin-bottle" element={<SpinTheBottle />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route path="/coinflip" element={<Coinflip/>} />
        <Route path="/" element={<MainPage />}>
          <Route index element={<LandingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<ServicePage />} />
        </Route>
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
        {/* other pages routes that won't have the header and footer will be defined here */}
      </Routes>
    </>
  );
};

export default App;
