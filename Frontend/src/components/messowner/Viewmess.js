import { useEffect, useState } from "react";
import "../styles/dashboard.css";
export default function ViewMesses({ userId }) {

  const [messes, setMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState(null);

  // Load all messes of owner
  useEffect(() => {
    fetch(`http://localhost:2028/api/messowner/messes/${userId}`)
      .then(res => res.json())
      .then(setMesses)
      .catch(() => setMesses([]));
  }, [userId]);

  // View single mess details
  const viewMess = (messId) => {
    fetch(`http://localhost:2028/api/messowner/mess/details/${messId}`)
      .then(res => res.json())
      .then(setSelectedMess);
  };

  return (
    <div>

      {/* <h3>My Messes</h3> */}

      {/* MESS LIST TABLE */}
      <table className="profile-table">
        <thead>
          <tr>
            <th>Mess Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messes.map(m => (
            <tr key={m.messId}>
              <td>{m.messName}</td>
              <td>
                <button onClick={() => viewMess(m.messId)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SELECTED MESS DETAILS */}
      {selectedMess && (
        <>
          <h3>Mess Details</h3>
          <table className="profile-table">
            <tbody>
              <tr><th>Name</th><td>{selectedMess.messName}</td></tr>
              <tr><th>Address</th><td>{selectedMess.messAddress}</td></tr>
              <tr><th>Type</th><td>{selectedMess.messType}</td></tr>
              <tr>
                <th>Lunch</th>
                <td>
                  {selectedMess.lunchOpenTime} - {selectedMess.lunchCloseTime}
                </td>
              </tr>
              <tr>
                <th>Dinner</th>
                <td>
                  {selectedMess.dinnerOpenTime} - {selectedMess.dinnerCloseTime}
                </td>
              </tr>
              <tr>
                <th>Area</th>
                <td>{selectedMess.areaId?.area_name}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
