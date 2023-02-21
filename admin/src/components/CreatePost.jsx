import React from 'react'
import { ImSpinner11, ImEye, ImFilePicture, ImFileEmpty } from 'react-icons/im'

const mdRules = [
  { title: "From h1 to h6", rule: "#Heading -> ###### Heading"},
  { title: "Blockquote", rule: "> Your Quote"},
  { title: "Image", rule: "![image alt](https://image_url.com)"},
  { title: "Link", rule: "[Link Text](https://link.com)"},
  { title: "Code Block", rule: "~ Your Code"},
]

export default function CreatePost() {
  return (
    <form className='p-2 flex' action="" >
      <div className="w-9/12 space-y-5 p-2 flex flex-col h-screen">
        <div className="flex items-center justify-between">
          <h1 className='text-xl font-semibold text-gray-700'>Create your Post</h1>

          <div className="flex items-center space-x-5">
            <button className='flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:bg-blue-400 hover:text-white'><ImSpinner11 /><span>Reset</span></button>
            <button className='flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:bg-blue-400 hover:text-white'><ImEye /><span>View</span></button>
            <button className='flex items-center space-x-2 px-3 ring-1 pl-20 pr-20 ring-blue-500 rounded h-10 bg-blue-500 hover:bg-blue-300 text-white'>Post</button>
          </div>
        </div>
        {/* Checkbox  */}
        <div>
          <input id='featured' type="checkbox" hidden />
          <label className='flex items-center space-x-2 text-gray-700 cursor-pointer group' htmlFor="featured">
            <div className='w-4 h-4 border rounded-full border-gray-700 flex flex-col items-center justify-center group-hover:border-blue-500 transition-colors ease-in-out '>
              <div className='w-2 h-2 border bg-gray-700 rounded-full group-hover:bg-blue-500 transition-colors ease-in-out '></div>
            </div>
            <span className='group-hover:text-blue-500 transition-colors ease-in-out '>Featured</span>
          </label>
        </div>

        {/* Title Input */}
        <input type="text" className='text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold bg-slate-100' placeholder='Add Title' />

        {/* image input */}
        <div className="flex space-x-2">
          <div>
            <input id="image-input" type="file" hidden />
            <label htmlFor='image-input' className='flex cursor-pointer items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:bg-blue-400 hover:text-white'><ImFilePicture /><span>Place Image</span></label>
          </div>

          <div className='flex flex-1 justify-between rounded overflow-hidden bg-gray-400'>
            <input type="text" value="https://res.cloudinary.com/doj42fk3d/image/upload/v1676979759/zofbs8msolailjg4ss3x.jpg" className="bg-transparent px-2 text-white w-full" disabled />
            <button className='text-xs flex flex-col items-center justify-center p-1 self-stretch bg-gray-700 text-white'><ImFileEmpty /><span>Copy</span></button>
          </div>
        </div>


        {/* Markdown Input */}
        <textarea className='flex-1 resize-none w-full outline-none focus:ring-1 rounded p-2 font-mono tracking-wide text-lg bg-slate-100' placeholder='Markdown'></textarea>

        {/* Tags Input */}
        <div>
          <label htmlFor="tags">Tags</label>
          <input id='tags' type="text" className='outline-none focus:ring-1 rounded p-2 w-full bg-slate-100' placeholder='Add Tags' />
        </div>

        {/* Meta description Input */}
        <div>
          <label htmlFor="meta">Meta Description</label>
          <textarea id='meta' className='resize-none w-full outline-none focus:ring-1 rounded p-2 bg-slate-100' placeholder='Add Brief Description'></textarea>
        </div>
      </div>
      <div className="w-1/4 px-2 relative">
        <h1 className='text-xl font-semibold text-gray-700 mb-2'>Thumbnail</h1>
        <div>
          <input id='thumbnail' type="file" hidden/>
          <label className='cursor-pointer' htmlFor="thumbnail">
            <div className="border border-dashed border-gray-500 aspect-video text-gray-500 flex flex-col justify-center items-center">
              <span>Select thumbnail</span>
              <span className='text-xs'>Recommended Size</span>
              <span className='text-xs'>1280 * 720</span>
            </div>
          </label>
        </div>

        <div className="bg-blue-500 text-white absolute top-2 translate-y-1/2 px-2 py-4 rounded">
          <h1 className='font-semibold text-center'>General Markdown Rules</h1>
          <ul className='space-y-2'>
            {mdRules.map(({title, rule}) => {
              return <li key={title}>
                <p className='font-semibold text-gray-700'>{title}</p>
                <p className='font-semibold text-gray-500 pl-2 font-mono'>{rule}</p>
              </li>
            })}
            <li className='text-center'>
              <a href="https://www.markdownguide.org/basic-syntax/" rel="noopener noreferrer" target="_blank">Find out more</a>
            </li>
          </ul>
        </div>
      </div>
    </form>
  )
}
