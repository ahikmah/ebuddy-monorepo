import { fDate, type User } from '@repo/shared';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { varAlpha } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';

import { Image } from 'src/components/molecules/image';
import { Iconify } from 'src/components/atoms/iconify';

// ----------------------------------------------------------------------

type Props = {
  user: User;
};

export function UserCard({ user }: Readonly<Props>) {
  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: 'auto',
            bottom: -26,
            position: 'absolute',
          }}
        />

        <Avatar
          alt={user.name}
          src={user.avatar}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />

        <Image
          src={user.avatar}
          alt={user.name}
          ratio="16/9"
          slotProps={{
            overlay: {
              background: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
            },
          }}
        />
      </Box>

      <ListItemText
        sx={{ mt: 7, mb: 1 }}
        primary={user.name}
        secondary={user.email}
        primaryTypographyProps={{ typography: 'subtitle1' }}
        secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        sx={{ p: 3, typography: 'subtitle1' }}
      >
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Rating
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
            <Iconify
              width={18}
              icon="solar:medal-ribbon-star-bold-duotone"
              sx={{ color: (theme) => theme.palette.warning.main }}
            />
            {user.totalAverageWeightRatings}
          </Box>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Rents
          </Typography>

          {user.numberOfRents}
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Active
          </Typography>
          {!!user.recentlyActive && fDate(new Date(user.recentlyActive * 1000))}
        </div>
      </Box>
    </Card>
  );
}
