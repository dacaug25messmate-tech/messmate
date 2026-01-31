import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitFoodRequest,
  resetStatus,
} from "../../messOwnerFoodRequestSlice";
import { fetchSubCategories } from "../../subCategoriesSlice";

export default function MessOwnerFoodRequestForm() {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.messOwnerRequests
  );

  const { subCategories } = useSelector(
    (state) => state.subCategories
  );

  
  const userId = useSelector((state) => state.logged.userid);

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      alert("Food item request submitted!");
      setItemName("");
      setDescription("");
      setSubCategoryId("");
      dispatch(resetStatus());
    }
  }, [success, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName || !subCategoryId || !userId) {
      alert("Please fill in all required fields");
      return;
    }

    dispatch(
      submitFoodRequest({
        itemName,
        description,
        subCategoryId: Number(subCategoryId),
        userId: Number(userId)
      })
    );
  };

  return (
    <div className="container mt-4">
      <h3>Request New Food Item</h3>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Item Name</label>
          <input
            type="text"
            className="form-control"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Subcategory</label>
          <select
            className="form-control"
            value={subCategoryId}
            onChange={(e) => setSubCategoryId(e.target.value)}
            required
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((sc) => (
              <option key={sc.subCategoryId} value={sc.subCategoryId}>
                {sc.subCategoryName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>

        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
}