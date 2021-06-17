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

const ReceivableGroup: React.FC = () => {

  const mapDebtList = (LoanList: Debt[]) => {
    const notYetReceived: any[] = [];
    const received: any[] = [];
    var notYetReceivedValue = 0;
    var receivedValue = 0;

    LoanList.forEach((loan, i) => {
      var totalVal = 0;
      var outOfVal = 0;
      loan.transactions.forEach((transaction) => {
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
            <h2>{loan.with ? loan.with : "Someone"}</h2>
            <h2>{loan.transactions.length} Transactions</h2>
          </IonLabel>
          <IonLabel>
            {remain === 0 ? <s>{totalVal}</s> : <h2>{remain} left</h2>}
            <h2>{remain === 0 ? "All received" : `out of ${outOfVal}`}</h2>
          </IonLabel>
        </IonItem>
      );

      remain === 0 ? received.push(item) : notYetReceived.push(item);
      remain === 0
        ? (receivedValue += totalVal)
        : (notYetReceivedValue += remain);
    });

    return (
      <IonContent>
        {notYetReceived.length !== 0 && (
          <React.Fragment>
            <IonLabel>NOT YET RECEIVED {notYetReceivedValue}</IonLabel>
            <IonList>{notYetReceived}</IonList>
          </React.Fragment>
        )}

        {received.length !== 0 && (
          <React.Fragment>
            <IonLabel>RECEIVED {receivedValue}</IonLabel>
            <IonList>{received}</IonList>
          </React.Fragment>
        )}
      </IonContent>
    );
  };

  return (
    <React.Fragment>
      {mapDebtList(currentWallet.debts.loansByPartner)}
    </React.Fragment>
  );
};

export default ReceivableGroup;
