import { IonImg, IonItem } from "@ionic/react";
import React, { useState } from "react";
import { categories, Transaction } from "../../../Necessary/components";
import { questionIcon } from "../../../Necessary/icons";

const TransactionItem: React.FC<{ data: Transaction }> = ({ data }) => {
  const [category] = useState(
    categories.find((category) => category.id === data.category)
  );
  return (
    <IonItem onClick={() => {}}>
      <IonImg src={category?.icon || questionIcon} />
      <div>
        <p>{category?.name}</p>
        {category?.name === "Loan" || category?.name === "Debt" ? (
          <p>
            {data.note} to {data.with}
          </p>
        ) : (
          <p>{data.note}</p>
        )}
      </div>
      <div slot="end">
        <p>$69888.96</p>
        <p>29/11/2021</p>
      </div>
    </IonItem>
  );
};

export default TransactionItem;
