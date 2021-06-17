import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Redirect, Route, useLocation, useRouteMatch } from "react-router";
import PayableGroup from "../Debts/PayableGroup";
import ReceivableGroup from "../Debts/ReceivableGroup";

const Debts: React.FC = () => {
  const rootPath = useRouteMatch().url;
  const location = useLocation();

  if (location.pathname === rootPath) {
    return <Redirect to={`${rootPath}/payable`} />;
  }

  return (
    <IonPage>
      <Route path={`${rootPath}/payable/:id`}>
        
      </Route>
      <Route path={`${rootPath}/receivable/:id`}></Route>
      <Route>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                className="icon-padding"
                defaultHref="/my/account"
              />
            </IonButtons>
            <IonTitle>Debts</IonTitle>
            <IonButtons slot="end">
              <IonButton size="large" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonTabs>
            <IonRouterOutlet>
              <Route path={`${rootPath}/payable`}>
                <PayableGroup />
              </Route>
              <Route path={`${rootPath}/receivable`}>
                <ReceivableGroup />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="top">
              <IonTabButton tab="payable" href={`${rootPath}/payable`}>
                <IonLabel>Payable</IonLabel>
              </IonTabButton>
              <IonTabButton tab="receivable" href={`${rootPath}/receivable`}>
                <IonLabel>ReceiVable</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonContent>
      </Route>
    </IonPage>
  );
};

export default Debts;