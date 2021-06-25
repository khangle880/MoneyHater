import {
  IonIcon,
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
} from "@ionic/react";
import { create, trashOutline } from "ionicons/icons";
import React, { useState } from "react";
import {
  categories,
  currencies,
  currentWallet,
  deleteTransaction,
  findCategory,
  Transaction,
  useAuth,
} from "../../../Necessary/components";
import { questionIcon } from "../../../Necessary/icons";

interface prop {
  data: Transaction;
  updateTransactions: (data: Transaction[]) => void;
}

const TransactionItem: React.FC<prop> = ({ data, updateTransactions }) => {
  const [category] = useState(findCategory(data.category));
  const [currency] = useState(
    currencies.find((child) => child.id === data.currency)
  );

  const { userId } = useAuth();
  const category_object = findCategory(data.category);

  const handleDelete = () => {
    deleteTransaction(userId!, currentWallet, data);
    updateTransactions(currentWallet.transactions);
  };

  return (
    <IonItemSliding>
      <IonItem
        routerLink={`/my/transactions/view/${data.id}`}
        lines="none"
        detail={false}
      >
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
                : category_object.type === "Expense" ||
                  category_object.name === "Loan"
                ? "expend-color"
                : category_object.type === "Income" ||
                  category_object.name === "Debt"
                ? "income-color"
                : "expend-color"
            }`}
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
        <IonItemOption
          className="item-option-create"
          routerLink={`/my/transactions/edit/${data.id}`}
        >
          <IonIcon slot="icon-only" icon={create} />
        </IonItemOption>
        <IonItemOption className="item-option-delete" onClick={handleDelete}>
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default TransactionItem;
