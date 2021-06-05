// import { firestore } from "../firebase";

import { firestore } from "../firebase";
import { Wallet } from "./Wallets";

export interface Transaction {
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
  executed_time: string;
}

export function toTransaction(doc: any): Transaction {
  const transaction: any = {
    id: doc.id,
    ...doc.data(),
  };
  return transaction as Transaction;
}

export function addTransaction(data: any, userId: string, wallet: Wallet) {
  firestore
    .collection("users")
    .doc(userId)
    .collection("wallets")
    .doc(wallet.id)
    .collection("transactions")
    .add(data)
    .then((docRef) => {
      const id = docRef.id;
      wallet.transactions.push({ id, ...data } as Transaction);
    });
}

// export var transactions: Transaction[] = [];

// export function clearTransactions() {
//   transactions = [];
// }

// export function initTransactions(user_id: string, wallet_id: string) {
//   const transactionsRef = firestore
//     .collection("users")
//     .doc(user_id)
//     .collection("wallets")
//     .doc(wallet_id)
//     .collection("transactions");

//   return transactionsRef.get().then(({ docs }) => {
//     transactions = docs.map(toTransaction);
//   });
// }
