import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import SongItem from '../SongItem/SongItem';
import DisplayNav from '../DisplayNav/DisplayNav';

const DisplaySearch = () => {
    const { searchQuery, searchResults } = useContext(SearchContext);

    return (
        <>
            <DisplayNav />
            <div className='mt-8'>
                {searchQuery ? (
                    <>
                        <h2 className='text-2xl font-bold mb-6'>
                            Results for "{searchQuery}"
                        </h2>
                        {searchResults.length > 0 ? (
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                                {searchResults.map((song) => (
                                    <SongItem
                                        key={song.id}
                                        id={song.id}
                                        name={song.name}
                                        desc={song.desc}
                                        image={song.image}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className='text-center py-20 text-gray-400'>
                                <p className='text-2xl font-bold mb-2'>No results found</p>
                                <p>Try searching for something else</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className='text-center py-20 text-gray-400'>
                        <p className='text-2xl font-bold mb-2'>Start searching</p>
                        <p>Find your favorite songs</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default DisplaySearch;
