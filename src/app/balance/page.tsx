import { CONFIG } from 'src/config-global';

import { BalanceView } from 'src/sections/balance/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return <BalanceView />;
}
