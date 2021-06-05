import { Budget, toBudget } from "./Budgets";
import { Category, toCategory } from "./Categories";
import { Debt, toDebt } from "./Debts";
import {
  ReadyExecutedTransaction,
  toReadyExecutedTransaction,
} from "./Ready_Executed_Transactions";
import {
  RecurringTransaction,
  toRecurringTransaction,
} from "./Recurring_Transactions";
import { toTransaction, Transaction } from "./Transactions";
import { firestore } from "../firebase";
import { Partner } from "./Recent_Partners";
import { toWalletEvent, WalletEvent } from "./Events";

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  enable_notification: boolean;
  excluded_from_total: boolean;
  state: boolean;
  members: string[];
  recent_partner: Partner[];
  debts: Debt[];
  custom_categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
  ready_executed_transaction: ReadyExecutedTransaction[];
  recurring_transactions: RecurringTransaction[];
  events: WalletEvent[];
}

export function toWallet(doc: any): Wallet {
  const wallet: any = {
    id: doc.id,
    ...doc.data(),
  };
  return wallet as Wallet;
}

export var wallets: Wallet[] = [];

export function clearWallets() {
  wallets = [];
}

export function initWallets(user_id: string) {
  var data: Wallet[] = [];

  const walletsRef = firestore
    .collection("users")
    .doc(user_id)
    .collection("wallets");

  return walletsRef.get().then(({ docs }) => {
    var promise = Promise.all(
      docs.map((doc) => {
        var newWallet = toWallet(doc);

        var promiseList = [];

        const debtsRef = doc.ref.collection("debts");
        promiseList.push(
          debtsRef.get().then(({ docs: subDocs }) => {
            newWallet.debts = subDocs.map(toDebt);
          })
        );

        const customCategoriesRef = doc.ref.collection("custom_categories");
        promiseList.push(
          customCategoriesRef.get().then(({ docs: subDocs }) => {
            newWallet.custom_categories = subDocs.map(toCategory);
          })
        );

        const transactionsRef = doc.ref.collection("transactions");
        promiseList.push(
          transactionsRef.get().then(({ docs: subDocs }) => {
            newWallet.transactions = subDocs.map(toTransaction);
          })
        );

        const budgetsRef = doc.ref.collection("budgets");
        promiseList.push(
          budgetsRef.get().then(({ docs: subDocs }) => {
            newWallet.budgets = subDocs.map(toBudget);
          })
        );

        const readyExecutedTransactionsRef = doc.ref.collection(
          "ready_executed_transactions"
        );
        promiseList.push(
          readyExecutedTransactionsRef.get().then(({ docs: subDocs }) => {
            newWallet.ready_executed_transaction = subDocs.map(
              toReadyExecutedTransaction
            );
          })
        );

        const recurringTransactionsRef = doc.ref.collection(
          "recurring_transactions"
        );
        promiseList.push(
          recurringTransactionsRef.get().then(({ docs: subDocs }) => {
            newWallet.recurring_transactions = subDocs.map(
              toRecurringTransaction
            );
          })
        );

        const eventsRef = doc.ref.collection("events");
        promiseList.push(
          eventsRef.get().then(({ docs: subDocs }) => {
            newWallet.events = subDocs.map(toWalletEvent);
          })
        );

        return Promise.all(promiseList).then(() => {
          data.push(newWallet);
        });
      })
    );

    return promise.then(() => {
      wallets = data;
      return wallets;
    });
  });
}
