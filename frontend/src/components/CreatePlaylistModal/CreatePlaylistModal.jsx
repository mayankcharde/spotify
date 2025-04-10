import React, { useState, useContext } from 'react';
import { PlaylistContext } from '../../context/PlaylistContext';
import { useNavigate } from 'react-router-dom';

const CreatePlaylistModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { createPlaylist } = useContext(PlaylistContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            const playlistId = createPlaylist(name, description);
            onClose();
            navigate(`/playlist/${playlistId}`);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#282828] p-6 rounded-lg shadow-xl max-w-md w-full mx-4 animate-slide-up">
                <h2 className="text-2xl font-bold mb-6">Create Playlist</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Playlist name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 bg-[#3E3E3E] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            maxLength={100}
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 bg-[#3E3E3E] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
                            maxLength={300}
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-full hover:bg-[#3E3E3E] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            className={`px-6 py-2 rounded-full bg-green-500 font-semibold 
                                ${name.trim() ? 'hover:bg-green-400' : 'opacity-50 cursor-not-allowed'}
                                transition-colors`}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;
