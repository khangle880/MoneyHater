import {
  IonApp,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNav,
  IonPage,
  IonRippleEffect,
  IonRouterLink,
  IonRouterOutlet,
  IonSelect,
  IonSelectOption,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./AddTransaction.css";
import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import moment from "moment";
import noteIcon from "../icons/icons8-note.svg";
import questionIcon from "../icons/icons8-question-mark.svg";
import dollarIcon from "../icons/icons8-us-dollar.svg";
import calendarIcon from "../icons/icons8-calendar.svg";
import walletIcon from "../icons/icons8-wallet.svg";
import SelectCategory from "../Category/SelectCategory";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { Router } from "workbox-routing";
import { database } from "../../firebase";
import SelectCurrencyUnit from "../Currency/SelectCurrencyUnit";
import { useLocalStorage } from "../../customHook/LocalTransactionHook";
import { loadLocalData } from "../../customHook/LoadLocalData";

const AddTransactionHome: React.FC = () => {
  const [amount, setAmount] = useState(0);
  // const [amount, setAmount] = useLocalStorage("new-transaction-amount", 0);
  const currencyUnit = loadLocalData("new-transaction-currencyID", "");
  const category = loadLocalData("new-transaction-categoryID", "");
  const note = loadLocalData("new-transaction-note", "");
  const [date, setDate] = useLocalStorage(
    "new-transaction-date",
    new Date().toISOString()
  );
  const wallet = loadLocalData("new-transaction-wallet", "");

  console.log(category);

  useEffect(
    () => () => {
      // localStorage.removeItem("new-transaction-amount");
      // localStorage.removeItem("new-transaction-currencyID");
      // localStorage.removeItem("new-transaction-categoryID");
      // localStorage.removeItem("new-transaction-note");
      // localStorage.removeItem("new-transaction-date");
      // localStorage.removeItem("new-transaction-wallet");
    },
    []
  );

  return (
    <IonPage>
      {console.log(amount)}
      <IonHeader>
        <IonToolbar className="toolbar-medium">
          <IonButtons slot="start">
            <IonBackButton icon={closeIcon} defaultHref="/home/tab1" text="" />
          </IonButtons>
          <IonTitle>Add Transaction</IonTitle>
          <IonButtons slot="end">
            <IonButton size="large">SAVE</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList className="block">
          <IonItem lines="inset">
            <IonIcon slot="start" icon={dollarIcon} />
            <IonInput
              type="number"
              value={amount}
              onIonChange={(event) => setAmount(parseInt(event.detail.value!))}
            />
            <IonRouterLink routerLink="/form/transaction/add/currency-unit">
              USD
            </IonRouterLink>
          </IonItem>
          <IonItem routerLink="/form/transaction/add/category" lines="inset">
            <IonRippleEffect />
            <IonIcon
              slot="start"
              icon={questionIcon}
              className="icon-circle-outline"
            />
            <IonInput
              placeholder="Select Category"
              value={category}
              readonly={true}
            />
          </IonItem>
          <IonItem routerLink="/form/transaction/add/note" lines="inset">
            <IonRippleEffect />
            <IonIcon slot="start" icon={noteIcon} />
            <IonInput placeholder="Write note" readonly={true} />
            {/* <IonRouterLink routerLink="/">USD</IonRouterLink> */}
          </IonItem>
          <IonItem lines="inset">
            <IonIcon slot="start" icon={calendarIcon} />
            <IonDatetime
              value={date}
              displayFormat="DDD, DD/MM/YYYY"
              onIonChange={(event) => setDate(event.detail.value!)}
            />
          </IonItem>
          <IonItem lines="inset">
            <IonIcon slot="start" icon={walletIcon} />
            <IonInput readonly={true} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddTransactionHome;
