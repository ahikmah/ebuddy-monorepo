import { defaultFont } from 'src/theme/core/typography';

import type { SettingsState } from './types';

// ----------------------------------------------------------------------

export const STORAGE_KEY = 'app-settings';

export const defaultSettings: SettingsState = {
  colorScheme: 'light',
  contrast: 'default',
  navLayout: 'vertical',
  primaryColor: 'orange',
  navColor: 'integrate',
  compactLayout: true,
  fontFamily: defaultFont,
} as const;
