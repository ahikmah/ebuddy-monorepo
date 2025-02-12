import { CONFIG } from 'src/config-global';

import { SignInView } from 'src/components/pages/auth';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in - ${CONFIG.site.name}` };

export default function Page() {
  return <SignInView />;
}
