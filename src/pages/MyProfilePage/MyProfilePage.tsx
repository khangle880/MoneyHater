import {
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonItem,
  IonPage,
} from "@ionic/react";
import React from "react";

import { person, mail, star, camera, arrowBack } from "ionicons/icons";

import "./MyProfilePage.scss";

import { useHistory } from "react-router";
import { avatarIcon } from "../../Necessary/icons";

const MyProfilePage: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent
        className="my-profile-content"
        fullscreen
        forceOverscroll={true}
        scrollY={false}
      >
        <IonButton
          onClick={() => {
            history.goBack();
          }}
        >
          <IonIcon icon={arrowBack} />
        </IonButton>
        <div className="avatar-container">
          <p style={{ color: "#A2DBFA", fontSize: "1.5rem", fontWeight: 700 }}>
            Edit profile
          </p>
          <p style={{ color: "#39A2DB", fontSize: "0.8rem", fontWeight: 700 }}>
            Custom your personal information
          </p>
          <IonAvatar>
            <img src={avatarIcon} alt="avatar" />
          </IonAvatar>
          <IonIcon icon={camera} />
        </div>

        <div className="my-profile-container">
          <IonCard className="my-profile-card">
            <IonItem className="top-profile-item" lines="none">
              <IonIcon icon={person} />
              <div>
                <p>Username</p>
                <p>Vo Doan Minh Hieu</p>
              </div>
            </IonItem>
            <IonItem lines="none">
              <IonIcon icon={mail} />
              <div>
                <p>Email</p>
                <p>admin@admin.com</p>
              </div>
            </IonItem>
            <IonItem className="bottom-profile-item" lines="none">
              <IonIcon icon={star} />
              <div>
                <p>Premium status</p>
                <p>Inactive</p>
              </div>
            </IonItem>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyProfilePage;
