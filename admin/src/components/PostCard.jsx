import React from 'react'
import dateFormat from 'dateformat';
import { BsPencil, BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom';

export default function PostCard({ post, onDeleteClick }) {
  if (!post) return null;
  const { title, thumbnail, tags, meta, createdAt, slug } = post;
  return (
    <div className='p-1 bg-gray-200 shadow-sm flex flex-col'>
      <img className='aspect-video' src={thumbnail || './default.jpg'} alt={title} />
      <div className="p-2">
        <h1 className='text-lg font-semibold text-black-700'>{title}</h1>
        <p className='text-gray-500'>{meta.length > 80 ? meta.substring(0, 80) + "..." : meta}</p>

        <div className="flex justify-between py-2">
          <p className='text-sm text-gray-500'>{dateFormat(createdAt, 'mediumDate')}</p>
          <p className='text-sm text-gray-500'>{tags.join(', ')}</p>
        </div>

        <div className="flex space-x-3">
          <Link to={`/update-post/${slug}`} className='w-8 h-8 rounded-full bg-gray-400 hover:bg-green-600 flex justify-center items-center text-white'>
            <BsPencil />
          </Link>
          <button onClick={onDeleteClick} className='w-8 h-8 rounded-full bg-red-400 hover:bg-blue-600 flex justify-center items-center text-white'>
            <BsTrash />
          </button>
        </div>
      </div>
    </div>
  )
}
