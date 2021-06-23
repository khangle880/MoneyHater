import { IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding } from "@ionic/react";
import { create, remove } from "ionicons/icons";
import React, { useState } from "react";
import {
  categories,
  currencies,
  currentWallet,
  findCategory,
  Transaction,
} from "../../../Necessary/components";
import { questionIcon } from "../../../Necessary/icons";

const TransactionItem: React.FC<{ data: Transaction }> = ({ data }) => {
  const [category] = useState(
    categories.find((category) => category.id === data.category)
  );
  const [currency] = useState(
    currencies.find((child) => child.id === data.currency)
  );

  const category_object = findCategory(data.category);
  return (
    <IonItemSliding>
      <IonItem>
        <IonImg src={category?.icon || questionIcon} />
        <div className="transaction-note-detail">
          <p className="transaction-category-name">{category?.name}</p>
          <p className="transaction-note">
            {category?.name === "Loan" || category?.name === "Debt"
              ? `${data.note} to ${data.with}`
              : data.note}
          </p>
        </div>
        <div className="transaction-value-detail" slot="end">
          <p
            className={`transaction-value ${
              !category_object
                ? "expend-color"
                : category_object.type === "Expense"
                ? "expend-color"
                : category_object.type === "Income"
                ? "income-color"
                : ""
            }expend-color`}
          >
            {data.amount}
            {currency?.symbol}
          </p>
          <p className="transaction-more-value">
            {data.amount_by_wallet}
            {currentWallet.currency_object.symbol}
          </p>
        </div>
      </IonItem>
      <IonItemOptions className="slide-option" side="end">
        <IonItemOption color="danger">
          <IonIcon slot="icon-only" icon={create} />
        </IonItemOption>
        <IonItemOption>
          <IonIcon slot="icon-only" icon={remove} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default TransactionItem;
