import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Planning.scss";
//? ICON

import React from "react";
import {
  budgetIcon,
  eventIcon,
  modelIcon,
  recurringIcon,
  walletIcon,
} from "../../../Necessary/icons";

const Planning: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/my/planning">
              <IonIcon icon={walletIcon} />
            </IonButton>
          </IonButtons>
          <IonTitle>Planning</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding planning-content">
        <IonCard routerLink="/my/budgets">
          <div>
            <div>
              <IonIcon icon={budgetIcon} />
              <p>Budgets</p>
            </div>
            <p>A financial plan to balance your income and expense</p>
          </div>
        </IonCard>
        <IonCard routerLink="/my/transaction-models">
          <div>
            <div>
              <IonIcon icon={modelIcon} />
              <p>Transaction Models</p>
            </div>
            <p>Create transaction models that will be quickly executed</p>
          </div>
        </IonCard>
        <IonCard routerLink="/my/recurring-transactions">
          <div>
            <div>
              <IonIcon icon={recurringIcon} />
              <p>Recurring Transactions</p>
            </div>
            <p>
              Create recurring transactions that will be automatically added in
              future
            </p>
          </div>
        </IonCard>
        <IonCard routerLink="/my/events">
          <div>
            <div>
              <IonIcon icon={eventIcon} />
              <p>Events</p>
            </div>
            <p>
              Monitor your repetitive bills such as electricity, rent, Internet
              subscription, etc
            </p>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Planning;
