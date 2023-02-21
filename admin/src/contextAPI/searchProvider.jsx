import React, { createContext, useContext, useState } from 'react'
import { searchPosts } from '../api/post';

const SearchContext = createContext();

export default function SearchProvider({ children }) {
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = async (query) => {
        const { error, posts } = await searchPosts(query);
        if (error) return console.log(error);
        setSearchResult(posts);
    };

    const resetSearch = () => {
        setSearchResult([]);
    };

    return (
        <div>
            <SearchContext.Provider value={{ searchResult, handleSearch, resetSearch }}>
                {children}
            </SearchContext.Provider>
        </div>
    )
}

//Custom Hook
export const useSearch = () => useContext(SearchContext)