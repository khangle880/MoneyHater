import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { personCircleOutline as personIcon } from "ionicons/icons";
import { useHistory, useRouteMatch } from "react-router";
import { categories, Category } from "../../Models/Categories";
import { currentWallet } from "../../Models/LoadData";
import Transactions from "../Home/Transactions";
import { Debt } from "../../Models/Debts";

const PayableGroup: React.FC<{ data: Debt }> = ({ data }) => {
  const [total, setTotal] = useState(0);
  const [outOf, setOutOf] = useState(0);

  useEffect(() => {
    // var totalVal = 0;
    // var outOfVal = 0;
    // data.transactions.forEach((transaction) => {
    //   totalVal += transaction.amount_by_wallet;
    //   transaction.transactions_list.forEach((child) => {
    //     outOfVal += child.amount_by_wallet;
    //   });
    // });

    // setTotal(totalVal);
    // setOutOf(outOfVal);
    // return () => {};
  }, [data.transactions]);

  return (
    <IonItem>
      <IonIcon icon={personIcon} />
      <IonLabel>
        <h2>{data.with}</h2>
        <h3>{data.transactions.length} Transactions</h3>
      </IonLabel>
      {/* <IonLabel>
        <h2>
          {data.remain} {data.remain < data.total ? "left" : ""}
        </h2>
        <h2>
          {data.remain < data.total ? `out of ${data.total - data.remain}` : ""}
        </h2>
      </IonLabel> */}
    </IonItem>
  );
};

export default PayableGroup;
