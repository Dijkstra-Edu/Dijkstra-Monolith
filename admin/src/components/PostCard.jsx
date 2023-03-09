import React from 'react'
import dateFormat from 'dateformat';
import { BsPencil, BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom';

export default function PostCard({ post, onDeleteClick }) {
  if (!post) return null;
  const { title, thumbnail, tags, meta, createdAt, slug, author } = post;
  return (
    <div className='border bg-slate-100/20 shadow-md flex flex-col my-2'>
      <img className='aspect-video' src={thumbnail || './default.jpg'} alt={title} />
      <div className="p-4">
        <h1 className='text-xl font-semibold text-black-700'>{title}</h1>
        <p className='my-1 text-sm text-blue-600'><b className='text-sm text-gray-500'>Tags: </b>{"#"+tags.join(', #')}</p>
        <p className='text-gray-500 text-xs'>{meta.length > 100 ? meta.substring(0, 100) + "..." : meta}</p>

        <div className="flex justify-between py-2">
          <p className='text-sm text-gray-500'>{dateFormat(createdAt, 'mediumDate')}</p>
          <p className='text-sm text-gray-500'>{author}</p>
        </div>

        <div className="flex space-x-3 justify-center my-2">
          <Link to={`/update-post/${slug}`} className='flex mx-1 items-center space-x-2 px-10 ring-1 transition ease-in-out ring-custom-green rounded h-10 text-custom-green hover:bg-custom-green/60 hover:text-white'>
            <BsPencil /><span>Edit</span>
          </Link>
          <button onClick={onDeleteClick} className='flex mx-1 items-center space-x-2 px-10 ring-1 transition ease-in-out ring-custom-red rounded h-10 text-custom-red hover:bg-custom-red/60 hover:text-white'>
            <BsTrash /><span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}
