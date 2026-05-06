import { ColorSwatch, TypographySample, HeroSlide, NavItem, Car } from './types';
import { MOCK_CARS as MOCK_CARS_DATA } from './utils/mockData';

// Extracted from the provided logo description and visual approximation
export const BRAND_COLORS: ColorSwatch[] = [
  {
    name: 'Empathon Navy',
    hex: '#000000',
    variable: 'bg-empathon-navy',
    usage: 'Primary brand background, headers, corporate trust.'
  },
  {
    name: 'Empathon Rust',
    hex: '#ffffff',
    variable: 'bg-empathon-rust',
    usage: 'Primary actions, accents, geometric heart logo element.'
  },
  {
    name: 'Luxury Slate',
    hex: '#111111',
    variable: 'bg-empathon-navyLight',
    usage: 'Secondary backgrounds, card gradients.'
  },
  {
    name: 'Rust Highlight',
    hex: '#e5e5e5',
    variable: 'bg-empathon-rustLight',
    usage: 'Hover states for primary actions.'
  },
  {
    name: 'Glass Surface',
    hex: 'rgba(255,255,255,0.03)',
    variable: 'bg-empathon-glass',
    usage: 'Panels, cards, overlays.'
  }
];

export const TYPOGRAPHY_SYSTEM: TypographySample[] = [
  {
    name: 'Display Serif',
    style: 'font-serif text-5xl font-bold',
    description: 'Used for major luxury headers and impact statements.'
  },
  {
    name: 'Section Heading',
    style: 'font-sans text-2xl font-semibold tracking-wide',
    description: 'Standard headers for bento grid sections.'
  },
  {
    name: 'Body Text',
    style: 'font-sans text-base text-slate-400 font-light',
    description: 'General content, descriptions, and details.'
  },
  {
    name: 'Micro Label',
    style: 'font-sans text-xs uppercase tracking-[0.2em] text-empathon-rust font-bold',
    description: 'Tags, categories, and technical specs.'
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Browse Cars', href: '/showroom' },
  { label: 'Corporate', href: '/corporate' },
  { label: 'Dealers', href: '/dealers' },
  { label: 'Track Order', href: '/tracking' },
  { label: 'Admin', href: '/admin' },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'GLE Authority (2020-22)',
    subtitle: 'The pinnacle of modern luxury. Experience the refined 2020-2022 Mercedes-Benz GLE 350.',
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924985/GLE_Authority_2020-22_xifrfb.jpg',
    ctaPrimary: 'View Inventory',
    ctaSecondary: 'Reserve Now'
  },
  {
    id: 2,
    title: 'Defined by Legacy (2016-19)',
    subtitle: 'The 2016-2019 Mercedes GLE 350. A testament to enduring performance and style.',
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924976/2016-2019_Mercedes_GLE_350_veahlt.jpg',
    ctaPrimary: 'View Specs',
    ctaSecondary: 'Inquire'
  },
  {
    id: 3,
    title: 'The Robust ML350',
    subtitle: '2012-2015 Mercedes ML350. The classic SUV that defined a generation of corporate transport.',
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770925122/ML_350_h6kps1.jpg',
    ctaPrimary: 'Check Availability',
    ctaSecondary: 'Contact'
  },
  {
    id: 4,
    title: 'Modern Efficiency',
    subtitle: '2020-2022 Toyota Corolla. Reliability meets contemporary design for the modern fleet.',
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924976/2020-2022_Toyota_Corolla_sy98h9.jpg',
    ctaPrimary: 'View Corollas',
    ctaSecondary: 'Bulk Order'
  },
  {
    id: 5,
    title: 'Proven Reliability',
    subtitle: '2014-2016 Toyota Corolla. The cost-effective backbone of executive logistics.',
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924977/2014-2016_Toyota_Corolla_hxfv66.jpg',
    ctaPrimary: 'View Details',
    ctaSecondary: 'Contact'
  },
  {
    id: 6,
    title: 'Sonata Executive',
    subtitle: '2015-2017 Hyundai Sonata. Spacious comfort for the discerning passenger.',
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924990/2015-2017_Hyundai_Sonata_fizpfi.jpg',
    ctaPrimary: 'Explore Fleet',
    ctaSecondary: 'Inquire'
  },
  {
    id: 7,
    title: 'Elantra Compact',
    subtitle: '2012-2016 Hyundai Elantra. Agile, efficient, and ready for urban deployment.',
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924976/2012-2016_Hyundai_Elantra_xtcjzo.jpg',
    ctaPrimary: 'View Stock',
    ctaSecondary: 'Contact'
  }
];

export const MOCK_CARS: Car[] = MOCK_CARS_DATA as Car[];