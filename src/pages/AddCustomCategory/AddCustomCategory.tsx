import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPopover,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline as closeIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import connectIcon from "../../icons/icons8-connect.svg";

import {
  addCustomCategories,
  categories,
  Category,
} from "../../Models/Categories";
import { Wallet } from "../../Models/Wallets";
import { useAuth } from "../../auth";
import { currentWallet } from "../../Models/LoadData";
import SelectWalletPopover from "../SelectWallet/SelectWalletPopover";
import SelectIconPopover from "../SelectIcon/SelectIconPopover";

const AddCustomCategory: React.FC<{ type: string; beforePath: string }> = ({
  type: newCategoryType,
  beforePath: backToPath,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState(newCategoryType);
  const [parentCategory, setParentCategory] = useState<Category>();
  const [wallet, setWallet] = useState<Wallet>(currentWallet);
  const [popoverRootCategory, setShowPopoverRootCategory] = useState({
    showPopover: false,
    event: undefined,
  });

  const history = useHistory();
  const { userId } = useAuth();
  const alertMessage = "You must fill all fields";

  useEffect(() => () => {}, []);

  const handleSave = () => {
    if (icon && name && icon && parentCategory) {
      const newRawTransaction = {
        type: type,
        name: name,
        icon: icon,
        parent: parentCategory.id,
      };
      addCustomCategories(newRawTransaction, userId!, wallet);
      history.goBack();
    } else setShowAlert(true);
  };

  return (
    <IonModal isOpen={true}>
      <IonHeader>
        <IonToolbar className="toolbar-medium">
          <IonButtons slot="start">
            <IonBackButton icon={closeIcon} text="" defaultHref={backToPath} />
          </IonButtons>
          <IonTitle>Add Category</IonTitle>
          <IonButtons slot="end">
            <IonButton size="large" onClick={() => handleSave()}>
              SAVE
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList className="block">
          {/* ICON ITEM */}
          <IonItem lines="inset" button>
            <SelectIconPopover
              icon={icon}
              setIcon={(data: string) => setIcon(data)}
            />
            <IonInput
              value={name}
              onIonChange={(event) => setName(event.detail.value!)}
            />
          </IonItem>
          {/* TYPE ITEM */}
          <IonItem lines="inset">
            <IonItem>
              <IonLabel>Expense</IonLabel>
              <IonCheckbox
                checked={type === "Expense"}
                onIonChange={(event) =>
                  event.detail.checked ? setType("Expense") : setType("Income")
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel>Income</IonLabel>
              <IonCheckbox
                checked={type === "Income"}
                onIonChange={(event) =>
                  event.detail.checked ? setType("Income") : setType("Expense")
                }
              />
            </IonItem>
          </IonItem>
          {/* CATEGORY ITEM */}
          <IonItem
            lines="inset"
            button
            onClick={(e: any) => {
              e.persist();
              setShowPopoverRootCategory({ showPopover: true, event: e });
            }}
          >
            <IonIcon icon={connectIcon} />
            <IonInput
              placeholder="Select Category"
              value={parentCategory?.name}
              readonly={true}
            />
          </IonItem>
          {/* WALLET ITEM */}
          <SelectWalletPopover
            wallet={wallet}
            setWallet={(data: Wallet) => setWallet(data)}
          />
        </IonList>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Alert"}
        message={alertMessage}
        buttons={["OK"]}
      />
      <IonPopover
        event={popoverRootCategory.event}
        isOpen={popoverRootCategory.showPopover}
        onDidDismiss={() =>
          setShowPopoverRootCategory({ showPopover: false, event: undefined })
        }
      >
        {console.log(type)}
        {console.log(categories?.filter((child) => child.type === type))}
        <IonList>
          {categories
            ?.filter((child) => child.type === type)
            .map((category) => (
              <IonItem
                button
                key={category.id}
                onClick={() => {
                  setParentCategory(category);
                  setShowPopoverRootCategory({
                    showPopover: false,
                    event: undefined,
                  });
                }}
              >
                <IonThumbnail slot="start">
                  <IonImg src={category.icon} />
                </IonThumbnail>
                <IonLabel>{category.name}</IonLabel>
              </IonItem>
            ))}
        </IonList>
      </IonPopover>
    </IonModal>
  );
};

export default AddCustomCategory;
