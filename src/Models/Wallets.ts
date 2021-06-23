import { Budget, toBudget } from "./Budgets";
import { categories, Category, toCategory } from "./Categories";
import { Debts, initDebts } from "./Debts";
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
import { Currency, findCurrency } from "./Currencies";

export interface Wallet {
  id: string;
  name: string;
  icon: string;
  balance: number;
  currency: string;
  enable_notification: boolean;
  excluded_from_total: boolean;
  state: boolean;
  currency_object: Currency;
  members: string[];
  recent_partner: Partner[];
  debts: Debts;
  categories: Category[];
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
    .collection("wallets")
    .orderBy("state", "desc");

  return walletsRef.get().then(({ docs }) => {
    var promise = Promise.all(
      docs.map((doc) => {
        var newWallet = toWallet(doc);
        newWallet.categories = categories;
        newWallet.currency_object = findCurrency(newWallet.currency);

        var promiseList = [];

        const customCategoriesRef = doc.ref.collection("custom_categories");
        promiseList.push(
          customCategoriesRef.get().then(({ docs: subDocs }) => {
            subDocs.forEach((doc) => {
              const custom_category = toCategory(doc);
              newWallet.categories
                .find((category) => category.id === custom_category.parent)
                ?.children?.push(custom_category);
            });
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

        return Promise.all(promiseList)
          .then(() => {
            // Add sub list to transaction
            return Promise.all(
              newWallet.transactions.map((transaction) => {
                return transactionsRef
                  .doc(transaction.id)
                  .collection("transactions")
                  .get()
                  .then(({ docs }) => {
                    transaction.transactions_list = docs.map(toTransaction);
                  });
              })
            );
          })
          .then(() => {
            initDebts(newWallet);
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
