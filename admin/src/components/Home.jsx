import React, { useEffect } from 'react'
import { delPosts, getPosts } from '../api/post'
import { useState } from 'react';
import PostCard from './PostCard';
import { useSearch } from '../contextAPI/searchProvider';
import { useNotification } from '../contextAPI/NotificationProvider';

let pageNo = 0;
const POST_LIMIT = 9;

const getPaginationCount = (length) => {
  const divVal = length / POST_LIMIT;
  if (divVal % 1 !== 0) {
    return Math.floor(divVal) + 1;
  }
  return divVal;
};

export default function Home() {
  const { searchResult } = useSearch(); //Custom hook via context API
  const [posts, setPosts] = useState([])
  const [totalPostCount, setTotalPostCount] = useState([])
  const { updateNotification } = useNotification()

  const paginationCount = getPaginationCount(totalPostCount);
  const paginationArray = new Array(paginationCount).fill(' ');

  const fetchPosts = async () => {
    const { error, posts, postCount } = await getPosts(pageNo, POST_LIMIT);
    if (error) return updateNotification('error', "Error Encountered in Home.jsx: "+error);;

    //console.log(posts);
    setPosts(posts);
    setTotalPostCount(postCount);
  }

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line
  }, []);

  const fetchMorePosts = (index) => {
    pageNo = index;
    fetchPosts()
  };

  const handleDelete = async ({ title, id }) => { //Modify this as required later
    const confirmed = window.confirm('Are you sure you want to delete post titled "' + title + '"?');
    if (!confirmed) return;
    const { error, message } = await delPosts(id);
    if (error) return updateNotification('error', "Error Encountered in Home.jsx: "+error);
    updateNotification('success', "Successfully Deleted Post: " + message);

    const newPosts = posts.filter(p => p.id !== id)
    setPosts(newPosts);
    window.location.reload(false);
  };

  return (
    <div> {/*  className='p-2 flex flex-col' */}
      <div className='grid grid-cols-3 gap-3 pb-3'>
        {searchResult.length ? searchResult.map(post => { //i.e. if search exists, utilize search state to display posts
          return <PostCard key={post.id} post={post} onDeleteClick={() => handleDelete(post)} />;
        }) :
          posts.map(post => {
            return <PostCard key={post.id} post={post} onDeleteClick={() => handleDelete(post)} />;
          })}
      </div>
      {!searchResult.length ? (<div className='py-5 flex justify-center items-center space-x-3'>
        {paginationArray.map((_, index) => {
          return <button
            key={index}
            onClick={() => fetchMorePosts(index)}
            className={
              index === pageNo
                ? 'text-custom-green border-b-2 border-custom-green'
                : 'text-gray-500'
            }>{index + 1}</button>
        })}
      </div>) : (<div></div>)}


    </div>
  )
}
