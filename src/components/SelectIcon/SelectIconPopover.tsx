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
import "./SelectIconPopover.scss";

import React, { useState } from "react";
import { icons } from "../../Necessary/components";
import { questionIcon } from "../../Necessary/icons";

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
        className="img-icon"
        slot="start"
        src={icon === "" ? questionIcon : icon}
        onClick={(e: any) => {
          e.persist();
          setShowPopoverIcon({ showPopover: true, event: e });
        }}
      />
      <IonPopover
        cssClass="icons-popover"
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
