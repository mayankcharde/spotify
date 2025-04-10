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
        <>
            <DisplayNav />
            <div className='mt-8'>
                <div className='flex items-end gap-6'>
                    <div className='w-48 h-48 bg-gradient-to-br from-[#404040] to-[#282828] rounded-lg shadow-2xl flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-16 h-16">
                            <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" />
                        </svg>
                    </div>
                    <div>
                        <p className='text-sm'>Playlist</p>
                        <h1 className='text-5xl font-bold mb-4'>{playlist.name}</h1>
                        <p className='text-gray-400'>{playlist.description}</p>
                        <p className='text-sm mt-2'>{playlist.songs.length} songs</p>
                    </div>
                </div>

                <div className='mt-8'>
                    {playlist.songs.length === 0 ? (
                        <div className='text-center py-20 text-gray-400'>
                            <p className='text-2xl font-bold mb-2'>This playlist is empty</p>
                            <p>Add songs to your playlist</p>
                        </div>
                    ) : (
                        <div className='space-y-2'>
                            {playlist.songs.map((song, index) => (
                                <div key={`${song.id}-${index}`} 
                                    className={`group flex items-center justify-between p-3 rounded-lg 
                                        ${playStatus && track.id === song.id ? 'bg-[#ffffff1a]' : 'hover:bg-[#ffffff1a]'}`}>
                                    <div className='flex items-center gap-4 flex-1' onClick={() => playWithId(song.id)}>
                                        <span className='w-6 text-center text-gray-400 group-hover:hidden'>
                                            {index + 1}
                                        </span>
                                        <span className='w-6 hidden group-hover:block text-white cursor-pointer'>
                                            {playStatus && track.id === song.id ? '❚❚' : '▶'}
                                        </span>
                                        <img src={song.image} alt={song.name} 
                                            className='w-12 h-12 rounded' />
                                        <div>
                                            <p className={`font-semibold ${playStatus && track.id === song.id ? 'text-green-500' : ''}`}>
                                                {song.name}
                                            </p>
                                            <p className='text-sm text-gray-400'>{song.desc}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setShowDeleteConfirm(song)}
                                        className='md:opacity-0 md:group-hover:opacity-100 transition-opacity px-3 py-1.5 
                                            text-gray-400 hover:text-white rounded-full hover:bg-[#ffffff1a]'
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
                    onClick={() => setShowDeleteConfirm(null)}>
                    <div className="bg-[#282828] p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
                        onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4">Remove Song</h3>
                        <p className="text-gray-300 mb-6">
                            Remove "{showDeleteConfirm.name}" from "{playlist.name}"?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 text-sm font-semibold rounded-full hover:bg-[#333333]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteSong(showDeleteConfirm.id)}
                                className="px-4 py-2 text-sm font-semibold bg-white text-black rounded-full hover:bg-gray-200"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DisplayPlaylist;
