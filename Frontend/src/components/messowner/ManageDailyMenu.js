import { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { admin_url, messowner_url } from "../rest_endpoints";

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

    fetch(`${messowner_url}/messes/${ownerId}`)
      .then(res => res.json())
      .then(setMesses)
      .catch(() => showToast("Failed to load messes", "danger"));
  }, [ownerId]);

  /* ---------- LOAD CATEGORIES ---------- */
  useEffect(() => {
    fetch(admin_url+"/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  /* ---------- LOAD SUBCATEGORIES ---------- */
  useEffect(() => {
    if (!categoryId) return setSubCategories([]);
    fetch(`${admin_url}/subcategories/${categoryId}`)
      .then(res => res.json())
      .then(setSubCategories);
  }, [categoryId]);

  /* ---------- LOAD FOOD ITEMS ---------- */
  useEffect(() => {
    if (!subCategoryId) return setFoodItems([]);
    fetch(`${admin_url}/fooditems/${subCategoryId}`)
      .then(res => res.json())
      .then(setFoodItems);
  }, [subCategoryId]);

  /* ---------- LOAD MENU SLOT ---------- */
  const loadMenuSlot = useCallback(() => {
    if (!selectedMessId) return;

    fetch(
      `${messowner_url}/fetch?messId=${selectedMessId}&date=${menuDate}`
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
      const res = await fetch(messowner_url+"/add", {
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
      `${messowner_url}/fetch?messId=${selectedMessId}&date=${menuDate}`
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
  <div className="container my-4">
    {toast.show && (
      <div className={`alert alert-${toast.type} shadow-sm`}>
        {toast.msg}
      </div>
    )}

    <div className="card shadow-lg border-0 rounded-4">
      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">🍽️ Manage Daily Menu</h4>
          <span className="badge bg-warning text-dark px-3 py-2">
            {menuDate}
          </span>
        </div>

        {/* TABS */}
        <ul className="nav nav-pills mb-4 gap-2">
          <li className="nav-item">
            <button
              className={`nav-link px-4 ${
                activeTab === "TODAY" ? "active" : "text-dark"
              }`}
              onClick={() => {
                setActiveTab("TODAY");
                setMenuDate(today);
              }}
            >
              Today
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link px-4 ${
                activeTab === "VIEW" ? "active" : "text-dark"
              }`}
              onClick={() => setActiveTab("VIEW")}
            >
              View Menu
            </button>
          </li>
        </ul>

        {/* TODAY TAB */}
        {activeTab === "TODAY" && (
          <div className="row g-4">

            {/* LEFT PANEL */}
            <div className="col-md-5">
              <div className="card shadow-sm rounded-4">
                <div className="card-body">

                  <h6 className="fw-bold mb-3">Menu Details</h6>

                  <select className="form-select mb-2"
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
                    min={today}
                    max={today}
                    onChange={handleTodayDateChange}
                  />

                  <select className="form-select mb-3"
                    value={menuType}
                    onChange={e => setMenuType(e.target.value)}>
                    <option value="LUNCH">Lunch</option>
                    <option value="DINNER">Dinner</option>
                  </select>

                  <h6 className="fw-bold mt-4 mb-2">Add Food</h6>

                  <select className="form-select mb-2"
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value)}>
                    <option value="">Category</option>
                    {categories.map(c => (
                      <option key={c.categoryId} value={c.categoryId}>
                        {c.categoryName}
                      </option>
                    ))}
                  </select>

                  <select className="form-select mb-2"
                  value={subCategoryId}
                  onChange={e => setSubCategoryId(e.target.value)}>
                  <option value="">Subcategory</option>
                  {subCategories.map(sc => (
                   <option key={sc.subCategoryId} value={sc.subCategoryId}>
                   {sc.subCategoryName}
                  </option>
                    ))}
                  </select>

                 <Select
                options={foodItems.map(f => ({ value: f.foodItemId, label: f.foodName }))}
                value={foodItemId ? { value: foodItemId, label: foodItems.find(f => f.foodItemId === foodItemId)?.foodName } : null}
                 onChange={opt => setFoodItemId(opt ? opt.value : "")}
                 placeholder="Search or select food item..."
               isClearable
                  />

                  <button
                    className="btn btn-primary w-100"
                    onClick={addFood}
                  >
                    ➕ Add Food
                  </button>

                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="col-md-7">
              <div className="card shadow-sm rounded-4 h-100">
                <div className="card-body d-flex flex-column">

                  <h6 className="fw-bold mb-3">
                    Selected Items ({selectedItems.length})
                  </h6>

                  <div className="flex-grow-1">
                    {selectedItems.length === 0 && (
                      <p className="text-muted">No items added yet</p>
                    )}

                    {selectedItems.map(item => (
                      <div
                        key={item.foodItemId}
                        className="d-flex justify-content-between align-items-center border rounded-3 p-2 mb-2"
                      >
                        <span className="fw-medium">{item.foodName}</span>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteFood(item.foodItemId)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn btn-success mt-3"
                    onClick={saveMenu}
                  >
                    💾 Save {menuType} Menu
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW TAB */}
        {activeTab === "VIEW" && (
          <>
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <select className="form-select"
                  value={selectedMessId}
                  onChange={e => setSelectedMessId(e.target.value)}>
                  <option value="">Select Mess</option>
                  {messes.map(m => (
                    <option key={m.messId} value={m.messId}>
                      {m.messName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  value={menuDate}
                  onChange={e => setMenuDate(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <button
                  className="btn btn-info w-100"
                  onClick={viewMenu}
                >
                  🔍 View Menu
                </button>
              </div>
            </div>

            <div className="row g-4">
              {["LUNCH", "DINNER"].map(type => (
                <div className="col-md-6" key={type}>
                  <div className="card shadow-sm rounded-4">
                    <div className="card-body">
                      <h6 className="fw-bold mb-3">
                        {type === "LUNCH" ? "🍱 Lunch" : "🍽️ Dinner"}
                      </h6>

                      {viewMenuData[type].length === 0 ? (
                        <p className="text-muted">No items</p>
                      ) : (
                        viewMenuData[type].map(i => (
                          <span
                            key={i.foodItemId}
                            className="badge bg-light text-dark border me-2 mb-2 p-2"
                          >
                            {i.foodName}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  </div>
);

}