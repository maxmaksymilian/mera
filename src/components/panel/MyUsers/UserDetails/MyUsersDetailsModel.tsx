import { ConvertPopup } from './Modals/ConvertPopup';
import { DeletePopup } from './Modals/DeletePopup';
import { EditModal } from './Modals/EditModal/EditModal';
import { WalletModalContent } from './Modals/WalletModalContent/WalletModalContent';

export const modals = {
  delete: DeletePopup,
  convert: ConvertPopup,
  edit: EditModal,
  wallet: WalletModalContent,
};
