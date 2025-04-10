import React, { useContext, useEffect, useState, useRef } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const { performSearch } = useContext(SearchContext);
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/search') {
            setInputValue('');
            performSearch('');
        }
    }, [location.pathname]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setInputValue(value);
        performSearch(value);
        if (location.pathname !== '/search' && value) {
            navigate('/search');
        }
    };

    const clearSearch = () => {
        setInputValue('');
        performSearch('');
        inputRef.current?.focus();
    };

    return (
        <div className='relative group'>
            <input
                ref={inputRef}
                type='text'
                value={inputValue}
                onChange={handleSearch}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Search for songs...'
                className={`w-full bg-[#2a2a2a] rounded-full px-12 py-3 text-sm 
                    transition-all duration-300 ease
                    ${isFocused ? 'bg-[#333333] ring-2 ring-white/20' : 'hover:bg-[#303030]'}
                    placeholder-gray-400 focus:outline-none`}
            />
            
            {/* Search Icon */}
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-transform duration-300 
                ${isFocused ? 'scale-90' : 'scale-100'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className={`w-5 h-5 transition-colors duration-300 
                        ${isFocused ? 'text-white' : 'text-gray-400'}`}>
                    <path fillRule="evenodd" 
                        d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" />
                </svg>
            </div>

            {/* Clear Button */}
            {inputValue && (
                <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 
                        p-1 rounded-full hover:bg-[#404040] 
                        transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-4 h-4 text-gray-400 hover:text-white transition-colors duration-300">
                        <path fillRule="evenodd" 
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" 
                            clipRule="evenodd" />
                    </svg>
                </button>
            )}

            {/* Focus indicator line */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
                bg-white transition-all duration-300 rounded-full
                ${isFocused ? 'w-[calc(100%-24px)]' : ''}`}>
            </div>
        </div>
    );
};

export default SearchBar;
