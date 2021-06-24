// import { firestore } from "../firebase";

import dayjs from "dayjs";
import { firestore } from "../firebase";
import { addTransaction } from "../Necessary/components";
import { Wallet, wallets } from "./Wallets";

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
  frequency: number;
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

function executeTransaction(userId: string) {
  var now = new Date();
  wallets.forEach((wallet) => {
    wallet.recurring_transactions.forEach((child) => {
      if (child.state) {
        if (child.to < now.toISOString()) child.state = false;
        else {
          if (dayjs().diff(dayjs(child.from)) % child.frequency === 0) {
            const newRawTransaction: any = { ...child };
            delete newRawTransaction.frequency;
            delete newRawTransaction.to;
            delete newRawTransaction.from;
            delete newRawTransaction.id;
            newRawTransaction.executed_time = now.toISOString();
            addTransaction(newRawTransaction, userId!, wallet);
          }
        }
      }
    });
  });
}

export function initLoopExecuteTransaction(userId: string) {
  (function loop() {
    var now = new Date();
    if (now.getMinutes() % 5 === 0) {
      executeTransaction(userId);
    }
    now = new Date(); // allow for time passing
    var delay = 60000 - (now.getTime() % 60000); // exact ms to next minute interval
    setTimeout(loop, delay);
  })();
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
