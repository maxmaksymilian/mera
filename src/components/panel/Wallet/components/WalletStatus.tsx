import { clsxm } from '@/lib';

type WalletStatusProps = {
  status: 'completed' | 'new' | 'failed';
};

const WalletStatus = ({ status }: WalletStatusProps) => (
  <span
    className={clsxm(
      'bullet z-2 relative box-content inline-block h-5 w-5 rounded-full border-4 border-white',
      status === 'completed' && 'bg-success',
      status === 'new' && 'bg-warning',
      status === 'failed' && 'bg-error'
    )}
  />
);
export default WalletStatus;
