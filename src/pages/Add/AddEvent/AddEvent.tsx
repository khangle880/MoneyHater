import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonRouterLink,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./AddEvent.scss";

//? Icon
import { calendarIcon } from "../../../Necessary/icons";

//? components
import {
  addWalletEvent,
  availableTimeRange,
  Currency,
  currentWallet,
  SelectCurrencyUnit,
  SelectIconPopover,
  SelectTimeRange,
  SelectWalletPopover,
  TimeRange,
  useAuth,
  Wallet,
} from "../../../Necessary/components";

import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import dayjs from "dayjs";

const AddEvent: React.FC = () => {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [currencyUnit, setCurrencyUnit] = useState<Currency>(
    currentWallet.currency_object
  );
  const [wallet, setWallet] = useState<Wallet>(currentWallet);

  const [timeRange, setTimeRange] = useState<TimeRange>(availableTimeRange[0]);

  const history = useHistory();
  const { userId } = useAuth();
  const alertMessage = "You must fill amount, category and time range field";

  useEffect(() => {
    setCurrencyUnit(wallet.currency_object);
  }, [wallet.currency_object]);
  useEffect(() => () => {}, []);

  const formatTimeRange = (timeRange: TimeRange) => {
    const today = dayjs();
    const fromDate = dayjs(timeRange.from);
    const toDate = dayjs(timeRange.to);
    const fromDateFormat =
      fromDate.year() !== today.year() ? "DD/MM/YYYY" : "DD/MM";
    const toDateFormat =
      toDate.year() !== today.year() ? "DD/MM/YYYY" : "DD/MM";

    return timeRange.label !== "Custom"
      ? timeRange.label
      : `${fromDate.format(fromDateFormat)} - ${toDate.format(toDateFormat)}`;
  };

  const handleSave = () => {
    if (name && icon && currencyUnit && timeRange) {
      const newRawTransaction = {
        name: name,
        icon: icon,
        currency: currencyUnit.id,
        from: timeRange.from,
        to: timeRange.to,
        state: true,
      };
      addWalletEvent(newRawTransaction, userId!, wallet);
      history.goBack();
    } else setShowAlert(true);
  };

  return (
    <IonModal isOpen={true}>
      <IonRouterOutlet animated={false}>
        <Route exact path="/my/events/add/currencies">
          <SelectCurrencyUnit
            handleSelect={(data: Currency) => setCurrencyUnit(data)}
          />
        </Route>
        <Route exact path="/my/events/add/time-range">
          <SelectTimeRange
            handleSelect={(data: TimeRange) => setTimeRange(data)}
          />
        </Route>
        {/* ----Home Route---- */}
        <Route exact path="/my/events/add">
          <IonPage>
            <IonHeader>
              <IonToolbar className="toolbar-medium">
                <IonButtons slot="start">
                  <IonBackButton
                    icon={closeIcon}
                    defaultHref="/my/event"
                    text=""
                  />
                </IonButtons>
                <IonTitle>Add Event</IonTitle>
                <IonButtons slot="end">
                  <IonButton size="large" onClick={() => handleSave()}>
                    SAVE
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding add-event-content">
              <IonList className="block">
                {/* ICON ITEM */}
                <IonItem lines="inset" detail={false}>
                  <SelectIconPopover
                    icon={icon}
                    setIcon={(data: string) => setIcon(data)}
                  />
                  <IonInput
                    value={name}
                    onIonChange={(event) => setName(event.detail.value!)}
                  />
                  {/* CURRENCY UNIT */}
                  <IonRouterLink routerLink="/my/events/add/currencies">
                    {currencyUnit ? currencyUnit.iso : "Unit"}
                  </IonRouterLink>
                </IonItem>
                {/* TIME RANGE */}
                <IonItem routerLink="/my/events/add/time-range" lines="inset">
                  <IonRippleEffect />
                  <IonIcon slot="start" icon={calendarIcon} />
                  <IonInput
                    placeholder="Select Event"
                    readonly={true}
                    value={formatTimeRange(timeRange)}
                  />
                </IonItem>
                {/* WALLET ITEM */}
                <SelectWalletPopover
                  wallet={wallet}
                  setWallet={(data: Wallet) => setWallet(data)}
                />
              </IonList>
            </IonContent>
          </IonPage>
        </Route>
        {/* ----Home Route---- */}
      </IonRouterOutlet>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Alert"}
        message={alertMessage}
        buttons={["OK"]}
      />
    </IonModal>
  );
};

export default AddEvent;
