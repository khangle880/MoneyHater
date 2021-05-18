import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { firestore } from "../firebase";
import { Category, toCategory } from "../models";
import CategoryItem from "./CategoryItem";

interface props {
  handleSelect: (data: Category) => void;
}

const SelectCategory: React.FC<props> = ({ handleSelect }) => {
  const [needLoading, setNeedLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const history = useHistory();

  useEffect(() => {
    firestore
      .collection("categories")
      .get()
      .then(({ docs }) => {
        setCategories(docs.map(toCategory));
        setNeedLoading(false);
      });
  }, []);

  const handleSelectItem = (data: Category) => {
    handleSelect(data);
    history.goBack();
  };

  if (needLoading) {
    return <IonLoading isOpen={needLoading} />;
  }
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
