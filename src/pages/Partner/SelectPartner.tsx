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
  IonInput,
} from "@ionic/react";
// import alarmIcon from "../../icons/icons8-alarm-clock.svg";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../auth";
import {
  addPartner,
  Partner,
  recentPartners,
} from "../../Models/Recent_Partners";

interface props {
  currentValue: Partner;
  handlePartner: (data: Partner) => void;
}

const SelectPartner: React.FC<props> = ({ currentValue, handlePartner }) => {
  const history = useHistory();
  const { userId } = useAuth();
  const [partner, setPartner] = useState(currentValue);

  const handleSelectPartner = (data: Partner) => {
    if (data) {
      if (!recentPartners.find((partner) => partner.name === data.name)) {
        const newRawPartner = {
          name: data.name,
          time: new Date().toISOString(),
        };
        addPartner(newRawPartner, userId!);
      }
      handlePartner(data);
    }
    history.goBack();
  };

  const handleSelectItem = (data: Partner) => {
    var newData = { ...data };
    if (partner) {
      newData.name = partner.name + ", " + data.name;
    }
    setPartner(newData);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton className="icon-padding"></IonBackButton>
          </IonButtons>
          <IonTitle>With</IonTitle>
          <IonButtons slot="end">
            <IonButton
              size="large"
              onClick={() => handleSelectPartner(partner)}
            >
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput
              value={partner ? partner.name : ""}
              placeholder="With"
              onIonChange={(event) => {
                var newPartner: Partner = { ...partner };
                newPartner.name = event.detail.value!;
                setPartner(newPartner);
              }}
            />
          </IonItem>
          {recentPartners.map((child) => (
            <IonItem
              lines="none"
              button
              key={child.id}
              onClick={() => handleSelectItem(child)}
            >
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

export default SelectPartner;
