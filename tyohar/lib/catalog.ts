import type { CatalogItem, Temple } from './types';

export const temples: Temple[] = [
  {
    id: 'kashi',
    name: 'Kashi Vishwanath',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    deity: 'Lord Shiva',
    image:
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Jyotirlinga darshan & Ganga aarti',
    pickupAvailable: true,
  },
  {
    id: 'tirupati',
    name: 'Tirumala Venkateswara',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    deity: 'Lord Venkateswara',
    image:
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Laddu prasad & kalyanotsavam',
    pickupAvailable: true,
  },
  {
    id: 'siddhivinayak',
    name: 'Siddhivinayak',
    city: 'Mumbai',
    state: 'Maharashtra',
    deity: 'Lord Ganesha',
    image:
      'https://images.unsplash.com/photo-1604608672516-f1b24d0d11ea?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Sankashti & wish fulfilment',
    pickupAvailable: true,
  },
  {
    id: 'mahalaxmi',
    name: 'Mahalaxmi Mandir',
    city: 'Kolhapur',
    state: 'Maharashtra',
    deity: 'Goddess Mahalaxmi',
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Shakti peetha & prosperity puja',
    pickupAvailable: true,
  },
  {
    id: 'trimbakeshwar',
    name: 'Trimbakeshwar Jyotirlinga',
    city: 'Nashik',
    state: 'Maharashtra',
    deity: 'Lord Shiva',
    image:
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf2?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Narayan Nagbali & kaal sarp',
    pickupAvailable: true,
  },
  {
    id: 'kamakhya',
    name: 'Kamakhya Mandir',
    city: 'Guwahati',
    state: 'Assam',
    deity: 'Goddess Kamakhya',
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Ambubachi & tantric shakti rites',
    pickupAvailable: false,
  },
  {
    id: 'shirdi',
    name: 'Shirdi Sai Baba',
    city: 'Shirdi',
    state: 'Maharashtra',
    deity: 'Sai Baba',
    image:
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Thursday aarti & udi prasad',
    pickupAvailable: true,
  },
  {
    id: 'jagannath',
    name: 'Jagannath Temple',
    city: 'Puri',
    state: 'Odisha',
    deity: 'Lord Jagannath',
    image:
      'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Mahaprasad & Rath Yatra',
    pickupAvailable: true,
  },
  {
    id: 'vaishno',
    name: 'Vaishno Devi',
    city: 'Katra',
    state: 'Jammu & Kashmir',
    deity: 'Maa Vaishno Devi',
    image:
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Navratri yatra & chunri offering',
    pickupAvailable: true,
  },
  {
    id: 'meenakshi',
    name: 'Meenakshi Amman',
    city: 'Madurai',
    state: 'Tamil Nadu',
    deity: 'Goddess Meenakshi',
    image:
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Abhishekam & ghee lamp seva',
    pickupAvailable: true,
  },
  {
    id: 'somnath',
    name: 'Somnath Jyotirlinga',
    city: 'Veraval',
    state: 'Gujarat',
    deity: 'Lord Shiva',
    image:
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Sea-facing jyotirlinga aarti',
    pickupAvailable: true,
  },
  {
    id: 'golden',
    name: 'Sri Harmandir Sahib',
    city: 'Amritsar',
    state: 'Punjab',
    deity: 'Guru Granth Sahib',
    image:
      'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
    famousFor: 'Langar seva & evening rehras',
    pickupAvailable: false,
  },
];

export const catalog: CatalogItem[] = [
  {
    id: 'rahu-til',
    kind: 'offering',
    title: 'Rahu ko Kala Til Chadhaye',
    hindiTitle: 'राहु को काला तिल चढ़ाएँ',
    subtitle: 'Black sesame offering for Rahu shanti',
    templeId: 'kashi',
    price: 39,
    duration: 'Same day',
    image:
      'https://images.unsplash.com/photo-1604608672516-f1b24d0d11ea?auto=format&fit=crop&w=800&q=80',
    tags: ['Graha shanti', 'Weekly'],
    includes: ['Kala til', 'Pandit sankalp in your name', 'Photo of offering'],
    popular: true,
  },
  {
    id: 'shani-tel',
    kind: 'offering',
    title: 'Shani Dev ko Tel-Til Chadhaye',
    hindiTitle: 'शनि देव को तेल-तिल चढ़ाएँ',
    subtitle: 'Mustard oil & sesame for Shani Dev',
    templeId: 'trimbakeshwar',
    price: 39,
    duration: 'Saturday special',
    image:
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf2?auto=format&fit=crop&w=800&q=80',
    tags: ['Shani', 'Remedy'],
    includes: ['Til oil diya', 'Black cloth', 'Mantra jaap'],
    popular: true,
  },
  {
    id: 'ketu-weekly',
    kind: 'offering',
    title: 'Ketu Shanti Weekly Seva',
    hindiTitle: 'केतु शांति साप्ताहिक सेवा',
    subtitle: 'Weekly daan seva for Ketu dosh mukti',
    templeId: 'kashi',
    price: 50,
    duration: 'Weekly',
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['Ketu', 'Weekly'],
    includes: ['Daan seva', 'Name in sankalp', 'Digital certificate'],
    popular: true,
  },
  {
    id: 'satyanarayan',
    kind: 'puja',
    title: 'Satyanarayan Katha',
    subtitle: 'Full katha with family sankalp & prasad',
    templeId: 'siddhivinayak',
    price: 1100,
    duration: '2.5 hours',
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    tags: ['Family', 'Online'],
    includes: ['Experienced pandit', 'Live video option', 'Prasad courier'],
    popular: true,
  },
  {
    id: 'rudrabhishek',
    kind: 'puja',
    title: 'Rudrabhishek Puja',
    subtitle: 'Abhishek of Shiva linga with 11 dravyas',
    templeId: 'kashi',
    price: 751,
    duration: '90 min',
    image:
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    tags: ['Shiva', 'Popular'],
    includes: ['Panchamrit', 'Bilva patra', 'Photo & video'],
    popular: true,
  },
  {
    id: 'navgraha',
    kind: 'puja',
    title: 'Navgraha Shanti Puja',
    subtitle: 'Planetary peace ritual for career & health',
    templeId: 'trimbakeshwar',
    price: 2100,
    duration: '3 hours',
    image:
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf2?auto=format&fit=crop&w=800&q=80',
    tags: ['Astrology', 'Remedy'],
    includes: ['9 graha havan', 'Gemstone daan option', 'Prasad'],
  },
  {
    id: 'lakshmi',
    kind: 'puja',
    title: 'Mahalaxmi Ashtakam Puja',
    subtitle: 'Wealth & harmony puja at Kolhapur peetha',
    templeId: 'mahalaxmi',
    price: 501,
    duration: '60 min',
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    tags: ['Prosperity'],
    includes: ['Kumkum archana', 'Yellow cloth', 'Prasad'],
    popular: true,
  },
  {
    id: 'sai-thursday',
    kind: 'puja',
    title: 'Shirdi Thursday Aarti Seva',
    subtitle: 'Name in aarti sankalp with udi prasad',
    templeId: 'shirdi',
    price: 251,
    duration: 'Thursday',
    image:
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    tags: ['Sai Baba'],
    includes: ['Aarti participation', 'Udi', 'Photo'],
  },
  {
    id: 'tirupati-kalyanam',
    kind: 'puja',
    title: 'Tirupati Kalyanotsavam',
    subtitle: 'Celestial wedding seva for the divine couple',
    templeId: 'tirupati',
    price: 1500,
    duration: '2 hours',
    image:
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    tags: ['Seva'],
    includes: ['Kalyanam ticket seva', 'Laddu prasad', 'Video clip'],
  },
  {
    id: 'griha-hawan',
    kind: 'hawan',
    title: 'Griha Pravesh Hawan',
    subtitle: 'Online hawan for new home with your family names',
    templeId: 'siddhivinayak',
    price: 3100,
    duration: '2 hours',
    image:
      'https://images.unsplash.com/photo-1478144592103-25e1a86c2c28?auto=format&fit=crop&w=800&q=80',
    tags: ['Hawan', 'Home'],
    includes: ['Live Zoom hawan', 'Samagri list', 'Vastu mantra'],
    popular: true,
  },
  {
    id: 'navratri-hawan',
    kind: 'hawan',
    title: 'Durga Saptashati Hawan',
    subtitle: 'Navratri hawan for protection & courage',
    templeId: 'vaishno',
    price: 2501,
    duration: '3 hours',
    image:
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    tags: ['Navratri', 'Hawan'],
    includes: ['13 chapters path', 'Ahuti', 'Chunri offering'],
  },
  {
    id: 'ganesh-hawan',
    kind: 'hawan',
    title: 'Ganapati Atharvashirsha Hawan',
    subtitle: 'Obstacle-removing hawan before new work',
    templeId: 'siddhivinayak',
    price: 1800,
    duration: '90 min',
    image:
      'https://images.unsplash.com/photo-1604608672516-f1b24d0d11ea?auto=format&fit=crop&w=800&q=80',
    tags: ['Ganesha', 'Hawan'],
    includes: ['Modak naivedya', 'Live stream', 'Prasad'],
  },
  {
    id: 'coconut',
    kind: 'offering',
    title: 'Nariyal & Mauli Bhet',
    subtitle: 'Classic temple offering of coconut & sacred thread',
    templeId: 'mahalaxmi',
    price: 49,
    duration: 'Same day',
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    tags: ['Bhet'],
    includes: ['Coconut', 'Mauli', 'Flower'],
    popular: true,
  },
  {
    id: 'laddu-prasad',
    kind: 'offering',
    title: 'Tirupati Laddu Naivedya',
    subtitle: 'Offer laddus and receive prasad box at home',
    templeId: 'tirupati',
    price: 199,
    duration: '2-4 days',
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    tags: ['Prasad'],
    includes: ['Naivedya', 'Return prasad courier'],
  },
  {
    id: 'chunri',
    kind: 'offering',
    title: 'Maa ki Chunri & Sindoor',
    subtitle: 'Offer chunri at Vaishno Devi on your behalf',
    templeId: 'vaishno',
    price: 151,
    duration: '1-2 days',
    image:
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    tags: ['Devi'],
    includes: ['Red chunri', 'Sindoor', 'Photo'],
  },
  {
    id: 'mahaprasad',
    kind: 'offering',
    title: 'Puri Mahaprasad Seva',
    subtitle: 'Anna offering and mahaprasad packed from Puri',
    templeId: 'jagannath',
    price: 301,
    duration: '3-5 days',
    image:
      'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80',
    tags: ['Prasad'],
    includes: ['Anna daan', 'Mahaprasad tin'],
  },
];

export const pickupItems = [
  'Homemade prasad / sweets',
  'Coconut & fruits',
  'Flowers & garland',
  'Saree / vastra for deity',
  'Oil, til, or grain daan',
  'Silver / brass offering',
  'Letter of prayer',
];

export const pickupSlots = [
  'Today, 10:00 AM – 1:00 PM',
  'Today, 4:00 PM – 7:00 PM',
  'Tomorrow, 10:00 AM – 1:00 PM',
  'Tomorrow, 4:00 PM – 7:00 PM',
];

export const addons = [
  { id: 'video', label: 'Puja photo + video on WhatsApp', price: 99 },
  { id: 'prasad', label: 'Prasad delivered to your home', price: 149 },
  { id: 'live', label: 'Join hawan / puja live', price: 199 },
];

export const testimonials = [
  {
    name: 'Meera Joshi',
    city: 'Pune',
    quote:
      'I sent homemade prasad from my kitchen to Kashi. Tyohar collected it the same evening and shared the offering photo the next morning.',
  },
  {
    name: 'Arjun Reddy',
    city: 'Hyderabad',
    quote:
      'Booked Rudrabhishek with our gotra. The pandit took sankalp with every family name. Felt like we were standing in the garbhagriha.',
  },
  {
    name: 'Navneet Kaur',
    city: 'Delhi',
    quote:
      'Thursday Shirdi aarti seva was simple, honest pricing, and udi reached us fresh. Will use Tyohar for Navratri too.',
  },
];

export function templeById(id: string) {
  return temples.find((t) => t.id === id);
}

export function itemById(id: string) {
  return catalog.find((c) => c.id === id);
}

export function itemsForTemple(templeId: string) {
  return catalog.filter((c) => c.templeId === templeId);
}

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}
