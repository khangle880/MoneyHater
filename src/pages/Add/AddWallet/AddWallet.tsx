import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRouterLink,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

//? Icon
import { dollarIcon } from "../../../Necessary/icons";

//? components
import {
  Currency,
  findCurrency,
  SelectCurrencyUnit,
  SelectIconPopover,
  useAuth,
} from "../../../Necessary/components";

// import "./AddWallet.scss";
import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from "underscore";
import { addWallet } from "../../../Models/Wallets";

import "./AddWallet.scss";

const AddWallet: React.FC = () => {
  //? real
  const [showAlert, setShowAlert] = useState(false);
  const [balance, setBalance] = useState(0);
  const [currencyUnit, setCurrencyUnit] = useState<Currency>(
    findCurrency("0958dbc7-9bc5-4c02-a4de-6b7e3f8cb3b7")
  );
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [excludeFromTotal, setExcludeFromTotal] = useState(false);
  const [enableNotification, setEnableNotification] = useState(true);

  const history = useHistory();
  const { userId } = useAuth();
  const alertMessage = "You must fill all field";

  const handleSave = () => {
    if (balance && icon && name && currencyUnit) {
      const newRawTransaction = {
        name: name,
        icon: icon,
        balance: balance,
        currency: currencyUnit.id,
        currency_object: currencyUnit,
        enable_notification: true,
        excluded_from_total: false,
        state: true,
        members: [],
        debts: { debtsByPartner: [], loansByPartner: [] },
        categories: [],
        transactions: [],
        budgets: [],
        ready_executed_transaction: [],
        recurring_transactions: [],
        events: [],
      };
      addWallet(newRawTransaction, userId!);
      history.replace("/my/manage-wallets");
    } else setShowAlert(true);
  };

  return (
    <IonModal isOpen={true}>
      <IonRouterOutlet animated={false}>
        <Route exact path="/my/manage-wallets/add/currencies">
          <SelectCurrencyUnit
            handleSelect={(data: Currency) => setCurrencyUnit(data)}
          />
        </Route>
        {/* ----Home Route---- */}
        <Route exact path="/my/manage-wallets/add">
          <IonHeader>
            <IonToolbar className="toolbar-medium">
              <IonButtons slot="start">
                <IonBackButton
                  icon={closeIcon}
                  defaultHref="/my/manage-wallets"
                  text=""
                />
              </IonButtons>
              <IonTitle>Add Wallet</IonTitle>
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
                </IonItem>
                {/* BALANCE ITEM */}
                <IonItem lines="inset">
                  <IonIcon slot="start" icon={dollarIcon} />
                  <IonInput
                    type="number"
                    value={balance}
                    onIonChange={(event) =>
                      setBalance(parseFloat(event.detail.value!))
                    }
                  />
                  {/* CURRENCY UNIT */}
                  <IonRouterLink routerLink="/my/manage-wallets/add/currencies">
                    {currencyUnit ? currencyUnit.iso : "Unit"}
                  </IonRouterLink>
                </IonItem>
                <IonItem lines="none">
                  <IonCheckbox
                    slot="start"
                    checked={excludeFromTotal}
                    onIonChange={(e) => setExcludeFromTotal(e.detail.checked)}
                  />
                  <IonLabel>
                    <p>Exclude from report</p>
                    <p>
                      Don't include this transaction in reports such as Overview
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonCheckbox
                    slot="start"
                    checked={enableNotification}
                    onIonChange={(e) => setEnableNotification(e.detail.checked)}
                  />
                  <IonLabel>
                    <p>Enable Notification</p>
                    <p>System send notification to you</p>
                  </IonLabel>
                </IonItem>
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

export default AddWallet;
