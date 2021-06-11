import {
  IonAlert,
  IonBackButton,
  IonButton,
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
  IonRippleEffect,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import SelectCategory from "../Category/SelectCategory";
import questionSvg from "../../icons/icons8-question.svg";
import dollarIcon from "../../icons/icons8-us-dollar.svg";
import calendarIcon from "../../icons/icons8-calendar.svg";
import eventIcon from "../../icons/icons8-event.svg";
import { Category } from "../../Models/Categories";
import { Wallet } from "../../Models/Wallets";
import { WalletEvent } from "../../Models/Events";
import SelectWalletEvent from "../SelectWalletEvent/SelectWalletEvent";
import { useAuth } from "../../auth";
import { currentWallet } from "../../Models/LoadData";

import dayjs from "dayjs";
import { TimeRange } from "../../Models/LocalModels/TimeRange";
import SelectTimeRange from "../TimeRange/SelectTimeRange";
import { addBudget } from "../../Models/Budgets";
import SelectWalletPopover from "../SelectWallet/SelectWalletPopover";

const AddBudget: React.FC = () => {
  var currentDate = new Date();

  const [showAlert, setShowAlert] = useState(false);
  const [goalValue, setGoalValue] = useState(0);
  const [category, setCategory] = useState<Category>();
  const [timeRange, setTimeRange] = useState<TimeRange>({
    label: "This month",
    from: dayjs(currentDate).startOf("M").toISOString(),
    to: dayjs(currentDate).endOf("M").toISOString(),
  });
  const [wallet, setWallet] = useState<Wallet>(currentWallet);
  const [repeatable, setRepeatable] = useState(false);
  const [walletEvent, setWalletEvent] = useState<WalletEvent>();

  const history = useHistory();
  const { userId } = useAuth();
  const alertMessage =
    "You must fill goal value, category and time range field";

  useEffect(() => () => {}, []);

  const handleSave = () => {
    if (goalValue && timeRange && category) {
      const newRawBudget = {
        goal_value: goalValue,
        consume: 0,
        category: category.id,
        from: timeRange.from,
        to: timeRange.to,
        repeatable: repeatable,
        state: true,
        event: walletEvent ? walletEvent.id : "",
      };
      addBudget(newRawBudget, userId!, wallet);
      history.goBack();
    } else setShowAlert(true);
  };

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

  return (
    <IonModal isOpen={true}>
      <IonRouterOutlet>
        <Route exact path="/my/budgets/add/categories">
          <SelectCategory
            handleSelect={(data: Category) => setCategory(data)}
          />
        </Route>
        <Route exact path="/my/budgets/add/time-range">
          <SelectTimeRange
            handleSelect={(data: TimeRange) => setTimeRange(data)}
          />
        </Route>
        <Route exact path="/my/budgets/add/event">
          <SelectWalletEvent
            listEvent={wallet.events}
            handleSelect={(data: WalletEvent) => setWalletEvent(data)}
          />
        </Route>
        {/* ----Home Route---- */}
        <Route exact path="/my/budgets/add">
          <IonPage>
            <IonHeader>
              <IonToolbar className="toolbar-medium">
                <IonButtons slot="start">
                  <IonBackButton
                    icon={closeIcon}
                    defaultHref="/my/budgets"
                    text=""
                  />
                </IonButtons>
                <IonTitle>Add Budget</IonTitle>
                <IonButtons slot="end">
                  <IonButton size="large" onClick={() => handleSave()}>
                    SAVE
                  </IonButton>
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
                    value={goalValue}
                    onIonChange={(event) =>
                      setGoalValue(parseInt(event.detail.value!))
                    }
                  />
                </IonItem>
                {/* CATEGORY ITEM */}
                <IonItem routerLink="/my/budgets/add/categories" lines="inset">
                  <IonRippleEffect />
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
                {/* TIME RANGE */}
                <IonItem routerLink="/my/budgets/add/time-range" lines="inset">
                  <IonRippleEffect />
                  <IonIcon slot="start" icon={calendarIcon} />
                  <IonInput
                    placeholder="Select Event"
                    readonly={true}
                    value={formatTimeRange(timeRange)}
                  />
                </IonItem>
                {/* EVENT ITEM */}
                <IonItem routerLink="/my/budgets/add/event" lines="inset">
                  <IonRippleEffect />
                  <IonIcon slot="start" icon={eventIcon} />
                  <IonInput
                    placeholder="Select Event"
                    readonly={true}
                    value={walletEvent?.name}
                  />
                </IonItem>
                {/* WALLET ITEM */}
                <SelectWalletPopover
                  wallet={wallet}
                  setWallet={(data: Wallet) => setWallet(data)}
                />
                {/* REPEATABLE CHECKBOX */}
                <IonList>
                  <IonItem lines="none">
                    <IonCheckbox
                      slot="start"
                      checked={repeatable}
                      onIonChange={(e) => setRepeatable(e.detail.checked)}
                    />
                    <IonLabel>
                      <h2>Repeat this budget</h2>
                      <h3>Budget will renew automatically</h3>
                    </IonLabel>
                  </IonItem>
                </IonList>
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

export default AddBudget;
