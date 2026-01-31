

import { useState } from "react";
import CategoryTable from "./CategoryTable";
import SubCategoryTable from "./SubCategoryTable";
import FoodItemTable from "./FoodItemTable";
import "../../styles/Menutable.css";

export default function AdminMenuManagement() {
  const [activeTab, setActiveTab] = useState("CATEGORY");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  return (
    <div className="container-fluid px-3">
  <div className="mb-4">
    <h4 className="fw-bold mb-1">Manage Menu</h4>
    <p className="text-muted small mb-0">
      Organize categories, subcategories and food items
    </p>
  </div>

  {/* Tabs */}
  <div className="d-flex gap-2 mb-4">
    <button
      className={`btn btn-sm rounded-pill px-4 ${
        activeTab === "CATEGORY"
          ? "btn-primary"
          : "btn-outline-secondary"
      }`}
      onClick={() => setActiveTab("CATEGORY")}
    >
      Categories
    </button>

    <button
      className={`btn btn-sm rounded-pill px-4 ${
        activeTab === "SUBCATEGORY"
          ? "btn-primary"
          : "btn-outline-secondary"
      }`}
      disabled={!selectedCategory}
      onClick={() => setActiveTab("SUBCATEGORY")}
    >
      Subcategories
    </button>

    <button
      className={`btn btn-sm rounded-pill px-4 ${
        activeTab === "FOOD"
          ? "btn-primary"
          : "btn-outline-secondary"
      }`}
      disabled={!selectedSubCategory}
      onClick={() => setActiveTab("FOOD")}
    >
      Food Items
    </button>
  </div>

  {/* Content Card */}
  <div className="card border-0 shadow-sm rounded-4">
    <div className="card-body p-4">
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
  </div>
</div>
  );
}
