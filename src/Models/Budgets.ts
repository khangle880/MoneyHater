// import { firestore } from "../firebase";

import { firestore } from "../firebase";
import { Wallet } from "./Wallets";

export interface Budget {
  id: string;
  goal_value: number;
  consume: number;
  category: string;
  from: string;
  to: string;
  repeatable: boolean;
  state: boolean;
  event: string;
}

export function toBudget(doc: any): Budget {
  const budget: any = {
    id: doc.id,
    ...doc.data(),
  };
  return budget as Budget;
}

export function addBudget(data: any, userId: string, wallet: Wallet) {
  firestore
    .collection("users")
    .doc(userId)
    .collection("wallets")
    .doc(wallet.id)
    .collection("budgets")
    .add(data)
    .then((docRef) => {
      const id = docRef.id;
      wallet.budgets.push({ id, ...data } as Budget);
    });
}

// export var budgets: Budget[] = [];

// export function clearBudgets() {
//   budgets = [];
// }

// export function initBudgets(user_id: string, wallet_id: string) {
//   const budgetsRef = firestore
//     .collection("users")
//     .doc(user_id)
//     .collection("wallets")
//     .doc(wallet_id)
//     .collection("budgets");

//   return budgetsRef.get().then(({ docs }) => {
//     budgets = docs.map(toBudget);
//   });
// }
