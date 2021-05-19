import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React from "react";
import { Redirect } from "react-router";
import { useAuth } from "../../auth";
// import "./Transactions.css";

const Transactions: React.FC = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) return <Redirect to="/my/transactions" />;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/transactions/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Transactions;
