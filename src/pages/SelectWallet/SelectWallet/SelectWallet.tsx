import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonThumbnail,
  IonImg,
} from "@ionic/react";
import "./SelectWallet.scss";

import { Wallet, wallets } from "../../../Models/Wallets";
import React from "react";
import { useHistory } from "react-router";
import { walletIcon } from "../../../Necessary/icons";

import "./SelectWallet.scss";

interface props {
  currentWallet: Wallet;
  handleSelect: (data: Wallet) => void;
}

const SelectCurrencyUnit: React.FC<props> = ({ handleSelect }) => {
  const history = useHistory();

  const handleSelectItem = (data: Wallet) => {
    handleSelect(data);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton className="icon-padding"></IonBackButton>
          </IonButtons>
          <IonTitle>Select Currency Unit</IonTitle>
          <IonButtons slot="end">
            <IonButton size="large" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding wallets-content">
        <IonList>
          {wallets.map((child) => (
            <IonItem
              button
              key={child.id}
              onClick={() => handleSelectItem(child)}
            >
              <IonThumbnail slot="start">
                <IonImg src={walletIcon} />
              </IonThumbnail>
              <IonLabel>
                <h2>{child.name}</h2>
                <h3>{child.balance}</h3>
                <h3>{child.currency}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SelectCurrencyUnit;
