import { firestore } from "../firebase";

export interface Budget {
  id: string;
  goal_value: number;
  consume: number;
  category: string;
  from: string;
  to: string;
  repeatable: boolean;
  state: boolean;
}

export function toBudget(doc: any): Budget {
  const budget: any = {
    id: doc.id,
    ...doc.data(),
  };
  return budget as Budget;
}

export var budgets: Budget[] = [];

export function initBudgets(user_id: string, wallet_id: string) {
  const debtsRef = firestore
    .collection("users")
    .doc(user_id)
    .collection("wallets")
    .doc(wallet_id)
    .collection("budgets");

  return debtsRef.onSnapshot(({ docs }) => {
    budgets = docs.map(toBudget);
  });
}
