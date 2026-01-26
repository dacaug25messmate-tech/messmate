import { useEffect, useState } from "react";

export default function SubCategoryTable({ category, onSelectSubCategory }) {
  const [subCategories, setSubCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // add form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!category?.categoryId) return;

    fetch(`http://localhost:2025/api/admin/subcategories/${category.categoryId}`)
      .then((res) => res.json())
      .then((data) => setSubCategories(Array.isArray(data) ? data : []));
  }, [category]);

  //  ADD SUBCATEGORY
  const addSubCategory = () => {
    if (!name.trim()) return;

    fetch(`http://localhost:2025/api/admin/subcategory/${category.categoryId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subCategoryName: name })
    })
      .then((res) => res.json())
      .then((newSub) => {
        setSubCategories([...subCategories, newSub]);
        setName("");
        setShowAddForm(false);
      });
  };

  // NULL-SAFE FILTER
  const filtered = subCategories.filter((s) =>
    (s.subCategoryName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      {/* HEADER ROW */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">
          Subcategories ({category?.categoryName})
        </h5>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "✕ Cancel" : "+ Add Subcategory"}
        </button>
      </div>

      {/*  ADD SUBCATEGORY FORM (TOP) */}
      {showAddForm && (
        <div className="d-flex gap-2 mb-3">
          <input
            className="form-control"
            placeholder="New subcategory"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button
            className="btn btn-success"
            disabled={!name.trim()}
            onClick={addSubCategory}
          >
            Save
          </button>
        </div>
      )}

      {/* Search */}
      <input
        className="form-control mb-2"
        placeholder="Search subcategory..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Subcategory Name</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="text-center">
                  No subcategories found
                </td>
              </tr>
            ) : (
              filtered.map((sub) => (
                <tr
                  key={sub.subCategoryId}
                  className={
                    selectedId === sub.subCategoryId ? "table-active" : ""
                  }
                  onClick={() => {
                    setSelectedId(sub.subCategoryId);
                    onSelectSubCategory(sub);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <td>{sub.subCategoryName || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
