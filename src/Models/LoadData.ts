import { clearCategories, initCategories } from "./Categories";
import { clearCurrencies, initCurrencies } from "./Currencies";
import { clearWallets, initWallets } from "./Wallets";

export function loadData(user_id: string) {
  return Promise.all([
    initCurrencies(),
    initCategories(),
    initWallets("user_id"),
  ]);
}

export function clearData() {
  clearCurrencies();
  clearCategories();
  clearWallets();
}
