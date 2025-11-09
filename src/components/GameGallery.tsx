import { useState } from "react";
import { Search, Star } from "lucide-react";

import callOfDuty from "../assets/callOfDuty.png";
import modernCombat from "../assets/modernCombat.png";
import agentShooter from "../assets/Agent Shooter.png";
import aceFighter from "../assets/Agent Shooter.png";
import hunterAssassin from "../assets/Hunter Asssassin.png";
import freeFire from "../assets/Free Fire x NARUTO.png";
import killerBean from "../assets/Killer Bean.png";
import templeRun from "../assets/templeRun.png";
import bloodStrike from "../assets/Blood Strike.png";
import theSims from "../assets/The Sims.png";
import avatarWorld from "../assets/Avatar world.png";
import cookingCenter from "../assets/Cooking center restaurant.png";
import cookingFever from "../assets/Cooking fever.png";
import legendPhoenix from "../assets/Legend of the Phoenix.png";
import mineCraft from "../assets/Lost Island.png";
import fishingClash from "../assets/Fishing Clash.png";
import indieGuy from "../assets/Legend of the Phoenix.png";
import talkingTom from "../assets/My Talking Tom.png";
import cityIsland from "../assets/City island.png";
import bricksBreaker from "../assets/bricks breaker.png";
import blockPuzzle from "../assets/block puzzle wood blast.png";
import jewelsClassic from "../assets/Dream it, Build it.png";
import royalMatch from "../assets/royal match.png";
import storyMatch from "../assets/story match.png";
import waterSort from "../assets/water sort.png";
import candyCrush from "../assets/candy crush.png";
import bubblePop from "../assets/bubble pop.png";
import worldLegend from "../assets/wordlegend.png";
import jigsawPuzzles from "../assets/Roblox.png";
import landOfEmpires from "../assets/Land of Empires.png";
import altosAdventure from "../assets/Alto's Adventure.png";
import bladeOfChaos from "../assets/Alto's Adventure.png";
import manorMatters from "../assets/Manor Matters.png";
import survivalPoint from "../assets/Survival Point.png";
import robolox from "../assets/Roblox.png";
import lostIsland from "../assets/Lost Island.png";
import adventureBay from "../assets/Adventure Bay.png";
import needForSpeed from "../assets/Need for Speed.png";
import raceMaster from "../assets/Race Master 3D.png";
import asphalt8 from "../assets/asphaltCity.png";
import stuntCarExtreeme from "../assets/Stunt Car Extreme.png";
import beachBugyy from "../assets/Beach Buggy.png";
import payback2 from "../assets/Payback 2.png";
import raceArena from "../assets/RACE_ Arena.png";
import carSimulator from "../assets/Car Simulator.png";

export default function GameGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Action");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const categories = ["Action", "Simulation", "Puzzle", "Adventure", "Racing"];

  const games = [
    {
      id: 1,
      name: "MODERN COMBAT",
      category: "Action",
      image: modernCombat,
      stars: 4.5,
      reviews: 1200,
    },
    {
      id: 2,
      name: "CALL OF DUTY",
      category: "Action",
      image: callOfDuty,
      stars: 4.8,
      reviews: 3500,
    },
    {
      id: 3,
      name: "AGENT SHOOTER",
      category: "Action",
      image: agentShooter,
      stars: 4.3,
      reviews: 890,
    },
    {
      id: 4,
      name: "ACE FIGHTER",
      category: "Action",
      image: aceFighter,
      stars: 4.6,
      reviews: 2100,
    },
    {
      id: 5,
      name: "HUNTER ASSASSIN",
      category: "Action",
      image: hunterAssassin,
      stars: 4.9,
      reviews: 4200,
    },
    {
      id: 6,
      name: "FREE FIRE X NARUTO",
      category: "Action",
      image: freeFire,
      stars: 4.7,
      reviews: 3100,
    },
    {
      id: 7,
      name: "KILLER BEAN",
      category: "Action",
      image: killerBean,
      stars: 4.4,
      reviews: 1850,
    },
    {
      id: 8,
      name: "TEMPLE RUN",
      category: "Action",
      image: templeRun,
      stars: 4.6,
      reviews: 5200,
    },
    {
      id: 9,
      name: "BLOOD STRIKE",
      category: "Action",
      image: bloodStrike,
      stars: 4.5,
      reviews: 2800,
    },

    {
      id: 10,
      name: "THE SIMS",
      category: "Simulation",
      image: theSims,
      stars: 4.7,
      reviews: 4500,
    },
    {
      id: 11,
      name: "AVATAR WORLD",
      category: "Simulation",
      image: avatarWorld,
      stars: 4.4,
      reviews: 2100,
    },
    {
      id: 12,
      name: "COOKING CENTER RESTAURANT",
      category: "Simulation",
      image: cookingCenter,
      stars: 4.5,
      reviews: 1650,
    },
    {
      id: 13,
      name: "COOKING FEVER",
      category: "Simulation",
      image: cookingFever,
      stars: 4.6,
      reviews: 3200,
    },
    {
      id: 14,
      name: "LEGEND OF THE PHOENIX",
      category: "Simulation",
      image: legendPhoenix,
      stars: 4.3,
      reviews: 980,
    },
    {
      id: 15,
      name: "MINE CRAFT",
      category: "Simulation",
      image: mineCraft,
      stars: 4.9,
      reviews: 8500,
    },
    {
      id: 16,
      name: "FISHING CLASH",
      category: "Simulation",
      image: fishingClash,
      stars: 4.4,
      reviews: 1450,
    },
    {
      id: 17,
      name: "INDIE GUY",
      category: "Simulation",
      image: indieGuy,
      stars: 4.2,
      reviews: 780,
    },
    {
      id: 18,
      name: "MY TALKING TOM",
      category: "Simulation",
      image: talkingTom,
      stars: 4.6,
      reviews: 5600,
    },
    {
      id: 19,
      name: "CITY ISLAND",
      category: "Simulation",
      image: cityIsland,
      stars: 4.5,
      reviews: 2200,
    },

    {
      id: 20,
      name: "BRICKS BREAKER",
      category: "Puzzle",
      image: bricksBreaker,
      stars: 4.3,
      reviews: 1100,
    },
    {
      id: 21,
      name: "BLOCK PUZZLE WOOD BLAST",
      category: "Puzzle",
      image: blockPuzzle,
      stars: 4.5,
      reviews: 1800,
    },
    {
      id: 22,
      name: "JEWELS CLASSIC",
      category: "Puzzle",
      image: jewelsClassic,
      stars: 4.6,
      reviews: 2400,
    },
    {
      id: 23,
      name: "ROYAL MATCH",
      category: "Puzzle",
      image: royalMatch,
      stars: 4.7,
      reviews: 3500,
    },
    {
      id: 24,
      name: "STORY MATCH",
      category: "Puzzle",
      image: storyMatch,
      stars: 4.4,
      reviews: 1650,
    },
    {
      id: 25,
      name: "WATER SORT",
      category: "Puzzle",
      image: waterSort,
      stars: 4.5,
      reviews: 2100,
    },
    {
      id: 26,
      name: "CANDY CRUSH",
      category: "Puzzle",
      image: candyCrush,
      stars: 4.8,
      reviews: 7200,
    },
    {
      id: 27,
      name: "BUBBLE POP",
      category: "Puzzle",
      image: bubblePop,
      stars: 4.3,
      reviews: 1450,
    },
    {
      id: 28,
      name: "WORD LEGEND",
      category: "Puzzle",
      image: worldLegend,
      stars: 4.6,
      reviews: 1950,
    },
    {
      id: 29,
      name: "JIGSAW PUZZLES",
      category: "Puzzle",
      image: jigsawPuzzles,
      stars: 4.4,
      reviews: 1320,
    },

    {
      id: 30,
      name: "LAND OF EMPIRES",
      category: "Adventure",
      image: landOfEmpires,
      stars: 4.5,
      reviews: 2800,
    },
    {
      id: 31,
      name: "ALTO'S ADVENTURE",
      category: "Adventure",
      image: altosAdventure,
      stars: 4.7,
      reviews: 3200,
    },
    {
      id: 32,
      name: "BLADE OF CHAOS",
      category: "Adventure",
      image: bladeOfChaos,
      stars: 4.6,
      reviews: 2100,
    },
    {
      id: 33,
      name: "MANOR MATTERS",
      category: "Adventure",
      image: manorMatters,
      stars: 4.4,
      reviews: 1750,
    },
    {
      id: 34,
      name: "SURVIVAL POINT",
      category: "Adventure",
      image: survivalPoint,
      stars: 4.5,
      reviews: 1950,
    },
    {
      id: 35,
      name: "ROBLOX",
      category: "Adventure",
      image: robolox,
      stars: 4.8,
      reviews: 9500,
    },
    {
      id: 36,
      name: "LOST ISLAND",
      category: "Adventure",
      image: lostIsland,
      stars: 4.3,
      reviews: 1450,
    },
    {
      id: 37,
      name: "ADVENTURE BAY",
      category: "Adventure",
      image: adventureBay,
      stars: 4.6,
      reviews: 2200,
    },

    // Racing Games
    {
      id: 38,
      name: "NEED FOR SPEED",
      category: "Racing",
      image: needForSpeed,
      stars: 4.7,
      reviews: 5200,
    },
    {
      id: 39,
      name: "RACE MASTER 3D",
      category: "Racing",
      image: raceMaster,
      stars: 4.4,
      reviews: 1850,
    },
    {
      id: 40,
      name: "ASPHALT 8",
      category: "Racing",
      image: asphalt8,
      stars: 4.6,
      reviews: 4100,
    },
    {
      id: 41,
      name: "STUNT CAR EXTREME",
      category: "Racing",
      image: stuntCarExtreeme,
      stars: 4.3,
      reviews: 1650,
    },
    {
      id: 42,
      name: "BEACH BUGGY",
      category: "Racing",
      image: beachBugyy,
      stars: 4.5,
      reviews: 2100,
    },
    {
      id: 43,
      name: "PAYBACK 2",
      category: "Racing",
      image: payback2,
      stars: 4.4,
      reviews: 1450,
    },
    {
      id: 44,
      name: "RACE: ARENA",
      category: "Racing",
      image: raceArena,
      stars: 4.6,
      reviews: 1920,
    },
    {
      id: 45,
      name: "CAR SIMULATOR",
      category: "Racing",
      image: carSimulator,
      stars: 4.5,
      reviews: 2350,
    },
  ];

  const filteredGames = games.filter(
    (game) =>
      game.category === selectedCategory &&
      game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen rounded-3xl p-4 sm:p-6 lg:p-8">
      <div className="relative mb-6 max-w-[886px] mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
        <input
          type="text"
          placeholder="Search Game Categories"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#411366] text-white placeholder-white rounded-full py-3 pl-12 pr-4 border border-purple-500/30 focus:outline-none focus:border-pink-500/50"
        />
      </div>
      <div className="flex justify-center sm:justify-between gap-2 sm:gap-3 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-medium cursor-pointer transition-all  ${
              selectedCategory === category
                ? "bg-gradient-to-r from-[#F432FF] to-[#9B32FF] text-white"
                : "bg-purple-700/50 text-purple-200 hover:bg-purple-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="group relative rounded-2xl overflow-hidden border-4 border-purple-500/30 hover:border-pink-500/60 transition-all  w-full"
            style={{
              aspectRatio: "1 / 1",
              maxWidth: "100%",
              height: "auto",
            }}
            onClick={() =>
              setActiveCardId(activeCardId === game.id ? null : game.id)
            }
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-full object-cover"
            />

            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/95 via-purple-900/90 to-transparent 
                      transition-transform duration-500 ease-out backdrop-blur-md
                      ${
                        activeCardId === game.id
                          ? "translate-y-0"
                          : "translate-y-full"
                      }
                      group-hover:translate-y-0`}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 lg:p-6">
                <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-2 line-clamp-2">
                  {game.name}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          i < Math.floor(game.stars)
                            ? "fill-yellow-400 text-yellow-400"
                            : i < game.stars
                            ? "fill-yellow-400/50 text-yellow-400"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-yellow-400 font-semibold text-base sm:text-lg">
                    {game.stars}
                  </span>
                  <span className="text-gray-300 text-sm sm:text-base">
                    ({game.reviews} reviews)
                  </span>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 
                           hover:from-pink-600 hover:to-purple-600 
                           active:scale-95
                           text-white font-bold py-3 sm:py-3.5 
                           text-base sm:text-lg rounded-lg 
                           transition-all transform hover:scale-105
                           touch-manipulation cursor-pointer"
                >
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800
                   text-white px-8 sm:px-10 py-3 sm:py-4 
                   rounded-2xl font-medium text-base sm:text-lg 
                   transition-all flex items-center gap-2
                   touch-manipulation
                   hover:shadow-lg hover:shadow-purple-500/50"
        >
          Next Page
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
}
