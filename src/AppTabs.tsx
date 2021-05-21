import {
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route, Switch } from "react-router-dom";
import { home as homeIcon, settings as settingsIcon } from "ionicons/icons";
import Transactions from "./pages/Home/Transactions";
import React, { useEffect } from "react";
import AddTransaction from "./pages/AddTransaction/AddTransaction";
import SettingsPage from "./pages/SettingsPage";
import { useAuth, useLoadedData } from "./auth";

const AppTabs: React.FC = () => {
  useEffect(() => {}, []);

  const { loggedIn } = useAuth();
  const loadedData = useLoadedData();

  if (!loggedIn) return <Redirect to="/login" />;
  if (!loadedData) return <IonLoading isOpen />;

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route exact path="/my/settings">
            <SettingsPage />
          </Route>
          <Route exact path="/my/transactions">
            <Transactions />
          </Route>
          <Route path="/my/transactions/add">
            <AddTransaction />
          </Route>
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/transactions">
          <IonLabel>Home</IonLabel>
          <IonIcon icon={homeIcon} />
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonLabel>Settings</IonLabel>
          <IonIcon icon={settingsIcon} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
