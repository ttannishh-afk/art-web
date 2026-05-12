import MuralSectionPage from "@/components/murals/MuralSectionPage";

const cases = [
  {
    title: "Boardroom Story Wall",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600",
    summary: "A quiet leadership floor transformed into a visual statement of ambition, memory, and momentum.",
  },
  {
    title: "Cafe Corner Mural",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600",
    summary: "A hospitality wall designed to become the spot everyone photographs before they leave.",
  },
  {
    title: "Retail Launch Installation",
    image: "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=1600",
    summary: "A spatial art moment built around movement, product stories, and first impressions.",
  },
  {
    title: "Team Culture Wall",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600",
    summary: "A collaborative office piece that gave teams something shared, visible, and genuinely theirs.",
  },
  {
    title: "Reception Identity Piece",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600",
    summary: "A front-of-house artwork created to greet clients before the first handshake.",
  },
];

const whyItems = [
  {
    number: "01",
    title: "It tells people who you are before you do",
    description:
      "Your space speaks the moment someone walks in. A mural/art installation translates your brand into something people can stand in front of, feel, and remember. Not a logo on a wall. A story on a wall.",
  },
  {
    number: "02",
    title: "It makes your team feel like they belong somewhere",
    description:
      "The space you give your team tells them exactly how much they matter. They spend more time inside your office than almost anywhere else. Give them something that makes that time feel different.",
  },
  {
    number: "03",
    title: "Your clients will notice before you say a word",
    description:
      "First impressions happen in seconds. A thoughtfully designed space signals intention, creativity and confidence before anyone in your team has spoken.",
  },
  {
    number: "04",
    title: "It becomes your most organic marketing",
    description:
      "Every photo, every visit, every shared moment - your mural is quietly in all of them. Working for you without being asked.",
  },
  {
    number: "05",
    title: "It is an investment that only grows",
    description:
      "Campaigns end. Trends fade. Subscriptions renew. A mural stays exactly where you put it. Designed for your space alone. The longer it stays, the more it earns its keep.",
  },
];

export default function CorporateMuralsPage() {
  return (
    <MuralSectionPage
      eyebrow="Corporate & Commercial"
      title="Spaces that speak before the meeting begins."
      intro="For offices, boardrooms, cafes, retail stores, restaurants, and any commercial space that deserves more than a blank wall."
      accentClass="text-blue-300"
      accentBgClass="bg-blue-300"
      whyTitle="Why Art Belongs In Your Workspace?"
      whyItems={whyItems}
      cases={cases}
      ctaTitle="Have a wall, launch, lobby, or team story?"
      ctaText="Bring us the space, the mood, or even the problem. We will help shape the idea into something people remember."
    />
  );
}
