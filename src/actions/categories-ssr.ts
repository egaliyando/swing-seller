import type { Category } from 'src/types/categories';

import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function getCategoriesOptions() {
  const res = await axios.get(endpoints.categories.options);

  const temp: { value: string; label: string }[] = [];

  res.data.data.forEach((d: Category) => {
    temp.push({ value: d.id, label: d.name });
  });

  return temp;
}
