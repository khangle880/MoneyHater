import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./TransactionModels.scss";

import { add as addIcon, heart, sendOutline, trash } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { ReadyExecutedTransaction } from "../../../../Models/Ready_Executed_Transactions";
import {
  currentWallet,
  findCategory,
  findCurrency,
} from "../../../../Necessary/components";

const TransactionModels: React.FC = () => {
  const [needRender, setNeedRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setNeedRender(!needRender);
    }, 2000);
  }, [needRender]);

  const transactionModelToView = (model: ReadyExecutedTransaction) => {
    const currency_object = findCurrency(model.currency);
    const category_object = findCategory(model.category);

    if (category_object && currency_object)
      return (
        <IonItemSliding id={model.id} key={model.id}>
          <IonItem lines="none">
            <IonImg src={category_object.icon} />
            <div className="top-details">
              <p className="detail-category-name">{category_object.name}</p>
              <p
                className={`detail-currency ${
                  category_object.type === "Expense"
                    ? "expend-color"
                    : category_object.type === "Income"
                    ? "income-color"
                    : ""
                }expend-color`}
              >
                {model.amount} {currency_object.symbol}
              </p>
            </div>
          </IonItem>

          <IonItemOptions className="slide-option" side="start">
            <IonItemOption>
              <IonIcon slot="icon-only" icon={heart} />
            </IonItemOption>
          </IonItemOptions>

          <IonItemOptions className="slide-option" side="end">
            <IonItemOption color="danger">
              <IonIcon slot="icon-only" icon={trash} />
            </IonItemOption>
            <IonItemOption>
              <IonIcon slot="icon-only" icon={sendOutline} />
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      );
    else return <IonLabel>Element Not Exist</IonLabel>;
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/planning" />
          </IonButtons>
          <IonTitle>Transaction Models</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding models-content">
        {currentWallet.ready_executed_transaction ? (
          currentWallet.ready_executed_transaction.map(transactionModelToView)
        ) : (
          <IonLabel
            style={{ fontSize: "1.5rem", color: "blue" }}
            className="centered"
          >
            No Exist
          </IonLabel>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/my/transaction-models/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default TransactionModels;
