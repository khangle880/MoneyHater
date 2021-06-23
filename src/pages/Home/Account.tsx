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
import { wallet as debtsIcon } from "ionicons/icons";
import React from "react";
import { Route } from "react-router";
import Debts from "./Debts";

const Account: React.FC = () => {
  return (
    <IonPage>
      <Route path="/my/account/debts">
        <Debts />
      </Route>
      <Route>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonFab vertical="bottom" horizontal="end">
            <IonFabButton routerLink="/my/account/debts">
              <IonIcon icon={debtsIcon} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </Route>
    </IonPage>
  );
};

export default Account;
