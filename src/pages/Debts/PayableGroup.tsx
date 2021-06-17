import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import React from "react";
import { personCircleOutline as personIcon } from "ionicons/icons";
import { currentWallet } from "../../Models/LoadData";
import { Debt } from "../../Models/Debts";

const PayableGroup: React.FC = () => {
  const mapDebtList = (DebtList: Debt[]) => {
    const notYetPaid: any[] = [];
    const paid: any[] = [];
    var notYetPaidValue = 0;
    var paidValue = 0;

    DebtList.forEach((debt, i) => {
      var totalVal = 0;
      var outOfVal = 0;
      debt.transactions.forEach((transaction) => {
        totalVal += transaction.amount_by_wallet;
        transaction.transactions_list?.forEach((child) => {
          outOfVal += child.amount_by_wallet;
        });
      });
      const remain = totalVal - outOfVal;

      const item = (
        <IonItem key={i}>
          <IonIcon icon={personIcon} />
          <IonLabel>
            <h2>{debt.with ? debt.with : "Someone"}</h2>
            <h2>{debt.transactions.length} Transactions</h2>
          </IonLabel>
          <IonLabel>
            {remain === 0 ? <s>{totalVal}</s> : <h2>{remain} left</h2>}
            <h2>{remain === 0 ? "All paid" : `out of ${outOfVal}`}</h2>
          </IonLabel>
        </IonItem>
      );

      remain === 0 ? paid.push(item) : notYetPaid.push(item);
      remain === 0 ? (paidValue += totalVal) : (notYetPaidValue += remain);
    });

    return (
      <IonContent>
        {notYetPaid.length !== 0 && (
          <React.Fragment>
            <IonLabel>NOT YET PAID {notYetPaidValue}</IonLabel>
            <IonList>{notYetPaid}</IonList>
          </React.Fragment>
        )}

        {paid.length !== 0 && (
          <React.Fragment>
            <IonLabel>PAID {paidValue}</IonLabel>
            <IonList>{paid}</IonList>
          </React.Fragment>
        )}
      </IonContent>
    );
  };

  return (
    <React.Fragment>
      {mapDebtList(currentWallet.debts.debtsByPartner)}
    </React.Fragment>
  );
};

export default PayableGroup;
