const CDN = 'https://images.unsplash.com';

const img = (id: string, w = 1400) =>
  `${CDN}/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  mountains: img('photo-1634124277031-7fc249e740ab', 2000),
  heroAtv: img('photo-1503438792824-0882f145c89d', 1600),
  mxOrange: img('photo-1602563533063-9dab4b86ecbc', 1600),
  mxRed: img('photo-1542550546-88afdd84b64f', 1400),
  mxMountain: img('photo-1585210256590-fc52fd1e8348', 1400),
  mxDust: img('photo-1673296472428-ababa60b0959', 1400),
  atvField: img('photo-1584660042073-f22ae92b1c05', 1400),
  atvTrail: img('photo-1675428604186-a165487f857c', 1400),
  atvDirt: img('photo-1701602078164-89eaa64496db', 1400),
  atvLine: img('photo-1515007507252-fc11563a273e', 1400),
  atvParked: img('photo-1560815973-62addaa1ac46', 1200),
  atvPair: img('photo-1575677155757-b5eb75df3a4e', 1200),
  helmetRed: img('photo-1494030575520-dd03dd6aeb04', 1000),
  helmetBlack: img('photo-1571819507488-0e1dfe7cc22d', 1000),
  riderHelmet: img('photo-1575396565848-e8031f12ce2a', 1000),
  desertRoad: img('photo-1650374105518-41068d52174e', 1400),
  desertRidge: img('photo-1590128918460-d6d3cbdbaced', 1400),
  aerialMountain: img('photo-1536772352522-6f715556f25f', 1400),
} as const;

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'bikes', label: 'Bikes' },
  { id: 'guides', label: 'Guides' },
  { id: 'contact', label: 'Contact' },
] as const;

export const aboutCopy = {
  kicker: 'What was the problem at the beginning',
  body:
    'Off-road riding had become loud, cluttered and anonymous. We wanted a brand that spoke with the restraint of a design house and the aggression of a factory race team — a place where the machine, the terrain and the rider are the only things worth looking at.',
  body2:
    'SQUADRO was built around that idea: charcoal surfaces, disciplined typography and a single flash of orange. Everything else is dust.',
};

export const showcaseStrip = [
  {
    title: 'Watch the video',
    copy: 'Two minutes inside the dust with the factory squad.',
  },
  {
    title: 'All terrain quad bikes',
    copy: 'Renegad, Raptor and Scout — engineered for broken ground.',
  },
  {
    title: 'Flexible upgrade',
    copy: 'Suspension, exhaust and gearing packages, fitted at the track.',
  },
];

export type Guide = {
  id: string;
  index: string;
  category: string;
  title: string;
  excerpt: string;
  body: string;
  read: string;
  image: string;
};

export const guides: Guide[] = [
  {
    id: 'beginner',
    index: '01',
    category: 'Start here',
    title: "Beginner's Guide",
    excerpt:
      'Your first machine, your first trail and the four habits that keep you upright.',
    body:
      'Start on a 250–400cc utility quad with a low seat height and predictable torque. Learn to read the terrain before you learn to ride it fast: walk the trail, note the ruts and the drainage lines, then ride at seventy percent of your comfort. Weight forward on climbs, back on descents, and always look two corners ahead. Fit a proper helmet, goggles, gloves and boots before you spend a single euro on power.',
    read: '8 min',
    image: images.atvTrail,
  },
  {
    id: 'techniques',
    index: '02',
    category: 'Riding',
    title: 'ATV Riding Techniques',
    excerpt:
      'Body position, throttle control and the art of carrying speed through loose ground.',
    body:
      'On a quad the rider is the suspension. Stand with knees bent, elbows out and your chin over the bars. Roll the throttle on — never stab it — and steer with the rear through loose gravel by loading the outside peg. For ruts, commit early and hold a constant line. For sand, keep the front light and the revs high. Braking is front-biased on hardpack and rear-biased on descents.',
    read: '11 min',
    image: images.atvField,
  },
  {
    id: 'gear',
    index: '03',
    category: 'Equipment',
    title: 'Essential Riding Gear',
    excerpt:
      'What actually protects you, what is marketing, and how each layer should fit.',
    body:
      'A certified full-face motocross helmet, shatterproof goggles, gloves with hard knuckle protection, a chest protector and boots with ankle cages are non-negotiable. Fit matters more than price: the helmet should clamp your cheeks without pressure points, boots should lock your heel without cutting circulation. Replace any helmet that has taken a real impact, even if it looks intact.',
    read: '6 min',
    image: images.riderHelmet,
  },
  {
    id: 'safety',
    index: '04',
    category: 'Safety',
    title: 'Off-Road Safety',
    excerpt:
      'Risk management for solo rides, group rides and everything the weather throws at you.',
    body:
      'Tell someone your route and your return window. Carry a satellite messenger beyond cell coverage, a basic tool kit, a tyre plug kit and two litres of water per person. Ride in pairs on unfamiliar ground. In dust, increase following distance to ten seconds and use lights. If the weather turns, descend rather than push to the summit — exposure, not speed, is what hurts people.',
    read: '9 min',
    image: images.mxDust,
  },
  {
    id: 'routes',
    index: '05',
    category: 'Travel',
    title: 'Adventure Routes',
    excerpt:
      'Six high-altitude trails across three continents, mapped and graded for quads.',
    body:
      'From the volcanic tracks above Teide to the shale passes of the High Atlas, these are routes we ride every season. Each entry carries a difficulty grade, a season window and a fuel plan. Grade one is fast fire roads; grade four demands technical climbs, water crossings and a support vehicle. Never ride a grade above your experience alone, and always check local access rules first.',
    read: '14 min',
    image: images.desertRoad,
  },
  {
    id: 'maintenance',
    index: '06',
    category: 'Workshop',
    title: 'Vehicle Maintenance',
    excerpt:
      'The ten-minute post-ride routine that doubles the life of your machine.',
    body:
      'Wash the underside before the mud dries, then re-lubricate the chain and inspect the sprocket teeth. Check tyre pressures cold, clean the air filter every ride in dust, and torque the wheel nuts after the first fifty kilometres of a new set. Change engine oil on hours, not kilometres. Keep a riding log — it will tell you what is about to fail long before it does.',
    read: '7 min',
    image: images.atvParked,
  },
];

export type Ride = {
  id: string;
  index: string;
  name: string;
  sub: string;
  copy: string;
  image: string;
  specs: { label: string; value: string }[];
};

export const rides: Ride[] = [
  {
    id: 'renegad',
    index: '01',
    name: 'ATV RENEGAD XXC 1000',
    sub: 'Flagship trail quad',
    copy:
      'A 976cc V-twin in a narrow chassis, with long-travel Fox suspension and a locking front differential. Built to hold a line through rock gardens at speed.',
    image: images.heroAtv,
    specs: [
      { label: 'Engine', value: '976 cc V-Twin' },
      { label: 'Power', value: '89 hp' },
      { label: 'Weight', value: '412 kg' },
      { label: 'Drive', value: '4x4 Selectable' },
    ],
  },
  {
    id: 'raptor',
    index: '02',
    name: 'RAPTOR 700R SE',
    sub: 'Sport quad',
    copy:
      'The purest expression of the sport quad: light, rear-wheel drive, and a chassis tuned for jumps, berms and long desert straights.',
    image: images.atvDirt,
    specs: [
      { label: 'Engine', value: '686 cc Single' },
      { label: 'Power', value: '48 hp' },
      { label: 'Weight', value: '192 kg' },
      { label: 'Drive', value: 'RWD' },
    ],
  },
  {
    id: 'scout',
    index: '03',
    name: 'SCOUT 850 TRAIL',
    sub: 'Utility / expedition',
    copy:
      'A working machine with expedition manners. Sealed storage, 300 kg of payload and a low-range transfer case for the days the map runs out.',
    image: images.atvPair,
    specs: [
      { label: 'Engine', value: '854 cc Twin' },
      { label: 'Power', value: '78 hp' },
      { label: 'Weight', value: '455 kg' },
      { label: 'Drive', value: '4x4 Locking' },
    ],
  },
];

export const gallery = [
  { src: images.mxOrange, caption: 'Factory squad / Stage 04', meta: 'Motocross' },
  { src: images.mxMountain, caption: 'Ridge line / 2,400 m', meta: 'Mountains' },
  { src: images.atvLine, caption: 'Trail pack / Dawn run', meta: 'ATV' },
  { src: images.helmetRed, caption: 'Gear room / Prototype 07', meta: 'Equipment' },
  { src: images.aerialMountain, caption: 'Above the tree line', meta: 'Trails' },
  { src: images.desertRoad, caption: 'Dust season / Almería', meta: 'Adventure' },
] as const;

export const footerLinks = {
  explore: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Bikes', href: '#bikes' },
    { label: 'Guides', href: '#guides' },
  ],
  company: [
    { label: 'Contact', href: '#contact' },
    { label: 'Dealers', href: '#contact' },
    { label: 'Careers', href: '#contact' },
    { label: 'Press', href: '#contact' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
  ],
};
