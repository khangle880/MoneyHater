// import { firestore } from "../firebase";

import { firestore } from "../firebase";
import { Wallet } from "./Wallets";

export interface ReadyExecutedTransaction {
  id: string;
  amount: number;
  currency: string;
  amount_by_wallet: number;
  category: string;
  note: string;
  with: string;
  event: string;
  remind: string;
  exclude_from_report: boolean;
  state: boolean;
}

export function toReadyExecutedTransaction(doc: any): ReadyExecutedTransaction {
  const readyExecutedTransaction: any = {
    id: doc.id,
    ...doc.data(),
  };
  return readyExecutedTransaction as ReadyExecutedTransaction;
}

export function addTransactionModel(data: any, userId: string, wallet: Wallet) {
  firestore
    .collection("users")
    .doc(userId)
    .collection("wallets")
    .doc(wallet.id)
    .collection("ready_executed_transactions")
    .add(data)
    .then((docRef) => {
      const id = docRef.id;
      wallet.ready_executed_transaction.push({
        id,
        ...data,
      } as ReadyExecutedTransaction);
    });
}

// export var readyExecutedTransactions: ReadyExecutedTransaction[] = [];

// export function clearReadyExecutedTransactions() {
//   readyExecutedTransactions = [];
// }

// export function initReadyExecutedTransactions(
//   user_id: string,
//   wallet_id: string
// ) {
//   const readyExecutedTransactionsRef = firestore
//     .collection("users")
//     .doc(user_id)
//     .collection("wallets")
//     .doc(wallet_id)
//     .collection("ready_executed_transactions");

//   return readyExecutedTransactionsRef.get().then(({ docs }) => {
//     readyExecutedTransactions = docs.map(toReadyExecutedTransaction);
//   });
// }
