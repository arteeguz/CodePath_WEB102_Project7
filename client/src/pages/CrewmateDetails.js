import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';  // Ensure the path to your Supabase client is correct

const CrewmateDetails = () => {
    const { id } = useParams();  // This retrieves the `id` from the URL
    const [crewmate, setCrewmate] = useState(null);

    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data, error } = await supabase
                .from('crewmates')
                .select("*")
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching crewmate details:', error);
            } else {
                setCrewmate(data);
            }
        };

        fetchCrewmate();
    }, [id]);

    if (!crewmate) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Crewmate: {crewmate.name}</h1>
            <p>Speed: {crewmate.speed}</p>
            <p>Color: {crewmate.color}</p>
        </div>
    );
};

export default CrewmateDetails;
