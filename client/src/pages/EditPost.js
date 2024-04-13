import React, { useState, useEffect } from 'react'; // Added useState import
import { useParams } from 'react-router-dom';
import { supabase } from '../client'
import './EditPost.css'

const EditPost = ({ data }) => {
    const { id } = useParams();
    const [post, setPost] = useState({ id: null, name: "", speed: "", color: "" });

    useEffect(() => {
        const fetchData = async () => {
            const { data: postData, error } = await supabase
                .from('crewmates')
                .select("*")
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error loading post', error);
            } else {
                setPost(postData);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('crewmates')
            .update({ name: post.name, speed: post.speed, color: post.color })
            .eq('id', id);

        window.location = "/";
    };

    const deletePost = async () => {
        await supabase
            .from('crewmates')
            .delete()
            .eq('id', id);

        window.location = "/";
    };

    return (
        <div>
            <form onSubmit={updatePost}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={post.name} onChange={handleChange} /><br/>
                <label htmlFor="speed">Speed:</label>
                <input type="text" id="speed" name="speed" value={post.speed} onChange={handleChange} /><br/>
                <label htmlFor="color">Color:</label>
                <select id="color" name="color" value={post.color} onChange={handleChange}>
                    {["Red", "Blue", "Green", "Yellow", "Purple"].map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select><br/>
                <input type="submit" value="Submit" />
                <button type="button" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
}

export default EditPost;
