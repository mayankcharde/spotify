import React, { createContext, useState, useEffect } from 'react';

export const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState(() => {
        const saved = localStorage.getItem('playlists');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }, [playlists]);

    const createPlaylist = (name, description) => {
        const newPlaylist = {
            id: Date.now(),
            name,
            description,
            songs: [],
            createdAt: new Date().toISOString(),
            image: 'https://placeholder.co/400' // Default playlist image
        };
        setPlaylists(prev => [...prev, newPlaylist]);
        return newPlaylist.id;
    };

    const addSongToPlaylist = (playlistId, song) => {
        setPlaylists(prev => prev.map(playlist => {
            if (playlist.id === playlistId) {
                if (!playlist.songs.some(s => s.id === song.id)) {
                    return { ...playlist, songs: [...playlist.songs, song] };
                }
            }
            return playlist;
        }));
    };

    const removeSongFromPlaylist = (playlistId, songId) => {
        setPlaylists(prev => prev.map(playlist => {
            if (playlist.id === playlistId) {
                return { ...playlist, songs: playlist.songs.filter(s => s.id !== songId) };
            }
            return playlist;
        }));
    };

    const deletePlaylist = (playlistId) => {
        setPlaylists(prev => prev.filter(p => p.id !== playlistId));
    };

    return (
        <PlaylistContext.Provider value={{
            playlists,
            createPlaylist,
            addSongToPlaylist,
            removeSongFromPlaylist,
            deletePlaylist
        }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistProvider;
