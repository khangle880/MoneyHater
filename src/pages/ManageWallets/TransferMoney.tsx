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
  IonPopover,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import connectIcon from "../../icons/icons8-connect.svg";

import { categories, Category } from "../../Models/Categories";
import { Wallet, wallets } from "../../Models/Wallets";
import { useAuth } from "../../auth";
import noteIcon from "../../icons/icons8-note.svg";
import { firestore } from "../../firebase";
import SelectWalletPopover from "../SelectWallet/SelectWalletPopover";

interface RouteParams {
  id: string;
}

const TransferMoney: React.FC = () => {
  const { id } = useParams<RouteParams>();

  const [showAlert, setShowAlert] = useState(false);
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

  const [popoverCategory, setShowPopoverCategory] = useState({
    showPopover: false,
    event: undefined,
  });

  const history = useHistory();
  const { userId } = useAuth();
  const alertMessage = "You must fill amount and to-wallet fields";

  const handleSave = () => {
    if (amount && fromWallet && category && toWallet) {
      fromWallet.balance -= amount;
      toWallet.balance += amount;
      console.log();
      firestore
        .collection("users")
        .doc(userId)
        .collection("wallets")
        .doc(id)
        .update({ balance: fromWallet.balance });

      firestore
        .collection("users")
        .doc(userId)
        .collection("wallets")
        .doc(toWallet.id)
        .update({ balance: toWallet.balance });

      history.goBack();
    } else setShowAlert(true);
  };

  return (
    <IonModal isOpen={true}>
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
          {/* ICON ITEM */}
          <IonItem lines="inset" button>
            <IonInput
              type="number"
              value={amount}
              onIonChange={(event) => setAmount(parseInt(event.detail.value!))}
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
            button
            onClick={(e: any) => {
              e.persist();
              setShowPopoverCategory({ showPopover: true, event: e });
            }}
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
                There transaction will be excluded from report in both wallets
              </h3>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Alert"}
        message={alertMessage}
        buttons={["OK"]}
      />
      <IonPopover
        event={popoverCategory.event}
        isOpen={popoverCategory.showPopover}
        onDidDismiss={() =>
          setShowPopoverCategory({ showPopover: false, event: undefined })
        }
      >
        <IonList>
          {categories?.map((category) => (
            <IonItem
              button
              key={category.id}
              onClick={() => {
                setCategory(category);
                setShowPopoverCategory({
                  showPopover: false,
                  event: undefined,
                });
              }}
            >
              <IonThumbnail slot="start">
                <IonImg src={category.icon} />
              </IonThumbnail>
              <IonLabel>{category.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonPopover>
    </IonModal>
  );
};

export default TransferMoney;
