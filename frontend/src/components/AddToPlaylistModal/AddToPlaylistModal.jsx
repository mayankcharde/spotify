import React, { useContext, useCallback } from 'react';
import { PlaylistContext } from '../../context/PlaylistContext';

const AddToPlaylistModal = ({ song, onClose }) => {
    const { playlists, addSongToPlaylist } = useContext(PlaylistContext);

    const handleAddToPlaylist = useCallback((e, playlistId) => {
        e.stopPropagation();
        addSongToPlaylist(playlistId, song);
        onClose(e);
        
        // Show success toast
        const toast = document.createElement('div');
        toast.className = 'fixed top-16 right-8 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 z-[100]';
        toast.textContent = 'Added to playlist';
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 2000);
    }, [song, addSongToPlaylist, onClose]);

    const handleModalClick = useCallback((e) => {
        e.stopPropagation();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99] backdrop-blur-sm"
            onClick={onClose}>
            <div className="bg-[#282828] p-6 rounded-lg shadow-xl max-w-md w-full mx-4 animate-slide-up"
                onClick={handleModalClick}>
                <h2 className="text-2xl font-bold mb-6">Add to Playlist</h2>
                {playlists.length === 0 ? (
                    <p className="text-gray-400">You haven't created any playlists yet.</p>
                ) : (
                    <div className="space-y-2 max-h-[60vh] overflow-auto custom-scrollbar">
                        {playlists.map(playlist => (
                            <div
                                key={playlist.id}
                                onClick={(e) => handleAddToPlaylist(e, playlist.id)}
                                className="flex items-center gap-4 p-3 rounded-md hover:bg-[#333333] cursor-pointer group"
                            >
                                <div className="w-12 h-12 bg-[#333333] rounded flex items-center justify-center group-hover:bg-[#444444]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                        fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{playlist.name}</h3>
                                    <p className="text-sm text-gray-400">{playlist.songs.length} songs</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddToPlaylistModal;
