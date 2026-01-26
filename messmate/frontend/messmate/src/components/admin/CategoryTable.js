import { useEffect, useState } from "react";

export default function CategoryTable({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:2025/api/admin/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const filtered = categories.filter((c) =>
    c.categoryName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h5>Categories</h5>

      {/* Search */}
      <input
        className="form-control mb-2"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Category Name</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="text-center">No categories found</td>
              </tr>
            ) : (
              filtered.map((cat) => (
                <tr
                  key={cat.categoryId}
                  className={selectedId === cat.categoryId ? "table-active" : ""}
                  onClick={() => {
                    setSelectedId(cat.categoryId);
                    onSelectCategory(cat);
                  }}
                >
                  <td>{cat.categoryName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
