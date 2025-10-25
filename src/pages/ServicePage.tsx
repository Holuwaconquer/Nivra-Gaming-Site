import shape1 from "../assets/double-triangle.png";
import shape2 from "../assets/double-square.png";
import shape3 from "../assets/double-circle.png";
import shape4 from "../assets/double-plus.png";
import shape5 from "../assets/mouse.png";

import deltaForce from "../assets/deltaForce.png";
import callOfDuty from "../assets/callOfDuty.png";
import trigger from "../assets/triggers.png";
import surfers from "../assets/surfers.png";
import blockBuster from "../assets/blockBluster.png";
import eFootball from "../assets/eFootball.png";
import asphaltCity from "../assets/asphaltCity.png";
import dreamLeagueSoccer from "../assets/dreamLeagueSoccer.png";
import demonCity from "../assets/dragonCity.png";
import sonicDash from "../assets/sonicDash.png";
import whiteoutSurvival from "../assets/whiteoutSurvival.png";
import modernCombat from "../assets/modernCombat.png";
import harryPotter from "../assets/harryPotter.png";
import evonyKingReturn from "../assets/evonyKingReturn.png";
import streetRacing3d from "../assets/streetRacing3d.png";
import trafficRider from "../assets/trafficRider.png";
import grimLegend from "../assets/grimLegend.png";
import vector from "../assets/vector.png";
import shadowFight from "../assets/shadowFight.png";

import HorizontalSlider from "@/components/HorizontalSlider";
import UserProfile from "@/components/UserProfile";
import GameGallery from "@/components/GameGallery";

export default function ServicePage() {
  const sliderItems1 = [
    { id: 1, name: "DELTA FORCE", image: deltaForce },
    { id: 2, name: "CALL OF DUTY", image: callOfDuty },
    { id: 3, name: "DEAD TRIGGER", image: trigger },
    { id: 4, name: "SUBWAY SURFERS", image: surfers },
    { id: 5, name: "BLOCK BLAST", image: blockBuster },
    { id: 6, name: "E FOOTBALL", image: eFootball },
    { id: 7, name: "ASPHALT 8", image: asphaltCity },
    { id: 8, name: "DREAM LEAGUE", image: dreamLeagueSoccer },
    { id: 9, name: "DEMON CITY", image: demonCity },
    { id: 10, name: "SONIC DASH", image: sonicDash },
  ];

  const sliderItems2 = [
    { id: 11, name: "WHITEOUT SURVIVAL", image: whiteoutSurvival },
    { id: 12, name: "MODERN COMBAT", image: modernCombat },
    { id: 13, name: "HARRY POTTER", image: harryPotter },
    { id: 14, name: "EVONY", image: evonyKingReturn },
    { id: 15, name: "STREET RACING", image: streetRacing3d },
    { id: 16, name: "TRAFFIC RIDER", image: trafficRider },
    { id: 17, name: "GRIM LEGENDS", image: grimLegend },
    { id: 18, name: "SHADOW FIGHT", image: shadowFight },
    { id: 19, name: "TEMPLE RUN 2", image: demonCity },
    { id: 20, name: "VECTOR", image: vector },
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
              <HorizontalSlider items={sliderItems1} />
              <HorizontalSlider items={sliderItems2} />
              <GameGallery />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
