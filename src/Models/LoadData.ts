import { clearCategories, initCategories } from "./Categories";
import {
  clearCurrencies,
  Currency,
  findCurrency,
  initCurrencies,
} from "./Currencies";
import { clearIcons, initIcons } from "./Icons";
import { initTimeRange } from "./LocalModels/TimeRange";
import { clearRecentPartners, initRecentPartners } from "./Recent_Partners";
import { clearWallets, initWallets, Wallet, wallets } from "./Wallets";

export var currentWallet: Wallet;
export var walletCurrency: Currency;

export function loadData(user_id: string) {
  return Promise.all([initCurrencies(), initCategories()])
    .then(() =>
      Promise.all([
        initTimeRange(),
        initIcons(),
        initRecentPartners(user_id),
        initWallets(user_id),
      ])
    )
    .then(() => {
      console.log(wallets);
      currentWallet = wallets[0];
      walletCurrency = findCurrency(currentWallet.currency);
    });
}

export function setCurrentWallet(data: Wallet) {
  currentWallet = data;
  walletCurrency = findCurrency(currentWallet.currency);
}

export function clearData() {
  clearCurrencies();
  clearCategories();
  clearWallets();
  clearIcons();
  clearRecentPartners();
  currentWallet = {} as Wallet;
}
