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

export const fakeCurrencies = () => {
  const data = [
    {
      id: "8c58ec65-4ea3-4b7e-a2ee-065b2ddf3343",
      name: "Zambian kwacha",
      country: "Zambia",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/23px-Flag_of_Zambia.svg.png",
      symbol: "ZK",
      iso: "ZMW",
      rate_us: 2000.0,
      times_used: 0,
    },
    {
      id: "00d18157-8cdc-49f5-bae8-7aa239159cc1",
      name: "Israeli new shekel",
      country: "Palestine",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/23px-Flag_of_Palestine.svg.png",
      symbol: "$",
      iso: "ILS",
      rate_us: 2000.0,
      times_used: 0,
    },
  ];
  currencies = data;
};
