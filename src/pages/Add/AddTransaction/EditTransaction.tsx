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

//? Icon
import {
  calendarIcon,
  dollarIcon,
  eventIcon,
  noteIcon,
  partnerIcon,
  questionIcon,
  remindIcon,
} from "../../../Necessary/icons";

//? components
import {
  addTransaction,
  Category,
  Currency,
  currentWallet,
  deleteTransaction,
  findCategory,
  findCurrency,
  Partner,
  SelectCategory,
  SelectCurrencyUnit,
  SelectPartner,
  SelectWalletEvent,
  SelectWalletPopover,
  TakeNote,
  Transaction,
  useAuth,
  Wallet,
  WalletEvent,
} from "../../../Necessary/components";

import "./AddTransaction.scss";
import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from "underscore";
import { generatePartner } from "../../../Models/Recent_Partners";

interface RouteParams {
  id: string;
}

const AddTransaction: React.FC = () => {
  const [transaction, setTransaction] = useState<Transaction | undefined>();
  const { id } = useParams<RouteParams>();
  const rootPath = useRouteMatch().url;

  useEffect(() => {
    const data = currentWallet.transactions.find((child) => child.id === id);
    if (data) {
      setTransaction(data);
      setAmount(data?.amount);
      setCurrencyUnit(findCurrency(data.currency));
      setCategory(findCategory(data.category));
      setNote(data.note);
      setDate(data.executed_time);
      setPartner(data.with);
      setWalletEvent(
        currentWallet.events.find((event) => event.id === data.event)
      );
      setRemind(data.remind);
      setExcludeFromReport(data.exclude_from_report);
    }
  }, [id]);

  //? real
  const [isMore, setIsMore] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currencyUnit, setCurrencyUnit] = useState<Currency>(
    currentWallet.currency_object
  );
  const [category, setCategory] = useState<Category>();
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [wallet, setWallet] = useState<Wallet>(currentWallet);
  const [partner, setPartner] = useState<string>();
  const [walletEvent, setWalletEvent] = useState<WalletEvent>();
  const [remind, setRemind] = useState("");
  const [excludeFromReport, setExcludeFromReport] = useState(false);

  const history = useHistory();
  const { userId } = useAuth();
  const alertMessage = "You must fill amount and category field";

  useEffect(() => {
    setCurrencyUnit(wallet.currency_object);
  }, [wallet.currency_object]);

  const handleSave = () => {
    if (amount && category) {
      const newRawTransaction = {
        amount: amount,
        currency: currencyUnit!.id,
        amount_by_wallet: parseFloat(
          (
            (amount / currencyUnit!.rate_us) *
            wallet.currency_object!.rate_us
          ).toFixed(2)
        ),
        category: category,
        note: note,
        with: partner ? partner : "",
        event: walletEvent ? walletEvent.name : "",
        remind: remind,
        exclude_from_report: excludeFromReport,
        executed_time: date,
      };
      if (transaction) deleteTransaction(userId!, wallet, transaction);
      addTransaction(newRawTransaction, userId!, wallet);

      history.replace("/my/transactions");
    } else setShowAlert(true);
  };

  return (
    <IonModal
      cssClass="add-transaction-modal"
      isOpen={true}
      showBackdrop={false}
    >
      <IonRouterOutlet animated={false}>
        <Route path={`${rootPath}/categories`}>
          <SelectCategory
            permission={7}
            handleSelect={(data: Category) => setCategory(data)}
          />
        </Route>
        <Route exact path={`${rootPath}/currencies`}>
          <SelectCurrencyUnit
            handleSelect={(data: Currency) => setCurrencyUnit(data)}
          />
        </Route>
        <Route exact path={`${rootPath}/note`}>
          <TakeNote
            currentValue={note}
            handleNote={(data: string) => setNote(data)}
          />
        </Route>
        <Route exact path={`${rootPath}/partner`}>
          <SelectPartner
            currentValue={generatePartner(partner)}
            handlePartner={(data: Partner) => setPartner(data.name)}
          />
        </Route>
        <Route exact path={`${rootPath}/event`}>
          <SelectWalletEvent
            listEvent={wallet.events}
            handleSelect={(data: WalletEvent) => setWalletEvent(data)}
          />
        </Route>
        {/* ----Home Route---- */}
        <Route exact path={`${rootPath}`}>
          <IonHeader>
            <IonToolbar className="toolbar-medium">
              <IonButtons slot="start">
                <IonBackButton
                  icon={closeIcon}
                  defaultHref="/my/transactions"
                  text=""
                />
              </IonButtons>
              <IonTitle>Edit Transaction</IonTitle>
              <IonButtons slot="end">
                <IonButton size="large" onClick={() => handleSave()}>
                  SAVE
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding add-transaction-content ">
            <IonPage>
              <IonList className="block list-container">
                {/* AMOUNT ITEM */}
                <IonItem lines="inset">
                  <IonIcon slot="start" icon={dollarIcon} />
                  <IonInput
                    type="number"
                    value={amount}
                    onIonChange={(event) =>
                      setAmount(parseFloat(event.detail.value!))
                    }
                  />
                  {/* CURRENCY UNIT */}
                  <IonRouterLink routerLink={`${rootPath}/currencies`}>
                    {currencyUnit?.iso}
                  </IonRouterLink>
                </IonItem>
                {/* CATEGORY ITEM */}
                <IonItem
                  routerLink={`${rootPath}/categories`}
                  lines="inset"
                  detail={false}
                >
                  <IonRippleEffect />
                  <IonImg
                    slot="start"
                    src={category?.icon || questionIcon}
                    className="icon"
                  />
                  <IonInput
                    placeholder="Select Category"
                    value={category?.name}
                    readonly={true}
                  />
                </IonItem>
                {/* NOTE ITEM */}
                <IonItem routerLink={`${rootPath}/note`} lines="inset">
                  <IonRippleEffect />
                  <IonIcon slot="start" icon={noteIcon} />
                  <IonInput
                    placeholder="Write note"
                    readonly={true}
                    value={note}
                  />
                </IonItem>
                {/* Date Execute */}
                <IonItem lines="inset">
                  <IonIcon slot="start" icon={calendarIcon} />
                  <IonDatetime
                    value={date}
                    displayFormat="DDD, DD/MM/YYYY"
                    onIonChange={(event) => setDate(event.detail.value!)}
                  />
                </IonItem>
                {/* WALLET ITEM */}
                <SelectWalletPopover
                  wallet={wallet}
                  setWallet={(data: Wallet) => setWallet(data)}
                />
                {/* MORE DETAILS */}
                {!isMore && (
                  <IonButton onClick={() => setIsMore(true)}>
                    More Details
                  </IonButton>
                )}
                {isMore && (
                  <IonList>
                    <IonList>
                      {/* PARTNER ITEM */}
                      <IonItem routerLink={`${rootPath}/partner`} lines="inset">
                        <IonRippleEffect />
                        <IonIcon slot="start" icon={partnerIcon} />
                        <IonInput
                          placeholder="With"
                          readonly={true}
                          value={partner}
                        />
                      </IonItem>
                    </IonList>
                    <IonList>
                      {/* EVENT ITEM */}
                      <IonItem routerLink={`${rootPath}/event`} lines="inset">
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
            </IonPage>
          </IonContent>
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

export default AddTransaction;
