import React, { createContext, useState } from 'react';
import { songsData } from '../assets/assets';

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const performSearch = (query) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        const results = songsData.filter(song => 
            song.name.toLowerCase().includes(query.toLowerCase()) ||
            song.desc.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <SearchContext.Provider value={{
            searchQuery,
            searchResults,
            performSearch
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
