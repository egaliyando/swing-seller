import { CONFIG } from 'src/config-global';

import { ItemCreateView } from 'src/sections/item';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new item | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ItemCreateView />;
}
