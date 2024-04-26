import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';  

const PostDetails = () => { // Change component name to PostDetails
    const { id } = useParams();
    const [post, setPost] = useState(null); // Change variable name to 'post'

    useEffect(() => {
        const fetchPost = async () => { // Change function name to 'fetchPost'
            const { data, error } = await supabase
                .from('posts') // Change table name from 'crewmates' to 'posts'
                .select("*")
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post details:', error);
            } else {
                setPost(data);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Post: {post.author}</h1> {/* Change 'Crewmate' to 'Post' */}
            <p>Description: {post.description}</p> {/* Display description */}
            <p>Category: {post.category}</p> {/* Display category */}
            {post.category === 'listing' && <p>Price: ${post.price}</p>} {/* Display price only if category is 'listing' */}
        </div>
    );
};

export default PostDetails;