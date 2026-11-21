import heroShowroomImg from '../assets/images/showroom_hero_furniture_1795285944804.jpg';
import royalSofaImg from '../assets/images/product_royal_sofa_1795285944531.jpg';
import tvConsoleImg from '../assets/images/product_tv_console_1795285944671.jpg';
import woodBedImg from '../assets/images/product_wood_bed_1795285944679.jpg';
import wardrobeImg from '../assets/images/product_wardrobe_1795285945340.jpg';
import diningSetImg from '../assets/images/product_dining_set_1795285944605.jpg';
import executiveDeskImg from '../assets/images/product_executive_desk_1795285944284.jpg';

export type FurnitureCategory =
  | 'All'
  | 'Living Room'
  | 'Bedroom'
  | 'Dining'
  | 'Office & Study';

export interface FurnitureItem {
  id: number;
  name: string;
  category: Exclude<FurnitureCategory, 'All'>;
  priceLabel: string;
  availability: string;
  description: string;
  dimensions: string;
  materials: string;
  finishes: string[];
  image: string;
  imageAlt: string;
}

export const BUSINESS = {
  name: "Prince Victoria's Best Furnitures",
  shortLocation: 'Wukari, Taraba State',
  landmarkShort: 'Katsina-Ala Road · Opposite FUW Exit Gate',
  email: 'princevictorious07@gmail.com',
  displayPhone: '080-677-11844',
  telHref: 'tel:08067711844',
  whatsappNumber: '2348067711844',
  address:
    'Along Katsina-Ala Road, Opposite Federal University, Wukari LGA, Exit Gate, Taraba State',
  hours: 'Monday – Saturday, 8:00 AM – 6:30 PM',
};

export const HERO_MEDIA = {
  image: heroShowroomImg,
  alt: "Prince Victoria's Best Furnitures sunlit showroom display featuring a solid wood sofa set, coffee table, and dining table",
};

export const CATEGORIES: FurnitureCategory[] = [
  'All',
  'Living Room',
  'Bedroom',
  'Dining',
  'Office & Study',
];

export const FURNITURE_ITEMS: FurnitureItem[] = [
  {
    id: 1,
    name: 'Royal Fabric Sofa Set',
    category: 'Living Room',
    priceLabel: 'Ask for Price',
    availability: 'Showroom & Custom Order',
    description:
      'Plush high-density cushions anchored by a solid seasoned hardwood frame, built for family living rooms and guest lounges.',
    dimensions: '3-Seater (215 cm) + 2 Armchairs',
    materials: 'Seasoned Hardwood Frame · Woven Upholstery',
    finishes: ['Warm Cream Linen', 'Mocha Velvet', 'Charcoal Weave'],
    image: royalSofaImg,
    imageAlt: 'Royal fabric three-seater sofa set with walnut wood trim and cream cushions',
  },
  {
    id: 2,
    name: 'Modern TV Console & Cabinet',
    category: 'Living Room',
    priceLabel: 'Ask for Price',
    availability: 'In Showroom',
    description:
      'Slatted hardwood cabinet with dedicated ventilation and closed storage compartments for decoders, media boxes, and decor.',
    dimensions: '180 × 45 × 55 cm',
    materials: 'Oiled Mahogany · Matte Walnut Slats',
    finishes: ['Oiled Mahogany', 'Dark Walnut', 'Natural Teak'],
    image: tvConsoleImg,
    imageAlt: 'Modern slatted solid mahogany TV console cabinet with open center shelves',
  },
  {
    id: 3,
    name: 'Solid Wood Double & King Beds',
    category: 'Bedroom',
    priceLabel: 'Ask for Price',
    availability: 'Showroom & Custom Order',
    description:
      'Mortise-and-tenon joined bed frames engineered for quiet, creak-free support and long-term structural stability.',
    dimensions: '4×6 ft, 5×6 ft & 6×6 ft Sizes',
    materials: 'Kiln-Seasoned Hardwood · Paneled Headboard',
    finishes: ['Warm Oak Stain', 'Deep Mahogany', 'Espresso Timber'],
    image: woodBedImg,
    imageAlt: 'Handcrafted solid hardwood king bed frame with paneled timber headboard',
  },
  {
    id: 4,
    name: 'Sliding & Hinged Wardrobes',
    category: 'Bedroom',
    priceLabel: 'Ask for Price',
    availability: 'Made to Fit',
    description:
      'Full-height storage wardrobes combining heavy-duty hanging rails, adjustable shelving, and smooth-glide door hardware.',
    dimensions: '180 × 60 × 210 cm (Custom Widths)',
    materials: 'Solid Timber Veneer · Brushed Brass Hardware',
    finishes: ['Oiled Walnut', 'Natural Chestnut', 'Satin Mahogany'],
    image: wardrobeImg,
    imageAlt: 'Tall oiled walnut wardrobe with sliding and hinged doors and brass handles',
  },
  {
    id: 5,
    name: 'Family Dining Table & Chairs',
    category: 'Dining',
    priceLabel: 'Ask for Price',
    availability: 'In Showroom',
    description:
      'Generously proportioned hardwood dining table finished for easy wipe-down care, paired with padded high-back chairs.',
    dimensions: '4-Seater & 6-Seater Configurations',
    materials: 'Solid Mahogany · Upholstered Linen Seats',
    finishes: ['Rich Mahogany / Cream', 'Walnut / Sand', 'Natural Teak / Olive'],
    image: diningSetImg,
    imageAlt: 'Six-seater solid mahogany dining table with six cream upholstered timber chairs',
  },
  {
    id: 6,
    name: 'Executive Desk & Study Table',
    category: 'Office & Study',
    priceLabel: 'Ask for Price',
    availability: 'In Showroom',
    description:
      'Broad work surface with lockable side pedestal drawers tailored for offices, university staff rooms, and student study spaces.',
    dimensions: '150 × 75 × 76 cm',
    materials: 'Hardwood Top · Soft-Close Drawers',
    finishes: ['Smoked Walnut', 'Classic Mahogany', 'Light Oak'],
    image: executiveDeskImg,
    imageAlt: 'Executive solid wood office desk with side drawers and upholstered timber chair',
  },
];

export const CRAFTSMANSHIP_PILLARS = [
  {
    index: '01.',
    title: 'Solid Construction',
    description:
      'Well-joined seasoned timber frames and dependable upholstery engineered for everyday Nigerian family and office use.',
  },
  {
    index: '02.',
    title: 'Custom Room Sizing',
    description:
      'Need a specific sofa length, bed frame dimension, or study desk for a staff or student apartment? We build to exact room measurements.',
  },
  {
    index: '03.',
    title: 'FUW Exit Gate Landmark',
    description:
      'Conveniently situated along Katsina-Ala Road directly opposite the Federal University Wukari exit gate for quick inspection.',
  },
  {
    index: '04.',
    title: 'Direct Showroom Support',
    description:
      'Speak directly with our workshop via phone, email, or WhatsApp for immediate stock checks, fabric samples, and honest estimates.',
  },
];

export function buildWhatsAppUrl(messageText: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(messageText)}`;
}

export function buildMailtoUrl(subject: string, body: string): string {
  return `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
