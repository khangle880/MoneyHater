import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonModal,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Redirect, Route, useLocation, useRouteMatch } from "react-router";
import PayableGroup from "../../components/Debts/PayableGroup";
import ReceivableGroup from "../../components/Debts/ReceivableGroup";

import "./Debts.scss";

const Debts: React.FC = () => {
  const rootPath = useRouteMatch().url;
  const location = useLocation();

  if (location.pathname === rootPath) {
    return <Redirect to={`${rootPath}/payable`} />;
  }

  return (
    <IonModal isOpen>
      <IonRouterOutlet>
        <Route path={`${rootPath}/payable/:id`}></Route>
        <Route path={`${rootPath}/receivable/:id`}></Route>
        <Route>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton
                  className="icon-padding"
                  defaultHref="/my/my-profile"
                />
              </IonButtons>
              <IonTitle>Debts</IonTitle>
              <IonButtons slot="end">
                <IonButton size="large" />
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="debt-content ion-padding">
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path={`${rootPath}/payable`}>
                  <PayableGroup />
                </Route>
                <Route exact path={`${rootPath}/receivable`}>
                  <ReceivableGroup />
                </Route>
              </IonRouterOutlet>
              <IonTabBar className="debt-tab-bar" slot="top">
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
      </IonRouterOutlet>
    </IonModal>
  );
};

export default Debts;
