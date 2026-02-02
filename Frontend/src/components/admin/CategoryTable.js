import { useEffect, useState } from "react";
import { admin_url } from "../rest_endpoints";

export default function CategoryTable({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch(admin_url+"/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const filtered = categories.filter((c) =>
    c.categoryName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h5 className="fw-semibold mb-3">Categories</h5>

<input
  className="form-control rounded-pill mb-3"
  placeholder="🔍 Search category..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<div className="table-responsive">
  <table className="table align-middle">
    <thead
      style={{
        backgroundColor: "#f1f3f5",
        color: "#343a40"
      }}
    >
      <tr>
        <th>Category Name</th>
      </tr>
    </thead>
    <tbody>
      {filtered.length === 0 ? (
        <tr>
          <td className="text-center text-muted py-4">
            No categories found
          </td>
        </tr>
      ) : (
        filtered.map((cat) => (
          <tr
            key={cat.categoryId}
            className={
              selectedId === cat.categoryId
                ? "table-active"
                : ""
            }
            onClick={() => {
              setSelectedId(cat.categoryId);
              onSelectCategory(cat);
            }}
            style={{ cursor: "pointer" }}
          >
            <td className="fw-medium">
              {cat.categoryName}
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