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
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useState } from "react";
import { Route, useHistory, useParams, useRouteMatch } from "react-router-dom";

//? component
import {
  addTransaction,
  categories,
  Category,
  currentWallet,
  SelectCategory,
  SelectWalletPopover,
  useAuth,
  Wallet,
  wallets,
} from "../../Necessary/components";

//? icon
import { connectIcon, noteIcon } from "../../Necessary/icons";

interface RouteParams {
  id: string;
}

const TransferMoney: React.FC = () => {
  const { id } = useParams<RouteParams>();

  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState<Category>(
    categories.find(
      (category) => category.id === "dGux8eIeZ9GWjPxLpps4"
    ) as Category
  );
  const [fromWallet, setFromWallet] = useState<Wallet>(
    wallets.find((wallet) => wallet.id === id) as Wallet
  );
  const [toWallet, setToWallet] = useState<Wallet>();
  const [note, setNote] = useState("");
  const [excludeFromReport, setExcludeFromReport] = useState(false);

  const history = useHistory();
  const { userId } = useAuth();
  const rootPath = useRouteMatch().url;
  var alertMessage1 = "You must fill amount and to-wallet fields";
  var alertMessage2 = "From wallet and to wallet cannot be the same";

  const handleSave = () => {
    if (fromWallet === toWallet) {
      setShowAlert2(true);
      return;
    }
    if (amount > 0 && fromWallet && category && toWallet) {
      const newRawFromTransaction = {
        amount: amount,
        currency: fromWallet.currency,
        amount_by_wallet: amount,
        category: category,
        note: note,
        with: "",
        event: "",
        remind: "",
        exclude_from_report: excludeFromReport,
        executed_time: new Date().toISOString(),
      };

      const newRawToTransaction = {
        amount: amount,
        currency: currentWallet.currency,
        amount_by_wallet: parseFloat(
          (
            (amount / fromWallet.currency_object.rate_us) *
            toWallet.currency_object!.rate_us
          ).toFixed(2)
        ),
        category: categories.find(
          (category) => category.id === "yMIhLrgMAO3rEMFdzDhD"
        ) as Category,
        with: "",
        event: "",
        remind: "",
        exclude_from_report: excludeFromReport,
        executed_time: new Date().toISOString(),
      };

      addTransaction(newRawFromTransaction, userId!, fromWallet);
      addTransaction(newRawToTransaction, userId!, toWallet);

      history.goBack();
    } else {
      setShowAlert1(true);
    }
  };

  return (
    <IonModal isOpen={true}>
      <IonRouterOutlet>
        <Route path={`${rootPath}/categories/expense`}>
          <SelectCategory
            permission={2}
            handleSelect={(data: Category) => setCategory(data)}
          />
        </Route>
        <Route exact path={rootPath}>
          <IonPage>
            <IonHeader>
              <IonToolbar className="toolbar-medium">
                <IonButtons slot="start">
                  <IonBackButton
                    icon={closeIcon}
                    text=""
                    defaultHref="/my/manage-wallets"
                  />
                </IonButtons>
                <IonTitle>Transfer Money</IonTitle>
                <IonButtons slot="end">
                  <IonButton size="large" onClick={() => handleSave()}>
                    SAVE
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonLabel>From</IonLabel>
              <IonList className="block">
                {/* AMOUNT ITEM */}
                <IonItem lines="inset" button>
                  <IonInput
                    type="number"
                    value={amount}
                    onIonChange={(event) => {
                      console.log(event.detail.value);
                      console.log(parseFloat(event.detail.value!));
                      setAmount(parseFloat(event.detail.value!));
                    }}
                  />
                </IonItem>
                {/* WALLET ITEM */}
                <SelectWalletPopover
                  wallet={fromWallet}
                  setWallet={(data: Wallet) => setFromWallet(data)}
                />
                {/* CATEGORY ITEM */}
                <IonItem
                  lines="inset"
                  routerLink={`${rootPath}/categories/expense`}
                >
                  <IonIcon icon={connectIcon} />
                  <IonInput
                    placeholder="Select Category"
                    value={category.name}
                    readonly={true}
                  />
                </IonItem>
                <IonItem>
                  <IonIcon slot="start" icon={noteIcon} />
                  <IonInput
                    type="text"
                    placeholder="Note"
                    value={note}
                    onIonChange={(event) => setNote(event.detail.value!)}
                  />
                </IonItem>
              </IonList>
              <IonList>
                <IonLabel>To</IonLabel>
                {/* WALLET ITEM */}
                <SelectWalletPopover
                  wallet={toWallet!}
                  setWallet={(data: Wallet) => setToWallet(data)}
                />
              </IonList>
              <IonList>
                <IonLabel>Options</IonLabel>
                <IonItem lines="none">
                  <IonCheckbox
                    slot="start"
                    checked={excludeFromReport}
                    onIonChange={(e) => setExcludeFromReport(e.detail.checked)}
                  />
                  <IonLabel>
                    <h2>Exclude from report</h2>
                    <h3>
                      There transaction will be excluded from report in both
                      wallets
                    </h3>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          </IonPage>
        </Route>
      </IonRouterOutlet>
      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        header={"Alert"}
        message={alertMessage1}
        buttons={["OK"]}
      />
      <IonAlert
        isOpen={showAlert2}
        onDidDismiss={() => setShowAlert2(false)}
        header={"Alert"}
        message={alertMessage2}
        buttons={["OK"]}
      />
    </IonModal>
  );
};

export default TransferMoney;
