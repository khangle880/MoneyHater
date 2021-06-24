import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

//? Icon
import {
  calendarIcon,
  dollarIcon,
  eventIcon,
  noteIcon,
  questionIcon,
  remindIcon,
  walletIcon,
} from "../../../Necessary/icons";

//? components
import {
  currentWallet,
  findCategory,
  findCurrency,
  Transaction,
} from "../../../Necessary/components";

import "./ViewTransaction.scss";
import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Route, useParams, useRouteMatch } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from "underscore";
import dayjs from "dayjs";

interface RouteParams {
  id: string;
}

const ViewTransaction: React.FC = () => {
  const [transaction, setTransaction] = useState<Transaction | undefined>();
  const { id } = useParams<RouteParams>();
  const rootPath = useRouteMatch().url;

  useEffect(() => {
    const data = currentWallet.transactions.find((child) => child.id === id);
    setTransaction(data);
  }, [id]);

  const transactionToView = () => {
    if (transaction) {
      const currency_object = findCurrency(transaction.currency);
      const category_object = findCategory(transaction.category);
      return (
        <IonContent className="ion-padding view-transaction-content">
          <IonPage>
            <IonList className="block list-container">
              {/* AMOUNT ITEM */}
              <IonItem lines="inset">
                <IonIcon slot="start" icon={dollarIcon} />
                <IonLabel>{transaction?.amount}</IonLabel>
                {/* CURRENCY UNIT */}
                <IonLabel>{currency_object.iso}</IonLabel>
              </IonItem>
              {/* CATEGORY ITEM */}
              <IonItem lines="inset" detail={false}>
                <IonImg
                  slot="start"
                  src={category_object?.icon || questionIcon}
                  className="icon"
                />
                <IonInput
                  placeholder="Select Category"
                  value={category_object?.name}
                  readonly={true}
                />
              </IonItem>
              {/* NOTE ITEM */}
              {transaction.note && (
                <IonItem lines="inset">
                  <IonIcon slot="start" icon={noteIcon} />
                  <IonLabel>
                    {transaction.note}{" "}
                    {transaction.with ? `to ${transaction.with}` : ""}
                  </IonLabel>
                </IonItem>
              )}
              {/* Date Execute */}
              <IonItem lines="inset">
                <IonIcon slot="start" icon={calendarIcon} />
                <IonLabel>
                  {dayjs(transaction.executed_time).format("dddd DD/MM/YYYY")}
                </IonLabel>
              </IonItem>
              {/* WALLET ITEM */}
              <IonItem lines="inset">
                <IonIcon slot="start" icon={walletIcon} />
                <IonLabel>{currentWallet.name}</IonLabel>
              </IonItem>
              {/* EVENT ITEM */}
              <IonItem lines="inset">
                <IonIcon slot="start" icon={eventIcon} />
                <IonLabel>
                  {
                    currentWallet.events.find(
                      (event) => event.id === transaction.event
                    )?.name
                  }
                </IonLabel>
              </IonItem>
              {/* REMIND ITEM */}
              <IonItem lines="inset">
                <IonIcon slot="start" icon={remindIcon} />
                <IonLabel>
                  {dayjs(transaction.remind).format("dddd DD/MM/YYYY")}
                </IonLabel>
              </IonItem>
              <IonItem lines="inset">
                <IonCheckbox
                  slot="start"
                  checked={transaction.exclude_from_report}
                  disabled={true}
                />
                <p>Exclude from report</p>
              </IonItem>
            </IonList>
          </IonPage>
        </IonContent>
      );
    }
  };

  return (
    <IonModal
      cssClass="add-transaction-modal"
      isOpen={true}
      showBackdrop={false}
    >
      <IonRouterOutlet>
        <Route exact path={rootPath}>
          <IonHeader>
            <IonToolbar className="toolbar-medium">
              <IonButtons slot="start">
                <IonBackButton
                  icon={closeIcon}
                  defaultHref="/my/transactions"
                  text=""
                />
              </IonButtons>
              <IonTitle>Transaction</IonTitle>
            </IonToolbar>
          </IonHeader>
          {transaction ? (
            transactionToView()
          ) : (
            <IonLabel
              style={{ fontSize: "1.5rem", color: "blue" }}
              className="label-center"
            >
              No Exist Transaction
            </IonLabel>
          )}
        </Route>
      </IonRouterOutlet>
    </IonModal>
  );
};

export default ViewTransaction;
