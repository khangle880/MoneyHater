import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { Category, toCategory } from "../models";

interface props {
  handleClick: (data: Category) => void;
  data: Category;
}

const CategoryItem: React.FC<props> = ({ data, handleClick }) => {
  const [needLoading, setNeedLoading] = useState(true);
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    const childrenRef = firestore
      .collection("categories")
      .doc(data.id)
      .collection("children");

    childrenRef.get().then(({ docs }) => {
      setCategory({ ...data, children: docs.map(toCategory) });
      setNeedLoading(false);
    });
  }, [data]);

  if (needLoading) {
    return <IonLoading isOpen={needLoading} />;
  }
  return (
    <li>
      <IonItem button onClick={() => handleClick(category!)}>
        <IonThumbnail slot="start">
          <IonImg src={category?.icon} />
        </IonThumbnail>
        <IonLabel>{category?.name}</IonLabel>
      </IonItem>
      <ul>
        {category?.children?.map((child) => (
          <li key={child.id}>
            <IonItem button onClick={() => handleClick(child)}>
              <IonThumbnail slot="start">
                <IonImg src={child?.icon} />
              </IonThumbnail>
              <IonLabel>{child.name}</IonLabel>
            </IonItem>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default CategoryItem;
