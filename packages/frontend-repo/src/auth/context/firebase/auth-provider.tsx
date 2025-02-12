'use client';

import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useMemo, useEffect, useCallback } from 'react';

import { useSetState } from 'src/hooks/use-set-state';

import axios from 'src/utils/axios';

import { AUTH, FIRESTORE } from 'src/lib/firebase';

import { AuthContext } from '../auth-context';

import type { AuthState } from '../../types';

// ----------------------------------------------------------------------
type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Readonly<Props>) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      onAuthStateChanged(AUTH, async (user: AuthState['user']) => {
        if (user) {
          const userProfile = doc(FIRESTORE, 'users', user.uid);

          const docSnap = await getDoc(userProfile);

          const profileData = docSnap.data();

          const { accessToken } = user;

          setState({ user: { ...user, ...profileData }, loading: false });
          axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        } else {
          setState({ user: null, loading: false });
          axios.defaults.headers.common.Authorization = undefined;
        }
      });
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
            id: state.user?.uid,
            accessToken: state.user?.accessToken,
            displayName: state.user?.displayName,
            photoURL: state.user?.photoURL,
            role: state.user?.role ?? 'admin',
          }
        : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
