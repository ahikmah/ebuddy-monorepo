import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/components/pages/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Other Page - ${CONFIG.site.name}` };

export default function Page() {
  return <BlankView title="Sample Page" />;
}
