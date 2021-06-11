import {
  IonAlert,
  IonButton,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonThumbnail,
} from "@ionic/react";
import React, { useState } from "react";
import { ellipsisHorizontalSharp as selectsIcon } from "ionicons/icons";
import { Wallet, wallets } from "../../Models/Wallets";
import walletIcon from "../../icons/icons8-coin-wallet.svg";
import walletBlockedIcon from "../../icons/icons8-block-wallet.svg";
import { firestore } from "../../firebase";
import { useAuth } from "../../auth";
import useLongPress from "../../customHook/useLongPress";

interface props {
  currentWallet: Wallet;
  handleSelect: () => void;
  handleDeleteWallet: () => void;
}

const WalletItem: React.FC<props> = ({
  currentWallet,
  handleSelect,
  handleDeleteWallet,
}) => {
  const [popoverWallet, setShowPopoverWallet] = useState({
    showPopover: false,
    event: undefined,
  });
  const { userId } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  const onLongPress = (e: any) => {
    e.persist();
    setShowPopoverWallet({ showPopover: true, event: e });
  };

  const onClick = () => {
    handleSelect();
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  const switchWalletState = () => {
    currentWallet.state = !currentWallet.state;
    return firestore
      .collection("users")
      .doc(userId)
      .collection("wallets")
      .doc(currentWallet.id)
      .update({ state: currentWallet.state });
  };

  const handleDelete = () => {
    const index = wallets.indexOf(currentWallet);
    if (index > -1) {
      wallets.splice(index, 1);
    }
    firestore
      .collection("users")
      .doc(userId)
      .collection("wallets")
      .doc(currentWallet.id)
      .delete();

    handleDeleteWallet();
  };

  return (
    <React.Fragment>
      <IonItem {...longPressEvent}>
        <IonThumbnail slot="start">
          <IonImg src={currentWallet.state ? walletIcon : walletBlockedIcon} />
        </IonThumbnail>
        <IonLabel>
          <h2>{currentWallet.name}</h2>
          <h3>{`${currentWallet.balance} ${currentWallet.currency_object.symbol}`}</h3>
        </IonLabel>
        <IonButton
          onClick={(e: any) => {
            e.persist();
            setShowPopoverWallet({ showPopover: true, event: e });
          }}
          fill="clear"
        >
          <IonIcon icon={selectsIcon} />
        </IonButton>
      </IonItem>
      <IonPopover
        event={popoverWallet.event}
        isOpen={popoverWallet.showPopover}
        onDidDismiss={() =>
          setShowPopoverWallet({ showPopover: false, event: undefined })
        }
      >
        <IonList>
          <IonButton
            routerLink={`/my/manage-wallets/${currentWallet.id}/share`}
          >
            Share
          </IonButton>
          {currentWallet.state && (
            <IonButton
              routerLink={`/my/manage-wallets/${currentWallet.id}/transfer-money`}
              onClick={() => {
                console.log("hello");
              }}
            >
              Transfer money
            </IonButton>
          )}
          {currentWallet.state && (
            <IonButton
              onClick={() => {
                console.log("hello");
              }}
            >
              Edit
            </IonButton>
          )}
          <IonButton
            onClick={(e: any) => {
              switchWalletState();
              e.persist();
              setShowPopoverWallet({ showPopover: false, event: undefined });
            }}
          >
            {currentWallet.state ? "Block" : "Unblock"}
          </IonButton>
          <IonButton
            onClick={(e: any) => {
              e.persist();
              setShowPopoverWallet({ showPopover: false, event: undefined });
              if (currentWallet.state) {
                setShowAlert(true);
              } else handleDelete();
            }}
          >
            Delete
          </IonButton>
        </IonList>
      </IonPopover>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Alert"}
        message="wallet is not locked"
        buttons={["OK"]}
      />
    </React.Fragment>
  );
};

export default WalletItem;
