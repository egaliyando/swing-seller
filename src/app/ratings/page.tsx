import { CONFIG } from 'src/config-global';

import { RatingView } from 'src/sections/rating';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <RatingView />;
}
