import { useEffect, useState, useCallback } from "react";

export default function ManageDailyMenu() {
  const today = new Date().toISOString().split("T")[0];
  const ownerId = localStorage.getItem("userid");

  const [activeTab, setActiveTab] = useState("TODAY");
  const [menuDate, setMenuDate] = useState(today);
  const [menuType, setMenuType] = useState("LUNCH");

  const [messes, setMesses] = useState([]);
  const [selectedMessId, setSelectedMessId] = useState("");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [foodItemId, setFoodItemId] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMenuData, setViewMenuData] = useState({ LUNCH: [], DINNER: [] });

  const [toast, setToast] = useState({ show: false, msg: "", type: "" });

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "" }), 3000);
  };

  /* ---------- DATE HANDLER (TODAY ONLY) ---------- */
  const handleTodayDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate !== today) {
      showToast("Only today's date is allowed", "warning");
      return;
    }
    setMenuDate(selectedDate);
  };

  /* ---------- LOAD MESSES ---------- */
  useEffect(() => {
    if (!ownerId) return;

    fetch(`http://localhost:2025/api/messowner/messes/${ownerId}`)
      .then(res => res.json())
      .then(setMesses)
      .catch(() => showToast("Failed to load messes", "danger"));
  }, [ownerId]);

  /* ---------- LOAD CATEGORIES ---------- */
  useEffect(() => {
    fetch("http://localhost:2025/api/admin/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  /* ---------- LOAD SUBCATEGORIES ---------- */
  useEffect(() => {
    if (!categoryId) return setSubCategories([]);
    fetch(`http://localhost:2025/api/admin/subcategories/${categoryId}`)
      .then(res => res.json())
      .then(setSubCategories);
  }, [categoryId]);

  /* ---------- LOAD FOOD ITEMS ---------- */
  useEffect(() => {
    if (!subCategoryId) return setFoodItems([]);
    fetch(`http://localhost:2025/api/admin/fooditems/${subCategoryId}`)
      .then(res => res.json())
      .then(setFoodItems);
  }, [subCategoryId]);

  /* ---------- LOAD MENU SLOT ---------- */
  const loadMenuSlot = useCallback(() => {
    if (!selectedMessId) return;

    fetch(
      `http://localhost:2025/api/messowner/fetch?messId=${selectedMessId}&date=${menuDate}`
    )
      .then(res => res.json())
      .then(data => {
        const menu = (data || []).find(m => m.menuType === menuType);
        const items = (menu?.foodItems || []).map(fi => fi.foodItem);
        setSelectedItems(items);
      });
  }, [selectedMessId, menuDate, menuType]);

  useEffect(() => {
    if (activeTab === "TODAY" && selectedMessId) {
      loadMenuSlot();
    }
  }, [activeTab, selectedMessId, menuDate, menuType, loadMenuSlot]);

  /* ---------- ADD FOOD ---------- */
  const addFood = () => {
    if (!foodItemId) return showToast("Select a food item", "warning");

    const item = foodItems.find(f => f.foodItemId === Number(foodItemId));
    if (!item) return;

    if (selectedItems.some(i => i.foodItemId === item.foodItemId)) {
      return showToast("Item already added", "warning");
    }

    setSelectedItems([...selectedItems, item]);
    setFoodItemId("");
  };

  /* ---------- DELETE FOOD ---------- */
  const deleteFood = id => {
    setSelectedItems(selectedItems.filter(i => i.foodItemId !== id));
  };

  /* ---------- SAVE MENU ---------- */
  const saveMenu = async () => {
    if (!selectedMessId) return showToast("Select a mess first", "warning");

    try {
      const res = await fetch("http://localhost:2025/api/messowner/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messId: Number(selectedMessId),
          menuDate,
          menuType,
          foodItemIds: selectedItems.map(i => i.foodItemId)
        })
      });

      if (!res.ok) throw new Error();

      showToast(`${menuType} menu saved successfully`);
      setSelectedItems([]);
      setCategoryId("");
      setSubCategoryId("");
      setFoodItemId("");

    } catch {
      showToast("Failed to save menu", "danger");
    }
  };

  /* ---------- VIEW MENU ---------- */
  const viewMenu = () => {
    if (!selectedMessId) return showToast("Select a mess first", "warning");

    fetch(
      `http://localhost:2025/api/messowner/fetch?messId=${selectedMessId}&date=${menuDate}`
    )
      .then(res => res.json())
      .then(data => {
        const grouped = { LUNCH: [], DINNER: [] };
        (data || []).forEach(m => {
          grouped[m.menuType] = (m.foodItems || []).map(fi => fi.foodItem);
        });
        setViewMenuData(grouped);
      });
  };

  return (
    <div className="container mt-4">
      {toast.show && (
        <div className={`alert alert-${toast.type}`}>{toast.msg}</div>
      )}

      <div className="card p-3">
        <h5>Manage Daily Menu</h5>

        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "TODAY" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("TODAY");
                setMenuDate(today);
              }}
            >
              Today Menu
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "VIEW" ? "active" : ""}`}
              onClick={() => setActiveTab("VIEW")}
            >
              View By Date
            </button>
          </li>
        </ul>

        {/* TODAY TAB */}
        {activeTab === "TODAY" && (
          <>
            <select className="form-control mb-2" value={selectedMessId}
              onChange={e => setSelectedMessId(e.target.value)}>
              <option value="">Select Mess</option>
              {messes.map(m => (
                <option key={m.messId} value={m.messId}>
                  {m.messName}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="form-control mb-2"
              value={menuDate}
              min={today}
              max={today}
              onChange={handleTodayDateChange}
            />

            <select className="form-control mb-2"
              value={menuType}
              onChange={e => setMenuType(e.target.value)}>
              <option value="LUNCH">Lunch</option>
              <option value="DINNER">Dinner</option>
            </select>

            <select className="form-control mb-2"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}>
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.categoryId} value={c.categoryId}>
                  {c.categoryName}
                </option>
              ))}
            </select>

            <select className="form-control mb-2"
              value={subCategoryId}
              onChange={e => setSubCategoryId(e.target.value)}>
              <option value="">Select Subcategory</option>
              {subCategories.map(sc => (
                <option key={sc.subCategoryId} value={sc.subCategoryId}>
                  {sc.subCategoryName}
                </option>
              ))}
            </select>

            <select className="form-control mb-2"
              value={foodItemId}
              onChange={e => setFoodItemId(e.target.value)}>
              <option value="">Select Food</option>
              {foodItems.map(f => (
                <option key={f.foodItemId} value={f.foodItemId}>
                  {f.foodName}
                </option>
              ))}
            </select>

            <button className="btn btn-primary mb-3" onClick={addFood}>
              Add Food
            </button>

            <ul className="list-group mb-3">
              {selectedItems.map(item => (
                <li key={item.foodItemId}
                  className="list-group-item d-flex justify-content-between">
                  {item.foodName}
                  <button className="btn btn-danger btn-sm"
                    onClick={() => deleteFood(item.foodItemId)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            <button className="btn btn-success" onClick={saveMenu}>
              Save {menuType} Menu
            </button>
          </>
        )}

        {/* VIEW TAB */}
        {activeTab === "VIEW" && (
          <>
            <select className="form-control mb-2"
              value={selectedMessId}
              onChange={e => setSelectedMessId(e.target.value)}>
              <option value="">Select Mess</option>
              {messes.map(m => (
                <option key={m.messId} value={m.messId}>
                  {m.messName}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="form-control mb-2"
              value={menuDate}
              onChange={e => setMenuDate(e.target.value)}
            />

            <button className="btn btn-info mb-3" onClick={viewMenu}>
              View Menu
            </button>

            <div className="row">
              <div className="col-md-6">
                <h6>Lunch</h6>
                <ul className="list-group">
                  {viewMenuData.LUNCH.map(i => (
                    <li key={i.foodItemId} className="list-group-item">
                      {i.foodName}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-md-6">
                <h6>Dinner</h6>
                <ul className="list-group">
                  {viewMenuData.DINNER.map(i => (
                    <li key={i.foodItemId} className="list-group-item">
                      {i.foodName}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}