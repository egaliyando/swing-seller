import { CONFIG } from 'src/config-global';

import { OrderView } from 'src/sections/orders/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return <OrderView />;
}
