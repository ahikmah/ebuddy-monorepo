// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  // AUTH
  auth: {
    firebase: {
      signIn: `${ROOTS.AUTH}/sign-in`,
      verify: `${ROOTS.AUTH}/verify`,
      signUp: `${ROOTS.AUTH}/sign-up`,
      resetPassword: `${ROOTS.AUTH}/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    other: `${ROOTS.DASHBOARD}/other`,
    api: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
  },
};
