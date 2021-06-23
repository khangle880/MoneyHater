import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
//? ICON
import { add, remove } from "ionicons/icons";
import React from "react";
import { currentWallet } from "../../../Necessary/components";
import { walletIcon } from "../../../Necessary/icons";
import TransactionsItem from "./TransactionItem";

import "./Transactions.scss";

const Transactions: React.FC = () => {
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/my/manage-wallets">
              <IonIcon icon={walletIcon} />
            </IonButton>
          </IonButtons>
          <IonTitle>Transactions</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent className="transaction-content ion-padding">
        {/* <IonCard className="home-card">
          //? CARD INFO  
          <div className="top-recent">
            <div className="top-header">
              <p className="header-text">Recent Transactions</p>
              <p>Expand</p>
            </div>
            <div className="top-icon"></div>
          </div>

          //? 3 FILTER BUTTONS 
          <div className="top-button">
            <IonButton>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>All</p>
            </IonButton>
            <IonButton>
              <IonIcon icon={remove} slot="start" style={{ color: "red" }} />
              <p>Expend</p>
            </IonButton>
            <IonButton>
              <IonIcon icon={add} slot="start" style={{ color: "green" }} />
              <p>Income</p>
            </IonButton>
          </div>
          <IonList>
            {currentWallet.transactions.map((child) => (
              <TransactionsItem key={child.id} data={child} />
            ))}
          </IonList>
        </IonCard> */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/my/transactions/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Transactions;
