import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { searchPosts } from '../api/post';
import { useNotification } from '../contextAPI/NotificationProvider';

const SearchContext = createContext();

export default function SearchProvider({ children }) {
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate()
    const { updateNotification } = useNotification()

    const handleSearch = async (query) => {
        const { error, posts } = await searchPosts(query);
        if (error) return updateNotification('error', "Error Encountered in Search Provider: "+error);
        setSearchResult(posts);
        navigate("/");
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