const BASE_URL = "http://localhost:2025/mess-owner";

const getSubscriptions = async (messId) => {
  const response = await fetch(`${BASE_URL}/subscriptions/${messId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch subscriptions");
  }

  return response.json();
};

export default {
  getSubscriptions,
};
