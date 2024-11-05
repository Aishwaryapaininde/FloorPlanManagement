import React, { useEffect, useState } from 'react';

const ModifyFloorPlan = () => {
    const [floorPlans, setFloorPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
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

    const selectFloorPlan = (plan) => {
        setSelectedPlan(plan);
    };

    const modifyFloorPlan = async () => {
        try {
            await fetch(`/api/floor-plans/${selectedPlan.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedPlan),
            });
            fetchFloorPlans();
        } catch (err) {
            setError('Failed to modify floor plan');
        }
    };

    return (
        <div>
            <h1>Modify Floor Plan</h1>
            {error && <p>{error}</p>}
            <ul>
                {floorPlans.map(plan => (
                    <li key={plan.id} onClick={() => selectFloorPlan(plan)}>
                        {plan.name}
                    </li>
                ))}
            </ul>
            {selectedPlan && (
                <div>
                    <h2>Modify {selectedPlan.name}</h2>
                    <input
                        type="text"
                        value={selectedPlan.name}
                        onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
                    />
                    <button onClick={modifyFloorPlan}>Save Changes</button>
                </div>
            )}
        </div>
    );
};

export default ModifyFloorPlan;
