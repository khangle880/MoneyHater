import React from "react";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonPage,
} from "@ionic/react";
import "./test.css";

const options = {
  cssClass: "my-custom-interface",
};

export const Test: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonItem>
          <IonLabel>Select: Alert Interface</IonLabel>
          <IonSelect interfaceOptions={options}>
            <IonSelectOption value="brown">Brown</IonSelectOption>
            <IonSelectOption value="blonde">Blonde</IonSelectOption>
            <IonSelectOption value="black">Black</IonSelectOption>
            <IonSelectOption value="red">Red</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Select: Alert Interface (Multiple Selection)</IonLabel>
          <IonSelect interfaceOptions={options} multiple={true}>
            <IonSelectOption value="brown">Brown</IonSelectOption>
            <IonSelectOption value="blonde">Blonde</IonSelectOption>
            <IonSelectOption value="black">Black</IonSelectOption>
            <IonSelectOption value="red">Red</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Select: Popover Interface</IonLabel>
          <IonSelect interface="popover" interfaceOptions={options}>
            <IonSelectOption value="brown">Brown</IonSelectOption>
            <IonSelectOption value="blonde">Blonde</IonSelectOption>
            <IonSelectOption value="black">Black</IonSelectOption>
            <IonSelectOption value="red">Red</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Select: Action Sheet Interface</IonLabel>
          <IonSelect interface="action-sheet" interfaceOptions={options}>
            <IonSelectOption value="brown">Brown</IonSelectOption>
            <IonSelectOption value="blonde">Blonde</IonSelectOption>
            <IonSelectOption value="black">Black</IonSelectOption>
            <IonSelectOption value="red">Red</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

// import { useLongPress } from "react-use";

// export const Test = () => {
//   const onLongPress = () => {
//     console.log("calls callback after long pressing 300ms");
//   };

//   const defaultOptions = {
//     isPreventDefault: true,
//     delay: 300,
//   };
//   const longPressEvent = useLongPress(onLongPress, defaultOptions);

//   return <button {...longPressEvent}>useLongPress</button>;
// };
