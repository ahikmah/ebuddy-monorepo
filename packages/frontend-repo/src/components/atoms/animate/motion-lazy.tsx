'use client';

import { LazyMotion } from 'framer-motion';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

const loadFeaturesAsync = async () => import('./features').then((res) => res.default);

export function MotionLazy({ children }: Readonly<Props>) {
  return (
    <LazyMotion strict features={loadFeaturesAsync}>
      {children}
    </LazyMotion>
  );
}
