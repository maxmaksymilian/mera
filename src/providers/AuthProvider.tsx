import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect } from 'react';

import { useAppStore } from '@/lib';
import { useApiQuery } from '@/hooks/api/useApiQuery';
import { SetDataOnLogInType, useAuth } from '@/hooks/useAuth';

type AuthContextProps = {
  setDataOnLogIn: (values: SetDataOnLogInType) => void;
  logout: () => void;
  isAuth: boolean;
  isAdmin: boolean;
  isClient: boolean;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { isAuth, isAdmin, isClient, setDataOnLogIn, logout } = useAuth();
  const { token } = useAppStore();
  const { pathname, push } = useRouter();
  const { status, refetch } = useApiQuery({
    route: 'LOGGED',
    refresh: true,
  });

  useEffect(() => {
    if (pathname.includes('/auth/verify')) {
      return;
    }
    if (pathname.includes('/panel') && !isAuth) {
      push('/auth/logowanie');
    } else if (
      pathname.includes('/pok') &&
      !pathname.includes('auth') &&
      !isAuth
    ) {
      push('/');
    }
    if (pathname.includes('/auth') && isClient) {
      push('/panel');
    } else if (
      pathname.includes('/pok') &&
      !pathname.includes('auth') &&
      isClient
    ) {
      push('/panel');
    }
    if (pathname.includes('/auth') && isAdmin) {
      push('/pok');
    } else if (
      pathname.includes('/panel') &&
      !pathname.includes('auth') &&
      isAdmin
    ) {
      push('/pok');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, token]);

  useEffect(() => {
    if (isAuth) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{ isAdmin, isAuth, isClient, logout, setDataOnLogIn }}
    >
      {status === 'success' ||
      (!pathname.includes('panel') &&
        !pathname.includes('pok') &&
        !pathname.includes('auth'))
        ? children
        : null}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("Missing authContext, it's not wrapped in AuthProvider");
  }

  return ctx;
};
