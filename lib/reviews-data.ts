export interface Review {
  id: string;
  name: string;
  location: string;
  initials: string;
  rating: number; // 1-5
  quote: string;
  system: string;
  gradient: string; // tailwind gradient classes for the avatar
  featured?: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Helen Marsh",
    location: "Kingston upon Thames",
    initials: "HM",
    rating: 5,
    quote: "Our quote matched what we actually paid, to the pound. The app showing generation in real time is the part I didn't expect to love this much.",
    system: "6kWp Solar + 10kWh Battery",
    gradient: "from-solar to-solar-light",
    featured: true,
  },
  {
    id: "r2",
    name: "David Okafor",
    location: "Guildford",
    initials: "DO",
    rating: 5,
    quote: "Had solar since 2019 and was exporting most of it for nothing. The battery retrofit alone knocked £45 a month off our bill.",
    system: "Battery Retrofit",
    gradient: "from-leaf to-leaf-light",
  },
  {
    id: "r3",
    name: "Priya Chandra",
    location: "Epsom",
    initials: "PC",
    rating: 5,
    quote: "We charge the car almost entirely from the roof now. The smart scheduling just quietly does its job overnight on the cheap tariff.",
    system: "Solar + Battery + EV",
    gradient: "from-volt to-volt-light",
  },
  {
    id: "r4",
    name: "Tom & Alice Fenwick",
    location: "Reigate",
    initials: "TF",
    rating: 5,
    quote: "Replaced a dying gas boiler with an air-to-water heat pump alongside solar. The installers left the place cleaner than they found it.",
    system: "Solar + Battery + Air-to-Water HP",
    gradient: "from-primary to-charcoal",
  },
  {
    id: "r5",
    name: "Robert Ainsley",
    location: "Surrey Hills, Farm Owner",
    initials: "RA",
    rating: 5,
    quote: "250kWp across two barn roofs, sized around the milking parlour and cold stores rather than just maximum roof coverage. Paid for itself faster than projected.",
    system: "Commercial Solar — Farm",
    gradient: "from-leaf to-volt",
  },
  {
    id: "r6",
    name: "Sandra Whitfield",
    location: "Landlord, 6-property portfolio",
    initials: "SW",
    rating: 5,
    quote: "One point of contact for six properties, phased over four months so tenants were barely disrupted. Portfolio reporting makes the tax return painless too.",
    system: "Landlord Portfolio",
    gradient: "from-solar to-volt",
  },
  {
    id: "r7",
    name: "James Whitcombe",
    location: "Dorking",
    initials: "JW",
    rating: 4,
    quote: "System runs great. Took a week longer than scheduled to get the DNO approval through, but the team kept us updated the whole way.",
    system: "4.5kWp Solar",
    gradient: "from-charcoal to-leaf",
  },
  {
    id: "r8",
    name: "Nadia Farouk",
    location: "Woking",
    initials: "NF",
    rating: 5,
    quote: "Home Energy Care means I genuinely don't think about maintenance — the reminder came through, I rebooked in two taps, done.",
    system: "Home Energy Care",
    gradient: "from-volt to-leaf",
  },
];

export const REVIEW_STATS = {
  averageRating: 4.9,
  totalReviews: 612,
  totalInstalls: "1,400+",
  yearsOperating: 9,
};
