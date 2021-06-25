import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./RecurringTransactions.scss";

import dayjs from "dayjs";
import { add as addIcon } from "ionicons/icons";
import React from "react";
import { RecurringTransaction } from "../../../../Models/Recurring_Transactions";
import {
  currentWallet,
  findCategory,
  findCurrency,
} from "../../../../Necessary/components";

const RecurringTransactions: React.FC = () => {
  const recurringToView = (recurringTransaction: RecurringTransaction) => {
    const currency_object = findCurrency(recurringTransaction.currency);
    const category_object = findCategory(recurringTransaction.category);

    const frequency = recurringTransaction.frequency;
    const diff = dayjs().diff(dayjs(recurringTransaction.from)) / frequency;

    const remainder = diff % frequency;
    const nextExecute =
      remainder === 0
        ? dayjs().add(frequency, "d")
        : dayjs().add(frequency - remainder, "d");

    if (category_object && currency_object)
      return (
        <IonCard
          className="recurring-transactions-card"
          key={recurringTransaction.id}
        >
          <div className="detail-container">
            <div>
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
                  {recurringTransaction.amount} {currency_object.symbol}
                </p>
              </div>
            </div>
            <div className="bottom-details">
              <p>Next occurrence</p>
              <p>{nextExecute.format("dddd DD/MM/YY")}</p>
            </div>
          </div>
        </IonCard>
      );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/planning" />
          </IonButtons>
          <IonTitle>Recurring Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding recurring-transactions-content">
        {currentWallet.recurring_transactions ? (
          currentWallet.recurring_transactions.map(recurringToView)
        ) : (
          <IonLabel
            style={{ fontSize: "1.5rem", color: "blue" }}
            className="centered"
          >
            No Exist
          </IonLabel>
        )}

        {/* <IonCard className="recurring-transactions-card">
          <div className="detail-container">
            <div>
              <IonImg
                src={
                  "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15"
                }
              />
              <div className="top-details">
                <p className="detail-category-name">Restaurants</p>
                <p className={`detail-currency expend-color`}>10000 $</p>
              </div>
            </div>
            <div className="bottom-details">
              <p>Next occurrence</p>
              <p>{dayjs("2019-01-25").format("dddd DD/MM/YY")}</p>
            </div>
          </div>
        </IonCard> */}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/my/recurring-transactions/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default RecurringTransactions;
