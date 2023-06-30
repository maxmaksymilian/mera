import create from 'zustand';

type useProgressStoreProps = {
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
};

export const useProgressStore = create<useProgressStoreProps>((set) => ({
  isAnimating: false,
  setIsAnimating: (isAnimating) => set(() => ({ isAnimating })),
}));
