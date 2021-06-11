import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonDatetime,
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
  IonRouterLink,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import SelectCurrencyUnit from "../Currency/SelectCurrencyUnit";
import SelectCategory from "../Category/SelectCategory";
import questionSvg from "../../icons/icons8-question.svg";
import noteIcon from "../../icons/icons8-note.svg";
import dollarIcon from "../../icons/icons8-us-dollar.svg";
import calendarIcon from "../../icons/icons8-calendar.svg";
import partnerIcon from "../../icons/icons8-user-account.svg";
import eventIcon from "../../icons/icons8-event.svg";
import remindIcon from "../../icons/icons8-alarm-clock.svg";
import { Currency } from "../../Models/Currencies";
import TakeNote from "../Note/TakeNote";
import { Category } from "../../Models/Categories";
import { Wallet } from "../../Models/Wallets";
import SelectPartner from "../Partner/SelectPartner";
import { Partner } from "../../Models/Recent_Partners";
import { WalletEvent } from "../../Models/Events";
import SelectWalletEvent from "../SelectWalletEvent/SelectWalletEvent";
import { useAuth } from "../../auth";
import { currentWallet, walletCurrency } from "../../Models/LoadData";
import {
  availableTimeRange,
  TimeRange,
} from "../../Models/LocalModels/TimeRange";
import dayjs from "dayjs";
import SelectTimeRange from "../TimeRange/SelectTimeRange";
import { addRecurringTransaction } from "../../Models/Recurring_Transactions";
import SelectWalletPopover from "../SelectWallet/SelectWalletPopover";

const AddRecurringTransaction: React.FC = () => {
  const [isMore, setIsMore] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currencyUnit, setCurrencyUnit] = useState<Currency>(walletCurrency);
  const [category, setCategory] = useState<Category>();
  const [note, setNote] = useState("");
  const [wallet, setWallet] = useState<Wallet>(currentWallet);
  const [partner, setPartner] = useState<Partner>();
  const [walletEvent, setWalletEvent] = useState<WalletEvent>();
  const [remind, setRemind] = useState("");
  const [excludeFromReport, setExcludeFromReport] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>(availableTimeRange[0]);

  const history = useHistory();
  const { userId } = useAuth();
  const alertMessage = "You must fill amount, category and time range field";

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
    if (amount && category && timeRange) {
      const newRawTransaction = {
        amount: amount,
        currency: currencyUnit.id,
        amount_by_wallet: parseFloat(
          ((amount / currencyUnit.rate_us) * walletCurrency!.rate_us).toFixed(2)
        ),
        category: category.id,
        note: note,
        with: partner ? partner.name : "",
        event: walletEvent ? walletEvent.name : "",
        remind: remind,
        exclude_from_report: excludeFromReport,
        from: timeRange.from,
        to: timeRange.to,
        state: true,
      };
      addRecurringTransaction(newRawTransaction, userId!, wallet);
      history.goBack();
    } else setShowAlert(true);
  };

  return (
    <IonModal isOpen={true}>
      <IonRouterOutlet>
        <Route exact path="/my/recurring-transactions/add/categories">
          <SelectCategory
            handleSelect={(data: Category) => setCategory(data)}
          />
        </Route>
        <Route exact path="/my/recurring-transactions/add/currencies">
          <SelectCurrencyUnit
            handleSelect={(data: Currency) => setCurrencyUnit(data)}
          />
        </Route>
        <Route exact path="/my/recurring-transactions/add/note">
          <TakeNote
            currentValue={note}
            handleNote={(data: string) => setNote(data)}
          />
        </Route>
        <Route exact path="/my/recurring-transactions/add/partner">
          <SelectPartner
            currentValue={partner!}
            handlePartner={(data: Partner) => setPartner(data)}
          />
        </Route>
        <Route exact path="/my/recurring-transactions/add/time-range">
          <SelectTimeRange
            handleSelect={(data: TimeRange) => setTimeRange(data)}
          />
        </Route>
        <Route exact path="/my/recurring-transactions/add/event">
          <SelectWalletEvent
            listEvent={wallet.events}
            handleSelect={(data: WalletEvent) => setWalletEvent(data)}
          />
        </Route>
        {/* ----Home Route---- */}
        <Route exact path="/my/recurring-transactions/add">
          <IonPage>
            <IonHeader>
              <IonToolbar className="toolbar-medium">
                <IonButtons slot="start">
                  <IonBackButton
                    icon={closeIcon}
                    defaultHref="/my/recurring-transactions"
                    text=""
                  />
                </IonButtons>
                <IonTitle>Add Recurring Transaction</IonTitle>
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
                    value={amount}
                    onIonChange={(event) =>
                      setAmount(parseInt(event.detail.value!))
                    }
                  />
                  {/* CURRENCY UNIT */}
                  <IonRouterLink routerLink="/my/recurring-transactions/add/currencies">
                    {currencyUnit.iso}
                  </IonRouterLink>
                </IonItem>
                {/* CATEGORY ITEM */}
                <IonItem
                  routerLink="/my/recurring-transactions/add/categories"
                  lines="inset"
                >
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
                {/* NOTE ITEM */}
                <IonItem
                  routerLink="/my/recurring-transactions/add/note"
                  lines="inset"
                >
                  <IonRippleEffect />
                  <IonIcon slot="start" icon={noteIcon} />
                  <IonInput
                    placeholder="Write note"
                    readonly={true}
                    value={note}
                  />
                </IonItem>
                {/* TIME RANGE */}
                <IonItem
                  routerLink="/my/recurring-transactions/add/time-range"
                  lines="inset"
                >
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
                {/* ADD MORE DETAILS */}
                {!isMore && (
                  <IonButton onClick={() => setIsMore(true)}>
                    Add More Details
                  </IonButton>
                )}
                {isMore && (
                  <IonList>
                    <IonList>
                      {/* PARTNER ITEM */}
                      <IonItem
                        routerLink="/my/recurring-transactions/add/partner"
                        lines="inset"
                      >
                        <IonRippleEffect />
                        <IonIcon slot="start" icon={partnerIcon} />
                        <IonInput
                          placeholder="With"
                          readonly={true}
                          value={partner?.name}
                        />
                      </IonItem>
                    </IonList>
                    <IonList>
                      {/* EVENT ITEM */}
                      <IonItem
                        routerLink="/my/recurring-transactions/add/event"
                        lines="inset"
                      >
                        <IonRippleEffect />
                        <IonIcon slot="start" icon={eventIcon} />
                        <IonInput
                          placeholder="Select Event"
                          readonly={true}
                          value={walletEvent?.name}
                        />
                      </IonItem>
                      {/* REMIND ITEM */}
                      <IonItem lines="inset">
                        <IonIcon slot="start" icon={remindIcon} />
                        <IonDatetime
                          value={remind}
                          placeholder="No Remind"
                          displayFormat="DDD, DD/MM/YYYY"
                          onIonChange={(event) =>
                            setRemind(event.detail.value!)
                          }
                        />
                      </IonItem>
                      <IonList>
                        <IonItem lines="none">
                          <IonCheckbox
                            slot="start"
                            checked={excludeFromReport}
                            onIonChange={(e) =>
                              setExcludeFromReport(e.detail.checked)
                            }
                          />
                          <IonLabel>
                            <h2>Exclude from report</h2>
                            <h3>
                              Don't include this transaction in reports such as
                              Overview
                            </h3>
                          </IonLabel>
                        </IonItem>
                      </IonList>
                    </IonList>
                  </IonList>
                )}
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

export default AddRecurringTransaction;
