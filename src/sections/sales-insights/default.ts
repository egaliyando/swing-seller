import { CONFIG } from 'src/config-global';

const { assetURL } = CONFIG.site;

export const TABLE_HEAD = [
  { id: 'name', label: 'Item name', minWidth: 150 },
  { id: 'category', label: 'Category' },
  { id: 'condition', label: 'Condition' },
  { id: 'stock', label: 'Stock' },
  { id: 'sold', label: 'Sold' },
  { id: 'price', label: 'Price', align: 'right' },
  { id: 'status', label: 'status' },
  { id: '', label: '' },
];

export const TABLE_DATA = [
  {
    id: 1,
    cover: `${assetURL}/assets/images/cover/cover-1.webp`,
    selected: false,
    name: 'Driver Titleist 913 D2',
    category: 'Golf clubs > Drivers',
    condition: 'Lightly used (8-9/10)',
    stock: 60,
    sold: 0,
    price: 'Rp. 1,750,000 - Rp. 2,000,000',
    status: 'Active',
  },
  {
    id: 2,
    cover: `${assetURL}/assets/images/cover/cover-2.webp`,
    selected: false,
    name: 'Driver Titleist 913 D2',
    category: 'Golf clubs > Drivers',
    condition: 'Lightly used (8-9/10)',
    stock: 60,
    sold: 0,
    price: 'Rp. 1,750,000 - Rp. 2,000,000',
    status: 'Active',
  },
];

export const JOB_BENEFIT_OPTIONS = [
  { label: 'Brand new (10/10)', value: 'Free parking' },
  { label: 'Like new (9+/10)', value: 'Bonus commission' },
  { label: 'Lightly used (8-9/10)', value: 'Travel' },
  { label: 'Well used (5-7/10)', value: 'Device support' },
  { label: 'Heavily used (3-4/10)', value: 'Health care' },
];
