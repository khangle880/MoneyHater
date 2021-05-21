import {
  IonButton,
  IonImg,
  IonItem,
  IonLabel,
  IonThumbnail,
} from "@ionic/react";
import React, { useState } from "react";
import { Category } from "../../Models/Categories";
interface props {
  handleClick: (data: Category) => void;
  data: Category;
}

const CategoryItem: React.FC<props> = ({ data: root, handleClick }) => {
  const [isLimit, SetIsLimit] = useState(
    root.children?.length! <= 2 ? false : true
  );

  return (
    <li>
      <IonItem button onClick={() => handleClick(root)}>
        <IonThumbnail slot="start">
          <IonImg src={root.icon} />
        </IonThumbnail>
        <IonLabel>{root.name}</IonLabel>
      </IonItem>
      <ul>
        {root.children
          ?.slice(0, isLimit ? 2 : root.children?.length)
          .map((child) => (
            <li key={child.id}>
              <IonItem button onClick={() => handleClick(child)}>
                <IonThumbnail slot="start">
                  <IonImg src={child.icon} />
                </IonThumbnail>
                <IonLabel>{child.name}</IonLabel>
              </IonItem>
            </li>
          ))}
        {isLimit && (
          <li>
            <IonButton onClick={() => SetIsLimit(false)}>See More</IonButton>
          </li>
        )}
      </ul>
    </li>
  );
};

export default CategoryItem;
