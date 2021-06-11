import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPopover,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import React, { useState } from "react";
import questionSvg from "../../icons/icons8-question.svg";
import { icons } from "../../Models/Icons";

interface props {
  icon: string;
  setIcon: (data: string) => void;
}

const SelectIconPopover: React.FC<props> = ({ icon, setIcon }) => {
  const [popoverIcon, setShowPopoverIcon] = useState({
    showPopover: false,
    event: undefined,
  });

  return (
    <React.Fragment>
      <IonImg
        slot="start"
        src={icon === "" ? questionSvg : icon}
        onClick={(e: any) => {
          e.persist();
          setShowPopoverIcon({ showPopover: true, event: e });
        }}
      />
      <IonPopover
        event={popoverIcon.event}
        isOpen={popoverIcon.showPopover}
        onDidDismiss={() =>
          setShowPopoverIcon({ showPopover: false, event: undefined })
        }
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Select Icon</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            {icons &&
              icons.map((children, i) => (
                <IonRow key={i}>
                  {children.map((child, j) => (
                    <IonCol key={j}>
                      <IonImg
                        onClick={() => {
                          setIcon(child);
                          setShowPopoverIcon({
                            showPopover: false,
                            event: undefined,
                          });
                        }}
                        src={child}
                      />
                    </IonCol>
                  ))}
                </IonRow>
              ))}
          </IonGrid>
        </IonContent>
      </IonPopover>
    </React.Fragment>
  );
};

export default SelectIconPopover;
