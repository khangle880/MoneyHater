import { IonImg, IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import React from "react";
import { Category } from "../../models";

interface props {
  handleClick: (data: Category) => void;
  data: Category;
}

const CategoryItem: React.FC<props> = ({ data: root, handleClick }) => {
  return (
    <li>
      <IonItem button onClick={() => handleClick(root!)}>
        <IonThumbnail slot="start">
          <IonImg src={root?.icon} />
        </IonThumbnail>
        <IonLabel>{root?.name}</IonLabel>
      </IonItem>
      <ul>
        {root?.children?.map((child) => (
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
