import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

import { createUserState, UserStateType } from './state';

type StoreState = UserStateType;

export const useAppStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createUserState(...a),
      }),
      { name: 'mera-store' }
    )
  )
);
