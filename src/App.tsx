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
import TicTacToe from "./components/TicTacToe";
import RockPaperScissors from "./components/RockPaperScissors";
import TriviaGame from "./components/TriviaGame";

// Admin
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import UsersTable from "./Admin/UsersTable";
import Leaderboard from "./Admin/Leaderboard";
import GamesManager from "./Admin/GamesManager";
import TriviaManager from "./Admin/TriviaManager";
import ReferralsPage from "./Admin/ReferralsPage";
import PaymentsPage from "./Admin/PaymentsPage";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Game routes */}
        <Route path="/game" element={<GamePage />} />
        <Route path="/die-roller" element={<DieRoller />} />
        <Route path="/spin-bottle" element={<SpinTheBottle />} />
        <Route path="/countdown" element={<CountdownPage />} />
        <Route path="/coinflip" element={<Coinflip />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/rps" element={<RockPaperScissors />} />
        <Route path="/trivia" element={<TriviaGame />} />

        {/* Admin routes — no header/footer */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="games" element={<GamesManager />} />
          <Route path="trivia" element={<TriviaManager />} />
          <Route path="referrals" element={<ReferralsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>

        {/* Main site routes — with header/footer */}
        <Route path="/" element={<MainPage />}>
          <Route index element={<LandingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<ServicePage />} />
        </Route>

        {/* Auth routes */}
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;