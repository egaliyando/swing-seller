import { CONFIG } from 'src/config-global';

import { SettingsView } from 'src/sections/settings/index';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return <SettingsView />;
}
