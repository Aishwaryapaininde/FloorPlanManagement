import React, { useState, useEffect } from 'react';

const DeleteFloorPlan = () => {
  const [floorPlans, setFloorPlans] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFloorPlans();
  }, []);

  const fetchFloorPlans = async () => {
    try {
      const response = await fetch("http://localhost:8000/floorplans");
      if (!response.ok) {
        throw new Error("Failed to fetch floor plans");
      }
      const data = await response.json();
      setFloorPlans(data);
    } catch (error) {
      setError("Error loading floor plans: " + error.message);
    }
  };

  const deleteFloorPlan = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/delete-floorplan/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setFloorPlans(floorPlans.filter(floorPlan => floorPlan._id !== id));
      } else {
        throw new Error("Failed to delete floor plan");
      }
    } catch (error) {
      setError("Error deleting floor plan: " + error.message);
    }
  };
  // Sample useEffect to fetch floor plans on component load
useEffect(() => {
    fetch("http://localhost:8000/floorplans")
      .then(response => response.json())
      .then(data => {
        setFloorPlans(data);
      })
      .catch(error => {
        console.error("Error loading floor plans:", error);
      });
  }, []);
  

  return (
    <div>
      <h2>Delete Floor Plan</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {floorPlans.map((floorPlan) => (
          <li key={floorPlan._id}>
            <p>Name: {floorPlan.name}</p>
            <button onClick={() => deleteFloorPlan(floorPlan._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteFloorPlan;
