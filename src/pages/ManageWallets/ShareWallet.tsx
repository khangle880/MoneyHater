import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../auth";
import { firestore } from "../../firebase";
import { wallets } from "../../Models/Wallets";

interface RouteParams {
  id: string;
}

const ShareWallet: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();
  const { userId } = useAuth();
  const { id } = useParams<RouteParams>();
  const alertMessage = "You must fill a email";

  useEffect(() => () => {}, []);

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleShare = () => {
    if (email && validateEmail(email)) {
      const currentWallet = wallets.find((wallet) => wallet.id === id);
      currentWallet?.members.push(email);
      firestore
        .collection("users")
        .doc(userId)
        .collection("wallets")
        .doc(id)
        .update({ members: currentWallet?.members });

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
          <IonTitle>Share Wallet</IonTitle>
          <IonButtons slot="end">
            <IonButton size="large" onClick={() => handleShare()}>
              SHARE
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList className="block">
          {/* EMAIL ITEM */}
          <IonItem lines="inset">
            <IonInput
              type="email"
              placeholder="Email"
              value={email}
              onIonChange={(event) => setEmail(event.detail.value!)}
            />
          </IonItem>
          {/* MESSAGE ITEM */}
          <IonItem lines="inset">
            <IonInput
              placeholder="Message"
              value={message}
              onIonChange={(event) => setMessage(event.detail.value!)}
            />
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
    </IonModal>
  );
};

export default ShareWallet;
