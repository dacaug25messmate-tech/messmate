import { useEffect, useState } from "react";
import { getAllMesses } from "./messService";
import MessCard from "./MessCard";

export default function SearchMess() {
  const [area, setArea] = useState("");
  const [messType, setMessType] = useState("");
  const [messes, setMesses] = useState([]);

  useEffect(() => {
    getAllMesses()
      .then(setMesses)
      .catch(err => console.error(err));
  }, []);

  const filteredMesses = messes.filter(m => {
    const areaMatch = m.area?.areaName
      ?.toLowerCase()
      .includes(area.toLowerCase());
    const typeMatch = messType ? m.messType === messType : true;
    return areaMatch && typeMatch;
  });

  return (
    <div className="container mt-4">
      

      {/* Search */}
      <div className="row mb-4 g-2">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search mess by area"
            value={area}
            onChange={e => setArea(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={messType}
            onChange={e => setMessType(e.target.value)}
          >
            <option value="">All Types Messes</option>
            <option value="Veg">Veg</option>
            <option value="NonVeg">NonVeg</option>
            <option value="Jain">Jain</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="row">
        {filteredMesses.length > 0 ? (
          filteredMesses.map(mess => (
            <MessCard key={mess.messId} mess={mess} />
          ))
        ) : (
          <p className="text-center">No mess found!</p>
        )}
      </div>
    </div>
  );
}


