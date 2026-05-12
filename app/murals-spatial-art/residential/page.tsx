import MuralSectionPage from "@/components/murals/MuralSectionPage";

const cases = [
  {
    title: "Living Room Memory Wall",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600",
    summary: "A personal wall built around family stories, warm colour, and a room that finally felt complete.",
  },
  {
    title: "Childhood Room Mural",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600",
    summary: "A playful custom piece that gave a child a world of their own without turning the room into a theme park.",
  },
  {
    title: "Apartment Entry Piece",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600",
    summary: "A compact entrance transformed into the first feeling of home.",
  },
  {
    title: "Bedroom Feature Wall",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600",
    summary: "A soft, intentional wall that changed the mood of the most personal room in the house.",
  },
  {
    title: "Courtyard Art Moment",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600",
    summary: "An outdoor residential corner made alive with colour, texture, and a story guests ask about.",
  },
];

const whyItems = [
  {
    number: "01",
    title: "Because your home is yours. Completely.",
    description:
      "Not a showroom. Not a catalogue page. A mural/art piece is the one thing on your walls that could never belong to anyone else.",
  },
  {
    number: "02",
    title: "You decide everything",
    description:
      "The subject. The colours. The mood. The feeling. Whatever lives in your imagination - we make it live on your wall.",
  },
  {
    number: "03",
    title: "Not just beautiful. Meaningful.",
    description:
      "Anyone can put something pretty on a wall. What we create is thought about - conceptual, intentional, rooted in something real about you and your space. Guests won't just notice it. They'll ask about it. And you'll have a story worth telling.",
  },
  {
    number: "04",
    title: "You won't have to think about it again",
    description:
      "No fading after two years. No replacing when trends shift. A well made mural/art piece stays exactly as intended - through seasons, through moves, through everything.",
  },
];

export default function ResidentialMuralsPage() {
  return (
    <MuralSectionPage
      eyebrow="Residential"
      title="A home should feel like no one else could live there."
      intro="For homes, apartments, bedrooms, entries, courtyards, and personal spaces that deserve something made only for them."
      accentClass="text-rose-300"
      accentBgClass="bg-rose-300"
      whyTitle="Why Your Home Deserves This?"
      whyItems={whyItems}
      cases={cases}
      ctaTitle="Have a feeling, a wall, or just a half-formed idea?"
      ctaText="That is enough to begin. We will help turn the thought into a piece that belongs only to your home."
    />
  );
}
