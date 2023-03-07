import React, { useState } from 'react'
import { useSearch } from '../contextAPI/searchProvider';
import { AiOutlineClose } from 'react-icons/ai'

export default function SearchBar() {

  const [query, setQuery] = useState("");
  const { handleSearch, resetSearch, searchResult } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return;
    handleSearch(query);
  }

  const handleReset = (e) => {
    resetSearch();
    setQuery("");
  }

  const handleKeyDown = (e) => {
    if ((e.key === "Escape")) {
      resetSearch();
      setQuery("");
      //console.log(e.key);
    }

  }

  return (
    <form
      className='relative'
      onSubmit={handleSubmit}>
      <input
        value={query}
        onKeyDown={handleKeyDown}
        onChange={({ target }) => {
          setQuery(target.value);
          if (!query.trim()) return;
          handleSearch(query) //Hamdle Change live
        }}
        placeholder='Search'
        className='m-1 w-72 border-2 bg-slate-100/60 rounded-full outline-none py-2 px-5 transition ease-in-out delay-150 focus:ring-1 ring-[#008000]'
      />
      {searchResult.length
        ? (<button onClick={handleReset} className='absolute top-1/2 -translate-y-1/2 text-gray-400 right-3'>
          <AiOutlineClose />
        </button>)
        : null}

    </form>
  )
}
