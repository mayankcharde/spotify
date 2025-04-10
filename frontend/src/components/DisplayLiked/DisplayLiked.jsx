import React, { useContext, useState } from 'react';
import { LikedSongsContext } from '../../context/LikedSongsContext';
import { PlayerContext } from '../../context/PlayerContext';
import DisplayNav from '../DisplayNav/DisplayNav';
import { assets } from '../../assets/assets';

const DisplayLiked = () => {
    const { likedSongs, toggleLike, deleteLikedSong } = useContext(LikedSongsContext);
    const { playWithId } = useContext(PlayerContext);
    const [showConfirm, setShowConfirm] = useState(false);
    const [songToDelete, setSongToDelete] = useState(null);

    const handleDelete = (song) => {
        setSongToDelete(song);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        if (songToDelete) {
            deleteLikedSong(songToDelete.id);
            setShowConfirm(false);
            setSongToDelete(null);
        }
    };

    return (
        <div className='h-full flex flex-col'>
            <DisplayNav />
            
            <div className='flex-1 overflow-y-auto scrollbar-hidden'>
                <div className='mt-6 md:mt-10 p-4 md:p-8 bg-gradient-to-b from-purple-800/40'>
                    <div className='flex flex-col md:flex-row gap-6 md:items-end'>
                        <div className='w-32 md:w-48 h-32 md:h-48 bg-gradient-to-br from-purple-800 to-blue-900 
                            rounded-lg shadow-2xl flex items-center justify-center mx-auto md:mx-0'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                fill="white" className="w-12 md:w-16 h-12 md:h-16">
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                        </div>
                        <div className='text-center md:text-left'>
                            <p className='text-sm uppercase tracking-wider'>Playlist</p>
                            <h2 className='text-4xl md:text-7xl font-bold mb-4'>Liked Songs</h2>
                            <p className='text-gray-300'>{likedSongs.length} songs</p>
                        </div>
                    </div>
                </div>

                <div className='p-4 md:p-8'>
                    {likedSongs.length === 0 ? (
                        <div className='text-center text-gray-400 mt-20'>
                            <p className='text-2xl font-bold mb-4'>Songs you like will appear here</p>
                            <p>Save songs by tapping the heart icon</p>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {likedSongs.map((song, index) => (
                                <div key={song.id} 
                                    className='flex items-center justify-between p-2 rounded-lg hover:bg-[#282828] group'>
                                    <div className='flex items-center gap-4 flex-1'
                                        onClick={() => playWithId(song.id)}>
                                        <span className='w-6 text-center text-gray-400 group-hover:hidden'>
                                            {index + 1}
                                        </span>
                                        <span className='w-6 hidden group-hover:block text-white cursor-pointer'>
                                            ▶
                                        </span>
                                        <img src={song.image} alt={song.name} 
                                            className='w-12 h-12 rounded-lg' />
                                        <div>
                                            <p className='font-semibold'>{song.name}</p>
                                            <p className='text-sm text-gray-400'>{song.desc}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <button onClick={() => toggleLike(song)}
                                            className='opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                                fill="#1DB954" className="w-6 h-6">
                                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(song)}
                                            className='opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    <span className='text-gray-400 w-16 text-sm'>
                                        {song.duration}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#282828] p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold mb-4">Delete Song</h3>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to remove "{songToDelete?.name}" from your liked songs?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 text-sm font-semibold rounded-full hover:bg-[#333333]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-semibold bg-red-500 rounded-full hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayLiked;
