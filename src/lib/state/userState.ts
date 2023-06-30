import { StateCreator } from 'zustand';

export type UserStateType = {
  setToken: (token: TokenDataType) => void;
  setRole: (role: RoleDataType[]) => void;
  setPersonalData: (data: PersonalDataType) => void;
  setIntroWizard: (value: boolean) => void;
  clearState: () => void;
} & StateUserType;

export type StateUserType = {
  token: string;
  role: RoleDataType[];
  expires_at: string;
  personalData: PersonalDataType;
  isIntroWizardOpen: boolean;
};

export type TokenDataType = {
  token: string;
  expires_at: string;
};

export type RoleDataType = {
  id: string;
  name: string;
  status: string;
  permissions: { id: string; name: string }[];
};

export type PersonalDataType = {
  id: string;
  email: string;
  profile: {
    first_name: string;
    last_name: string;
  };
  profile_completed: boolean;
};

export const initialUserState = {
  token: '',
  role: [
    {
      id: '',
      name: '',
      status: '',
      permissions: [],
    },
  ],
  expires_at: '',
  isIntroWizardOpen: false,
  personalData: {
    id: '',
    email: '',
    profile: {
      first_name: '',
      last_name: '',
    },
    profile_completed: false,
  },
};

export const createUserState: StateCreator<UserStateType> = (set) => ({
  ...initialUserState,
  setToken: (token) => set({ ...token }),
  setRole: (role) => set({ role }),
  setPersonalData: (personalData) => set({ personalData }),
  setIntroWizard: (isIntroWizardOpen) => set({ isIntroWizardOpen }),
  clearState: () => set(initialUserState),
});
