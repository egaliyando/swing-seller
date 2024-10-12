export const TABLE_HEAD = [
  { id: 'type', label: 'Transaction type' },
  { id: 'name', label: 'Date created' },
  { id: 'amount', label: 'Amount' },
  { id: 'status', label: 'Status' },
  { id: 'ac2', label: '' },
];

export const TABLE_DATA = [
  {
    id: '#I439H',
    type: "Item Sale",
    selected: false,
    invoice_number: 'INV/20240725/MPL/4046052555',
    date: '22:00, 01 Mar 2024',
    amount: '+ Rp. 2,500,000',
    status: 'Pending',
  },
  {
    id: '#I439I',
    type: "Item Sale",
    selected: false,
    invoice_number: 'INV/20240725/MPL/4046052555',
    date: '22:00, 01 Mar 2024',
    amount: '+ Rp. 2,500,000',
    status: 'Cancelled',
  },
  {
    id: '#I439J',
    type: "Withdraw",
    selected: false,
    invoice_number: 'INV/20240725/MPL/4046052555',
    date: '22:00, 01 Mar 2024',
    amount: '+ Rp. 2,500,000',
    status: 'Failed',
  },
  {
    id: '#I439K',
    type: "Withdraw",
    selected: false,
    invoice_number: 'INV/20240725/MPL/4046052555',
    date: '22:00, 01 Mar 2024',
    amount: '+ Rp. 2,500,000',
    status: 'Completed',
  },
];

export const TRANSACTION_TYPE_OPTIONS = [
  { label: 'All transactions', value: 'All transactions' },
  { label: 'Completed earnings', value: 'Completed earnings' },
  { label: 'Pending earnings', value: 'Pending earnings' },
  { label: 'Cancelled earnings', value: 'Cancelled earnings' },
  { label: 'Completed withdraws', value: 'Completed withdraws' },
  { label: 'Pending withdraws', value: 'Pending withdraws' },
  { label: 'Failed withdraws', value: 'Failed withdraws' },
]
