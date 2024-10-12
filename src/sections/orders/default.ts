export const TABLE_HEAD = [
  { id: 'id', label: 'Order ID' },
  { id: 'name', label: 'Buyer name & address' },
  { id: 'date', label: 'Order date' },
  { id: 'method', label: 'Fulfillment method' },
  { id: 'price', label: 'Items & price' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'ac1', label: '' },
  { id: 'ac2', label: '' },
];

export const TABLE_DATA = [
  {
    "id": "820d8121-9788-43f3-835f-84427bac6cb1",
    "order_id": "#9788",
    "order_date_fmt": "2024-09-10T13:25:18.776Z",
    "fulfillment_method": "JNE - undefined",
    "total_price": "Rp 143.000",
    "total_order": "2 items",
    "user": {
      "name": "Indrian",
      "address": "Jl. Mana aja boleh"
    },
    "items": [
      {
        "name": "Sample Product 1",
        "sku": "SKU-ID",
        "price_fmt": "RpNaN"
      },
      {
        "name": "Sample Product 3",
        "sku": "SKU-ID-2",
        "price_fmt": "RpNaN"
      }
    ],
    "order_status": "COMPLETED",
    "order_status_fmt": "Diterima",
    "auto_cancel": ""
  },
  {
    "id": "26dc7280-24bc-4101-b4e7-0fe0d260fd75",
    "order_id": "#24BC",
    "order_date_fmt": "2024-09-10T13:25:18.755Z",
    "fulfillment_method": "JNE - undefined",
    "total_price": "Rp 143.000",
    "total_order": "2 items",
    "user": {
      "name": "Indrian",
      "address": "Jl. Mana aja boleh"
    },
    "items": [
      {
        "name": "Sample Product 1",
        "sku": "SKU-ID",
        "price_fmt": "RpNaN"
      },
      {
        "name": "Sample Product 3",
        "sku": "SKU-ID-2",
        "price_fmt": "RpNaN"
      }
    ],
    "order_status": "DELIVERED",
    "order_status_fmt": "",
    "auto_cancel": ""
  },
  {
    "id": "3062c81d-2678-4b36-8334-08c7db94c58a",
    "order_id": "#2678",
    "order_date_fmt": "2024-09-10T13:25:18.731Z",
    "fulfillment_method": "JNE - undefined",
    "total_price": "Rp 143.000",
    "total_order": "2 items",
    "user": {
      "name": "Indrian",
      "address": "Jl. Mana aja boleh"
    },
    "items": [
      {
        "name": "Sample Product 1",
        "sku": "SKU-ID",
        "price_fmt": "RpNaN"
      },
      {
        "name": "Sample Product 3",
        "sku": "SKU-ID-2",
        "price_fmt": "RpNaN"
      }
    ],
    "order_status": "PROCESSED",
    "order_status_fmt": "Processed",
    "auto_cancel": ""
  },
  {
    "id": "fec31c96-27fc-4ceb-afe6-652b7c1c41bd",
    "order_id": "#27FC",
    "order_date_fmt": "2024-09-04T01:29:05.748Z",
    "fulfillment_method": "JNE - undefined",
    "total_price": "Rp 143.000",
    "total_order": "2 items",
    "user": {
      "name": "Indrian",
      "address": "Jl. Mana aja boleh"
    },
    "items": [
      {
        "name": "Sample Product 1",
        "sku": "SKU-ID",
        "price_fmt": "RpNaN"
      },
      {
        "name": "Sample Product 3",
        "sku": "SKU-ID-2",
        "price_fmt": "RpNaN"
      }
    ],
    "order_status": "PAID",
    "order_status_fmt": "Need to approve/reject",
    "auto_cancel": "Auto cancel by 06 Sep, 01:29"
  }
]

export const JOB_BENEFIT_OPTIONS = [
  { label: 'Free parking', value: 'Free parking' },
  { label: 'Bonus commission', value: 'Bonus commission' },
  { label: 'Travel', value: 'Travel' },
  { label: 'Device support', value: 'Device support' },
  { label: 'Health care', value: 'Health care' },
  { label: 'Training', value: 'Training' },
  { label: 'Health insurance', value: 'Health insurance' },
  { label: 'Retirement plans', value: 'Retirement plans' },
  { label: 'Paid time off', value: 'Paid time off' },
  { label: 'Flexible work schedule', value: 'Flexible work schedule' },
];
