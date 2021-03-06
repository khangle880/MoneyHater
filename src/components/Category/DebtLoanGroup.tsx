import React from "react";
import { useHistory, useRouteMatch } from "react-router";
import { categories, Category } from "../../Models/Categories";
import CategoryItem from "./CategoryItem";

interface props {
  handleSelect: (data: Category) => void;
}

const DebtLoanGroup: React.FC<props> = ({ handleSelect }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const rootPath = match.url.substring(0, match.url.length - 10);
  const handleSelectItem = (data: Category) => {
    handleSelect(data);
    history.replace(rootPath.substring(0, rootPath.length - 11));
  };

  return (
    <ul className="categories-tree">
      {categories
        ?.filter((child) => child.type === "Debt & Loan")
        .map((category) => (
          <CategoryItem
            key={category.id}
            handleClick={handleSelectItem}
            data={category}
          />
        ))}
    </ul>
  );
};

export default DebtLoanGroup;
