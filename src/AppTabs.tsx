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
  personCircleOutline as personIcon,
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
import { currentWallet } from "./Models/LoadData";
import ShareWallet from "./pages/ManageWallets/ShareWallet";
import TransferMoney from "./pages/ManageWallets/TransferMoney";
import Account from "./pages/Home/Account";
import Debts from "./pages/Home/Debts";

const AppTabs: React.FC = () => {
  useEffect(() => {}, []);
  const { loggedIn } = useAuth();
  const loadedData = useLoadedData();

  if (!loggedIn) return <Redirect to="/login" />;
  if (!loadedData) return <IonLoading isOpen />;
  if (!currentWallet.state) <Redirect to="/my/manage-wallets/add" />;

  return (
    <IonRouterOutlet>
      <Switch>
        <Route exact path="/my/manage-wallets/:id/share">
          <ShareWallet />
        </Route>
        <Route path="/my/manage-wallets/:id/transfer-money">
          <TransferMoney />
        </Route>
        <Route path="/my/manage-wallets">
          <ManageWallets initNeedRender={false} />
        </Route>
        <Route path="/my/account/debts">
          <Debts />
        </Route>
        <Route>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/my/account">
                <Account />
              </Route>
              <Route path="/my/settings">
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
              <IonTabButton tab="account" href="/my/account">
                <IonLabel>Account</IonLabel>
                <IonIcon icon={personIcon} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Route>
      </Switch>
    </IonRouterOutlet>
  );
};

export default AppTabs;
