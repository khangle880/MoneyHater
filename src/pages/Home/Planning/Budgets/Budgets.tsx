import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOptions,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

import "./Budgets.scss";

//? component
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { currentWallet, formatMoney } from "../../../../Necessary/components";
import { Budget } from "../../../../Models/Budgets";
import dayjs from "dayjs";
import { add as addIcon } from "ionicons/icons";

const Budgets: React.FC = () => {
    const budgetToView = (budget: Budget) => {
    const list = currentWallet.transactions.filter(
      (child) =>
        child.executed_time >= budget.from &&
        child.executed_time <= budget.to &&
        child.category === budget.category &&
        child.event === budget.event
    );

    var consume = 0;
    list.forEach((child) => {
      consume += child.amount_by_wallet;
    });

    return (
      <IonCard key={budget.id}>
        <div className="budget-card">
          <div className="budget-detail-container">
            <div className="budget-detail money-number">
              <p>
                {currentWallet.currency_object.symbol}{" "}
                {formatMoney(budget.goal_value - consume)}
              </p>
              <p>
                {currentWallet.currency_object.symbol}{" "}
                {formatMoney(budget.goal_value)}
              </p>
            </div>

            <div className="budget-detail">
              <p style={{ fontWeight: 300, fontSize: "0.8rem" }}>
                Remaining budget
              </p>
              <p style={{ fontWeight: 300, fontSize: "0.8rem" }}>
                / {dayjs(budget.to).diff(dayjs(), "d")} Days
              </p>
            </div>

            <ProgressBar now={(consume / budget.goal_value) * 100} />

            <ProgressBar
              now={
                (dayjs().diff(dayjs(budget.from)) /
                  dayjs(budget.to).diff(dayjs(budget.from))) *
                100
              }
            />

            <div className="budget-detail">
              <p style={{ fontWeight: 700, color: "black" }}>
                {dayjs().diff(dayjs(budget.from), "d")}
              </p>
              <p style={{ fontWeight: 700, color: "black" }}>
                / {dayjs(budget.to).diff(dayjs(budget.from), "d")}
              </p>
            </div>
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
          <IonTitle>Budgets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding budgets-content">
        {currentWallet.budgets ? (
          currentWallet.budgets.map(budgetToView)
        ) : (
          <IonLabel
            style={{ fontSize: "1.5rem", color: "blue" }}
            className="centered"
          >
            No Exist Budgets
          </IonLabel>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/my/budgets/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Budgets;
