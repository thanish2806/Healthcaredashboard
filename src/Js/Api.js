const API_URL =
  "https://fedskillstest.coalitiontechnologies.workers.dev/patients";

export const fetchPatients = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: "Basic Y29hbGl0aW9uOnNraWxscy10ZXN0",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch patients");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
