export interface Category {
  id: string;
  name: string;
  icon: string;
  type: string;
  children?: Category[];
}

export interface CurrencyUnit {
  key: string;
  name: string;
  country: string;
  icon: string;
  symbol: string;
  iso: string;
  rate_us: number;
  times_used: number;
}

export function toCategory(
  doc: firebase.default.firestore.QueryDocumentSnapshot
): Category {
  const category: any = {
    id: doc.id,
    ...doc.data(),
  };
  return category as Category;
}

export function toCurrencyUnit(doc: any): CurrencyUnit {
  const currencyUnit: any = {
    key: doc.key,
    ...doc.val(),
  };
  return currencyUnit as CurrencyUnit;
}
