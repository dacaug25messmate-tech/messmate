const BASE_URL = "http://localhost:2029/api/customer/mess";

// Get all messes
export const getAllMesses = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch messes");
  return res.json();
};

// Get mess by ID
export const getMessById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch mess details");
  return res.json();
};
