import { useEffect, useState } from "react";
import { admin_url } from "../rest_endpoints";

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
      `${admin_url}/fooditems/${subCategory.subCategoryId}`
    )
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []));
  }, [subCategory]);

  //  ADD FOOD ITEM
  const addFoodItem = () => {
    if (!newName.trim()) return;

    fetch(
      `${admin_url}/fooditem/${subCategory.subCategoryId}`,
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
    fetch(`${admin_url}/fooditem/${id}`, {
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
      <h5 className="fw-semibold mb-3">
  Food Items ({subCategory?.subCategoryName})
</h5>

<input
  className="form-control rounded-pill mb-3"
  placeholder="🔍 Search food item..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<table className="table align-middle">
  <thead
    style={{
      backgroundColor: "#f1f3f5",
      color: "#343a40"
    }}
  >
    <tr>
      <th>Food Name</th>
      <th>Description</th>
      <th className="text-end">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filtered.map((item) => (
      <tr key={item.foodItemId}>
        <td className="fw-medium">
          {item.foodName}
        </td>
        <td className="text-muted small">
          {item.description || "-"}
        </td>
        <td className="text-end">
          <button className="btn btn-sm btn-outline-warning rounded-pill me-2">
            Edit
          </button>
          <button className="btn btn-sm btn-outline-danger rounded-pill">
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </>
  );
}