import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'; // Import supabase

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Asynchronously fetch posts from the database
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('crewmates')
                .select();
            setPosts(data); // Update the posts state with fetched data
        };

        fetchPosts(); // Call the fetchPosts function
    }, []); // Dependency array is empty, so this runs once on mount

    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post, index) => 
                   <Card 
                       key={post.id} // Added key for list rendering
                       id={post.id} 
                       name={post.name} 
                       speed={post.speed} 
                       color={post.color}
                   />
                ) : <h2>{'ඞ You don not have any crewmates ඞ'}</h2>
            }
        </div>  
    );
};

export default ReadPosts;