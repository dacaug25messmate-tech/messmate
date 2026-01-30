import { useNavigate } from "react-router-dom";

export default function MessCard({ mess }) {
  const navigate = useNavigate();

  const getBadgeClass = (type) => {
    switch (type) {
      case "Veg":
        return "bg-success";
      case "NonVeg":
        return "bg-danger";
      case "Jain":
        return "bg-warning text-dark";
      case "Mixed":
        return "bg-secondary text-white";
      default:
        return "bg-light text-dark";
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="fw-bold">{mess.messName}</h5>

          <p className="text-muted mb-2">
            {mess.area?.areaName}, {mess.area?.city?.cityName}
          </p>

          <span
            className={`badge ${getBadgeClass(mess.messType)} mb-3 align-self-start`}
          >
            {mess.messType}
          </span>

          <button
            className="btn btn-primary mt-auto w-100"
            onClick={() => navigate(`/customer/mess/${mess.messId}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
