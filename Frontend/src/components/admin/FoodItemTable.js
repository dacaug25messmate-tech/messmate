import { useEffect, useState } from "react";
import { admin_url } from "../rest_endpoints";
import { toast } from "react-toastify";

export default function FoodItemTable({ subCategory }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  // add
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // edit
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    if (!subCategory?.subCategoryId) return;

    fetch(`${admin_url}/fooditems/${subCategory.subCategoryId}`)
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []));
  }, [subCategory]);

  // ADD
  const addFoodItem = () => {
    if (!newName.trim()) return;

    fetch(`${admin_url}/fooditem/${subCategory.subCategoryId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foodName: newName,
        description: newDescription
      })
    })
      .then((res) => res.json())
      .then((created) => {
        setItems([...items, created]);
        setShowAddForm(false);
        setNewName("");
        setNewDescription("");
        toast.success("Food item added");
      });
  };

  // START EDIT
  const startEdit = (item) => {
    setEditingId(item.foodItemId);
    setEditName(item.foodName);
    setEditDescription(item.description || "");
  };

  // SAVE EDIT
  const saveEdit = (id) => {
    fetch(`${admin_url}/fooditem/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foodName: editName,
        description: editDescription
      })
    })
      .then((res) => res.json())
      .then((updated) => {
        setItems(items.map((i) =>
          i.foodItemId === id ? updated : i
        ));
        setEditingId(null);
        toast.success("Food item updated");
      });
  };

  // DELETE
  const confirmDelete = (item) => {
    setDeleteItem(item);
    setShowDeleteModal(true);
  };

  const deleteFoodItem = () => {
    fetch(`${admin_url}/fooditem/${deleteItem.foodItemId}`, {
      method: "DELETE"
    }).then(() => {
      setItems(items.filter(
        (i) => i.foodItemId !== deleteItem.foodItemId
      ));
      setShowDeleteModal(false);
      toast.success("Food item deleted");
    });
  };

  const filtered = items.filter((i) =>
    (i.foodName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-semibold mb-0">
          Food Items ({subCategory?.subCategoryName})
        </h5>
        <button
          className="btn btn-primary rounded-pill"
          onClick={() => setShowAddForm(true)}
        >
          + Add Food
        </button>
      </div>

      {/* SEARCH */}
      <input
        className="form-control rounded-pill mb-3"
        placeholder="🔍 Search food item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ADD FORM */}
      {showAddForm && (
        <div className="card mb-3 shadow-sm">
          <div className="card-body row g-2">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Food name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <input
                className="form-control"
                placeholder="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div className="col-md-3 d-flex gap-2">
              <button className="btn btn-success w-100" onClick={addFoodItem}>
                Save
              </button>
              <button
                className="btn btn-secondary w-100"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <table className="table align-middle">
        <thead style={{ backgroundColor: "#f1f3f5" }}>
          <tr>
            <th>Food Name</th>
            <th>Description</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.foodItemId}>
              <td>
                {editingId === item.foodItemId ? (
                  <input
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  item.foodName
                )}
              </td>

              <td>
                {editingId === item.foodItemId ? (
                  <input
                    className="form-control"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                ) : (
                  item.description || "-"
                )}
              </td>

              <td className="text-end">
                {editingId === item.foodItemId ? (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => saveEdit(item.foodItemId)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => startEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => confirmDelete(item)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PURE REACT DELETE MODAL */}
      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}
        >
          <div className="bg-white rounded p-4" style={{ width: 400 }}>
            <h5>Confirm Delete</h5>
            <p className="text-muted">
              Are you sure you want to delete this food item?
            </p>
            <div className="text-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={deleteFoodItem}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
