import {
  IonButton,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterLink,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import {
  home as homeIcon,
  settings as settingsIcon,
  albumsOutline as budgetsIcon,
  logoDropbox as transactionModelIcon,
  logoTableau as recurringTransactionsIcon,
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

const AppTabs: React.FC = () => {
  useEffect(() => {}, []);
  const history = useHistory();

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
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="transactions" href="/my/transactions">
          <IonLabel>Transactions</IonLabel>
          <IonIcon icon={homeIcon} />
        </IonTabButton>
        <IonTabButton tab="transaction-models" href="/my/transaction-models">
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
        <IonTabButton tab="settings" href="/my/settings" target="_parent">
          <IonLabel>Settings</IonLabel>
          <IonIcon icon={settingsIcon} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
