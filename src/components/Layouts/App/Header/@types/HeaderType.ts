export type HeaderExcludesType = {
  links?: string[];
  groupPath?: string[];
};

export type ToggleBurgerType = {
  isOpen: boolean;
  setOpen: () => void;
};
