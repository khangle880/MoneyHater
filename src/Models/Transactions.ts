// import { firestore } from "../firebase";

export interface Transaction {
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
  executed_time: Date;
}

export function toTransaction(doc: any): Transaction {
  const transaction: any = {
    id: doc.id,
    ...doc.data(),
  };
  return transaction as Transaction;
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
