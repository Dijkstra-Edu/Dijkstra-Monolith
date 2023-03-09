import React, { useEffect, useState } from 'react'
import { ImSpinner11, ImEye, ImFilePicture, ImFileEmpty, ImSpinner2 } from 'react-icons/im'
import { uploadImage } from '../api/post'
import { useNotification } from '../contextAPI/NotificationProvider';
import DeviceView from './DeviceView'

const mdRules = [
  { title: "From h1 to h6", rule: "#Heading -> ###### Heading" },
  { title: "Blockquote", rule: "> Your Quote" },
  { title: "Image", rule: "![image alt](https://image_url.com)" },
  { title: "Link", rule: "[Link Text](https://link.com)" },
  { title: "Code Block", rule: "~ Your Code" },
]

export const defaultPost = {
  title: '',
  thumbnail: '',
  featured: false,
  content: '',
  tags: '',
  meta: ''
};

export default function PostForm({ onSubmit, busy, postBtnTitle, initialPost, resetAfterSubmit }) {

  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const [selectedThumbnailURL, setSelectedThumbnailURL] = useState("")
  const [imageUrlToCopy, setImageUrlToCopy] = useState("")
  const [imageUploading, setImageUploading] = useState(false)
  const [showDeviceView, setShowDeviceView] = useState(false)
  //const [busy, setBusy] = useState(false)

  const { updateNotification } = useNotification()

  useEffect(() => {
    if (initialPost) {
      setPostInfo({ ...initialPost });
      setSelectedThumbnailURL(initialPost?.thumbnail)
    }
    return () => {
      if (resetAfterSubmit) resetForm();
    };
  }, [initialPost, resetAfterSubmit])


  const handleChange = ({ target }) => {
    const { value, name, checked } = target;

    //For thumbnail
    if (name === 'thumbnail') {
      //const { file } = target.files[0];
      //console.log(target.files[0]);
      if (!target.files[0].type.includes('image')) {
        return updateNotification('warning', 'This is not an Image!');;
      }
      setPostInfo({ ...postInfo, thumbnail: target.files[0] });
      return setSelectedThumbnailURL(URL.createObjectURL(target.files[0]));
    }

    //For Featured
    if (name === 'featured') {
      return setPostInfo({ ...postInfo, [name]: checked });
    }

    //For Tags
    if (name === 'tags') {
      const newTags = tags.split(',');
      //console.log(newTags.length);
      if (newTags.length > 4) {
        updateNotification('warning', 'Warning: Only Maximum of 4 tags Allowed');
      }

      //return setPostInfo({ ...postInfo, [name]: checked });
    }

    //For Meta
    if (name === 'meta' && meta.length > 149) {
      return setPostInfo({ ...postInfo, meta: value.substring(0, 150) });
    }

    const post = { ...postInfo, [name]: value }
    setPostInfo({ ...post });

    localStorage.setItem('blogPost', JSON.stringify({ post }))
  };

  const handleImageUpload = async ({ target }) => {
    if (imageUploading) return;

    if (!target.files[0].type.includes('image')) {
      return updateNotification('warning', 'This is not an Image!');
    }

    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", target.files[0]);
    const { error, image } = await uploadImage(formData);
    setImageUploading(false);
    if (error) return updateNotification('error', error);;
    setImageUrlToCopy(image);
  };

  const handleOnCopy = () => {
    const textToCopy = `![Add Image Description](${imageUrlToCopy})`
    navigator.clipboard.writeText(textToCopy);
    //window.navigator.clipboard.writeText(textToCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, tags, meta } = postInfo;

    if (!title.trim()) return updateNotification('Error', 'Title is Missing!');
    if (!content.trim()) return updateNotification('Error', 'Add some content!');
    if (!tags.trim()) return updateNotification('Error', 'Add some tags!');
    if (!meta.trim()) return updateNotification('Error', 'Add metadata!');

    //Editiing data before its sent to BAckend via API
    const slug = title.toLowerCase().replace(/[^a-zA-Z ]/g, ' ').split(' ').filter(item => item.trim()).join('-');
    const newTags = tags.split(',').map(item => item.trim()).splice(0, 4);

    const formData = new FormData();
    const finalPost = { ...postInfo, tags: JSON.stringify(newTags), slug };
    for (let key in finalPost) {
      formData.append(key, finalPost[key]);
    }

    onSubmit(formData);
    //return updateNotification('success', 'Successfully Added Blog');
  };

  const resetForm = () => {
    setPostInfo({ ...defaultPost });
    localStorage.removeItem("blogPost");
  };

  const resetForm2 = () => {
    if (window.confirm("Are you sure you want to Reset Your Blog? All unsaved data will be lost...")) {
      setPostInfo({ ...defaultPost });
      localStorage.removeItem("blogPost");
      return updateNotification('success', 'Successfully Reset Blog');
    } else {
      return
    }
  };

  const { title, content, tags, featured, meta } = postInfo;

  return (

    <>
      <form className='p-2 flex' onSubmit={handleSubmit} >
        <div className="w-9/12 space-y-5 p-2 flex flex-col h-screen">

          <div className="flex items-center justify-between">
            <h1 className='text-7xl font-semibold text-gray-700'>Create your Post</h1>

          </div>
          <p>The v2.0 dashboard comes with a renewed, fresh look to handle your Blogging needs. </p>
          <div className="flex items-center space-x-5">

          </div>
          {/* Checkbox  */}
          <div className='flex justify-between'>
            <input name='featured' value={featured} onChange={handleChange} id='featured' type="checkbox" hidden />
            <label className='flex select-none items-center space-x-2 text-gray-700 cursor-pointer group' htmlFor="featured">
              <div className='w-4 h-4 border rounded-full border-gray-700 flex flex-col items-center justify-center group-hover:border-custom-green transition-colors ease-in-out '>
                {featured ? (<div className='w-2 h-2 border bg-gray-700 rounded-full group-hover:bg-custom-green transition-colors ease-in-out '></div>) : null}
              </div>
              <span className='group-hover:text-custom-green transition-colors ease-in-out '>Featured</span>
            </label>

            <div className='flex'>
              <button onClick={resetForm2} type='button' className='flex mx-2 items-center space-x-2 px-3 ring-1 ring-custom-red rounded h-10 text-custom-red hover:bg-custom-red hover:text-white'><ImSpinner11 /><span>Reset</span></button>
              <button onClick={() => setShowDeviceView(true)} type='button' className='flex mx-1 items-center space-x-2 px-3 ring-1 ring-gray-500 rounded h-10 text-gray-500 hover:bg-gray-500 hover:text-white'><ImEye /><span>View</span></button>
              <button className='flex mx-2 items-center space-x-2 ring-1 ring-custom-green rounded h-10 px-20 bg-custom-green hover:bg-custom-green text-white'>{busy ? <ImSpinner2 className='animate-spin mx-auto text-xl' /> : (postBtnTitle)}</button>
            </div>
          </div>

          {/* Title Input */}
          <input value={title} name='title' onChange={handleChange} type="text" className='text-xl outline-none focus:ring-custom-green focus:ring-1 rounded p-2 w-full font-semibold bg-slate-100' placeholder='Add Title' />

          {/* image input */}
          <div className="flex space-x-2">
            <div>
              <input onChange={handleImageUpload} id="image-input" type="file" hidden />
              <label htmlFor='image-input' className='flex cursor-pointer items-center space-x-2 px-3 ring-1 ring-custom-green rounded h-10 text-custom-green hover:bg-custom-green hover:text-white'>
                <span>Place Image</span>
                {!imageUploading ? <ImFilePicture /> : <ImSpinner2 className='animate-spin' />}
              </label>
            </div>

            {imageUrlToCopy && (<div className='flex flex-1 justify-between rounded overflow-hidden  bg-white border border-custom-green'>
              <input type="text" value={imageUrlToCopy} className="bg-transparent space-x-2 px-3 text-gray-400 w-full" disabled />
              <button onClick={handleOnCopy} type='button' className='text-xs flex flex-col items-center justify-center p-1 self-stretch text-custom-green'><ImFileEmpty /><span>Copy</span></button>
            </div>)}
          </div>



          {/* Markdown Input */}
          <textarea value={content} name='content' onChange={handleChange} rows="10" className='flex-1 resize-none w-full outline-none focus:ring-custom-green focus:ring-1 rounded p-2 font-mono tracking-wide text-sm bg-slate-100' placeholder='Markdown'></textarea>

          {/* Tags Input */}
          <div>
            <label className='text-gray-500' htmlFor="tags">Tags (Maximum of 4)</label>
            <input value={tags} name='tags' onChange={handleChange} id='tags' type="text" className='outline-none focus:ring-custom-green focus:ring-1 rounded p-2 w-full bg-slate-100' placeholder='Tag One, Tag Two, etc.' />
          </div>

          {/* Meta description Input */}
          <div>
            <label className='text-gray-500' htmlFor="meta">Meta Description: {meta?.length} / 150 Characters</label>
            <textarea value={meta} name='meta' onChange={handleChange} id='meta' className='resize-none w-full outline-none focus:ring-custom-green focus:ring-1 rounded p-2 bg-slate-100' placeholder='Add Brief Description'></textarea>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="w-1/4 px-2 relative my-10">
          <h1 className='text-xl font-semibold text-gray-700 mb-2'>Thumbnail</h1>
          <div>
            <input name='thumbnail' onChange={handleChange} id='thumbnail' type="file" hidden />
            <label className='cursor-pointer' htmlFor="thumbnail">
              {selectedThumbnailURL
                ? (<img src={selectedThumbnailURL} className="aspect-video rounded shadow-sm" alt="" />)
                : (<div className="border border-dashed border-gray-500 aspect-video text-gray-500 flex flex-col justify-center items-center">
                  <span>Select thumbnail</span>
                  <span className='text-xs'>Recommended Size</span>
                  <span className='text-xs'>1280 * 720</span>
                </div>)}
            </label>
          </div>

          {/* Markdown Rules */}
          <div className="border border-custom-green text-text-gray-700 absolute top-1 translate-y-1/2 px-2 py-4 rounded">
            <h1 className='font-semibold text-lg p-2 text-center'>General Markdown Rules</h1>
            <ul className='space-y-2'>
              {mdRules.map(({ title, rule }) => {
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
      <DeviceView title={title} content={content} thumbnail={selectedThumbnailURL} visible={showDeviceView} onClose={() => setShowDeviceView(false)} />
    </>

  )
}
