import { WalletTransactionHistory } from './WalletTransactionHistory';

export type HistorySectionProps = {
  historyItems: any;
};

export const HistorySection = ({ historyItems }: HistorySectionProps) => {
  return historyItems
    ?.map((transaction: any, index: number) => (
      <WalletTransactionHistory key={index} {...transaction} />
    ))
    .reverse();
};
