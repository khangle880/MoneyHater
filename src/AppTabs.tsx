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
import {
  home as homeIcon,
  settings as settingsIcon,
  albumsOutline as budgetsIcon,
  logoDropbox as transactionModelIcon,
  logoTableau as recurringTransactionsIcon,
  calendarClear as eventsIcon,
} from "ionicons/icons";
import Transactions from "./pages/Home/Transactions";
import React, { useEffect } from "react";
import AddTransaction from "./pages/AddTransaction/AddTransaction";
import SettingsPage from "./pages/SettingsPage";
import { useAuth, useLoadedData } from "./auth";
import Budgets from "./pages/Home/Budgets";
import AddBudget from "./pages/AddBudget/AddBudget";
import TransactionModels from "./pages/Home/TransactionModels";
import AddTransactionModel from "./pages/AddTransactionModel/AddTransactionModel";
import RecurringTransactions from "./pages/Home/RecurringTransactions";
import AddRecurringTransaction from "./pages/AddRecurringTransactions/AddRecurringTransaction";
import Events from "./pages/Home/Events";
import AddEvent from "./pages/AddEvent/AddEvent";
import ManageWallets from "./pages/ManageWallets/ManageWallets";
import { Test } from "./test";

const AppTabs: React.FC = () => {
  useEffect(() => {}, []);
  const { loggedIn } = useAuth();
  const loadedData = useLoadedData();

  if (!loggedIn) return <Redirect to="/login" />;
  if (!loadedData) return <IonLoading isOpen />;

  return (
    <IonRouterOutlet>
      <Route path="/my/manage-wallets">
        <ManageWallets />
      </Route>
      <Route>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/my/test">
                <Test />
              </Route>
              <Route exact path="/my/settings">
                <SettingsPage />
              </Route>
              <Route exact path="/my/transactions">
                <Transactions />
              </Route>
              <Route path="/my/transactions/add">
                <AddTransaction />
              </Route>
              <Route exact path="/my/budgets">
                <Budgets />
              </Route>
              <Route path="/my/budgets/add">
                <AddBudget />
              </Route>
              <Route exact path="/my/transaction-models">
                <TransactionModels />
              </Route>
              <Route path="/my/transaction-models/add">
                <AddTransactionModel />
              </Route>
              <Route exact path="/my/recurring-transactions">
                <RecurringTransactions />
              </Route>
              <Route path="/my/recurring-transactions/add">
                <AddRecurringTransaction />
              </Route>
              <Route exact path="/my/events">
                <Events />
              </Route>
              <Route path="/my/events/add">
                <AddEvent />
              </Route>
            </Switch>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="transactions" href="/my/transactions">
              <IonLabel>Transactions</IonLabel>
              <IonIcon icon={homeIcon} />
            </IonTabButton>
            <IonTabButton
              tab="transaction-models"
              href="/my/transaction-models"
            >
              <IonLabel>Models</IonLabel>
              <IonIcon icon={transactionModelIcon} />
            </IonTabButton>
            <IonTabButton
              tab="recurring-transactions"
              href="/my/recurring-transactions"
            >
              <IonLabel>Recurring</IonLabel>
              <IonIcon icon={recurringTransactionsIcon} />
            </IonTabButton>
            <IonTabButton tab="budgets" href="/my/budgets">
              <IonLabel>Budgets</IonLabel>
              <IonIcon icon={budgetsIcon} />
            </IonTabButton>
            <IonTabButton tab="events" href="/my/events">
              <IonLabel>Events</IonLabel>
              <IonIcon icon={eventsIcon} />
            </IonTabButton>
            <IonTabButton tab="settings" href="/my/test">
              <IonLabel>Settings</IonLabel>
              <IonIcon icon={settingsIcon} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </Route>
    </IonRouterOutlet>
  );
};

export default AppTabs;
