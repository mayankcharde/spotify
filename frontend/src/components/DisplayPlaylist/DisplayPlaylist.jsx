import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlaylistContext } from '../../context/PlaylistContext';
import { PlayerContext } from '../../context/PlayerContext';
import DisplayNav from '../DisplayNav/DisplayNav';

const DisplayPlaylist = () => {
    const { id } = useParams();
    const { playlists, removeSongFromPlaylist } = useContext(PlaylistContext);
    const { playWithId, playStatus, track } = useContext(PlayerContext);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const playlist = playlists.find(p => p.id === parseInt(id));
    if (!playlist) return <div>Playlist not found</div>;

    const handleDeleteSong = (songId) => {
        removeSongFromPlaylist(playlist.id, songId);
        setShowDeleteConfirm(null);
    };

    return (
        <div className='h-full flex flex-col'>
            <div className='-mt-4 mb-2 sm:mb-4'>
                <DisplayNav />
            </div>
            
            <div className='flex-1 overflow-y-auto scrollbar-hidden'>
                <div className='sticky top-0 z-10 px-3 py-3 sm:p-4 md:p-6 lg:p-8 
                    bg-gradient-to-b from-[#404040]/30 via-[#404040]/15 to-transparent 
                    backdrop-blur-[2px]'>
                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 sm:items-end'>
                        <div className='w-24 h-24 sm:w-32 sm:h-32 md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px] 
                            bg-gradient-to-br from-[#404040] to-[#282828] 
                            rounded-lg shadow-2xl flex items-center justify-center 
                            mx-auto sm:mx-0 hover:scale-105 transition-transform group'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                fill="white" className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16
                                    group-hover:scale-110 transition-transform">
                                <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" />
                            </svg>
                        </div>

                        <div className='text-center sm:text-left flex-1 min-w-0 space-y-1 sm:space-y-2'>
                            <p className='text-xs sm:text-sm uppercase tracking-wider opacity-90'>Playlist</p>
                            <h1 className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold 
                                bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400
                                truncate px-8 sm:px-0'>
                                {playlist.name}
                            </h1>
                            <p className='text-gray-300 text-sm sm:text-base line-clamp-2 sm:line-clamp-none'>
                                {playlist.description}
                            </p>
                            <p className='text-sm text-gray-400'>
                                {playlist.songs.length} {playlist.songs.length === 1 ? 'song' : 'songs'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='px-3 sm:px-4 md:px-6 lg:px-8 pb-32'>
                    {playlist.songs.length === 0 ? (
                        <div className='text-center text-gray-400 mt-8 sm:mt-10 md:mt-20'>
                            <p className='text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4'>
                                This playlist is empty
                            </p>
                            <p className='text-sm sm:text-base'>Add songs to your playlist</p>
                        </div>
                    ) : (
                        <div className='space-y-1 sm:space-y-2'>
                            {playlist.songs.map((song, index) => (
                                <div key={`${song.id}-${index}`} 
                                    className={`flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 rounded-lg 
                                        transition-all duration-300 group relative hover:bg-white/5
                                        ${playStatus && track.id === song.id ? 'bg-white/10' : ''}`}>
                                    <div className='flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0'
                                        onClick={() => playWithId(song.id)}>
                                        <span className='w-6 sm:w-8 md:w-10 text-center text-gray-400 
                                            text-xs sm:text-sm md:text-base group-hover:hidden'>
                                            {index + 1}
                                        </span>
                                        <span className='w-6 sm:w-8 md:w-10 hidden group-hover:block 
                                            text-white text-xs sm:text-sm md:text-base'>
                                            {playStatus && track.id === song.id ? '❚❚' : '▶'}
                                        </span>

                                        <div className='relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden 
                                            group-hover:shadow-lg transition-all flex-shrink-0'>
                                            <img src={song.image} alt={song.name} 
                                                className='w-full h-full object-cover group-hover:scale-110 
                                                transition-transform duration-300' />
                                        </div>

                                        <div className='min-w-0 flex-1'>
                                            <p className={`font-semibold truncate text-sm sm:text-base
                                                ${playStatus && track.id === song.id ? 'text-green-500' : ''}`}>
                                                {song.name}
                                            </p>
                                            <p className='text-xs sm:text-sm text-gray-400 truncate'>{song.desc}</p>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowDeleteConfirm(song);
                                        }}
                                        className='p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 
                                            transition-all text-gray-400 hover:text-red-500 
                                            rounded-full hover:bg-white/10'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                            fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in"
                    onClick={() => setShowDeleteConfirm(null)}>
                    <div className="bg-[#282828] p-6 rounded-lg shadow-xl max-w-md w-full mx-4 animate-slide-up"
                        onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4">Remove Song</h3>
                        <p className="text-gray-300 mb-6">
                            Remove "{showDeleteConfirm.name}" from "{playlist.name}"?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 text-sm font-semibold rounded-full hover:bg-[#333333] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteSong(showDeleteConfirm.id)}
                                className="px-4 py-2 text-sm font-semibold bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayPlaylist;
