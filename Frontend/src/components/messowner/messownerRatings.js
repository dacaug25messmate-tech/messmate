// import "../../styles/dashboard.css";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMessOwnerRatings } from "../../messOwnerRatingsSlice";

// function StarRating({ rating }) {
//   return (
//     <span style={{ color: "#ffc107", fontSize: "18px" }}>
//       {"★".repeat(rating)}
//       {"☆".repeat(5 - rating)}
//     </span>
//   );
// }

// export default function MessOwnerRatings() {
//   const dispatch = useDispatch();
//   const { userid } = useSelector((state) => state.logged);

//   const { messes, loading, error } = useSelector(
//     (state) => state.messOwnerRatings
//   );

//   useEffect(() => {
//     if (userid) {
//       dispatch(fetchMessOwnerRatings(userid));
//     }
//   }, [userid, dispatch]);

//   if (loading) {
//     return <p className="text-center mt-4">Loading ratings...</p>;
//   }

//   if (error) {
//     return <p className="text-danger text-center mt-4">{error}</p>;
//   }

//   return (
//     <div>
//       <h2 className="mb-4">Mess Ratings</h2>

//       {messes.length === 0 && (
//         <p className="text-center">No ratings available</p>
//       )}

//       {messes.map((mess) => (
//         <div key={mess.messId} className="card mb-4 shadow-sm">
//           <div className="card-header bg-primary text-white">
//             <h5 className="mb-0">{mess.messName}</h5>
//           </div>

//           <div className="card-body">
//             {mess.ratings.length === 0 ? (
//               <p className="text-muted">No ratings for this mess</p>
//             ) : (
//               <table className="table table-bordered table-striped">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>#</th>
//                     <th>User</th>
//                     <th>Rating</th>
//                     <th>Comments</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {mess.ratings.map((r, index) => (
//                     <tr key={r.ratingId}>
//                       <td>{index + 1}</td>
//                       <td>{r.userName}</td>
//                       <td>
//                         <StarRating rating={r.rating} />
//                       </td>
//                       <td>{r.comments || "—"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import "../../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessOwnerRatings } from "../../messOwnerRatingsSlice";

function StarRating({ rating }) {
  return (
    <span style={{ color: "#f4b400", fontSize: "18px" }}>
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

export default function MessOwnerRatings() {
  const dispatch = useDispatch();
  const { userid } = useSelector((state) => state.logged);
  const { messes, loading, error } = useSelector(
    (state) => state.messOwnerRatings
  );

  const [activeMessId, setActiveMessId] = useState(null);

  useEffect(() => {
    if (userid) {
      dispatch(fetchMessOwnerRatings(userid));
    }
  }, [userid, dispatch]);

  if (loading) return <p className="text-center mt-4">Loading ratings...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div>
      <h2 className="mb-4">Mess Ratings</h2>

      {messes.length === 0 && (
        <p className="text-center">No ratings available</p>
      )}

      {messes.map((mess) => {
        const isActive = activeMessId === mess.messId;

        return (
          <div key={mess.messId} className="card mb-3 shadow-sm">

            {/* ===== Header ===== */}
            <div
              className={`card-header d-flex justify-content-between align-items-center ${
                isActive ? "bg-primary text-white" : "bg-light"
              }`}
              style={{
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() =>
                setActiveMessId(isActive ? null : mess.messId)
              }
            >
              <div>
                <h5 className="mb-1">{mess.messName}</h5>
                <small className={isActive ? "text-white" : "text-muted"}>
                  Avg Rating:{" "}
                  <StarRating rating={mess.averageRating || 0} /> (
                  {mess.averageRating?.toFixed(1) || "0.0"})
                </small>
              </div>

              <button
                className={`btn btn-sm ${
                  isActive ? "btn-light" : "btn-outline-primary"
                }`}
              >
                {isActive ? "Hide Ratings" : "View Ratings"}
              </button>
            </div>

            {/* ===== Ratings Table ===== */}
            {isActive && (
              <div className="card-body">
                {mess.ratings.length === 0 ? (
                  <p className="text-muted">No ratings for this mess</p>
                ) : (
                  <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Rating</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mess.ratings.map((r, index) => (
                        <tr key={r.ratingId}>
                          <td>{index + 1}</td>
                          <td>{r.userName}</td>
                          <td>
                            <StarRating rating={r.rating} />
                          </td>
                          <td>{r.comments || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
