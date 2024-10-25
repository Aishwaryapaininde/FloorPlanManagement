import React, { useState, useEffect } from 'react';
import AddFloorPlan from './AddFloorPlan'; // Import AddFloorPlan component

const ModifyFloorPlan = () => {
  const [floorPlans, setFloorPlans] = useState([]);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFloorPlans();
  }, []);

  const fetchFloorPlans = async () => {
    try {
      const response = await fetch("/floorplans");
      if (!response.ok) throw new Error("Failed to fetch floor plans");
      const data = await response.json();
      console.log(data); // Log the fetched data
      setFloorPlans(data);
    } catch (error) {
      setError("Error loading floor plans: " + error.message);
    }
  };
  
  const updateFloorPlan = async (id, updatedData) => {
    try {
      const response = await fetch(`/update-floorplan/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        await fetchFloorPlans();
      } else throw new Error("Failed to update floor plan");
    } catch (error) {
      setError("Error updating floor plan: " + error.message);
    }
  };

  return (
    <div>
      <h2>Modify Floor Plan</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <AddFloorPlan onAddSuccess={fetchFloorPlans} /> {/* Add FloorPlan component */}
      <ul>
        {floorPlans.map((floorPlan) => (
          <li key={floorPlan._id}>
            <p>Name: {floorPlan.name}</p>
            <button onClick={() => setSelectedFloorPlan(floorPlan)}>Edit</button>
          </li>
        ))}
      </ul>
      {selectedFloorPlan && (
        <div>
          <h3>Edit Floor Plan</h3>
          <label>
            Name:
            <input
              type="text"
              value={selectedFloorPlan.name}
              onChange={(e) =>
                setSelectedFloorPlan({ ...selectedFloorPlan, name: e.target.value })
              }
            />
          </label>
          <button onClick={() => updateFloorPlan(selectedFloorPlan._id, selectedFloorPlan)}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ModifyFloorPlan;
