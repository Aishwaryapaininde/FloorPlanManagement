// frontend/src/api/floorPlanApi.js
export const getFloorPlans = async () => {
    try {
      const response = await fetch("http://localhost:8000/floorplans");
      if (!response.ok) throw new Error("Failed to load floor plans");
      return await response.json();
    } catch (error) {
      console.error("Error fetching floor plans:", error);
    }
  };
  