import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'; 

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('posts') // Change table name from 'crewmates' to 'posts'
                .select();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post) => 
                   <Card 
                       key={post.id} 
                       id={post.id} 
                       author={post.author} 
                       description={post.description} 
                       category={post.category} 
                       price={post.price} 
                   />
                ) : <h2>You don't have any posts.</h2>
            }
        </div>  
    );
};

export default ReadPosts;