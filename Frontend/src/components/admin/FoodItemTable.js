import { useEffect, useState } from "react";

export default function FoodItemTable({ subCategory }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  // add form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    if (!subCategory?.subCategoryId) return;

    fetch(
      `http://localhost:2025/api/admin/fooditems/${subCategory.subCategoryId}`
    )
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []));
  }, [subCategory]);

  //  ADD FOOD ITEM
  const addFoodItem = () => {
    if (!newName.trim()) return;

    fetch(
      `http://localhost:2025/api/admin/fooditem/${subCategory.subCategoryId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodName: newName,
          description: newDescription
        })
      }
    )
      .then((res) => res.json())
      .then((created) => {
        setItems([...items, created]);
        setNewName("");
        setNewDescription("");
        setShowAddForm(false);
      });
  };

  //  DELETE FOOD ITEM
  const deleteFoodItem = (id) => {
    fetch(`http://localhost:2025/api/admin/fooditem/${id}`, {
      method: "DELETE"
    }).then(() =>
      setItems(items.filter((i) => i.foodItemId !== id))
    );
  };

  //  START EDIT
  const startEdit = (item) => {
    setEditingId(item.foodItemId);
    setEditName(item.foodName || "");
    setEditDescription(item.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  //  SAVE EDIT
  const saveEdit = (id) => {
    if (!editName.trim()) return;

    fetch(`http://localhost:2025/api/admin/fooditem/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foodName: editName,
        description: editDescription
      })
    })
      .then((res) => res.json())
      .then((updated) => {
        setItems(
          items.map((i) =>
            i.foodItemId === id ? updated : i
          )
        );
        cancelEdit();
      });
  };

  //  NULL-SAFE FILTER
  const filtered = items.filter((i) =>
    (i.foodName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      {/* HEADER ROW */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">
          Food Items ({subCategory?.subCategoryName})
        </h5>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "✕ Cancel" : "+ Add Food Item"}
        </button>
      </div>

      {/* ADD FOOD ITEM FORM (TOP) */}
      {showAddForm && (
        <div className="d-flex gap-2 mb-3">
          <input
            className="form-control"
            placeholder="Food name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className="form-control"
            placeholder="Description"
            value={newDescription}
            onChange={(e) =>
              setNewDescription(e.target.value)
            }
          />
          <button
            className="btn btn-success"
            disabled={!newName.trim()}
            onClick={addFoodItem}
          >
            Save
          </button>
        </div>
      )}

      {/* Search */}
      <input
        className="form-control mb-2"
        placeholder="Search food item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Food Name</th>
              <th>Description</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No food items found
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.foodItemId}>
                  {/* FOOD NAME */}
                  <td>
                    {editingId === item.foodItemId ? (
                      <input
                        className="form-control form-control-sm"
                        value={editName}
                        onChange={(e) =>
                          setEditName(e.target.value)
                        }
                      />
                    ) : (
                      item.foodName || "-"
                    )}
                  </td>

                  {/* DESCRIPTION */}
                  <td>
                    {editingId === item.foodItemId ? (
                      <input
                        className="form-control form-control-sm"
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(e.target.value)
                        }
                      />
                    ) : (
                      item.description || "-"
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="text-end">
                    {editingId === item.foodItemId ? (
                      <>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() =>
                            saveEdit(item.foodItemId)
                          }
                          disabled={!editName.trim()}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => startEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            deleteFoodItem(item.foodItemId)
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
