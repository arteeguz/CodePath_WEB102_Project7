import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'; 
import './ReadPosts.css';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('posts')
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
                       image_url={post.image_url} // Pass image_url prop here
                   />
                ) : <h2>You don't have any posts.</h2>
            }
        </div>  
    );
};

export default ReadPosts;
