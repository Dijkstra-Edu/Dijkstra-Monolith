import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import PostListItems from './PostListItems';
import { getSimilarPost, getSinglePost } from '../API/post';

export default function RelatedPosts({ postId, onPostPress }) {
    const [posts, setPosts] = useState([]);

    

    const fetchSimilarPosts = async () => {
        const { error, posts } = await getSimilarPost(postId);
        if (error) return console.log(error);
        setPosts([...posts]);
    }

    useEffect(() => {
        fetchSimilarPosts()
    }, [postId])


    return (
        <View style={{marginTop: 5}}>
            {posts.map(post => {
                return (<View key={post.id} style={{paddingVertical: 5}}>
                    <PostListItems post={post} onPress={() => onPostPress(post.slug)} />
                </View>)
            })}
        </View>
    )
}

const styles = StyleSheet.create({})