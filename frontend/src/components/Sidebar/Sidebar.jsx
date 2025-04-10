import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { LikedSongsContext } from '../../context/LikedSongsContext'
import { PlaylistContext } from '../../context/PlaylistContext'
import CreatePlaylistModal from '../CreatePlaylistModal/CreatePlaylistModal'
import DeletePlaylistModal from '../DeletePlaylistModal/DeletePlaylistModal'
import SearchBar from '../SearchBar/SearchBar';

const Sidebar = ({ onClose }) => {
    const navigate = useNavigate();
    const { likedSongs } = useContext(LikedSongsContext);
    const { playlists } = useContext(PlaylistContext);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [playlistToDelete, setPlaylistToDelete] = useState(null);

    return (
        <div className='h-full flex flex-col bg-black'>
            {/* Mobile header */}
            <div className='lg:hidden flex items-center justify-between p-4 glass-bg'>
                <img src={assets.spotify_logo} alt="Spotify" className='h-8' />
                <button onClick={onClose} className='p-2 hover:bg-white/10 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Navigation */}
            <div className='flex-1 overflow-y-auto scrollbar-hidden p-2'>
                <div className='bg-[#121212] rounded-lg mb-2'>
                    <button onClick={() => navigate('/')} 
                        className='w-full sidebar-link'>
                        <img className='w-6' src={assets.home_icon} alt="" />
                        <span className='font-bold'>Home</span>
                    </button>
                    <div className='p-2'>
                        <SearchBar />
                    </div>
                </div>

                <div className='bg-[#121212] rounded-lg flex-1'>
                    <div className='p-4 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <img className='w-8' src={assets.stack_icon} alt="" />
                            <span className='font-semibold'>Your Library</span>
                        </div>
                        <button onClick={() => setShowCreateModal(true)}
                            className='w-8 h-8 flex items-center justify-center rounded-full 
                                hover:bg-[#282828] transition-all'>
                            <img className='w-5' src={assets.plus_icon} alt="" />
                        </button>
                    </div>
                    
                    {/* Library content */}
                    <div className='px-2 pb-4 space-y-2'>
                        <button onClick={() => {
                            navigate('/liked');
                            onClose?.();
                        }} 
                        className='w-full p-3 bg-gradient-to-br from-purple-800 to-blue-900 
                            rounded-lg hover:opacity-90 transition-opacity'>
                            <h3 className='font-bold text-xl mb-1'>Liked Songs</h3>
                            <p className='text-sm text-gray-300'>{likedSongs.length} liked songs</p>
                        </button>

                        {/* Playlists */}
                        {playlists.map(playlist => (
                            <div 
                                key={playlist.id}
                                className='p-4 bg-[#282828] rounded-lg cursor-pointer hover:bg-[#333333] transition-all group relative'
                            >
                                <div onClick={() => {
                                    navigate(`/playlist/${playlist.id}`);
                                    onClose?.();
                                }}>
                                    <h3 className='font-bold truncate'>{playlist.name}</h3>
                                    <p className='text-sm text-gray-400 truncate'>
                                        {playlist.songs.length} songs
                                    </p>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPlaylistToDelete(playlist);
                                    }}
                                    className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
                                        p-2 hover:bg-[#444444] rounded-full transition-all'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                        fill="currentColor" className="w-5 h-5 text-gray-400 hover:text-white">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452z" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showCreateModal && (
                <CreatePlaylistModal onClose={() => setShowCreateModal(false)} />
            )}
            {playlistToDelete && (
                <DeletePlaylistModal 
                    playlistId={playlistToDelete.id}
                    playlistName={playlistToDelete.name}
                    onClose={() => setPlaylistToDelete(null)}
                />
            )}
        </div>
    )
}

export default Sidebar