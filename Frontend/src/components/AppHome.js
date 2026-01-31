import SearchMess from "./customer/SearchMess";

export default function AppHome() {
  return (
    <div className="container mt-4">
      {/* HERO SECTION */}
      <div className="text-center mb-4">
        <h2>Mess Mate 🍽️</h2>
        <p className="text-muted">
          Find affordable mess services near you
        </p>
      </div>

      {/* SEARCH + LIST */}
      <SearchMess />
    </div>
  );
}
