import { useRouter } from 'next/router';

import { useAppStore } from '@/lib';
import { PersonalDataType, RoleDataType, TokenDataType } from '@/lib/state';

import { useApiMutation } from './api/useApiMutation';

export type SetDataOnLogInType = {
  token: TokenDataType;
  user: PersonalDataType;
  role: RoleDataType[];
};

export const useAuth = () => {
  const { push } = useRouter();
  const {
    token,
    role,
    clearState,
    setToken,
    setRole,
    setPersonalData,
    setIntroWizard,
  } = useAppStore();
  const { mutate } = useApiMutation({ route: 'AUTH_LOGOUT', method: 'POST' });

  const isAuth = !(token === '');
  const isClient = role[0] && role[0].name === 'client';
  const isAdmin =
    role[0] && (role[0].name === 'admin' || role[0].name === 'employee');

  const checkIsPokUser = (role: string) =>
    role === 'admin' || role === 'employee';

  const setDataOnLogIn = ({ token, user, role }: SetDataOnLogInType) => {
    setToken(token);
    setRole(role);
    setPersonalData({ ...user });
    setIntroWizard(!user.profile_completed);
    push(role[0] && checkIsPokUser(role[0].name) ? '/pok' : '/panel');
  };

  const logout = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          push('/');
          clearState();
        },
      }
    );
  };

  const getAllPermissions = () =>
    role.reduce(
      (prev: string[], current) => [
        ...prev,
        ...current.permissions.map(({ name }) => name),
      ],
      []
    );

  const hasAccess = (name: string) =>
    role[0].name === 'admin' || getAllPermissions().includes(name);

  return {
    isAuth,
    isClient,
    isAdmin,
    setDataOnLogIn,
    logout,
    getAllPermissions,
    hasAccess,
  };
};
