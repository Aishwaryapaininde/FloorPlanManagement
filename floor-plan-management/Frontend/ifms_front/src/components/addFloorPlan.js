import React, { useState } from 'react';

const AddFloorPlan = ({ onAddSuccess }) => {
  const [floorPlanName, setFloorPlanName] = useState('');
  const [error, setError] = useState('');

  const addFloorPlan = async () => {
    try {
      const response = await fetch("/add-floorplan", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: floorPlanName }),
      });

      if (response.ok) {
        setFloorPlanName('');
        onAddSuccess(); // Call fetchFloorPlans to refresh the list
      } else {
        throw new Error("Failed to add floor plan");
      }
    } catch (error) {
      setError("Error adding floor plan: " + error.message);
    }
  };

  return (
    <div>
      <h2>Add Floor Plan</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={floorPlanName}
        onChange={(e) => setFloorPlanName(e.target.value)}
        placeholder="Floor Plan Name"
      />
      <button onClick={addFloorPlan}>Add Floor Plan</button>
    </div>
  );
};

export default AddFloorPlan;
