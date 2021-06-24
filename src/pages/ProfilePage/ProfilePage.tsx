import React from "react";
//? IONIC COMPONENT
import {
  IonContent,
  IonPage,
  IonButton,
  IonCard,
  IonIcon,
  IonAvatar,
  IonItem,
  IonLabel,
} from "@ionic/react";

import {
  chevronForwardOutline,
  walletSharp,
  personSharp,
  appsSharp,
  keySharp,
  settingsSharp,
  bookmarks,
  remove
} from "ionicons/icons";

import { auth } from "../../firebase";

import "./ProfilePage.scss";
import {
  adsIcon,
  avatarIcon,
  premiumIcon,
  storeIcon,
} from "../../Necessary/icons";
import { currentWallet } from "../../Necessary/components";

const ProfilePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="profile-content" fullscreen forceOverscroll={true} scrollY={false}>
        <div className="profile-container">
          <div className="info-container">
            <div className="label-container">
              <p style={{ color: "#3f4881", fontSize: 20, fontWeight:500 }}>HELLO!</p>
              <p
                style={{
                  color: "#293B5F",
                  fontSize: 40,
                  fontWeight: 700,
                  marginLeft: 10,
                  marginBottom: 0
                }}
              >
                Minh Hieu
              </p>
            </div>

            <IonAvatar>
              <img src={avatarIcon} alt="avatar" />
            </IonAvatar>
          </div>

          <div className="profile-details">
            <IonIcon icon={remove}/>
            <p>{currentWallet.name}</p>
            <IonIcon icon={remove}/>
          </div>
        </div>

        <IonCard className="profile-card">
          <IonCard className="card-items">
            <div className="top-premium-button">
              <div>
                <IonButton className="profile-button">
                  <IonIcon icon={adsIcon} />
                </IonButton>
                <p className="ion-text-center">ADS</p>
              </div>

              <div>
                <IonButton className="profile-button premium-button">
                  <IonIcon icon={premiumIcon} />
                </IonButton>
                <p style={{ color: "#daa520" }} className="ion-text-center">
                  PREMIUM
                </p>
              </div>

              <div>
                <IonButton className="profile-button">
                  <IonIcon icon={storeIcon} />
                </IonButton>
                <p className="ion-text-center">STORE</p>
              </div>
            </div>
          </IonCard>

          <IonCard className="card-items">
            <IonItem routerLink="/my/my-profile" detail={false}>
              <IonIcon icon={personSharp} />
              <IonLabel>Profile</IonLabel>
              <IonIcon icon={chevronForwardOutline} />
            </IonItem>
            <IonItem routerLink="/my/manage-wallets" detail={false}>
              <IonIcon icon={walletSharp} />
              <IonLabel>Wallets</IonLabel>
              <IonIcon icon={chevronForwardOutline} />
            </IonItem>
            <IonItem routerLink="/my/profile/debts" detail={false}>
              <IonIcon icon={bookmarks} />
              <IonLabel>Debts</IonLabel>
              <IonIcon icon={chevronForwardOutline} />
            </IonItem>
            <IonItem>
              <IonIcon icon={appsSharp} />
              <IonLabel>Categories</IonLabel>
              <IonIcon icon={chevronForwardOutline} />
            </IonItem>
          </IonCard>

          <IonCard className="card-items">
            <IonItem>
              <IonIcon icon={keySharp} />
              <IonLabel>Change Password</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={settingsSharp} />
              <IonLabel>Setting</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard className="card-items">
            <IonItem onClick={() => auth.signOut()}>
              <IonIcon />
              <IonLabel className="sign-out ion-text-center">SIGN OUT</IonLabel>
            </IonItem>
          </IonCard>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
