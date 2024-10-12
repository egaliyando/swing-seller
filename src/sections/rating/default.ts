import { CONFIG } from 'src/config-global';

const { assetURL } = CONFIG.site;

export const TABLE_HEAD = [
  { id: 'name', label: 'Item name' },
  { id: 'star_ratings', label: 'Star ratings' },
  { id: 'comment', label: 'Comments' },
  { id: 'date', label: 'Date & time given' },
  { id: 'given_by', label: 'GIven by' },
];

export const TABLE_DATA = [
  {
    id: 1,
    cover: `${assetURL}/assets/images/cover/cover-1.webp`,
    selected: false,
    name: 'DRIVER TAYLORMADE QI10 MAX SPEEDER NX BLUE US (24) GP #9 R',
    star_ratings: 5,
    comment:
      'I recently upgraded to this golf driver and I couldn t be happier! The distance and accuracy improvements are remarkable.',
    date: '03 Mar 2022, 06:00',
    given_by: 'Alvin Lianto',
  },
  {
    id: 1,
    cover: `${assetURL}/assets/images/cover/cover-1.webp`,
    selected: false,
    name: 'DRIVER TAYLORMADE QI10 MAX SPEEDER NX BLUE US (24) GP #9 R',
    star_ratings: 5,
    comment:
      'I recently upgraded to this golf driver and I couldn t be happier! The distance and accuracy improvements are remarkable.',
    date: '03 Mar 2022, 06:00',
    given_by: 'Alvin Lianto',
  },
];
