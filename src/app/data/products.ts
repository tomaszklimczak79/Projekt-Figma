export type Category = 'macbook' | 'ipad' | 'imac' | 'accessory' | 'iphone';
export type Condition = 'open-box' | 'like-new' | 'excellent' | 'good';

export interface ProductSpec { label: string; value: string }
export interface ProductReview {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: Category;
  chip: string;
  ram?: number;
  storage?: number;
  screenSize: number;
  condition: Condition;
  price: number;
  originalPrice: number;
  batteryHealth?: number;
  batteryCycles?: number;
  color: string;
  year: number;
  images: string[];
  specs: ProductSpec[];
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  badge?: string;
  reviews: ProductReview[];
}

const SAMPLE_REVIEWS: ProductReview[] = [
  { id: 'r1', author: 'James Whitfield', location: 'London, UK', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop', rating: 5, date: 'March 2025', title: 'Looks brand new', body: 'Genuinely could not tell this was pre-owned. Pristine condition, fast shipping, great packaging.', verified: true },
  { id: 'r2', author: 'Marta Kowalski', location: 'Warsaw, Poland', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', rating: 5, date: 'April 2025', title: 'Exceeded expectations', body: 'Open Box MacBook — literally still had the cable tie on the charger. Absolutely pristine.', verified: true },
  { id: 'r3', author: 'Daniel Mercer', location: 'Amsterdam, NL', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop', rating: 5, date: 'February 2025', title: 'Saved €300 vs Apple Store', body: 'Device is in perfect shape, warranty included. Customer support was excellent.', verified: true },
  { id: 'r4', author: 'Sophie Lefevre', location: 'Paris, France', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop', rating: 5, date: 'May 2025', title: 'Detailed condition report is impressive', body: 'The condition report includes photos, battery cycle count, everything. Best refurbished experience ever.', verified: true },
];

export const PRODUCTS: Product[] = [
  {
    id: 'mbp-14-m3pro-18-512-sb-openbox',
    name: 'MacBook Pro 14" M3 Pro · 18GB · 512GB · Space Black',
    shortName: 'MacBook Pro 14" M3 Pro',
    category: 'macbook', chip: 'M3 Pro', ram: 18, storage: 512, screenSize: 14,
    condition: 'open-box', price: 1499, originalPrice: 2199, batteryHealth: 100, batteryCycles: 2,
    color: 'Space Black', year: 2024, featured: true, badge: 'Open Box',
    inStock: true, rating: 4.9, reviewCount: 47,
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&h=600&fit=crop',
    ],
    description: 'The MacBook Pro 14" with M3 Pro chip delivers exceptional performance for demanding workflows. This Open Box unit was opened for display purposes only — never used. Includes all original accessories.',
    specs: [
      { label: 'Chip', value: 'Apple M3 Pro (11-core CPU, 14-core GPU)' },
      { label: 'Memory', value: '18GB Unified Memory' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '14.2" Liquid Retina XDR, 3024×1964, ProMotion 120Hz' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Ports', value: '3× Thunderbolt 4, HDMI, SD Card, MagSafe 3' },
      { label: 'Camera', value: '12MP Center Stage' },
      { label: 'OS', value: 'macOS Sonoma 14' },
      { label: 'Color', value: 'Space Black' },
      { label: 'Year', value: '2024' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: 'mba-15-m3-16-256-midnight-likenew',
    name: 'MacBook Air 15" M3 · 16GB · 256GB · Midnight',
    shortName: 'MacBook Air 15" M3',
    category: 'macbook', chip: 'M3', ram: 16, storage: 256, screenSize: 15,
    condition: 'like-new', price: 1049, originalPrice: 1499, batteryHealth: 98, batteryCycles: 12,
    color: 'Midnight', year: 2024, featured: true, badge: 'Like New',
    inStock: true, rating: 4.8, reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=600&fit=crop',
    ],
    description: 'The MacBook Air 15" features the M3 chip with an incredibly thin and light design. This Like New unit has been barely used with no cosmetic marks whatsoever.',
    specs: [
      { label: 'Chip', value: 'Apple M3 (8-core CPU, 10-core GPU)' },
      { label: 'Memory', value: '16GB Unified Memory' },
      { label: 'Storage', value: '256GB SSD' },
      { label: 'Display', value: '15.3" Liquid Retina, 2880×1864' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Ports', value: '2× Thunderbolt 3, MagSafe 3, 3.5mm audio' },
      { label: 'Camera', value: '1080p FaceTime HD' },
      { label: 'OS', value: 'macOS Sonoma 14' },
      { label: 'Color', value: 'Midnight' },
      { label: 'Year', value: '2024' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: 'mbp-16-m3max-48-1tb-sb-openbox',
    name: 'MacBook Pro 16" M3 Max · 48GB · 1TB · Space Black',
    shortName: 'MacBook Pro 16" M3 Max',
    category: 'macbook', chip: 'M3 Max', ram: 48, storage: 1000, screenSize: 16,
    condition: 'open-box', price: 2799, originalPrice: 3999, batteryHealth: 100, batteryCycles: 1,
    color: 'Space Black', year: 2024, featured: true, badge: 'Open Box',
    inStock: true, rating: 5.0, reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&h=600&fit=crop',
    ],
    description: 'The ultimate MacBook Pro. M3 Max chip with 48GB unified memory for the most demanding creative and pro workflows. This is an Open Box unit — never used.',
    specs: [
      { label: 'Chip', value: 'Apple M3 Max (16-core CPU, 40-core GPU)' },
      { label: 'Memory', value: '48GB Unified Memory' },
      { label: 'Storage', value: '1TB SSD' },
      { label: 'Display', value: '16.2" Liquid Retina XDR, ProMotion 120Hz' },
      { label: 'Battery', value: 'Up to 22 hours' },
      { label: 'Ports', value: '3× Thunderbolt 4, HDMI 2.1, SD, MagSafe 3' },
      { label: 'Camera', value: '12MP Center Stage' },
      { label: 'OS', value: 'macOS Sonoma 14' },
      { label: 'Color', value: 'Space Black' },
      { label: 'Year', value: '2024' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: 'mba-13-m2-8-256-starlight-excellent',
    name: 'MacBook Air 13" M2 · 8GB · 256GB · Starlight',
    shortName: 'MacBook Air 13" M2',
    category: 'macbook', chip: 'M2', ram: 8, storage: 256, screenSize: 13,
    condition: 'excellent', price: 749, originalPrice: 1099, batteryHealth: 94, batteryCycles: 87,
    color: 'Starlight', year: 2023, featured: true, badge: 'Excellent',
    inStock: true, rating: 4.7, reviewCount: 62,
    images: [
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=600&fit=crop',
    ],
    description: 'The MacBook Air M2 in Starlight. This Excellent condition unit has been lightly used and shows minimal cosmetic signs. Battery health is strong at 94%.',
    specs: [
      { label: 'Chip', value: 'Apple M2 (8-core CPU, 8-core GPU)' },
      { label: 'Memory', value: '8GB Unified Memory' },
      { label: 'Storage', value: '256GB SSD' },
      { label: 'Display', value: '13.6" Liquid Retina, 2560×1664' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Ports', value: '2× Thunderbolt 3, MagSafe 3, 3.5mm audio' },
      { label: 'Camera', value: '1080p FaceTime HD' },
      { label: 'OS', value: 'macOS Ventura 13' },
      { label: 'Color', value: 'Starlight' },
      { label: 'Year', value: '2022' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: 'mbp-14-m2pro-16-512-silver-excellent',
    name: 'MacBook Pro 14" M2 Pro · 16GB · 512GB · Silver',
    shortName: 'MacBook Pro 14" M2 Pro',
    category: 'macbook', chip: 'M2 Pro', ram: 16, storage: 512, screenSize: 14,
    condition: 'excellent', price: 1199, originalPrice: 1999, batteryHealth: 91, batteryCycles: 134,
    color: 'Silver', year: 2023, featured: true,
    inStock: true, rating: 4.8, reviewCount: 44,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=900&h=600&fit=crop',
    ],
    description: 'MacBook Pro 14" with M2 Pro chip — perfect for developers, editors, and creative professionals. Excellent condition with minor, barely visible cosmetic marks.',
    specs: [
      { label: 'Chip', value: 'Apple M2 Pro (12-core CPU, 19-core GPU)' },
      { label: 'Memory', value: '16GB Unified Memory' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '14.2" Liquid Retina XDR, ProMotion 120Hz' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Ports', value: '3× Thunderbolt 4, HDMI, SD Card, MagSafe 3' },
      { label: 'Camera', value: '1080p FaceTime HD' },
      { label: 'OS', value: 'macOS Sonoma 14' },
      { label: 'Color', value: 'Silver' },
      { label: 'Year', value: '2023' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: 'mba-13-m3-16-512-sg-likenew',
    name: 'MacBook Air 13" M3 · 16GB · 512GB · Space Gray',
    shortName: 'MacBook Air 13" M3',
    category: 'macbook', chip: 'M3', ram: 16, storage: 512, screenSize: 13,
    condition: 'like-new', price: 999, originalPrice: 1399, batteryHealth: 99, batteryCycles: 8,
    color: 'Space Gray', year: 2024, featured: true, badge: 'Like New',
    inStock: true, rating: 4.9, reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&h=600&fit=crop',
    ],
    description: 'MacBook Air M3 in Space Gray — the thinnest, lightest Mac ever. This Like New unit shows zero cosmetic wear and has only 8 battery cycles.',
    specs: [
      { label: 'Chip', value: 'Apple M3 (8-core CPU, 10-core GPU)' },
      { label: 'Memory', value: '16GB Unified Memory' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '13.6" Liquid Retina, 2560×1664' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Ports', value: '2× Thunderbolt 3, MagSafe 3, 3.5mm audio' },
      { label: 'Camera', value: '1080p FaceTime HD' },
      { label: 'OS', value: 'macOS Sonoma 14' },
      { label: 'Color', value: 'Space Gray' },
      { label: 'Year', value: '2024' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: 'mbp-16-m2pro-16-512-silver-good',
    name: 'MacBook Pro 16" M2 Pro · 16GB · 512GB · Silver',
    shortName: 'MacBook Pro 16" M2 Pro',
    category: 'macbook', chip: 'M2 Pro', ram: 16, storage: 512, screenSize: 16,
    condition: 'good', price: 1349, originalPrice: 2499, batteryHealth: 86, batteryCycles: 312,
    color: 'Silver', year: 2023,
    inStock: true, rating: 4.5, reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=900&h=600&fit=crop',
    ],
    description: 'MacBook Pro 16" M2 Pro in Good condition. Fully functional with visible cosmetic signs of use. Battery replaced to ensure reliable performance. Great value.',
    specs: [
      { label: 'Chip', value: 'Apple M2 Pro (12-core CPU, 19-core GPU)' },
      { label: 'Memory', value: '16GB Unified Memory' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '16.2" Liquid Retina XDR, ProMotion 120Hz' },
      { label: 'Battery', value: 'Up to 22 hours' },
      { label: 'Ports', value: '3× Thunderbolt 4, HDMI, SD Card, MagSafe 3' },
      { label: 'Camera', value: '1080p FaceTime HD' },
      { label: 'OS', value: 'macOS Sonoma 14' },
      { label: 'Color', value: 'Silver' },
      { label: 'Year', value: '2023' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: 'mba-13-m1-8-256-gold-excellent',
    name: 'MacBook Air 13" M1 · 8GB · 256GB · Gold',
    shortName: 'MacBook Air 13" M1',
    category: 'macbook', chip: 'M1', ram: 8, storage: 256, screenSize: 13,
    condition: 'excellent', price: 599, originalPrice: 999, batteryHealth: 88, batteryCycles: 189,
    color: 'Gold', year: 2022,
    inStock: true, rating: 4.6, reviewCount: 91,
    images: [
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=600&fit=crop',
    ],
    description: 'The MacBook Air M1 that changed everything. Excellent condition with great battery life. Perfect entry-level Mac for everyday tasks, students, and professionals.',
    specs: [
      { label: 'Chip', value: 'Apple M1 (8-core CPU, 7-core GPU)' },
      { label: 'Memory', value: '8GB Unified Memory' },
      { label: 'Storage', value: '256GB SSD' },
      { label: 'Display', value: '13.3" Retina, 2560×1600' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Ports', value: '2× Thunderbolt 3, 3.5mm audio' },
      { label: 'Camera', value: '720p FaceTime HD' },
      { label: 'OS', value: 'macOS Sonoma 14' },
      { label: 'Color', value: 'Gold' },
      { label: 'Year', value: '2020' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  // iPads
  {
    id: 'ipad-pro-11-m4-256-wifi-openbox',
    name: 'iPad Pro 11" M4 · 256GB · Wi-Fi · Space Black',
    shortName: 'iPad Pro 11" M4',
    category: 'ipad', chip: 'M4', storage: 256, screenSize: 11,
    condition: 'open-box', price: 799, originalPrice: 1099, batteryHealth: 100,
    color: 'Space Black', year: 2024, featured: false, badge: 'Open Box',
    inStock: true, rating: 4.9, reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=600&fit=crop',
    ],
    description: 'iPad Pro 11" with the all-new M4 chip — the thinnest Apple product ever made. This Open Box unit is in pristine, unused condition.',
    specs: [
      { label: 'Chip', value: 'Apple M4' },
      { label: 'Storage', value: '256GB' },
      { label: 'Display', value: '11" Ultra Retina XDR OLED, 2420×1668' },
      { label: 'Connectivity', value: 'Wi-Fi 6E, Bluetooth 5.3' },
      { label: 'Camera', value: '12MP Wide, 10MP Ultra Wide' },
      { label: 'Battery', value: 'Up to 10 hours' },
      { label: 'Ports', value: 'USB-C with Thunderbolt 4' },
      { label: 'Color', value: 'Space Black' },
      { label: 'Year', value: '2024' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: 'ipad-air-13-m2-256-blue-likenew',
    name: 'iPad Air 13" M2 · 256GB · Wi-Fi · Blue',
    shortName: 'iPad Air 13" M2',
    category: 'ipad', chip: 'M2', storage: 256, screenSize: 13,
    condition: 'like-new', price: 849, originalPrice: 1099, batteryHealth: 97,
    color: 'Blue', year: 2024,
    inStock: true, rating: 4.7, reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=600&fit=crop',
    ],
    description: 'iPad Air 13" M2 — the biggest Air ever. Like New condition, barely used. Perfect for productivity, creative work, and content consumption.',
    specs: [
      { label: 'Chip', value: 'Apple M2' },
      { label: 'Storage', value: '256GB' },
      { label: 'Display', value: '13" Liquid Retina, 2732×2048' },
      { label: 'Connectivity', value: 'Wi-Fi 6E, Bluetooth 5.3' },
      { label: 'Camera', value: '12MP Wide' },
      { label: 'Battery', value: 'Up to 10 hours' },
      { label: 'Ports', value: 'USB-C' },
      { label: 'Color', value: 'Blue' },
      { label: 'Year', value: '2024' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  // iMacs
  {
    id: 'imac-24-m3-8c-8-256-blue-openbox',
    name: 'iMac 24" M3 · 8-core · 8GB · 256GB · Blue',
    shortName: 'iMac 24" M3',
    category: 'imac', chip: 'M3', ram: 8, storage: 256, screenSize: 24,
    condition: 'open-box', price: 1099, originalPrice: 1599, batteryHealth: undefined,
    color: 'Blue', year: 2024, featured: false, badge: 'Open Box',
    inStock: true, rating: 4.8, reviewCount: 11,
    images: [
      'https://images.unsplash.com/photo-1560195307-95127677e806?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560195307-95127677e806?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=600&fit=crop',
    ],
    description: 'The stunning iMac 24" in Blue with M3 chip. Only 11.5mm thin. This Open Box unit comes with all original accessories including Magic Keyboard and Magic Mouse.',
    specs: [
      { label: 'Chip', value: 'Apple M3 (8-core CPU, 8-core GPU)' },
      { label: 'Memory', value: '8GB Unified Memory' },
      { label: 'Storage', value: '256GB SSD' },
      { label: 'Display', value: '24" 4.5K Retina, 4480×2520, 218 ppi' },
      { label: 'Ports', value: '2× Thunderbolt 3, 2× USB 3, MagSafe power' },
      { label: 'Camera', value: '12MP Center Stage' },
      { label: 'Audio', value: '6-speaker sound system' },
      { label: 'Color', value: 'Blue' },
      { label: 'Year', value: '2024' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: 'imac-24-m1-8-256-green-excellent',
    name: 'iMac 24" M1 · 8-core · 8GB · 256GB · Green',
    shortName: 'iMac 24" M1',
    category: 'imac', chip: 'M1', ram: 8, storage: 256, screenSize: 24,
    condition: 'excellent', price: 799, originalPrice: 1299, batteryHealth: undefined,
    color: 'Green', year: 2022,
    inStock: true, rating: 4.7, reviewCount: 26,
    images: [
      'https://images.unsplash.com/photo-1560195307-95127677e806?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560195307-95127677e806?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&h=600&fit=crop',
    ],
    description: 'iMac 24" M1 in Green — the colorful revolution. Excellent condition with minimal cosmetic marks. All-in-one desktop with 4.5K display.',
    specs: [
      { label: 'Chip', value: 'Apple M1 (8-core CPU, 8-core GPU)' },
      { label: 'Memory', value: '8GB Unified Memory' },
      { label: 'Storage', value: '256GB SSD' },
      { label: 'Display', value: '24" 4.5K Retina, 4480×2520' },
      { label: 'Ports', value: '2× Thunderbolt 3, 2× USB 3, MagSafe power' },
      { label: 'Camera', value: '1080p FaceTime HD' },
      { label: 'Color', value: 'Green' },
      { label: 'Year', value: '2021' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  // Accessories
  {
    id: 'magic-keyboard-touch-id-silver',
    name: 'Magic Keyboard with Touch ID · Silver',
    shortName: 'Magic Keyboard Touch ID',
    category: 'accessory', chip: '', storage: undefined, screenSize: 0,
    condition: 'open-box', price: 79, originalPrice: 129, batteryHealth: undefined,
    color: 'Silver', year: 2023,
    inStock: true, rating: 4.7, reviewCount: 43,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560195307-95127677e806?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=600&fit=crop',
    ],
    description: 'Magic Keyboard with Touch ID for Mac. Wireless, rechargeable, with scissor mechanism keys and a dedicated Touch ID button.',
    specs: [
      { label: 'Connection', value: 'Bluetooth 5.0, USB-C' },
      { label: 'Battery', value: 'Rechargeable Li-ion, up to 1 month' },
      { label: 'Features', value: 'Touch ID, scissor mechanism' },
      { label: 'Color', value: 'Silver' },
      { label: 'Compatibility', value: 'Mac with M1 or later' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: 'airpods-pro-2nd-gen-openbox',
    name: 'AirPods Pro (2nd Generation) · MagSafe',
    shortName: 'AirPods Pro 2nd Gen',
    category: 'accessory', chip: 'H2', storage: undefined, screenSize: 0,
    condition: 'open-box', price: 179, originalPrice: 249, batteryHealth: undefined,
    color: 'White', year: 2023,
    inStock: true, rating: 4.8, reviewCount: 67,
    images: [
      'https://images.unsplash.com/photo-1606741965509-717fed669b40?w=900&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606741965509-717fed669b40?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=600&fit=crop',
    ],
    description: 'AirPods Pro (2nd Gen) with H2 chip, Adaptive Audio, and MagSafe Charging Case. Open Box — tested and in pristine condition.',
    specs: [
      { label: 'Chip', value: 'Apple H2' },
      { label: 'ANC', value: 'Active Noise Cancellation' },
      { label: 'Audio', value: 'Adaptive Audio, Transparency mode' },
      { label: 'Battery', value: '6h + 24h with case' },
      { label: 'Charging', value: 'MagSafe, Lightning, Qi' },
      { label: 'Resistance', value: 'IP54 earbuds and case' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  // iPhone
  {
    id: 'iphone-15-pro-256-natural-likenew',
    name: 'iPhone 15 Pro · 256GB · Natural Titanium',
    shortName: 'iPhone 15 Pro',
    category: 'iphone', chip: 'A17 Pro', storage: 256, screenSize: 6.1,
    condition: 'like-new', price: 799, originalPrice: 1099, batteryHealth: 97, batteryCycles: 24,
    color: 'Natural Titanium', year: 2024, badge: 'Limited',
    inStock: true, rating: 4.8, reviewCount: 33,
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&h=600&fit=crop',
    ],
    description: 'iPhone 15 Pro in Natural Titanium. Like New condition, 97% battery health. Titanium design, 48MP camera system, USB-C with USB 3 speeds.',
    specs: [
      { label: 'Chip', value: 'Apple A17 Pro' },
      { label: 'Storage', value: '256GB' },
      { label: 'Display', value: '6.1" Super Retina XDR, 2556×1179, ProMotion 120Hz' },
      { label: 'Camera', value: '48MP Main, 12MP Ultra Wide, 12MP 3× Telephoto' },
      { label: 'Battery', value: 'Up to 23 hours video playback' },
      { label: 'Ports', value: 'USB-C (USB 3)' },
      { label: 'Design', value: 'Titanium frame, textured matte glass' },
      { label: 'Color', value: 'Natural Titanium' },
    ],
    reviews: SAMPLE_REVIEWS,
  },
];

export const CONDITION_LABELS: Record<Condition, string> = {
  'open-box': 'Open Box',
  'like-new': 'Like New',
  'excellent': 'Excellent',
  'good': 'Good',
};

export const CONDITION_STYLES: Record<Condition, { bg: string; color: string }> = {
  'open-box': { bg: '#f0f7ff', color: '#0071e3' },
  'like-new': { bg: '#f0fff4', color: '#1a7f37' },
  'excellent': { bg: '#fff8f0', color: '#d97706' },
  'good': { bg: '#fdf4ff', color: '#7c3aed' },
};

export const CATEGORY_META: Record<string, { label: string; slug: string; description: string; image: string }> = {
  macbook: {
    label: 'MacBooks',
    slug: 'macbooks',
    description: 'Certified pre-owned and open-box MacBooks — every model, every chip generation.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=500&fit=crop',
  },
  ipad: {
    label: 'iPads',
    slug: 'ipads',
    description: 'iPad Pro, Air, and standard models in excellent condition.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&h=500&fit=crop',
  },
  imac: {
    label: 'iMacs',
    slug: 'imacs',
    description: 'All-in-one iMac desktops — beautiful, powerful, certified.',
    image: 'https://images.unsplash.com/photo-1560195307-95127677e806?w=1200&h=500&fit=crop',
  },
  accessory: {
    label: 'Accessories',
    slug: 'accessories',
    description: 'Magic keyboards, mice, AirPods, and more.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&h=500&fit=crop',
  },
  iphone: {
    label: 'iPhones',
    slug: 'iphones',
    description: 'Limited iPhone offers — certified and ready to use.',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&h=500&fit=crop',
  },
};

export function getProductsByCategory(category: Category) {
  return PRODUCTS.filter(p => p.category === category);
}

export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

export function getProductById(id: string) {
  return PRODUCTS.find(p => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, limit);
}

export function savingsPercent(price: number, original: number) {
  return Math.round(((original - price) / original) * 100);
}
