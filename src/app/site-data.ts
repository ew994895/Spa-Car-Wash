export interface WashPackage {
  name: string;
  price: string;
  summary: string;
}

export interface DetailingPackage {
  id: string;
  name: string;
  price: string;
  serviceTime: string;
  description: string;
  includes: string[];
  benefits: string[];
}

export const business = {
  name: "Spa Car Wash",
  phone: "610-695-0711",
  phoneHref: "tel:610-695-0711",
  address: "300 E. Lancaster Avenue, Wynnewood, PA 19096",
  hours: [
    "Monday to Saturday: 9:00 AM to 5:00 PM",
    "Sunday: 10:00 AM to 4:00 PM",
  ],
};

export const washPackages: WashPackage[] = [
  {
    name: "Hand Wash",
    price: "From $20",
    summary: "Fast exterior wash, wheels, windows, and a clean finish for daily drivers.",
  },
  {
    name: "Elite Wash",
    price: "From $35",
    summary: "Everything in Hand Wash plus extra shine, tire dressing, and interior touch points.",
  },
  {
    name: "Express Detail Prep",
    price: "Ask in store",
    summary: "A short-format refresh for customers who need more than a wash but less than a full detail.",
  },
];

export const premiumPackages: DetailingPackage[] = [
  {
    id: "exterior",
    name: "Exterior Detail Package",
    price: "$200 to $260",
    serviceTime: "All-day service",
    description: "Exterior restoration focused on finish correction, protection, and wheel presentation.",
    includes: [
      "Hand wash and clay bar decontamination",
      "Paint correction and machine polishing",
      "Premium wax or sealant application",
      "Wheels, wells, trim, and glass detailed",
    ],
    benefits: [
      "Restores gloss and color depth",
      "Protects against weather and road film",
      "Improves curb appeal and resale value",
    ],
  },
  {
    id: "interior",
    name: "Interior Detail Package",
    price: "$220 to $280",
    serviceTime: "All-day service",
    description: "A deep cabin reset for vehicles that need extraction, conditioning, and odor reduction.",
    includes: [
      "Full vacuum and interior wipe-down",
      "Steam cleaning for carpets and cloth",
      "Leather cleaning and conditioning",
      "Glass, vents, mats, cargo area, and trim finishing",
    ],
    benefits: [
      "Healthier and fresher cabin environment",
      "Removes embedded dirt and daily buildup",
      "Protects leather, vinyl, and plastics",
    ],
  },
  {
    id: "mini",
    name: "Mini Detail Package",
    price: "$160 to $200",
    serviceTime: "2 to 4 hours",
    description: "A seasonal cleanup for regularly maintained newer vehicles.",
    includes: [
      "Express wash and quick polish",
      "Interior vacuum and wipe-down",
      "Glass cleaning and tire dressing",
      "Door jamb and wheel cleanup",
    ],
    benefits: [
      "Faster turnaround",
      "Keeps a maintained car on schedule",
      "Good bridge between full details",
    ],
  },
  {
    id: "signature",
    name: "Signature Complete Detail",
    price: "$320 to $380",
    serviceTime: "All-day service",
    description: "The most balanced full-vehicle detail for customers maintaining a late-model vehicle.",
    includes: [
      "Complete exterior detail services",
      "Complete interior detail services",
      "Paint polish and wax protection",
      "Steam cleaning, conditioning, and final inspection",
    ],
    benefits: [
      "Best all-around value",
      "Full inside-and-out reset",
      "Ideal recurring annual service",
    ],
  },
  {
    id: "luxury",
    name: "Luxury Detail Package",
    price: "$400 to $475",
    serviceTime: "All-day service",
    description: "Higher-touch cosmetic revival aimed at premium vehicles and owners who want more correction.",
    includes: [
      "Everything in Signature Complete",
      "Enhanced multi-stage paint correction",
      "Premium interior and trim protection",
      "Advanced stain, odor, and finish refinement",
    ],
    benefits: [
      "Built for higher-end finishes",
      "More correction, more refinement",
      "Raises presentation quality meaningfully",
    ],
  },
  {
    id: "cleanse",
    name: "Cleanse Detail Package",
    price: "$475 to $550",
    serviceTime: "All-day service",
    description: "Interior-first restoration for heavily used vehicles, including pickup and delivery.",
    includes: [
      "Deep extraction and steam treatment",
      "Multi-stage leather and plastic conditioning",
      "Pet hair, odor, and stain remediation",
      "Pickup, delivery, wash, and final quality check",
    ],
    benefits: [
      "Best option for family vehicles",
      "Targets embedded contamination and odor",
      "Convenience for customers with limited time",
    ],
  },
];

export const ultimatePackage = {
  name: "Ultimate Detail Package",
  price: "$750 to $875",
  serviceTime: "Two-day service",
  description:
    "A full restoration package designed to return neglected or high-value vehicles to near-showroom condition.",
  dayOne: [
    "Assessment, wash, decontamination, and paint measurement",
    "Multi-stage correction for swirls, oxidation, and light scratching",
    "Wheel, trim, metal, glass, and exterior finish refinement",
  ],
  dayTwo: [
    "Wax or ceramic-prep protection layer",
    "Interior extraction, conditioning, and ozone odor treatment",
    "Engine bay, cargo area, final touch-ups, and quality inspection",
  ],
  extras: [
    "Pickup and delivery available",
    "Before-and-after documentation",
    "Minor stain, pet hair, and water spot treatment",
    "Protection guarantee on the exterior finish",
  ],
};

export const membershipBenefits = [
  "Priority upkeep for customers who wash regularly",
  "Lower long-term detailing cost through better maintenance",
  "Cleaner interiors and finishes between major services",
];

export const testimonials = [
  {
    quote: "The detailing team brought a neglected SUV back to life and the finish still looked sharp weeks later.",
    name: "Rachel M.",
  },
  {
    quote: "Fast wash line, clear communication, and the admin tools make it easy for staff to keep the site current.",
    name: "Team Feedback",
  },
  {
    quote: "Their premium detail felt like a proper reset, not a surface-level cleanup.",
    name: "Daniel S.",
  },
];

export const faqs = [
  {
    question: "Do I need an appointment for detailing?",
    answer: "Yes for premium and ultimate detail services. Use the booking form or call the shop directly.",
  },
  {
    question: "Can you handle older or heavily used vehicles?",
    answer: "Yes. The Cleanse, Luxury, and Ultimate packages are built for vehicles that need deeper restoration.",
  },
  {
    question: "How are wait times shown on the site?",
    answer: "Staff can update current service estimates from the admin route, and the homepage reflects those local changes immediately.",
  },
];
