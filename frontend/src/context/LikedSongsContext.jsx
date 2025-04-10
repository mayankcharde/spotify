import React, { createContext, useState, useEffect } from 'react';

export const LikedSongsContext = createContext();

const LikedSongsProvider = ({ children }) => {
    const [likedSongs, setLikedSongs] = useState(() => {
        const saved = localStorage.getItem('likedSongs');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    }, [likedSongs]);

    const toggleLike = (song) => {
        setLikedSongs(prev => {
            const isLiked = prev.some(s => s.id === song.id);
            if (isLiked) {
                return prev.filter(s => s.id !== song.id);
            }
            return [...prev, song];
        });
    };

    const isLiked = (songId) => {
        return likedSongs.some(song => song.id === songId);
    };

    const deleteLikedSong = (songId) => {
        setLikedSongs(prev => prev.filter(song => song.id !== songId));
    };

    return (
        <LikedSongsContext.Provider value={{ 
            likedSongs, 
            toggleLike, 
            isLiked,
            deleteLikedSong 
        }}>
            {children}
        </LikedSongsContext.Provider>
    );
};

export default LikedSongsProvider;
