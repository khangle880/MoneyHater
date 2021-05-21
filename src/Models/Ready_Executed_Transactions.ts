import { firestore } from "../firebase";

export interface ReadyExecutedTransaction {
  id: string;
  amount: number;
  currency: string;
  amount_by_wallet: number;
  category: string;
  note: string;
  with: string;
  event: string;
  remind: Date;
  excluded_from_report: boolean;
  state: boolean;
}

export function toReadyExecutedTransaction(doc: any): ReadyExecutedTransaction {
  const readyExecutedTransaction: any = {
    id: doc.id,
    ...doc.data(),
  };
  return readyExecutedTransaction as ReadyExecutedTransaction;
}

export var readyExecutedTransactions: ReadyExecutedTransaction[] = [];

export function clearReadyExecutedTransactions() {
  readyExecutedTransactions = [];
}

export function initReadyExecutedTransactions(
  user_id: string,
  wallet_id: string
) {
  const readyExecutedTransactionsRef = firestore
    .collection("users")
    .doc(user_id)
    .collection("wallets")
    .doc(wallet_id)
    .collection("ready_executed_transactions");

  return readyExecutedTransactionsRef.get().then(({ docs }) => {
    readyExecutedTransactions = docs.map(toReadyExecutedTransaction);
  });
}
