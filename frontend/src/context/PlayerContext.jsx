import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import React from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBarRef = useRef();
    const seekBg = useRef();
    
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioRef.current.play();
        audioRef.current.volume = 0.1;
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
            showToast(`Playing: ${songsData[track.id - 1].name}`);
        }
    }

    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
            showToast(`Playing: ${songsData[track.id + 1].name}`);
        }
    }

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    };

    useEffect(() => {
        const updateTime = () => {
            if (!audioRef.current) return;
            
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            
            if (seekBarRef.current) {
                seekBarRef.current.style.width = `${(currentTime * 100) / duration}%`;
            }
            
            setTime({
                currentTime: {
                    second: Math.floor(currentTime % 60),
                    minute: Math.floor(currentTime / 60)
                },
                totalTime: {
                    second: Math.floor(duration % 60),
                    minute: Math.floor(duration / 60)
                }
            });
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', updateTime);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', updateTime);
            }
        };
    }, [audioRef.current]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            // Media keys
            if (e.key === 'MediaTrackNext') {
                next();
            } else if (e.key === 'MediaTrackPrevious') {
                previous();
            } else if (e.key === 'MediaPlayPause') {
                playStatus ? pause() : play();
            }
            
            // Arrow keys with Alt
            if (e.altKey) {
                if (e.key === 'ArrowRight') {
                    next();
                } else if (e.key === 'ArrowLeft') {
                    previous();
                } else if (e.key === ' ') {
                    e.preventDefault();
                    playStatus ? pause() : play();
                }
            }
        };

        // Add keyboard listeners
        window.addEventListener('keydown', handleKeyPress);

        // Remove listeners on cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [playStatus, track.id]);

    // Add toast notification for track changes
    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'fixed top-16 right-8 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 z-50';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 2000);
    };

    const contextValue = {
        audioRef, seekBarRef, track, setTrack, playStatus, setPlayStatus, next, previous, play, pause, playWithId, seekBg, seekSong, time
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;