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
import "./SelectCategory.scss"

import React, { useEffect, useState } from "react";
import { Redirect, Route, useLocation, useRouteMatch } from "react-router";
import { Category } from "../../Models/Categories";
import AddCustomCategory from "../AddCustomCategory/AddCustomCategory";
import DebtLoanGroup from "./DebtLoanGroup";
import ExpenseGroup from "./ExpenseGroup";
import IncomeGroup from "./IncomeGroup";

interface props {
  permission: number;
  handleSelect: (data: Category) => void;
}

const SelectCategory: React.FC<props> = ({ handleSelect, permission }) => {
  const rootPath = useRouteMatch().url;
  const location = useLocation();

  //? state for permission
  const [debtLoan, setDebtLoan] = useState(false);
  const [expense, setExpense] = useState(false);
  const [income, setIncome] = useState(false);

  //? init permission state
  useEffect(() => {
    var value = permission;
    if (value >= 4) {
      setDebtLoan(true);
      value -= 4;
    }
    if (value >= 2) {
      setExpense(true);
      value -= 2;
    }
    if (value === 1) {
      setIncome(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (location.pathname === rootPath) {
    return <Redirect to={`${rootPath}/expense`} />;
  }

  return (
    <IonPage>
      <Route path={`${rootPath}/add-custom`}>
        <AddCustomCategory type="Expense" beforePath={rootPath} />
      </Route>
      <Route>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                className="icon-padding"
                defaultHref={rootPath.substring(0, rootPath.length - 11)}
              />
            </IonButtons>
            <IonTitle>Select Category</IonTitle>
            <IonButtons slot="end">
              <IonButton size="large" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonTabs>
            <IonRouterOutlet>
              <Route path={`${rootPath}/debt&loan`}>
                <IonContent>
                  <DebtLoanGroup handleSelect={handleSelect} />
                </IonContent>
              </Route>
              <Route path={`${rootPath}/expense`}>
                <IonContent>
                  <ExpenseGroup handleSelect={handleSelect} />
                </IonContent>
              </Route>
              <Route path={`${rootPath}/income`}>
                <IonContent>
                  <IncomeGroup handleSelect={handleSelect} />
                </IonContent>
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="top">
              {debtLoan && (
                <IonTabButton tab="debt&loan" href={`${rootPath}/debt&loan`}>
                  <IonLabel>Debt & Loan</IonLabel>
                </IonTabButton>
              )}
              {expense && (
                <IonTabButton tab="expense" href={`${rootPath}/expense`}>
                  <IonLabel>Expense</IonLabel>
                </IonTabButton>
              )}
              {income && (
                <IonTabButton tab="income" href={`${rootPath}/income`}>
                  <IonLabel>Income</IonLabel>
                </IonTabButton>
              )}
            </IonTabBar>
          </IonTabs>
        </IonContent>
      </Route>
    </IonPage>
  );
};

export default SelectCategory;
