import shape1 from "../assets/double-triangle.png";
import shape2 from "../assets/double-square.png";
import shape3 from "../assets/double-circle.png";
import shape4 from "../assets/double-plus.png";
import shape5 from "../assets/mouse.png";


import HorizontalSlider from "@/components/HorizontalSlider";
import UserProfile from "@/components/UserProfile";
import GameGallery from "@/components/GameGallery";
import Leaderboard from "@/components/Leaderboard";


import Avatar1 from "../assets/avatars/Avatar1.png";
import Avatar2 from "../assets/avatars/Avatar2.png";
import Avatar3 from "../assets/avatars/Avatar3.png";
import Avatar4 from "../assets/avatars/Avatar4.png";
import Avatar5 from "../assets/avatars/Avatar5.png";
import Avatar6 from "../assets/avatars/Avatar6.png";
import Avatar7 from "../assets/avatars/Avatar7.png";
import Avatar8 from "../assets/avatars/Avatar8.png";
import Avatar9 from "../assets/avatars/Avatar9.png";
import Avatar10 from "../assets/avatars/Avatar10.png";
import Avatar11 from "../assets/avatars/Avatar11.png";
import { DieRoller } from "@/components/DieRoller";

export default function ServicePage() {
const sliderItems1 = [
  { id: 1, name: "ShadowStrike", image: Avatar7 },
  { id: 2, name: "PhantomReaper", image: Avatar3 },
  { id: 3, name: "NeonViper", image: Avatar11 },
  { id: 4, name: "UrbanSprinter", image: Avatar5 },
  { id: 5, name: "BlockMaster", image: Avatar2 },
  { id: 6, name: "GoalCrusher", image: Avatar9 },
  { id: 7, name: "NitroRacer", image: Avatar4 },
  { id: 8, name: "StrikerPro", image: Avatar8 },
  { id: 9, name: "DarkSlayer", image: Avatar1 },
  { id: 10, name: "SpeedDemon", image: Avatar6 },
];

const sliderItems2 = [
  { id: 11, name: "FrostWarden", image: Avatar10 },
  { id: 12, name: "WarMachine", image: Avatar3 },
  { id: 13, name: "MysticWizard", image: Avatar7 },
  { id: 14, name: "KingSlayer", image: Avatar5 },
  { id: 15, name: "StreetRacer", image: Avatar11 },
  { id: 16, name: "RoadWarrior", image: Avatar2 },
  { id: 17, name: "GhostHunter", image: Avatar8 },
  { id: 18, name: "ShadowNinja", image: Avatar4 },
  { id: 19, name: "RuneMaster", image: Avatar9 },
  { id: 20, name: "VectorPilot", image: Avatar6 },
];
  const shapes = [
    { top: "10%", left: "15%", size: 60, image: shape1, opacity: 0.6 },
    { top: "15%", right: "50%", size: 60, image: shape2, opacity: 0.5 },
    { bottom: "15%", left: "20%", size: 60, image: shape3, opacity: 0.4 },
    { top: "20%", right: "10%", size: 60, image: shape2, opacity: 0.5 },
    { bottom: "15%", left: "20%", size: 60, image: shape3, opacity: 0.4 },
    { top: "50%", left: "5%", size: 60, image: shape1, opacity: 0.5 },
    { top: "55%", left: "37%", size: 60, image: shape5, opacity: 0.5 },
    { top: "5%", left: "45%", size: 60, image: shape2, opacity: 0.5 },
    { top: "36%", left: "5%", size: 60, image: shape4, opacity: 0.5 },
    { top: "75%", right: "25%", size: 60, image: shape3, opacity: 0.4 },
    { top: "5%", right: "25%", size: 60, image: shape5, opacity: 0.4 },
  ];

  const blurSpots = [
    { bottom: "20%", left: "10%", size: 350 },
    { top: "40%", right: "15%", size: 400 },
    { top: "60%", left: "50%", size: 280 },
  ];



  const podium = [
  {
    name: "Jolie Joie",
    avatar: Avatar1,
    requiredPoints: 2000,
    prize: 100000
  },
  {
    name: "Brian Ngo",
    avatar: Avatar2,
    requiredPoints: 2000,
    prize: 50000
  },
  {
    name: "David Do",
    avatar: Avatar3,
    requiredPoints: 2000,
    prize: 20000
  }
];

const players = [
  {
    rank: 4,
    username: "Henrietta O'Connel",
    avatar: Avatar4,
    score: 4358,
    lastSession: "4 hours ago",
    active: true,
    reward: "💎 100"
  },
  {
    rank: 5,
    username: "Darrel Birs",
    avatar: Avatar5,
    score: 2146,
    lastSession: "11 hours ago",
    active: false,
    reward: "💎 100"
  }
];


  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#210736" }}
    >
      {blurSpots.map((spot, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            top: spot.top,
            left: spot.left,
            right: spot.right,
            bottom: spot.bottom,
            width: `${spot.size}px`,
            height: `${spot.size}px`,
            backgroundColor: "#D932FE",
            opacity: 0.3,
          }}
        />
      ))}

      {shapes.map((shape, i) => (
        <img
          key={i}
          src={shape.image}
          alt=""
          className="absolute"
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            opacity: shape.opacity,
            objectFit: "contain",
            zIndex: 1,
          }}
        />
      ))}

      <div className="relative z-10 min-h-screen p-8">
        <div className="w-full max-w-7xl lg:mx-auto">
          <div className="lg:mx-16">
            <div className="space-y-8 mb-8">
              <UserProfile />
              <HorizontalSlider direction="left" items={sliderItems1} />
              <HorizontalSlider direction="right" items={sliderItems2} />
              <Leaderboard players={players} podium={podium} />
              <GameGallery />
              <DieRoller/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
