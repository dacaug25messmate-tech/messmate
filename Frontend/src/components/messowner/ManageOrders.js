import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ManageOrders() {
  const ownerId = useSelector((state) => state.logged.userid);

  const [messes, setMesses] = useState([]);
  const [expandedMess, setExpandedMess] = useState(null);
  const [loading, setLoading] = useState(false);

  // filters
  const [selectedMeal, setSelectedMeal] = useState("LUNCH");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // searches
  const [messSearch, setMessSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState({});

  /* ================= FETCH MESSES + CUSTOMERS ================= */
  useEffect(() => {
    if (!ownerId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:2028/api/messowner/messes/${ownerId}`
        );
        const messData = await res.json();

        const withCustomers = await Promise.all(
          messData.map(async (mess) => {
            const custRes = await fetch(
              `http://localhost:2028/api/messowner/customers/${mess.messId}?date=${selectedDate}&mealType=${selectedMeal}`
            );
            const customers = await custRes.json();

            return {
              ...mess,
              customers: customers.map((c) => ({
  id: c.subscriptionId,
  name: c.fullName,
  phone: c.phone,
  mealType: c.mealType,
  attendanceStatus:
    c.visitStatus === 1
      ? "VISITED"
      : c.visitStatus === 0
      ? "UNVISITED"
      : null,
  startDate: c.startDate,
  endDate: c.endDate,
}))

            };
          })
        );

        setMesses(withCustomers);
      } catch (e) {
        console.error("Fetch failed", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ownerId, selectedDate, selectedMeal]);

  /* ================= MARK ATTENDANCE ================= */
  const markAttendance = async (messId, customerId, status) => {
    try {
      await fetch(
        `http://localhost:2028/api/messowner/customer-visit?subscriptionId=${customerId}&date=${selectedDate}&mealType=${selectedMeal}&visited=${
          status === "VISITED"
        }`,
        { method: "POST" }
      );

      // update UI instantly
      setMesses((prev) =>
        prev.map((m) =>
          m.messId === messId
            ? {
                ...m,
                customers: m.customers.map((c) =>
                  c.id === customerId
                    ? { ...c, attendanceStatus: status }
                    : c
                ),
              }
            : m
        )
      );
    } catch (e) {
      console.error("Attendance update failed", e);
    }
  };

  /* ================= FILTER HELPERS ================= */
  const isActiveOnDate = (c) => {
    const sel = new Date(selectedDate);
    return sel >= new Date(c.startDate) && sel <= new Date(c.endDate);
  };

  const mealMatch = (c) =>
    c.mealType === selectedMeal || c.mealType === "BOTH";

  /* ================= RENDER ================= */
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const filteredMesses = messes.filter((m) =>
    m.messName.toLowerCase().includes(messSearch.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Manage Orders</h4>
        <div className="d-flex gap-2">
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <select
            className="form-select"
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
          >
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
          </select>
        </div>
      </div>

      {/* MESS SEARCH */}
      <input
        className="form-control mb-4"
        placeholder="Search mess name"
        value={messSearch}
        onChange={(e) => setMessSearch(e.target.value)}
      />

      {/* MESSES */}
      {filteredMesses.map((mess) => {
        const searchText = customerSearch[mess.messId] || "";

        const activeCustomers = mess.customers
          .filter(isActiveOnDate)
          .filter(mealMatch)
          .filter(
            (c) =>
              c.name.toLowerCase().includes(searchText.toLowerCase()) ||
              c.phone.includes(searchText)
          );

        const visited = activeCustomers.filter(
          (c) => c.attendanceStatus === "VISITED"
        ).length;

        const unvisited = activeCustomers.filter(
          (c) => c.attendanceStatus === "UNVISITED"
        ).length;

        return (
          <div key={mess.messId} className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between">
              <strong>{mess.messName}</strong>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  setExpandedMess(
                    expandedMess === mess.messId ? null : mess.messId
                  )
                }
              >
                {expandedMess === mess.messId
                  ? "Hide Customers"
                  : "View Customers"}
              </button>
            </div>

            {expandedMess === mess.messId && (
              <div className="card-body">
                {/* COUNTS */}
                <div className="mb-3">
                  <span className="badge bg-dark me-2">
                    Total: {activeCustomers.length}
                  </span>
                  <span className="badge bg-success me-2">
                    Visited: {visited}
                  </span>
                  <span className="badge bg-danger">
                    Unvisited: {unvisited}
                  </span>
                </div>

                {/* CUSTOMER SEARCH */}
                <input
                  className="form-control mb-3"
                  placeholder="Search customer"
                  value={searchText}
                  onChange={(e) =>
                    setCustomerSearch({
                      ...customerSearch,
                      [mess.messId]: e.target.value,
                    })
                  }
                />

                {/* CUSTOMERS */}
                {activeCustomers.map((c) => (
                  <div
                    key={c.id}
                    className="border rounded p-3 mb-2 d-flex justify-content-between"
                  >
                    <div>
                      <strong>{c.name}</strong>
                      <div className="text-muted">{c.phone}</div>
                      <span className="badge bg-secondary me-2">
                        {c.mealType}
                      </span>
                      {c.attendanceStatus && (
                        <span
                          className={`badge ${
                            c.attendanceStatus === "VISITED"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {c.attendanceStatus}
                        </span>
                      )}
                    </div>

                    <div>
                      <button
  className="btn btn-success btn-sm me-2"
  disabled={c.attendanceStatus !== null}
  onClick={() => markAttendance(mess.messId, c.id, "VISITED")}
>
  Visited
</button>

<button
  className="btn btn-outline-danger btn-sm"
  disabled={c.attendanceStatus !== null}
  onClick={() => markAttendance(mess.messId, c.id, "UNVISITED")}
>
  Unvisited
</button>

                    </div>
                  </div>
                ))}

                {activeCustomers.length === 0 && (
                  <div className="text-center text-muted">
                    No customers found
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
