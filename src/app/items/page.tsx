import { CONFIG } from 'src/config-global';
import { getCategoriesOptions } from 'src/actions/categories-ssr';

import { ItemView } from 'src/sections/item/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default async function Page() {
  const categories = await getCategoriesOptions();

  return <ItemView categories={categories} />;
}
