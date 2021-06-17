import firebase from "firebase";
import { firestore } from "../firebase";
import { Category } from "./Categories";
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
  transactions_list?: Transaction[];
}

export function toTransaction(doc: any): Transaction {
  const transaction: any = {
    id: doc.id,
    ...doc.data(),
  };
  return transaction as Transaction;
}

export function addTransaction(data: any, userId: string, wallet: Wallet) {
  const category = { ...data.category } as Category;
  data.category = data.category.id;

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
      wallet.balance +=
        category?.type === "Expense"
          ? -data.amount_by_wallet
          : category?.type === "Income"
          ? data.amount_by_wallet
          : 0;
    });

  firestore
    .collection("users")
    .doc(userId)
    .collection("wallets")
    .doc(wallet.id)
    .update({
      balance: firebase.firestore.FieldValue.increment(
        category?.type === "Expense"
          ? -data.amount_by_wallet
          : category?.type === "Income"
          ? data.amount_by_wallet
          : 0
      ),
    });

  // if (category.type === "debt&loan") {
  //   if (category.name === "Loan") {

  //   }
  //   if (category.name === "Debt Collection") {
  //   }

  //   if (category.name === "Debt") {
  //   }
  //   if (category.name === "Repayment") {
  //   }
  // }
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
