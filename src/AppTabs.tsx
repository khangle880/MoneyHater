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
} from "ionicons/icons";
import React, { useEffect } from "react";
import {
  AddBudget,
  AddEvent,
  AddRecurringTransaction,
  AddTransaction,
  AddTransactionModel,
  Budgets,
  currentWallet,
  Events,
  ManageWallets,
  Planning,
  RecurringTransactions,
  SettingsPage,
  ShareWallet,
  Test,
  TransactionModels,
  Transactions,
  TransferMoney,
  useAuth,
  useLoadedData,
} from "./Necessary/components";
import Account from "./pages/Home/Account";

const AppTabs: React.FC = () => {
  useEffect(() => {}, []);
  const { loggedIn } = useAuth();
  const loadedData = useLoadedData();

  if (!loggedIn) return <Redirect to="/login" />;
  if (!loadedData) return <IonLoading isOpen />;
  if (!currentWallet.state) <Redirect to="/my/manage-wallets/add" />;

  return (
    <IonRouterOutlet>
      {/* <Switch> */}
      <Route exact path="/my/manage-wallets/:id/share">
        <ShareWallet />
      </Route>
      <Route path="/my/manage-wallets/:id/transfer-money">
        <TransferMoney />
      </Route>
      <Route path="/my/manage-wallets">
        <ManageWallets initNeedRender={false} />
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
      <Route>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/my/account">
              <Account />
            </Route>
            <Route path="/my/settings">
              <SettingsPage />
            </Route>
            <Route path="/my/test">
              <Test />
            </Route>
            <Route path="/my/planning">
              <Planning />
            </Route>
            <Route exact path="/my/transactions">
              <Transactions />
            </Route>
            <Route path="/my/transactions/add">
              <AddTransaction />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="transactions" href="/my/transactions">
              <IonLabel>Transactions</IonLabel>
              <IonIcon icon={homeIcon} />
            </IonTabButton>
            <IonTabButton tab="planning" href="/my/planning">
              <IonLabel>Planning</IonLabel>
              <IonIcon icon={budgetsIcon} />
            </IonTabButton>
            <IonTabButton tab="account" href="/my/account">
              <IonLabel>Account</IonLabel>
              <IonIcon icon={personIcon} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </Route>
      {/* </Switch> */}
    </IonRouterOutlet>
  );
};

export default AppTabs;
