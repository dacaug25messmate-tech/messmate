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
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
  if (showToast) {
    const timer = setTimeout(() => {
      setShowToast(false);
      dispatch(resetStatus());
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [showToast]);


  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setItemName("");
      setDescription("");
      setSubCategoryId("");
      setShowToast(true);
    }
  }, [success, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName || !subCategoryId || !userId) {
      setShowToast(true);
      return;
    }

    dispatch(
      submitFoodRequest({
        itemName,
        description,
        subCategoryId: Number(subCategoryId),
        userId: Number(userId),
      })
    );
  };

  return (
    <>
      {/* ===== TOAST ===== */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
        <div
          className={`toast align-items-center text-bg-${
            success ? "success" : error ? "danger" : "warning"
          } ${showToast ? "show" : ""}`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">
              {success && "Food item request submitted successfully!"}
              {error && error}
              {!success && !error && "Please fill all required fields"}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => {setShowToast(false);
                dispatch(resetStatus());
              }}
            />
          </div>
        </div>
      </div>

      {/* ===== FORM ===== */}
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9 col-sm-12">
            <div className="card shadow border-0">
              <div className="card-body p-5">
                <h3 className="fw-bold mb-2">Request New Food Item</h3>
                <p className="text-muted mb-4">
                  Suggest a new dish to be added to your mess menu
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Item Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Eg: Paneer Butter Masala"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Description 
                    </label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Short description of the dish"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="form-label fw-semibold">
                      Subcategory
                    </label>
                    <select
                      className="form-select form-select-lg"
                      value={subCategoryId}
                      onChange={(e) => setSubCategoryId(e.target.value)}
                      required
                    >
                      <option value="">Select Subcategory</option>
                      {subCategories.map((sc) => (
                        <option
                          key={sc.subCategoryId}
                          value={sc.subCategoryId}
                        >
                          {sc.subCategoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning btn-lg w-100 fw-semibold text-white"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Request"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
