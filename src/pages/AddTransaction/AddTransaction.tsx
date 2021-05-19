import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonRippleEffect,
  IonRouterLink,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./AddTransaction.css";
import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Category, CurrencyUnit } from "../../models";
import SelectCurrencyUnit from "../Currency/SelectCurrencyUnit";
import SelectCategory from "../Category/SelectCategory";
import questionSvg from "../../icons/icons8-question.svg";
import noteIcon from "../../icons/icons8-note.svg";
import dollarIcon from "../../icons/icons8-us-dollar.svg";
import calendarIcon from "../../icons/icons8-calendar.svg";
import walletIcon from "../../icons/icons8-wallet.svg";
import { currencyList } from "../../LoadedData/CurrencyList";

const AddTransaction: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [currencyUnit, setCurrencyUnit] = useState<CurrencyUnit>(
    currencyList?.find(
      (child) => child.key === "d74c9d53-2655-44ce-9d5e-54474f0657ab"
    ) as CurrencyUnit
  );
  const [category, setCategory] = useState<Category>();
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [wallet, setWallet] = useState("");

  useEffect(() => () => {}, []);

  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path="/my/transactions/add/category">
          <SelectCategory
            handleSelect={(data: Category) => setCategory(data)}
          />
        </Route>
        <Route exact path="/my/transactions/add/currency-unit">
          <SelectCurrencyUnit
            handleSelect={(data: CurrencyUnit) => setCurrencyUnit(data)}
          />
        </Route>
        {/* Home Route */}
        <Route exact path="/my/transactions/add">
          <IonPage>
            <IonHeader>
              <IonToolbar className="toolbar-medium">
                <IonButtons slot="start">
                  <IonBackButton
                    icon={closeIcon}
                    defaultHref="/my"
                    text=""
                  />
                </IonButtons>
                <IonTitle>Add Transaction</IonTitle>
                <IonButtons slot="end">
                  <IonButton size="large">SAVE</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonList className="block">
                {/* AMOUNT ITEM */}
                <IonItem lines="inset">
                  <IonIcon slot="start" icon={dollarIcon} />
                  <IonInput
                    type="number"
                    value={amount}
                    onIonChange={(event) =>
                      setAmount(parseInt(event.detail.value!))
                    }
                  />
                  {/* CURRENCY UNIT */}
                  <IonRouterLink routerLink="/my/transactions/add/currency-unit">
                    {currencyUnit.iso}
                  </IonRouterLink>
                </IonItem>
                {/* CATEGORY ITEM */}
                <IonItem
                  routerLink="/my/transactions/add/category"
                  lines="inset"
                >
                  <IonRippleEffect />
                  {/* <IonIcon
                    slot="start"
                    src={category?.icon}
                    // icon={questionIcon}
                    className="icon-circle-outline"
                  /> */}
                  <IonImg
                    slot="start"
                    src={category?.icon || questionSvg}
                    className="icon"
                  />
                  <IonInput
                    placeholder="Select Category"
                    value={category?.name}
                    readonly={true}
                  />
                </IonItem>
                {/* NOTE ITEM */}
                <IonItem routerLink="/my/transactions/add/note" lines="inset">
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
                {/* WALLET ITEM */}
                <IonItem lines="inset">
                  <IonIcon slot="start" icon={walletIcon} />
                  <IonInput readonly={true} />
                </IonItem>
              </IonList>
            </IonContent>
          </IonPage>
        </Route>
        {/* Home Route */}
      </IonRouterOutlet>
    </IonPage>
  );
};

export default AddTransaction;
