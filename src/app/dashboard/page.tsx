import { CONFIG } from 'src/config-global';

import { SalesInsightsView } from 'src/sections/sales-insights';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <SalesInsightsView />;
}
