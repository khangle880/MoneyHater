import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonIcon,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { Redirect } from "react-router";

/* ICON */
import { personCircleOutline, lockClosedOutline } from "ionicons/icons";
import { googleIcon, signInIcon, signUpIcon } from "../Necessary/icons";

/* Style CSS */
// @ts-ignore
import { SemipolarLoading } from "react-loadingg";
import "../common/_common.scss";
import "./LoginPage.scss";

/* Context */
import { useAuth } from "../auth";

/* Firebase */
import { auth, firestore } from "../firebase";
import { Timeout } from "../common/common";

const LoginPage: React.FC = () => {
  /* State */
  const [switchUI, setSwitchUI] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRequestError, setIsRequestError] = useState(false);
  const [requestErrorDetail, setRequestErrorDetail] = useState("");

  const [loading, setLoading] = useState(false);

  const SwitchUI = async () => {
    switchUI ? setSwitchUI(false) : setSwitchUI(true);

    await Timeout(1000);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsRequestError(false);
    setRequestErrorDetail("");
  };

  const handleLogin = async () => {
    console.log("\x1b[36m%s\x1b[0m", "email", email);
    console.log("\x1b[36m%s\x1b[0m", "password", password);
    setLoading(true);

    try {
      setIsRequestError(false);
      const credential = await auth.signInWithEmailAndPassword(email, password);
      setLoading(false);
      console.log("Credential", credential);
      console.log("Hello World finished Data");
    } catch (error) {
      setIsRequestError(true);
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          setRequestErrorDetail("Invalid email address");
          break;
        case "auth/user-not-found":
          setRequestErrorDetail("Email or Password is wrong");
          break;
        case "auth/wrong-password":
          setRequestErrorDetail("Email or Password is wrong");
          break;
        default:
          setRequestErrorDetail("Please check your internet connection");
          break;
      }
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    console.log("\x1b[36m%s\x1b[0m", "email", email);
    console.log("\x1b[36m%s\x1b[0m", "password", password);
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
      setIsRequestError(true);
      setRequestErrorDetail("Passwords do not match");
    } else {
      try {
        setIsRequestError(false);
        const credential = await auth
          .createUserWithEmailAndPassword(email, password)
          .then(function (userCreated) {
            if (userCreated.user) {
              firestore
                .collection("users")
                .doc(userCreated.user.uid)
                .set({
                  email: email,
                  premium_status: false,
                  name: email.split("@")[0],
                });
            }
          });
        const signIn = await auth.signInWithEmailAndPassword(email, password);
        setLoading(false);
      } catch (error) {
        setIsRequestError(true);

        switch (error.code) {
          case "auth/weak-password":
            setRequestErrorDetail("Your password is too weak");
            break;
          case "auth/email-already-in-use":
            setRequestErrorDetail("Your email is already in used");
            break;
          default:
            setRequestErrorDetail("Please check your internet connection");
            break;
        }
        setLoading(false);
      }
    }
  };

  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Redirect to="/my/transactions" />;
  }
  return (
    <IonPage>
      <IonContent
        className="login-content"
        fullscreen
        forceOverscroll={true}
        scrollY={false}
      >
        <div className={`container ${switchUI ? "sign-up-mode" : ""}`}>
          <div className="form-container">
            <div className="signin-signup">
              <form className="sign-in-form">
                <h1 className="ion-text-center">Sign in</h1>
                <IonItem lines="none">
                  <IonIcon icon={personCircleOutline} slot="start" />
                  <IonInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onIonChange={(event) => setEmail(event.detail.value!)}
                  ></IonInput>
                </IonItem>

                <IonItem lines="none">
                  <IonIcon icon={lockClosedOutline} slot="start" />
                  <IonInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onIonChange={(event) => setPassword(event.detail.value!)}
                  ></IonInput>
                </IonItem>
                {isRequestError && (
                  <IonText color="danger">{requestErrorDetail}</IonText>
                )}
                <IonButton className="btn" onClick={handleLogin}>
                  Sign in
                </IonButton>
                {loading && <SemipolarLoading className="loading-icon" />}

                <p className="social-text">Or sign in with social platform</p>
                <div className="social-media">
                  <a href="#" className="social-icon">
                    <IonIcon icon={googleIcon} size="large" />
                  </a>
                  <a href="#" className="social-icon">
                    <IonIcon icon={googleIcon} size="large" />
                  </a>
                  <a href="#" className="social-icon">
                    <IonIcon icon={googleIcon} size="large" />
                  </a>
                  <a href="#" className="social-icon">
                    <IonIcon icon={googleIcon} size="large" />
                  </a>
                </div>
              </form>

              <form className="sign-up-form">
                <h1 className="ion-text-center">Sign up</h1>
                <IonItem lines="none">
                  <IonIcon icon={personCircleOutline} slot="start" />
                  <IonInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onIonChange={(event) => setEmail(event.detail.value!)}
                  ></IonInput>
                </IonItem>

                <IonItem lines="none">
                  <IonIcon icon={lockClosedOutline} slot="start" />
                  <IonInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onIonChange={(event) => setPassword(event.detail.value!)}
                  ></IonInput>
                </IonItem>

                <IonItem lines="none">
                  <IonIcon icon={lockClosedOutline} slot="start" />
                  <IonInput
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onIonChange={(event) =>
                      setConfirmPassword(event.detail.value!)
                    }
                  ></IonInput>
                </IonItem>
                {isRequestError && (
                  <IonText color="danger">{requestErrorDetail}</IonText>
                )}
                <IonButton className="btn" onClick={handleRegister}>
                  Sign up
                </IonButton>
                {loading && <SemipolarLoading className="loading-icon" />}
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here ?</h3>
                <p>Create new account to experience our app!</p>
                <button
                  className="btn transparent"
                  id="sign-up-btn"
                  onClick={SwitchUI}
                >
                  Sign up
                </button>
              </div>
              <img src={signInIcon} className="image" alt="" />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us ?</h3>
                <p>Already a member? Login now!</p>
                <button
                  className="btn transparent"
                  id="sign-in-btn"
                  onClick={SwitchUI}
                >
                  Sign in
                </button>
              </div>
              <img src={signUpIcon} className="image" alt="" />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
