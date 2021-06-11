import { database } from "../firebase";

export interface Currency {
  id: string;
  name: string;
  country: string;
  icon: string;
  symbol: string;
  iso: string;
  rate_us: number;
  times_used: number;
}

export function toCurrency(doc: any): Currency {
  const currency: any = {
    id: doc.key,
    ...doc.val(),
  };
  return currency as Currency;
}

export function findCurrency(id: string): Currency {
  return currencies.find((currency) => currency.id === id) as Currency;
}

export var currencies: Currency[] = [];

export function clearCurrencies() {
  currencies = [];
}

export function initCurrencies() {
  return database.ref("currency").once("value", (snapshot) => {
    var data: any[] = [];
    snapshot.forEach((child) => {
      data.push(toCurrency(child));
    });
    currencies = data;
  });
}
