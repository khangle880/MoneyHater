import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import React from "react";
import { personCircleOutline as personIcon } from "ionicons/icons";
import { currentWallet, Debt } from "../../Necessary/components";

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
            <p style={{color:"#20406a", fontWeight: 600, fontSize:"1.1rem"}}>{loan.with ? loan.with : "Someone"}</p>
            <p>{loan.transactions.length} Transactions</p>
          </IonLabel>
          <IonLabel>
            {remain === 0 ? <s className="strike-label">{totalVal}</s> : <p className="p-label">{remain} left</p>}
            <p>{remain === 0 ? "All received" : `out of ${outOfVal}`}</p>
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
            <div>
              <div className="flex-row">
                <IonLabel>NOT YET RECEIVED: </IonLabel>
                <p style={{color:"#20406a", fontWeight:600, marginLeft:"15px"}}> {notYetReceivedValue}</p>
              </div>
              <IonList>{notYetReceived}</IonList>
            </div>
          </React.Fragment>
        )}

        {received.length !== 0 && (
          <React.Fragment>
            <div>
              <div className="flex-row">
                <IonLabel>RECEIVED: </IonLabel>
                <p style={{color:"#20406a", fontWeight:600, marginLeft:"15px"}}> {receivedValue}</p>
              </div>
              <IonList>{received}</IonList>
            </div>
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
