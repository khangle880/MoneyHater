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
import { firestore } from "../../firebase";
import useLongPress from "../../CustomFunction/useLongPress";
import { formatMoney, useAuth, Wallet, wallets } from "../../Necessary/components";
import { walletBlockedIcon, walletIcon } from "../../Necessary/icons";

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
  const [popoverOption, setShowPopoverOption] = useState({
    showPopover: false,
    event: undefined,
  });
  const { userId } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  const onLongPress = (e: any) => {
    e.persist();
    setShowPopoverOption({ showPopover: true, event: e });
  };

  const onClick = () => {
    if (currentWallet.state) handleSelect();
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
      <IonItem>
        <IonThumbnail slot="start" {...longPressEvent}>
          <IonImg src={currentWallet.state ? walletIcon : walletBlockedIcon} />
        </IonThumbnail>
        <IonLabel {...longPressEvent}>
          <h2>{currentWallet.name}</h2>
          <h3>{` ${formatMoney(currentWallet.balance)} ${
            currentWallet.currency_object.symbol
          }`}</h3>
        </IonLabel>
        <IonButton
          onClick={(e: any) => {
            e.persist();
            setShowPopoverOption({ showPopover: true, event: e });
          }}
          fill="clear"
        >
          <IonIcon icon={selectsIcon} />
        </IonButton>
      </IonItem>
      <IonPopover
        event={popoverOption.event}
        isOpen={popoverOption.showPopover}
        onDidDismiss={() =>
          setShowPopoverOption({ showPopover: false, event: undefined })
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
              setShowPopoverOption({ showPopover: false, event: undefined });
            }}
          >
            {currentWallet.state ? "Block" : "Unblock"}
          </IonButton>
          <IonButton
            onClick={(e: any) => {
              e.persist();
              setShowPopoverOption({ showPopover: false, event: undefined });
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
