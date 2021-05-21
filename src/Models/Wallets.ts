import { firestore } from "../firebase";
import { Category } from "./Categories";

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  enable_notification: boolean;
  excluded_from_total: boolean;
  state: boolean;
  members: string[];
  debts: any[];
  custom_categories: Category[];
  transactions: any[];
  budgets: any[];
  ready_executed_transaction: any[];
  recurring_transactions: any[];
  events: any[];
}

export function toWallet(
  doc: firebase.default.firestore.QueryDocumentSnapshot
): Wallet {
  const wallet: any = {
    id: doc.id,
    ...doc.data(),
  };
  return wallet as Wallet;
}

export var wallets: Wallet[] = [];

export function initWallets() {
  var data: Wallet[] = [];
  // const categoriesRef = firestore.collection("categories");

  // return categoriesRef.get().then(({ docs }) => {
  //   var promise = Promise.all(
  //     docs.map((doc) => {
  //       var newCategory = toCategory(doc);
  //       const childrenRef = doc.ref.collection("children");

  //       return childrenRef
  //         .get()
  //         .then(({ docs: subDocs }) => {
  //           let subCatagories: any[] = [];

  //           subDocs.forEach((child: any) => {
  //             subCatagories.push(toCategory(child));
  //           });

  //           newCategory = { ...newCategory, children: subCatagories };
  //         })
  //         .then(() => {
  //           data.push(newCategory);
  //         });
  //     })
  //   );
  //   return promise.then(() => {
  //     categories = data;
  //   });
  // });
}
