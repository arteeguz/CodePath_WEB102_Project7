import React, { useState } from 'react';
import './CreatePost.css';

// Importing supabase to interact with the database
import { supabase } from '../client.js';

const CreatePost = () => {
    const [post, setPost] = useState({ name: "", speed: "", color: "Red" });  // Default color set to 'Red'

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    const createPost = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('crewmates')
            .insert([post]);  // Ensure this is an array of objects

        if (error) {
            console.error('Error:', error);
        } else {
            window.location = "/";  // Redirect to home to see all posts
        }
    };

    return (
        <div>
            <form onSubmit={createPost}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={post.name} onChange={handleChange} /><br/>
                <label htmlFor="speed">Speed:</label>
                <input type="text" id="speed" name="speed" value={post.speed} onChange={handleChange} /><br/>
                <fieldset>
                    <legend>Color</legend>
                    {["Red", "Blue", "Green", "Yellow", "Purple"].map((color) => (
                        <label key={color}>
                            <input type="radio" name="color" value={color} checked={post.color === color} onChange={handleChange} />
                            {color}
                        </label>
                    ))}
                </fieldset>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CreatePost;
