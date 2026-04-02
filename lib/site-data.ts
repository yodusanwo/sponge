export type NavItem = {
  label: string;
  href: string;
};

export type Bullet = {
  title: string;
  description: string;
  tone?: "positive" | "negative";
};

export type SpongeCard = {
  title: string;
  description: string;
  imageUrl: string;
  rotation?: string;
};

export type ComparisonRow = {
  feature: string;
  regularSponges: string;
  choreClaridy: string;
};

export const navItems: NavItem[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "The sponges", href: "#the-sponges" },
  { label: "Why it’s better", href: "#why-better" },
  { label: "Who it’s for", href: "#who-its-for" },
];

export const heroBullets: Bullet[] = [
  {
    title: "Confusion",
    description: '"Wait… this isn’t the kitchen sponge, is it?"',
    tone: "negative",
  },
  {
    title: "ClarIDy",
    description: "Each Chore ClarIDy sponge has one job. No guessing required.",
    tone: "positive",
  },
];

export const spongeCards: SpongeCard[] = [
  {
    title: "Dishes",
    description:
      "Gentle enough for mirrors and fixtures, tough on soap scum and toothpaste.",
    imageUrl: "https://www.figma.com/api/mcp/asset/4b9257e1-29d7-4800-8631-f4307d4fab24",
    rotation: "-1deg",
  },
  {
    title: "Kitchen counter",
    description:
      "Built for the job it was made for. Never touches anything else.",
    imageUrl: "https://www.figma.com/api/mcp/asset/e692250b-884c-44ed-bbe3-c93a4adf92b6",
  },
  {
    title: "Bathroom counter",
    description:
      "Cuts through grease and grime without scratching delicate surfaces.",
    imageUrl: "https://www.figma.com/api/mcp/asset/f5e40c6c-de27-4c41-9775-ad4057b69077",
  },
  {
    title: "Toilet",
    description:
      "Handles spills, crumbs, and everyday messes with precision and care.",
    imageUrl: "https://www.figma.com/api/mcp/asset/e2246230-ab91-49b7-a281-62f34b98e3da",
  },
];

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Identification",
    regularSponges: "All look the same — mix-ups are easy",
    choreClaridy: "Clear label + icon on every sponge",
  },
  {
    feature: "Cleaning system",
    regularSponges: "Random multipack, no clear purpose",
    choreClaridy: "One dedicated sponge per zone",
  },
  {
    feature: "Packaging",
    regularSponges: "Exposed to dust & moisture after opening",
    choreClaridy: "Individually wrapped until use",
  },
  {
    feature: "Material",
    regularSponges: "Low-density foam — can shred & scratch",
    choreClaridy: "Premium cellulose — safe on all surfaces",
  },
  {
    feature: "Cleanliness check",
    regularSponges: "Colored fibers hide dirt — hard to judge",
    choreClaridy: "Bright white shows exactly when to replace",
  },
];

export const featureHighlights: Bullet[] = [
  {
    title: "Busy family households",
    description: "Everyone knows which sponge goes where. No arguments. No waste.",
  },
  {
    title: "Shared homes and roommates",
    description:
      "No more wondering who used what on the toilet. Clarity ends the confusion.",
  },
  {
    title: "Airbnb and short-term rentals",
    description:
      "Guests understand the system instantly. Your home stays clean and organized.",
  },
  {
    title: "Anyone who loves order",
    description:
      "A small change that makes your entire cleaning routine feel effortless and intentional.",
  },
];

export const wholesaleBullets: Bullet[] = [
  {
    title: "Stop wondering where that sponge has been",
    description:
      "Four clearly labeled sponges — one for dishes, kitchen counters, bathroom counters, and the toilet. No mix-ups. No second-guessing. Just clean.",
  },
  {
    title: "A small change that simplifies your routine",
    description:
      "Whether you're running a busy household or just tired of the guessing game — Chore ClarIDy makes your cleaning routine feel effortless.",
  },
];

export const amazonUrl = "https://www.amazon.com/";

export const figmaImages = {
  hero: "https://www.figma.com/api/mcp/asset/30f87b18-a217-4adc-8821-f149bcf0b1fa",
  confusion: "https://www.figma.com/api/mcp/asset/ada2f64b-559c-4412-b5d6-bfb2028a3cb5",
  audience: "https://www.figma.com/api/mcp/asset/3026fcd0-71af-4517-8ca5-106ce41e5f08",
  cta: "https://www.figma.com/api/mcp/asset/d89ae977-d930-44d9-869c-eaef1295ea4d",
};
