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
import { useHistory } from "react-router";
import { WalletEvent } from "../../Models/Events";

interface props {
  listEvent: WalletEvent[];
  handleSelect: (data: WalletEvent) => void;
}

const SelectWalletEvent: React.FC<props> = ({ listEvent, handleSelect }) => {
  const history = useHistory();

  const handleSelectItem = (data: WalletEvent) => {
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
          <IonTitle>Select Event</IonTitle>
          <IonButtons slot="end">
            <IonButton size="large" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {listEvent.map((child) => (
            <IonItem
              button
              key={child.id}
              onClick={() => handleSelectItem(child)}
            >
              <IonThumbnail slot="start">
                <IonImg src={child.icon} />
              </IonThumbnail>
              <IonLabel>
                <h2>{child.name}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SelectWalletEvent;
