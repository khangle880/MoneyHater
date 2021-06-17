import React, { useEffect, useState } from "react";

interface Transaction {
  amount: number;
  currencyID: string;
  categoryID: string;
  note?: string;
  date: string;
  walletID: string;
}

const initialTran = {
  amount: 0,
  currencyID: "a10",
  categoryID: "b20",
  date: new Date().toISOString(),
  walletID: "abds",
};

export const TransactionContent = React.createContext<Transaction>(initialTran);

export function useTransactionState() {
  // useEffect(() => {
  //   const [transaction, setTransaction] = useState<Transaction>(initialTran);
  // }, []);
  // return [transaction, setTransaction];
}

export const clearContent = () => {};
