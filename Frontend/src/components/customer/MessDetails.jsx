import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-icons/font/bootstrap-icons.css'; // make sure this is imported

import { getMessById } from "./messService";
import "../../styles/messDetails.css";
import { customer_url } from "../rest_endpoints";

export default function MessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.logged.loggedIn);
  const role = useSelector((state) => state.logged.role);

  const userId = localStorage.getItem("userid")
    ? parseInt(localStorage.getItem("userid"))
    : null;

  const [mess, setMess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyMenu, setDailyMenu] = useState({ lunch: [], dinner: [] });
  const [monthlyPlans, setMonthlyPlans] = useState([]);
  const [activeView, setActiveView] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [showNoPlans, setShowNoPlans] = useState(false);
  const [showDailyMenu, setShowDailyMenu] = useState(false);
  const [showMonthlyPlans, setShowMonthlyPlans] = useState(false);

  /* ================= RATING ================= */
  const [ratingSummary, setRatingSummary] = useState({
    averageRating: 0,
    totalRatings: 0
  });

  /* ================= FETCH MESS ================= */
  useEffect(() => {
    setLoading(true);
    getMessById(id)
      .then((data) => {
        setMess({
          ...data,
          messPhotos: data.messPhotos || data.photos || []
        });
      })
      .catch(() => toast.error("Failed to load mess details"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= FETCH RATING SUMMARY ================= */
  useEffect(() => {
    fetch(`${customer_url}/${id}/rating-summary`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DEBUG: Rating summary API response:", data);
        setRatingSummary(data);
      })
      .catch((err) => {
        console.error("DEBUG: Failed to fetch rating summary", err);
      });
  }, [id]);

  /* ================= DAILY MENU ================= */
  const fetchDailyMenu = async () => {
    try {
      if (showDailyMenu) {
        setShowDailyMenu(false);
        return;
      }

      const res = await fetch(`${customer_url}/${id}/daily-menu/today`);
      if (!res.ok) throw new Error();

      const data = await res.json();

      setDailyMenu({
        lunch: data.lunch || [],
        dinner: data.dinner || []
      });

      setActiveView("menu");
      setShowDailyMenu(true);
      setShowMonthlyPlans(false);
    } catch {
      toast.error("Failed to load daily menu");
    }
  };

  /* ================= MONTHLY PLANS ================= */
  const fetchMonthlyPlans = async () => {
    try {
      if (showMonthlyPlans) {
        setShowMonthlyPlans(false);
        return;
      }

      const res = await fetch(`${customer_url}/${id}/monthly-plans`);
      const data = await res.json();

      const normalizedPlans = (data || []).map((p) => ({
        ...p,
        realPlanId: p.planId
      }));

      setMonthlyPlans(normalizedPlans);
      setSelectedPlanId(null);
      setActiveView("plan");
      setShowNoPlans(normalizedPlans.length === 0);
      setShowMonthlyPlans(true);
      setShowDailyMenu(false);
    } catch {
      toast.error("Failed to load plans");
    }
  };

  /* ================= SUBSCRIBE ================= */
  const handleSubscribe = () => {
    if (!monthlyPlans.length) return toast.warning("No monthly plans loaded");
    if (!selectedPlanId) return toast.warning("Please select a plan");
    if (!loggedIn) {
      toast.info("Please login to subscribe");
      localStorage.setItem("redirectAfterLogin", `/customer/mess/${id}`);
      navigate("/login");
      return;
    }
    if (!userId) return toast.error("User ID not found");
    if (role !== "CUSTOMER") return toast.error("Only customers can subscribe");

    const plan = monthlyPlans.find((p) => p.realPlanId === selectedPlanId);
    if (!plan) return toast.error("Plan not found");

    fetch(`${customer_url}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, planId: plan.realPlanId })
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        toast.success(`Subscribed to ${plan.planName}`);
        setSelectedPlanId(null);
      })
      .catch(() => toast.error("Subscription failed"));
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!mess) return <p className="text-center mt-5">Mess not found</p>;

  const getBadgeClass = (type) => {
    switch (type.toLowerCase()) {
      case "veg":
        return "bg-success";
      case "nonveg":
        return "bg-danger";
      case "jain":
        return "bg-warning text-dark";
      case "mixed":
        return "bg-secondary";
      default:
        return "bg-dark";
    }
  };

  /* ================= STAR RENDER ================= */
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
      <div className="d-flex align-items-center gap-1">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <i key={i} className="bi bi-star-fill text-warning fs-5" />;
          }
          if (i === fullStars && hasHalfStar) {
            return <i key={i} className="bi bi-star-half text-warning fs-5" />;
          }
          return <i key={i} className="bi bi-star text-muted fs-5" />;
        })}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className="card mess-details-card shadow-lg p-4">
        {/* TOP SECTION */}
        <div className="row mb-4">
          <div className="col-md-6">
            {mess.messPhotos.length ? (
              <Carousel interval={2500} pause="hover">
                {mess.messPhotos.map((p, i) => (
                  <Carousel.Item key={i}>
                    <img src={p.photoUrl} alt={mess.messName} className="w-100" />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p className="text-muted text-center">No photos available</p>
            )}
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-between">
            <div>
              <h2 className="fw-bold">{mess.messName}</h2>

              {/* ⭐ RATING DISPLAY */}
              <div className="d-flex align-items-center gap-2 mt-1">
                {ratingSummary.totalRatings > 0
                  ? renderStars(ratingSummary.averageRating)
                  : <span className="text-muted">No ratings yet</span>}
              </div>

              <span className={`badge mess-type ${getBadgeClass(mess.messType)}`}>
                {mess.messType}
              </span>

              <p className="text-muted mt-2">
                📍 {mess.areaName}, {mess.cityName}
              </p>

              <div className="info-card mt-3">
                <h6>🏠 Address</h6>
                <p className="mb-0">{mess.messAddress}</p>
              </div>

              <div className="info-card mt-2">
                <h6>📞Phone</h6>
                <p className="mb-0">
                  <a href={`tel:${mess.ownerPhone}`}>{mess.ownerPhone}</a>
                </p>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-6">
                <div className="timing-card lunch">
                  <h6>🍱 Lunch</h6>
                  <p className="mb-0">{mess.lunchOpenTime} – {mess.lunchCloseTime}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="timing-card dinner">
                  <h6>🍽️ Dinner</h6>
                  <p className="mb-0">{mess.dinnerOpenTime} – {mess.dinnerCloseTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <button className={`tab-btn ${showDailyMenu && "active"}`} onClick={fetchDailyMenu}>
            Daily Menu
          </button>
          <button className={`tab-btn ${showMonthlyPlans && "active"}`} onClick={fetchMonthlyPlans}>
            Monthly Plans
          </button>
        </div>

        {/* DAILY MENU */}
        {activeView === "menu" && showDailyMenu && (
          <div className="row">
            {["lunch", "dinner"].map((type) => (
              <div className="col-md-6 mb-3" key={type}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h6 className="text-uppercase">{type}</h6>
                    <ul className="list-group list-group-flush">
                      {dailyMenu[type]?.flatMap((m) =>
                        m.items.map((item, i) => (
                          <li key={i} className="list-group-item">
                            🍽️ {item}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MONTHLY PLANS */}
        {activeView === "plan" && showMonthlyPlans && (
          <div className="row">
            {showNoPlans ? (
              <p className="text-center text-muted">No plans available</p>
            ) : (
              monthlyPlans.map((plan) => (
                <div className="col-md-4 mb-3" key={plan.realPlanId}>
                  <div
                    className={`card plan-card ${selectedPlanId === plan.realPlanId && "selected"}`}
                    onClick={() => setSelectedPlanId(plan.realPlanId)}
                  >
                    <div className="card-body text-center">
                      <h6>{plan.planName}</h6>
                      <p className="price">₹{plan.price}</p>
                      <p>{plan.mealInclusion}</p>
                      <p className="text-muted">{plan.validityPeriod} days</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* SUBSCRIBE */}
        <div className="text-center mt-4">
          <button className="btn btn-primary subscribe-btn" disabled={!selectedPlanId} onClick={handleSubscribe}>
            Subscribe
          </button>
        </div>

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
}