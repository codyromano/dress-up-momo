import { AccessoryData } from "../constants";

const accessories: AccessoryData[] = [
  {
    id: "propeller",
    title: "Propeller hat",
    description: "Looking so fly.",
    explorationHint: "",
    imageUrl: "/images/items/propeller.png",
    coords: [0, 0]
  },
  {
    id: "chicken",
    title: "Fried chicken sunglasses",
    description: "A leg up in style",
    explorationHint: "",
    imageUrl: "/images/items/chicken.png",
    coords: [0, 0]
  },
  {
    id: "gold-chain",
    title: "Gold chain",
    description: "Solid gold",
    explorationHint: "A strange book store in Ballard",
    imageUrl: "/images/items/chain.png",
    coords: [47.6691, -122.3858]
  },
  {
    id: "indeed-sweater",
    title: "Indeed Sweater",
    description: "Job seeking doesn't have to be dog-eat-dog",
    explorationHint:
      "A dog-friendly garden in Rainier Beach. Perfect for a coffee walk",
    coords: [47.5128, -122.265],
    imageUrl: "/images/items/indeed-sweater.png"
  },
  {
    id: "keep-austin-weird",
    title: "Keep Austin Weird shirt",
    description: "Speaking of weird, I run upstairs and bark for no reason",
    explorationHint: "A wacky costume shop in Wallingford",
    coords: [47.6616, -122.3417],
    imageUrl: "/images/items/austin.png"
  },
  {
    id: "space-suit",
    title: "Space Suit",
    description: "One small step for Labridoodle",
    explorationHint: "Look for an iconic set of pillars in Capitol Hill",
    coords: [47.6125, -122.3283],
    imageUrl: "/images/items/space.png"
  }
];

export default accessories;
