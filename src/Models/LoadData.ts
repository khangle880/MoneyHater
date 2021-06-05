import { clearCategories, initCategories } from "./Categories";
import {
  clearCurrencies,
  currencies,
  Currency,
  initCurrencies,
} from "./Currencies";
import { initTimeRange } from "./LocalModels/TimeRange";
import { clearRecentPartners, initRecentPartners } from "./Recent_Partners";
import { clearWallets, initWallets, Wallet, wallets } from "./Wallets";

export var currentWallet: Wallet;
export var walletCurrency: Currency;

export function loadData(user_id: string) {
  return Promise.all([
    initCurrencies(),
    initCategories(),
    initTimeRange(),
    initRecentPartners(user_id),
    initWallets(user_id),
  ]).then(() => {
    currentWallet = wallets[0];
    walletCurrency = currencies.find(
      (currency) => currency.id === currentWallet.currency
    ) as Currency;
  });
}

export function clearData() {
  clearCurrencies();
  clearCategories();
  clearWallets();
  clearRecentPartners();
  currentWallet = {} as Wallet;
}
