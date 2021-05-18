import { database } from "../firebase";
import { CurrencyUnit, toCurrencyUnit } from "../models";

export var currencyList: CurrencyUnit[] = [];

export function initCurrencyList() {
  var data: any[] = [];
  return database
    .ref("currency")
    .once("value", (snapshot) => {
      console.log(snapshot);
      snapshot.forEach((child) => {
        data.push(toCurrencyUnit(child));
      });
    })
    .then(() => {
      currencyList = data;
    });
}
