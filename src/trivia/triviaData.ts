export interface TriviaOption {
  id: string;
  text: string;
}

export interface TriviaQuestion {
  id: number;
  gameId: number;
  question: string;
  options: TriviaOption[];
  correctOptionId: string;
  difficulty?: "easy" | "medium" | "hard";
}

export const PRIZE_LADDER = [
  { q: 1, prize: "₦1,000", pts: 100 },
  { q: 2, prize: "₦5,000", pts: 300 },
  { q: 3, prize: "₦25,000", pts: 700 },
  { q: 4, prize: "₦250,000", pts: 1500 },
  { q: 5, prize: "₦1,000,000", pts: 5000 },
];

export const QUESTION_BANK: TriviaQuestion[] = [
  // ─── EASY ───────────────────────────────────────────────
  {
    id: 1,
    gameId: 1,
    difficulty: "easy",
    question: "What is the capital of Nigeria?",
    options: [
      { id: "a", text: "Lagos" },
      { id: "b", text: "Abuja" },
      { id: "c", text: "Kano" },
      { id: "d", text: "Ibadan" },
    ],
    correctOptionId: "b",
  },
  {
    id: 2,
    gameId: 1,
    difficulty: "easy",
    question: "What does CPU stand for?",
    options: [
      { id: "a", text: "Central Processing Unit" },
      { id: "b", text: "Core Program Utility" },
      { id: "c", text: "Computer Process Unit" },
      { id: "d", text: "Central Program Uploader" },
    ],
    correctOptionId: "a",
  },
  {
    id: 3,
    gameId: 1,
    difficulty: "easy",
    question: "How many sides does a hexagon have?",
    options: [
      { id: "a", text: "Five" },
      { id: "b", text: "Six" },
      { id: "c", text: "Seven" },
      { id: "d", text: "Eight" },
    ],
    correctOptionId: "b",
  },
  {
    id: 4,
    gameId: 1,
    difficulty: "easy",
    question: "Which planet is known as the Red Planet?",
    options: [
      { id: "a", text: "Venus" },
      { id: "b", text: "Jupiter" },
      { id: "c", text: "Mars" },
      { id: "d", text: "Saturn" },
    ],
    correctOptionId: "c",
  },
  {
    id: 5,
    gameId: 1,
    difficulty: "easy",
    question: "What is the largest ocean on Earth?",
    options: [
      { id: "a", text: "Atlantic" },
      { id: "b", text: "Indian" },
      { id: "c", text: "Arctic" },
      { id: "d", text: "Pacific" },
    ],
    correctOptionId: "d",
  },
  {
    id: 6,
    gameId: 1,
    difficulty: "easy",
    question: "What is the chemical symbol for Gold?",
    options: [
      { id: "a", text: "Gd" },
      { id: "b", text: "Go" },
      { id: "c", text: "Au" },
      { id: "d", text: "Ag" },
    ],
    correctOptionId: "c",
  },
  {
    id: 7,
    gameId: 1,
    difficulty: "easy",
    question: "Who wrote Romeo and Juliet?",
    options: [
      { id: "a", text: "Charles Dickens" },
      { id: "b", text: "William Shakespeare" },
      { id: "c", text: "Leo Tolstoy" },
      { id: "d", text: "Mark Twain" },
    ],
    correctOptionId: "b",
  },
  {
    id: 8,
    gameId: 1,
    difficulty: "easy",
    question: "In what continent is Egypt located?",
    options: [
      { id: "a", text: "Asia" },
      { id: "b", text: "Europe" },
      { id: "c", text: "South America" },
      { id: "d", text: "Africa" },
    ],
    correctOptionId: "d",
  },

  // ─── MEDIUM ─────────────────────────────────────────────
  {
    id: 9,
    gameId: 1,
    difficulty: "medium",
    question: "What year did World War II end?",
    options: [
      { id: "a", text: "1943" },
      { id: "b", text: "1944" },
      { id: "c", text: "1945" },
      { id: "d", text: "1946" },
    ],
    correctOptionId: "c",
  },
  {
    id: 10,
    gameId: 1,
    difficulty: "medium",
    question: "What is the square root of 144?",
    options: [
      { id: "a", text: "11" },
      { id: "b", text: "12" },
      { id: "c", text: "13" },
      { id: "d", text: "14" },
    ],
    correctOptionId: "b",
  },
  {
    id: 11,
    gameId: 1,
    difficulty: "medium",
    question: "Which company created the iPhone?",
    options: [
      { id: "a", text: "Samsung" },
      { id: "b", text: "Sony" },
      { id: "c", text: "Google" },
      { id: "d", text: "Apple" },
    ],
    correctOptionId: "d",
  },
  {
    id: 12,
    gameId: 1,
    difficulty: "medium",
    question: "What is the powerhouse of the cell?",
    options: [
      { id: "a", text: "Nucleus" },
      { id: "b", text: "Ribosome" },
      { id: "c", text: "Mitochondria" },
      { id: "d", text: "Golgi body" },
    ],
    correctOptionId: "c",
  },
  {
    id: 13,
    gameId: 1,
    difficulty: "medium",
    question: "How many bones are in the adult human body?",
    options: [
      { id: "a", text: "196" },
      { id: "b", text: "206" },
      { id: "c", text: "216" },
      { id: "d", text: "226" },
    ],
    correctOptionId: "b",
  },
  {
    id: 14,
    gameId: 1,
    difficulty: "medium",
    question: "Which language has the most native speakers worldwide?",
    options: [
      { id: "a", text: "English" },
      { id: "b", text: "Spanish" },
      { id: "c", text: "Hindi" },
      { id: "d", text: "Mandarin Chinese" },
    ],
    correctOptionId: "d",
  },
  {
    id: 15,
    gameId: 1,
    difficulty: "medium",
    question: "What is the currency of Japan?",
    options: [
      { id: "a", text: "Yuan" },
      { id: "b", text: "Won" },
      { id: "c", text: "Yen" },
      { id: "d", text: "Baht" },
    ],
    correctOptionId: "c",
  },
  {
    id: 16,
    gameId: 1,
    difficulty: "medium",
    question: "Who painted the Mona Lisa?",
    options: [
      { id: "a", text: "Michelangelo" },
      { id: "b", text: "Van Gogh" },
      { id: "c", text: "Picasso" },
      { id: "d", text: "Leonardo da Vinci" },
    ],
    correctOptionId: "d",
  },

  // ─── HARD ───────────────────────────────────────────────
  {
    id: 17,
    gameId: 1,
    difficulty: "hard",
    question: "What is the speed of light in a vacuum (approx)?",
    options: [
      { id: "a", text: "200,000 km/s" },
      { id: "b", text: "299,792 km/s" },
      { id: "c", text: "350,000 km/s" },
      { id: "d", text: "150,000 km/s" },
    ],
    correctOptionId: "b",
  },
  {
    id: 18,
    gameId: 1,
    difficulty: "hard",
    question: "In which year was the first iPhone released?",
    options: [
      { id: "a", text: "2005" },
      { id: "b", text: "2006" },
      { id: "c", text: "2007" },
      { id: "d", text: "2008" },
    ],
    correctOptionId: "c",
  },
  {
    id: 19,
    gameId: 1,
    difficulty: "hard",
    question: "What element has the atomic number 79?",
    options: [
      { id: "a", text: "Silver" },
      { id: "b", text: "Platinum" },
      { id: "c", text: "Gold" },
      { id: "d", text: "Copper" },
    ],
    correctOptionId: "c",
  },
  {
    id: 20,
    gameId: 1,
    difficulty: "hard",
    question: "Which Nigerian state is nicknamed 'The Sunshine State'?",
    options: [
      { id: "a", text: "Osun" },
      { id: "b", text: "Ondo" },
      { id: "c", text: "Ogun" },
      { id: "d", text: "Oyo" },
    ],
    correctOptionId: "b",
  },
  {
    id: 21,
    gameId: 1,
    difficulty: "hard",
    question: "What does HTTP stand for?",
    options: [
      { id: "a", text: "HyperText Transfer Protocol" },
      { id: "b", text: "HighText Transfer Program" },
      { id: "c", text: "HyperText Transit Process" },
      { id: "d", text: "HyperText Terminal Protocol" },
    ],
    correctOptionId: "a",
  },
  {
    id: 22,
    gameId: 1,
    difficulty: "hard",
    question: "What is the longest river in the world?",
    options: [
      { id: "a", text: "Amazon" },
      { id: "b", text: "Congo" },
      { id: "c", text: "Yangtze" },
      { id: "d", text: "Nile" },
    ],
    correctOptionId: "d",
  },
  {
    id: 23,
    gameId: 1,
    difficulty: "hard",
    question: "Who was the first person to walk on the moon?",
    options: [
      { id: "a", text: "Buzz Aldrin" },
      { id: "b", text: "Yuri Gagarin" },
      { id: "c", text: "Neil Armstrong" },
      { id: "d", text: "John Glenn" },
    ],
    correctOptionId: "c",
  },
  {
    id: 24,
    gameId: 1,
    difficulty: "hard",
    question: "What does RAM stand for in computing?",
    options: [
      { id: "a", text: "Read-Only Access Memory" },
      { id: "b", text: "Random Access Memory" },
      { id: "c", text: "Rapid Application Module" },
      { id: "d", text: "Remote Access Memory" },
    ],
    correctOptionId: "b",
  },
];

export function pickGameQuestions(bank: TriviaQuestion[]): TriviaQuestion[] {
  const shuffle = <T>(arr: T[]): T[] =>
    [...arr].sort(() => Math.random() - 0.5);
  const easy = shuffle(bank.filter((q) => q.difficulty === "easy")).slice(0, 2);
  const medium = shuffle(bank.filter((q) => q.difficulty === "medium")).slice(
    0,
    2,
  );
  const hard = shuffle(bank.filter((q) => q.difficulty === "hard")).slice(0, 1);
  return [...easy, ...medium, ...hard];
}
