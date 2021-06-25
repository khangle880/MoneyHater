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
            <p style={{color:"#20406a", fontWeight: 600, fontSize:"1.1rem"}}>{debt.with ? debt.with : "Someone"}</p>
            <p>{debt.transactions.length} Transactions</p>
          </IonLabel>
          <IonLabel>
            {remain === 0 ? <s className="strike-label">{totalVal}</s> : <p className="p-label">{remain} left</p>}
            <p>{remain === 0 ? "All paid" : `out of ${outOfVal}`}</p>
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
            <div>
              <div className="flex-row">
                <IonLabel >NOT YET PAID: </IonLabel>
                <p style={{color:"#20406a", fontWeight:600, marginLeft:"15px"}}>{notYetPaidValue}</p>
              </div>
              <IonList>{notYetPaid}</IonList>
            </div>
          </React.Fragment>
        )}

        {paid.length !== 0 && (
          <React.Fragment>
            <div>
              <div className="flex-row">
                <IonLabel>PAID: </IonLabel>
                <p style={{color:"#20406a", fontWeight:600, marginLeft:"15px"}}>{paidValue}</p>
              </div>
              <IonList>{paid}</IonList>
            </div>
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
