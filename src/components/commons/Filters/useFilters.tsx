export type ActionPayloadType = {
  isOpen: boolean;
  values: {
    [key: string]: string | number | boolean | undefined;
  };
};

export type ActionType =
  | { type: 'open'; payload: Pick<ActionPayloadType, 'values'> }
  | { type: 'submit'; payload: Pick<ActionPayloadType, 'values'> }
  | { type: 'cancel'; payload: Pick<ActionPayloadType, 'values'> };

export const initialState: ActionPayloadType = { isOpen: false, values: {} };

export function reducer(
  state: typeof initialState,
  action: Readonly<ActionType>
): typeof initialState {
  switch (action.type) {
    case 'open':
      return {
        isOpen: true,
        values: action.payload.values,
      };
    case 'submit':
      return {
        isOpen: false,
        values: action.payload.values,
      };
    case 'cancel':
      return {
        isOpen: false,
        values: state.values,
      };
    default:
      throw new Error();
  }
}
