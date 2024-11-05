import React, { useEffect, useState } from 'react';

const DeleteFloorPlan = () => {
    const [floorPlans, setFloorPlans] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFloorPlans();
    }, []);

    const fetchFloorPlans = async () => {
        try {
            const response = await fetch('/api/floor-plans');
            const data = await response.json();
            setFloorPlans(data);
        } catch (err) {
            setError('Failed to load floor plans');
        }
    };

    const deleteFloorPlan = async (id) => {
        try {
            await fetch(`/api/floor-plans/${id}`, {
                method: 'DELETE',
            });
            setFloorPlans(floorPlans.filter(plan => plan.id !== id));
        } catch (err) {
            setError('Failed to delete floor plan');
        }
    };

    return (
        <div>
            <h1>Delete Floor Plan</h1>
            {error && <p>{error}</p>}
            <ul>
                {floorPlans.map(plan => (
                    <li key={plan.id}>
                        {plan.name} 
                        <button onClick={() => deleteFloorPlan(plan.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeleteFloorPlan;
