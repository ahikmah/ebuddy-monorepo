'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Alert from '@mui/material/Alert';

import { useBoolean } from 'src/hooks/use-boolean';

import { HeaderBase } from '../header-base';
import { Main, CompactContent } from './main';
import { LayoutSection } from '../layout-section';

// ----------------------------------------------------------------------

export type SimpleLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  content?: {
    compact?: boolean;
  };
};

export function SimpleLayout({ sx, children, content }: Readonly<SimpleLayoutProps>) {
  const mobileNavOpen = useBoolean();

  const layoutQuery: Breakpoint = 'md';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderBase
          layoutQuery={layoutQuery}
          onOpenNav={mobileNavOpen.onTrue}
          slotsDisplay={{
            signIn: false,
            account: false,
            menuButton: false,
          }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
          }}
          slotProps={{ container: { maxWidth: false } }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-simple-content-compact-width': '448px',
      }}
      sx={sx}
    >
      <Main>{content?.compact ? <CompactContent>{children}</CompactContent> : children}</Main>
    </LayoutSection>
  );
}
