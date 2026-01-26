import { useState } from "react";
import CategoryTable from "./CategoryTable";
import SubCategoryTable from "./SubCategoryTable";
import FoodItemTable from "./FoodItemTable";
import "../../styles/adminMenu.css";

export default function AdminMenuManagement() {
  const [activeTab, setActiveTab] = useState("CATEGORY");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  return (
    <div className="admin-card">
      <h4 className="mb-3">Manage Menu Structure</h4>

      <div className="menu-tabs">
        <button
          type="button"
          className={activeTab === "CATEGORY" ? "tab active" : "tab"}
          onClick={() => setActiveTab("CATEGORY")}
        >
          Categories
        </button>

        <button
          type="button"
          className={activeTab === "SUBCATEGORY" ? "tab active" : "tab"}
          disabled={!selectedCategory}
          onClick={() => setActiveTab("SUBCATEGORY")}
        >
          Subcategories
        </button>

        <button
          type="button"
          className={activeTab === "FOOD" ? "tab active" : "tab"}
          disabled={!selectedSubCategory}
          onClick={() => setActiveTab("FOOD")}
        >
          Food Items
        </button>
      </div>

      {activeTab === "CATEGORY" && (
        <CategoryTable
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSelectedSubCategory(null);
            setActiveTab("SUBCATEGORY");
          }}
        />
      )}

      {activeTab === "SUBCATEGORY" && selectedCategory && (
        <SubCategoryTable
          category={selectedCategory}
          onSelectSubCategory={(sub) => {
            setSelectedSubCategory(sub);
            setActiveTab("FOOD");
          }}
        />
      )}

      {activeTab === "FOOD" && selectedSubCategory && (
        <FoodItemTable subCategory={selectedSubCategory} />
      )}
    </div>
  );
}
