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

export const fakeWallets = () => {
  //? fake
  const fake_currency = findCurrency(
    "8c58ec65-4ea3-4b7e-a2ee-065b2ddf3343"
  ) as Currency;

  const fake_fake = {
    id: "111111",
    name: "fake",
    icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
    balance: 50,
    currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
    enable_notification: true,
    excluded_from_total: true,
    state: true,
    currency_object: fake_currency,
    members: [
      "6JgDy10KgXU71Y1zvBP3DDPMDbi2",
      "6JgDy10KgXU71Y1zvBP3DDPMDbi2",
      "6JgDy10KgXU71Y1zvBP3DDPMDbi2",
      "6JgDy10KgXU71Y1zvBP3DDPMDbi2",
    ],
    debts: {
      debtsByPartner: [],
      loansByPartner: [],
    },
    categories: [],
    transactions: [
      {
        id: "99480",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "Handmade",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        executed_time: "2021-05-28T16:17:38.595Z",
        transactions_list: [
          {
            id: "94961",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "well-modulated",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "2021-05-28T16:17:38.595Z",
          },
          {
            id: "68958",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "reintermediate",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "2021-05-28T16:17:38.595Z",
          },
          {
            id: "45429",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "actuating",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "2021-05-28T16:17:38.595Z",
          },
        ],
      },
      {
        id: "8248",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "program",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        executed_time: "2021-05-28T16:17:38.595Z",
        transactions_list: [
          {
            id: "93732",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "Licensed",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "65463",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "calculating",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "72143",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "implement",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
        ],
      },
      {
        id: "40411",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "turquoise",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        executed_time: "",
        transactions_list: [
          {
            id: "87077",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "Metical",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "74621",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "port",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "72352",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "network",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
        ],
      },
      {
        id: "57595",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "Progressive",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        executed_time: "",
        transactions_list: [
          {
            id: "66760",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "ubiquitous",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "12992",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "Fresh",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "91242",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "Brand",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
        ],
      },
      {
        id: "23909",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "Lead",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        executed_time: "",
        transactions_list: [
          {
            id: "83583",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "Sports",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "44778",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "definition",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "77836",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "generating",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
        ],
      },
      {
        id: "51683",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "lavender",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        executed_time: "",
        transactions_list: [
          {
            id: "51178",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "Cape",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "14045",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "Pizza",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "97584",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "content",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
        ],
      },
      {
        id: "52276",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "Forges",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        executed_time: "",
        transactions_list: [
          {
            id: "17898",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "South",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "43112",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "Response",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
          {
            id: "64586",
            amount: 10000,
            currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
            amount_by_wallet: 20000,
            category: "11249",
            note: "bluetooth",
            with: "hieu",
            event: "1",
            remind: "2021-05-28T16:17:38.595Z",
            exclude_from_report: true,
            executed_time: "",
          },
        ],
      },
    ],
    budgets: [
      {
        id: "98367",
        goal_value: 500000,
        category: "11249",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        repeatable: true,
        state: true,
        event: "1",
      },
      {
        id: "99989",
        goal_value: 500000,
        category: "11249",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        repeatable: true,
        state: true,
        event: "1",
      },
      {
        id: "39081",
        goal_value: 500000,
        category: "11249",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        repeatable: true,
        state: true,
        event: "1",
      },
      {
        id: "25726",
        goal_value: 500000,
        category: "11249",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        repeatable: true,
        state: true,
        event: "1",
      },
      {
        id: "53005",
        goal_value: 500000,
        category: "11249",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        repeatable: true,
        state: true,
        event: "1",
      },
      {
        id: "16399",
        goal_value: 500000,
        category: "11249",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        repeatable: true,
        state: true,
        event: "1",
      },
      {
        id: "14061",
        goal_value: 500000,
        category: "11249",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        repeatable: true,
        state: true,
        event: "1",
      },
      {
        id: "40035",
        goal_value: 500000,
        category: "11249",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        repeatable: true,
        state: true,
        event: "1",
      },
    ],
    ready_executed_transaction: [
      {
        id: "50814",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "Rustic",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        state: true,
      },
      {
        id: "38742",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "Factors",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        state: true,
      },
      {
        id: "18728",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "withdrawal",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        state: true,
      },
      {
        id: "66513",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "tan",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        state: true,
      },
      {
        id: "2686",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "Zealand",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        state: true,
      },
      {
        id: "93550",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "array",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        state: true,
      },
      {
        id: "86659",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "primary",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        state: true,
      },
    ],
    recurring_transactions: [
      {
        id: "94064",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "Optimization",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        frequency: 2,
        state: true,
      },
      {
        id: "12412",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "Bhutanese",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        frequency: 2,
        state: true,
      },
      {
        id: "65904",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "feed",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        frequency: 2,
        state: true,
      },
      {
        id: "99805",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "architecture",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        frequency: 2,
        state: true,
      },
      {
        id: "2913",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "Fish",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        frequency: 2,
        state: true,
      },
      {
        id: "97511",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "SAS",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        frequency: 2,
        state: true,
      },
      {
        id: "34518",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "Metrics",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        frequency: 2,
        state: true,
      },
      {
        id: "56698",
        amount: 10000,
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        amount_by_wallet: 20000,
        category: "11249",
        note: "multimedia",
        with: "hieu",
        event: "1",
        remind: "2021-05-28T16:17:38.595Z",
        exclude_from_report: true,
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        frequency: 2,
        state: true,
      },
    ],
    events: [
      {
        id: "31729",
        name: "Travel",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-anchor-64.svg?alt=media&token=3fca8ceb-2a6a-4a39-9f1d-0549f2506bdc",
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        state: true,
      },
      {
        id: "42071",
        name: "Travel",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-anchor-64.svg?alt=media&token=3fca8ceb-2a6a-4a39-9f1d-0549f2506bdc",
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        state: true,
      },
      {
        id: "79985",
        name: "Travel",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-anchor-64.svg?alt=media&token=3fca8ceb-2a6a-4a39-9f1d-0549f2506bdc",
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        state: true,
      },
      {
        id: "51988",
        name: "Travel",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-anchor-64.svg?alt=media&token=3fca8ceb-2a6a-4a39-9f1d-0549f2506bdc",
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        state: true,
      },
      {
        id: "43055",
        name: "Travel",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-anchor-64.svg?alt=media&token=3fca8ceb-2a6a-4a39-9f1d-0549f2506bdc",
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        state: true,
      },
      {
        id: "62063",
        name: "Travel",
        from: "2021-05-28T16:17:38.595Z",
        to: "2021-06-28T16:17:38.595Z",
        icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-anchor-64.svg?alt=media&token=3fca8ceb-2a6a-4a39-9f1d-0549f2506bdc",
        currency: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
        state: true,
      },
    ],
  } as Wallet;
  const data1 = { ...fake_fake };
  data1.id = "1";
  const data2 = { ...fake_fake };
  data2.id = "2";
  const data3 = { ...fake_fake };
  data3.id = "3";
  const data4 = { ...fake_fake };
  data4.id = "4";
  const data5 = { ...fake_fake };
  data5.id = "5";
  const data = [data1, data2, data3, data4, data5];
  wallets = data;
};
