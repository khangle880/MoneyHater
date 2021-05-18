import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../auth";
import { auth } from "../firebase";

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: String("") });
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("Credential: ", credential);
    } catch (e) {
      setStatus({ loading: false, error: e.code });
    }
  };

  if (loggedIn) return <Redirect to="/my/entries" />;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(event) => {
                if (event.detail.value === undefined) return;
                setEmail(String(event.detail.value));
              }}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(event) => {
                if (event.detail.value === undefined) return;
                setPassword(String(event.detail.value));
              }}
            />
          </IonItem>
        </IonList>
        {status.error && <IonText color="danger">{status.error}</IonText>}
        <IonLoading isOpen={status.loading} />
        <IonButton expand="block" onClick={handleRegister}>
          Register
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          ALREADY HAVE A ACCOUNT?
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
