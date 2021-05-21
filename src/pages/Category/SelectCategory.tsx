import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import { categories, Category } from "../../Models/Categories";
import CategoryItem from "./CategoryItem";

interface props {
  handleSelect: (data: Category) => void;
}

const SelectCategory: React.FC<props> = ({ handleSelect }) => {
  const history = useHistory();

  const handleSelectItem = (data: Category) => {
    handleSelect(data);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton className="icon-padding" />
          </IonButtons>
          <IonTitle>Select Category</IonTitle>
          <IonButtons slot="end">
            <IonButton size="large" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ul>
          {categories?.map((category) => (
            <CategoryItem
              key={category.id}
              handleClick={handleSelectItem}
              data={category}
            />
          ))}
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default SelectCategory;
