import { JNEIcon, JNTIcon, LionIcon, TikiIcon, NinjaIcon, AnterajaIcon } from "src/assets/image";

export const shippingData = [
  {
    courierId: 'JNE001',
    name: 'JNE',
    serviceTypes: ['Standard', 'Express', 'International Shipping'],
    headquarterLocation: 'Jakarta, Indonesia',
    contactNumber: '+62 21 2927 8888',
    website: 'https://www.jne.co.id',
    icon: JNEIcon.src
  },
  {
    courierId: 'TIKI001',
    name: 'TIKI',
    serviceTypes: ['Standard', 'Express', 'Economy Shipping'],
    headquarterLocation: 'Jakarta, Indonesia',
    contactNumber: '+62 21 6000 100',
    website: 'https://www.tiki.id',
    icon: TikiIcon.src // TIKI icon
  },
  {
    courierId: 'Anteraja001',
    name: 'Anteraja',
    serviceTypes: ['Same Day', 'Next Day', 'Regular Shipping'],
    headquarterLocation: 'Jakarta, Indonesia',
    contactNumber: '+62 21 2928 2828',
    website: 'https://i.imgur.com/v9HJBF1.png',
    icon: AnterajaIcon.src,
  },
  {
    courierId: 'J&T001',
    name: 'J&T Express',
    serviceTypes: ['Same Day', 'Next Day', 'Standard Shipping'],
    headquarterLocation: 'Jakarta, Indonesia',
    contactNumber: '+62 21 8066 1888',
    website: 'https://i.imgur.com/YMyib7c.png',// J&T Express icon
    icon: JNTIcon.src,
  },
  {
    courierId: 'SiCepat001',
    name: 'SiCepat',
    serviceTypes: ['Express', 'Regular', 'Economy Shipping'],
    headquarterLocation: 'Jakarta, Indonesia',
    contactNumber: '+62 21 8066 1000',
    website: 'https://www.sicepat.com',
    icon: NinjaIcon.src // SiCepat icon
  },
  {
    courierId: 'Gojek001',
    name: 'Gojek Logistics',
    serviceTypes: ['Same Day', 'Next Day', 'Regular Shipping'],
    headquarterLocation: 'Jakarta, Indonesia',
    contactNumber: '+62 21 5025 1005',
    website: 'https://www.gojek.com',
    icon: LionIcon.src// Gojek Logistics icon
  }
];

export const pickupData = [
  {
    id: 1, title: "Pickup at Garasi Golf Store - Albatross BSD",
    sub: "Jl. Raya Pagedangan No.25, Lengkong Kulon, Kec. Pagedangan, Kabupaten Tangerang, Banten 1533",
    operation: "Mon - Sun, 08:00 - 18:00"
  },
  {
    id: 2, title: "Pickup at Garasi Golf Store - Cilandak KKO",
    sub: "Jl. Raya Pagedangan No.25, Lengkong Kulon, Kec. Pagedangan, Kabupaten Tangerang, Banten 1533",
    operation: "Mon - Sun, 08:00 - 18:00"
  },
  {
    id: 3, title: "Pickup at Garasi Golf Warehouse - Dadap ",
    sub: "Jl. Raya Pagedangan No.25, Lengkong Kulon, Kec. Pagedangan, Kabupaten Tangerang, Banten 1533",
    operation: "Mon - Sun, 08:00 - 18:00"
  },
]
