import { customer_url } from "../rest_endpoints";


// Get all messes
export const getAllMesses = async () => {
  const res = await fetch(customer_url);
  if (!res.ok) throw new Error("Failed to fetch messes");
  return res.json();
};

// Get mess by ID
export const getMessById = async (id) => {
  const res = await fetch(`${customer_url}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch mess details");
  return res.json();
};
