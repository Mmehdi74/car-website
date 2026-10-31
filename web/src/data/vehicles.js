/**
 * Fleet data source.
 * Every card, filter and detail view reads from here — edit prices, specs,
 * categories or swap `image` URLs and the whole site follows.
 * Images are remote URLs so they are trivial to replace with your own assets.
 */

const unsplash = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories = ['All', 'SUVs', 'Luxury', 'Sports Cars'];

export const vehicles = [
  {
    id: 'mercedes-amg-gt',
    name: 'Mercedes-AMG GT',
    model: 'GT 63 S 4MATIC+',
    category: 'Luxury',
    price: 500,
    rating: 5,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Petrol',
    image: unsplash('1618843479313-40f8afb4b4d8', 1200),
    description:
      'Hand-built performance with the composure of a grand tourer. The AMG GT blends a hand-finished cabin with a twin-turbo V8 that makes every departure an event.',
    features: [
      'AMG performance seats',
      'Burmester® surround sound',
      'Panoramic roof',
      'AMG ride control',
      'Performance exhaust',
    ],
  },
  {
    id: 'range-rover-sport',
    name: 'Range Rover Sport',
    model: 'Autobiography Dynamic',
    category: 'SUVs',
    price: 450,
    rating: 5,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    image: unsplash('1563720223185-11003d516935', 1200),
    description:
      'Commanding presence with a first-class cabin. The Sport pairs effortless performance with the refinement of a private lounge — equally at home on the coast road or the valet forecourt.',
    features: [
      'Air suspension',
      'Meridian™ Signature audio',
      'Heated & cooled seats',
      'All-wheel drive',
      'Full-length panoramic roof',
    ],
  },
  {
    id: 'porsche-911',
    name: 'Porsche 911',
    model: 'Carrera 4S',
    category: 'Sports Cars',
    price: 850,
    rating: 5,
    seats: 4,
    transmission: 'PDK',
    fuel: 'Petrol',
    image: unsplash('1503376780353-7e6692767b70', 1200),
    description:
      'An icon, engineered without compromise. Razor-sharp steering, a flat-six soundtrack and a chassis that rewards every mile — the definitive driver’s car for a weekend worth remembering.',
    features: [
      'Sport Chrono package',
      'Sport exhaust system',
      'Adaptive sports seats',
      'Bose® surround sound',
      'Launch control',
    ],
  },
  {
    id: 'bmw-m4',
    name: 'BMW M4 Competition',
    model: 'Coupé xDrive',
    category: 'Sports Cars',
    price: 620,
    rating: 5,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Petrol',
    image: unsplash('1580273916550-e323be2ae537', 1200),
    description:
      'A track-bred coupé with genuine everyday civility. Carbon detailing, an aggressive stance and 503 horsepower make the M4 an effortlessly quick way to cross the city — or leave it.',
    features: [
      'M carbon exterior package',
      'Adaptive M suspension',
      'Harman Kardon audio',
      'M sport seats',
      'Head-up display',
    ],
  },
  {
    id: 'mercedes-g-class',
    name: 'Mercedes G-Class',
    model: 'G 550',
    category: 'SUVs',
    price: 680,
    rating: 5,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    // Bundled locally: the original Unsplash photo was removed upstream (404).
    // Photo: "Mercedes-Benz G-Class W463 II 63 AMG Sanming 01 2022-08-02" by
    // JamesYoung8167, CC BY-SA 4.0, via Wikimedia Commons.
    image: '/images/mercedes-g-class.jpg',
    description:
      'An unmistakable silhouette, refined into a modern icon. The G-Class pairs serious presence with a cabin of leather, brushed metal and complete calm.',
    features: [
      'Nappa leather cabin',
      'Burmester® sound',
      'Three locking differentials',
      'Heated rear seats',
      '360° camera',
    ],
  },
  {
    id: 'rolls-royce-ghost',
    name: 'Rolls-Royce Ghost',
    model: 'Extended',
    category: 'Luxury',
    price: 1500,
    rating: 5,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    image: unsplash('1631295868223-63265b40d9e4', 1200),
    description:
      'The most effortless way to travel. A magic-carpet ride, coach doors and a starlight headliner make every entrance an occasion and every mile feel weightless.',
    features: [
      'Starlight headliner',
      'Bespoke audio system',
      'Chauffeur package',
      'Rear picnic tables',
      'Planar suspension',
    ],
  },
];

export const promoImage = unsplash('1544636331-e26879cd4d9b', 1400);
export const heroImage = unsplash('1617814076367-b759c7d7e738', 2000);
export const aboutWideImage = unsplash('1603584173870-7f23fdae1b7a', 1400);
export const aboutSmallImage = unsplash('1606664515524-ed2f786a0bd6', 900);
