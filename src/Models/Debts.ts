import { firestore } from "../firebase";

export interface Debt {
  id: string;
  with: string;
  type: string;
  debt_list: string[];
  refund_list: string[];
}

export function toDebt(doc: any): Debt {
  const debt: any = {
    id: doc.id,
    ...doc.data(),
  };
  return debt as Debt;
}

export var debts: Debt[] = [];

export function clearDebts() {
  debts = [];
}

export function initDebts(user_id: string, wallet_id: string) {
  const debtsRef = firestore
    .collection("users")
    .doc(user_id)
    .collection("wallets")
    .doc(wallet_id)
    .collection("debts");

  return debtsRef.get().then(({ docs }) => {
    debts = docs.map(toDebt);
  });
}
