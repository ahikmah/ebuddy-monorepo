import { CONFIG } from 'src/config-global';

import { DashboardView } from 'src/components/pages/dashboard';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <DashboardView />;
}
