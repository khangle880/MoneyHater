
import _ from "underscore";
import { categories } from "./Categories";
import { Transaction } from "./Transactions";
import { Wallet } from "./Wallets";

export interface Debts {
  debtsByPartner: Debt[];
  loansByPartner: Debt[];
}

export interface Debt {
  with: string;
  transactions: Transaction[];
}

export function initDebts(wallet: Wallet) {
  const grouped1 = _.chain(
    wallet.transactions.filter((child) => {
      const category = categories.find(
        (category) => category.id === child.category
      );
      return category?.type === "Debt & Loan" && category.name === "Debt";
    })
  )
    .groupBy("with")
    .map(function (value, key) {
      return {
        with: key,
        transactions: value,
      };
    })
    .value();

  const grouped2 = _.chain(
    wallet.transactions.filter((child) => {
      const category = categories.find(
        (category) => category.id === child.category
      );
      return category?.type === "Debt & Loan" && category.name === "Loan";
    })
  )
    .groupBy("with")
    .map(function (value, key) {
      return {
        with: key,
        transactions: value,
      };
    })
    .value();

  wallet.debts = { debtsByPartner: grouped1, loansByPartner: grouped2 };
}
