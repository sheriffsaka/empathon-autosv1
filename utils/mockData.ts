
export const MOCK_CARS = [
  {
    id: 'c1',
    brand: 'Mercedes-Benz',
    model: 'GLE 350 4MATIC',
    year: 2021,
    price: 65000000,
    mileage: 12000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    condition: 'Foreign Used',
    buyerType: ['Corporate', 'Individual'],
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770925122/GLE_350_4MATIC_eghehz.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: 'c2',
    brand: 'Mercedes-Benz',
    model: 'GLE 350',
    year: 2018,
    price: 38000000,
    mileage: 45000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    condition: 'Foreign Used',
    buyerType: ['Individual'],
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924976/2016-2019_Mercedes_GLE_350_veahlt.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: 'c3',
    brand: 'Mercedes-Benz',
    model: 'ML 350',
    year: 2014,
    price: 18500000,
    mileage: 85000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    condition: 'Foreign Used',
    buyerType: ['Individual', 'Corporate'],
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770925122/ML_350_h6kps1.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: 'c4',
    brand: 'Toyota',
    model: 'Corolla LE',
    year: 2021,
    price: 16500000,
    mileage: 15000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Pre-Order',
    condition: 'Foreign Used',
    buyerType: ['Individual', 'Corporate'],
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770925121/Corolla_LE_nancev.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: 'c5',
    brand: 'Toyota',
    model: 'Corolla S',
    year: 2015,
    price: 9500000,
    mileage: 92000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    condition: 'Foreign Used',
    buyerType: ['Individual'],
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924976/2020-2022_Toyota_Corolla_sy98h9.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: 'c6',
    brand: 'Hyundai',
    model: 'Sonata',
    year: 2016,
    price: 8500000,
    mileage: 78000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    condition: 'Foreign Used',
    buyerType: ['Individual'],
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924976/2012-2016_Hyundai_Elantra_xtcjzo.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: 'c7',
    brand: 'Hyundai',
    model: 'Elantra',
    year: 2014,
    price: 6500000,
    mileage: 105000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    condition: 'Foreign Used',
    buyerType: ['Individual'],
    image: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924976/2012-2016_Hyundai_Elantra_xtcjzo.jpg',
    created_at: new Date().toISOString()
  }
];

export const MOCK_APPOINTMENTS = [
  {
    id: '1',
    fullName: 'Jonathan Sterling',
    email: 'j.sterling@example.com',
    phone: '+1 (555) 123-4567',
    appointmentDate: '2024-04-15',
    visitType: 'Showroom Visit',
    buyerType: 'Individual',
    message: 'Interested in the Rolls-Royce Phantom.',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    fullName: 'Sarah Chen',
    email: 'sarah.c@techcorp.com',
    phone: '+1 (555) 987-6543',
    appointmentDate: '2024-04-18',
    visitType: 'Pre-Order',
    buyerType: 'Corporate',
    message: 'Fleet inquiry for executive team.',
    createdAt: new Date().toISOString()
  }
];

export const MOCK_PREORDERS = [
  {
    id: '1',
    fullName: 'Marcus Aurelius',
    email: 'marcus@rome.com',
    phone: '+1 (555) 000-1111',
    brand: 'Porsche',
    model: '911 GT3',
    color: 'Shark Blue',
    expectedDelivery: '2024-08-01',
    notes: 'Track package requested.',
    buyerType: 'Individual',
    createdAt: new Date().toISOString()
  }
];

export const MOCK_CORPORATE = [
  {
    id: '1',
    companyName: 'Global Logistics Ltd',
    contactPerson: 'Robert Miller',
    fleetSizeInterest: '5-10 vehicles',
    status: 'In Discussion',
    createdAt: new Date().toISOString()
  }
];

export const MOCK_INQUIRIES = [
  {
    id: '1',
    name: 'Alice Johnson',
    subject: 'Shipping to Lagos',
    status: 'New',
    createdAt: new Date().toISOString()
  }
];

export const MOCK_HERO = [
  {
    id: '1',
    title: 'GLE Authority (2020-22)',
    subtitle: 'The pinnacle of modern luxury. Experience the refined 2020-2022 Mercedes-Benz GLE 350.',
    imageUrl: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924985/GLE_Authority_2020-22_xifrfb.jpg',
    ctaPrimaryText: 'View Inventory',
    ctaSecondaryText: 'Reserve Now',
    displayOrder: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Defined by Legacy (2016-19)',
    subtitle: 'The 2016-2019 Mercedes GLE 350. A testament to enduring performance and style.',
    imageUrl: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924976/2016-2019_Mercedes_GLE_350_veahlt.jpg',
    ctaPrimaryText: 'View Specs',
    ctaSecondaryText: 'Inquire',
    displayOrder: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'The Robust ML350',
    subtitle: '2012-2015 Mercedes ML350. The classic SUV that defined a generation of corporate transport.',
    imageUrl: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770925122/ML_350_h6kps1.jpg',
    ctaPrimaryText: 'Check Availability',
    ctaSecondaryText: 'Contact',
    displayOrder: 3,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Modern Efficiency',
    subtitle: '2020-2022 Toyota Corolla. Reliability meets contemporary design for the modern fleet.',
    imageUrl: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924976/2020-2022_Toyota_Corolla_sy98h9.jpg',
    ctaPrimaryText: 'View Corollas',
    ctaSecondaryText: 'Bulk Order',
    displayOrder: 4,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Proven Reliability',
    subtitle: '2014-2016 Toyota Corolla. The cost-effective backbone of executive logistics.',
    imageUrl: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924977/2014-2016_Toyota_Corolla_hxfv66.jpg',
    ctaPrimaryText: 'View Details',
    ctaSecondaryText: 'Contact',
    displayOrder: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Sonata Executive',
    subtitle: '2015-2017 Hyundai Sonata. Spacious comfort for the discerning passenger.',
    imageUrl: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924990/2015-2017_Hyundai_Sonata_fizpfi.jpg',
    ctaPrimaryText: 'Explore Fleet',
    ctaSecondaryText: 'Inquire',
    displayOrder: 6,
    createdAt: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Elantra Compact',
    subtitle: '2012-2016 Hyundai Elantra. Agile, efficient, and ready for urban deployment.',
    imageUrl: 'https://res.cloudinary.com/di7okmjsx/image/upload/v1770924976/2012-2016_Hyundai_Elantra_xtcjzo.jpg',
    ctaPrimaryText: 'View Stock',
    ctaSecondaryText: 'Contact',
    displayOrder: 7,
    createdAt: new Date().toISOString()
  }
];

export const MOCK_FAQS = [
  {
    id: '1',
    question: 'How do I pre-order a vehicle?',
    answer: 'You can pre-order by filling out the pre-order form in our showroom or reservation section. A dedicated agent will contact you within 24 hours.',
    category: 'General'
  },
  {
    id: '2',
    question: 'Do you offer financing?',
    answer: 'Yes, we partner with leading Nigerian banks to offer flexible financing options for both individual and corporate clients.',
    category: 'Finance'
  },
  {
    id: '3',
    question: 'Where is your gallery located?',
    answer: 'Our main gallery is located in Victoria Island, Lagos. We also have a service center in Lekki.',
    category: 'Location'
  }
];

export const MOCK_BRANDS = [
  'Mercedes-Benz',
  'Toyota',
  'Hyundai',
  'Lexus',
  'Honda',
  'BMW',
  'Range Rover'
];

export const MOCK_SITE_SETTINGS = {
  galleryAddress: '123 Luxury Way, Victoria Island, Lagos, Nigeria',
  galleryEmail: 'concierge@empathon-autos.com',
  galleryPhone: '+234 800 EMPATHON',
  brochureUrl: 'https://example.com/brochure.pdf',
  brochureTitle: '2024 Executive Collection'
};

export const MOCK_CORPORATE_CARD = {
  title: 'Bespoke Fleet Solutions',
  subtitle: 'Elevate your corporate presence with our tailored leasing and acquisition programs.',
  description: 'From executive sedans to robust logistics support, we provide the vehicles that drive your business forward.',
  imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000'
};


export const MOCK_TESTIMONIALS = [
  {
    id: '1',
    clientName: 'David Sterling',
    role: 'CEO, Sterling Capital',
    content: 'The level of service at Empathon-Autos is unmatched. They handled the entire import process for my Phantom seamlessly.',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
    carPurchasedImageUrl: 'https://picsum.photos/seed/car1/400/300',
    rating: 5,
    clientType: 'Individual',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    clientName: 'Elena Rodriguez',
    role: 'Managing Director',
    content: 'Our corporate fleet rotation has never been easier. Professional, discreet, and highly efficient.',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
    carPurchasedImageUrl: 'https://picsum.photos/seed/car2/400/300',
    rating: 5,
    clientType: 'Corporate',
    createdAt: new Date().toISOString()
  }
];
