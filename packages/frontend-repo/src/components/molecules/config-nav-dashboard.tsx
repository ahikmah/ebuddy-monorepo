import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/atoms/iconify';
import { SvgColor } from 'src/components/atoms/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  dashboard: icon('ic-dashboard'),
  user: icon('ic-user'),
  external: icon('ic-external'),
  // put more icons here
};

// ----------------------------------------------------------------------

export const navData = [
  {
    subheader: 'Main',
    items: [
      { title: 'Users', path: paths.dashboard.root, icon: ICONS.user },
      { title: 'Other Menu', path: paths.dashboard.other, icon: ICONS.dashboard },
      {
        title: 'API Documentation',
        path: paths.dashboard.api,
        icon: ICONS.external,
        info: <Iconify width={18} icon="prime:external-link" />,
      },
    ],
  },
];
