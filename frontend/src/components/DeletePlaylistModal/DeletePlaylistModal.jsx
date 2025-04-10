import React, { useContext } from 'react';
import { PlaylistContext } from '../../context/PlaylistContext';
import { useNavigate } from 'react-router-dom';

const DeletePlaylistModal = ({ playlistId, playlistName, onClose }) => {
    const { deletePlaylist } = useContext(PlaylistContext);
    const navigate = useNavigate();

    const handleDelete = () => {
        deletePlaylist(playlistId);
        onClose();
        navigate('/');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#282828] p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4">Delete Playlist</h3>
                <p className="text-gray-300 mb-6">
                    Are you sure you want to delete "{playlistName}"? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold rounded-full hover:bg-[#333333]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 text-sm font-semibold bg-red-500 rounded-full hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePlaylistModal;
