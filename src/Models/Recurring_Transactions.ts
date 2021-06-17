// import { firestore } from "../firebase";

import { firestore } from "../firebase";
import { Wallet } from "./Wallets";

export interface RecurringTransaction {
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
  from: string;
  to: string;
  state: boolean;
}

export function toRecurringTransaction(doc: any): RecurringTransaction {
  const recurringTransaction: any = {
    id: doc.id,
    ...doc.data(),
  };
  return recurringTransaction as RecurringTransaction;
}

export function addRecurringTransaction(
  data: any,
  userId: string,
  wallet: Wallet
) {
  firestore
    .collection("users")
    .doc(userId)
    .collection("wallets")
    .doc(wallet.id)
    .collection("recurring_transactions")
    .add(data)
    .then((docRef) => {
      const id = docRef.id;
      wallet.recurring_transactions.push({
        id,
        ...data,
      } as RecurringTransaction);
    });
}

// export var recurringTransactions: RecurringTransaction[] = [];

// export function clearRecurringTransactions() {
//   recurringTransactions = [];
// }

// export function initRecurringTransactions(user_id: string, wallet_id: string) {
//   const recurringTransactionsRef = firestore
//     .collection("users")
//     .doc(user_id)
//     .collection("wallets")
//     .doc(wallet_id)
//     .collection("recurring_transactions");

//   return recurringTransactionsRef.get().then(({ docs }) => {
//     recurringTransactions = docs.map(toRecurringTransaction);
//   });
// }
