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
import React from "react";
import { useHistory } from "react-router";
import { currencyList } from "../../LoadedData/CurrencyList";
import { CurrencyUnit } from "../../models";

interface props {
  handleSelect: (data: CurrencyUnit) => void;
}

const SelectCurrencyUnit: React.FC<props> = ({ handleSelect }) => {
  const history = useHistory();

  const handleSelectItem = (data: CurrencyUnit) => {
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
      <IonContent className="ion-padding">
        <IonList>
          {currencyList.map((child) => (
            <IonItem
              button
              key={child.key}
              onClick={() => handleSelectItem(child)}
            >
              <IonThumbnail slot="start">
                <IonImg src={child.icon} />
              </IonThumbnail>
              <IonLabel>
                <h2>{child.name}</h2>
                <h3>{child.iso}</h3>
                <h3>{child.rate_us}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SelectCurrencyUnit;
