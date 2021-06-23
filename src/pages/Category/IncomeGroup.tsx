import { IonButton, IonIcon, IonItem } from "@ionic/react";
import { add } from "ionicons/icons";
import React from "react";
import { useHistory, useRouteMatch } from "react-router";
import { categories, Category } from "../../Models/Categories";
import CategoryItem from "./CategoryItem";

interface props {
  handleSelect: (data: Category) => void;
}

const IncomeGroup: React.FC<props> = ({ handleSelect }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const rootPath = match.url.substring(0, match.url.length - 7);
  const handleSelectItem = (data: Category) => {
    handleSelect(data);
    history.replace(rootPath.substring(0, rootPath.length - 11));
  };

  return (
    <ul className="categories-tree">
      {categories
        ?.filter((child) => child.type === "Income")
        .map((category) => (
          <CategoryItem
            key={category.id}
            handleClick={handleSelectItem}
            data={category}
          />
        ))}
      <IonItem
        className="add-new-category"
        routerLink={`${rootPath}/add-custom`}
      >
        <IonIcon icon={add} />
        <IonButton fill="clear">New Category</IonButton>
      </IonItem>
    </ul>
  );
};

export default IncomeGroup;
