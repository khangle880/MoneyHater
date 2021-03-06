import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Wallet, wallets } from "../../Models/Wallets";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import WalletItem from "./WalletItem";
import { setCurrentWallet } from "../../Necessary/components";
import { add } from "ionicons/icons";

const ManageWallets: React.FC<{ initNeedRender: boolean }> = ({
  initNeedRender,
}) => {
  const history = useHistory();
  const [needRender, setNeedRender] = useState(initNeedRender);
  const forceRender = () => setNeedRender(!needRender);

  useEffect(() => {
    setTimeout(() => {
      setNeedRender(!needRender);
    }, 2000);
  }, [needRender]);
  useEffect(() => () => {});

  const handleSelectWallet = (data: Wallet) => {
    setCurrentWallet(data);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              className="icon-padding"
              defaultHref="/my/transactions"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>Manage Wallets</IonTitle>
          <IonButtons slot="end">
            <IonButton size="large" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {wallets.map((child) => (
            <WalletItem
              wallet={child}
              handleDeleteWallet={forceRender}
              handleSelect={() => handleSelectWallet(child)}
              key={child.id}
            />
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/my/manage-wallets/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ManageWallets;
