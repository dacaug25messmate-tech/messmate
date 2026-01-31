import { useEffect, useState } from "react";
import { admin_url } from "../rest_endpoints";

export default function SubCategoryTable({ category, onSelectSubCategory }) {
  const [subCategories, setSubCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!category?.categoryId) return;

    fetch(`${admin_url}/subcategories/${category.categoryId}`)
      .then((res) => res.json())
      .then((data) => setSubCategories(Array.isArray(data) ? data : []));
  }, [category]);

  const filtered = subCategories.filter((s) =>
    (s.subCategoryName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      {/* HEADER + SEARCH */}
      
        <h5 className="fw-semibold mb-0">
          Subcategories ({category?.categoryName})
        </h5>

        {/* Search bar – same style as Food Items */}
        <input
  className="form-control rounded-pill mb-3"
  placeholder="🔍 Search sub-categoory..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      

      {/* TABLE */}
      <table className="table align-middle">
        <thead
          style={{
            backgroundColor: "#eef1f4",
            color: "#212529"
          }}
        >
          <tr>
            <th>Subcategory Name</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td className="text-muted text-center py-4">
                No subcategories found
              </td>
            </tr>
          ) : (
            filtered.map((sub) => (
              <tr
                key={sub.subCategoryId}
                className={
                  selectedId === sub.subCategoryId
                    ? "table-active"
                    : ""
                }
                onClick={() => {
                  setSelectedId(sub.subCategoryId);
                  onSelectSubCategory(sub);
                }}
                style={{
                  cursor: "pointer"
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "#f8f9fa")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    selectedId === sub.subCategoryId
                      ? "#e9ecef"
                      : "transparent")
                }
              >
                <td className="fw-medium">
                  {sub.subCategoryName}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
