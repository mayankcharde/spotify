import React, { useContext, useState, useRef, useEffect } from 'react'
import { PlayerContext } from '../../context/PlayerContext'
import { LikedSongsContext } from '../../context/LikedSongsContext'
import AddToPlaylistModal from '../AddToPlaylistModal/AddToPlaylistModal'
import Seekbar from '../Seekbar/Seekbar'

const Player = () => {
    const { track, playStatus, play, pause, previous, next, seekBarRef, audioRef, time } = useContext(PlayerContext);
    const { toggleLike, isLiked } = useContext(LikedSongsContext);
    const [volume, setVolume] = useState(100);
    const [previousVolume, setPreviousVolume] = useState(100);
    const volumeBarRef = useRef(null);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
    const [showMobilePlaylist, setShowMobilePlaylist] = useState(false);
    const liked = isLiked(track.id);

    // Close mobile playlist when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showMobilePlaylist && !e.target.closest('.slidedown-modal')) {
                setShowMobilePlaylist(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showMobilePlaylist]);

    const handleVolumeChange = (percentage) => {
        // Ensure percentage is a valid number and clamp it between 0 and 100
        const validPercentage = Math.min(Math.max(Number(percentage) || 0, 0), 100);
        setVolume(Math.round(validPercentage));
        
        if (audioRef.current) {
            // Convert percentage to volume (0-1)
            const volumeLevel = validPercentage / 100;
            // Ensure volume is a valid number between 0 and 1
            audioRef.current.volume = Math.min(Math.max(volumeLevel, 0), 1);
        }
    };

    const toggleMute = () => {
        if (volume > 0) {
            setPreviousVolume(volume);
            setVolume(0);
            if (audioRef.current) {
                audioRef.current.volume = 0;
            }
        } else {
            const newVolume = Math.min(Math.max(previousVolume, 0), 100);
            setVolume(newVolume);
            if (audioRef.current) {
                audioRef.current.volume = newVolume / 100;
            }
        }
    };

    const skipForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(
                audioRef.current.currentTime + 5,
                audioRef.current.duration
            );
        }
    };

    const skipBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(
                audioRef.current.currentTime - 5,
                0
            );
        }
    };

    const getVolumeIcon = () => {
        if (volume === 0) return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06z" />
            </svg>
        );
        if (volume < 50) return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
            </svg>
        );
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z"/>
                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z"/>
            </svg>
        );
    };

    const NowPlayingAnimation = () => (
        <div className={`flex items-center justify-center gap-[2px] p-1 
            rounded-md transition-all duration-300 
            ${playStatus ? 'bg-green-500/10' : 'bg-white/5'} 
            ${playStatus ? 'border-green-500/50' : 'border-gray-500/50'} border`}>
            {[1, 2, 3].map((bar) => (
                <div
                    key={bar}
                    className={`w-[2px] md:w-[3px] rounded-full transition-all duration-300
                        ${playStatus ? 'bg-green-500' : 'bg-gray-500'}`}
                    style={{
                        height: '14px',
                        animation: playStatus ? `equalizer-${bar} 1s ease-in-out infinite` : 'none',
                        animationDelay: `${(bar - 1) * 0.2}s`
                    }}
                />
            ))}
        </div>
    );

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSeek = (percentage) => {
        if (audioRef.current) {
            const newTime = (percentage / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
        }
    };

    const handleVolumeSeek = (percentage) => {
        const newVolume = Math.min(Math.max(percentage / 100, 0), 1);
        setVolume(Math.round(percentage));
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handlePlaylistClick = () => {
        if (window.innerWidth < 768) {
            setShowMobilePlaylist(true);
        } else {
            setShowAddToPlaylist(true);
        }
    };

    return (
        <>
            <div className='fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#282828] to-black px-2 md:px-4 py-3'>
                <div className='flex flex-col gap-2'>
                    {/* Main Content */}
                    <div className='flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-4'>
                        {/* Song Info */}
                        <div className='flex items-center gap-3 max-w-[300px]'>
                            <img className='w-12 h-12 md:w-14 md:h-14 rounded object-cover' src={track.image} alt="" />
                            <div className='min-w-0'>
                                <p className='font-semibold truncate text-sm md:text-base'>{track.name}</p>
                                <p className='text-xs md:text-sm text-gray-400 truncate'>{track.desc}</p>
                            </div>
                        </div>

                        {/* Player Controls and Progress Bar */}
                        <div className='flex flex-col justify-center gap-2 order-first md:order-none'>
                            {/* Main Controls */}
                            <div className='flex items-center justify-center gap-1 sm:gap-2 md:gap-4'>
                                <button 
                                    onClick={() => toggleLike(track)}
                                    className='p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors'
                                    title={liked ? "Remove from liked songs" : "Add to liked songs"}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                        fill={liked ? "#1DB954" : "white"} 
                                        className="w-4 h-4 sm:w-5 sm:h-5 transition-colors">
                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    </svg>
                                </button>
                                <button onClick={previous} className='p-1.5 sm:p-2 hover:bg-white/10 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                        <path d="M16.6738 21.8435C17.5689 22.5049 18.3479 22.0193 18.3479 20.8601V3.13995C18.3479 1.98079 17.5689 1.49499 16.6738 2.15689L9.95846 7.01049C9.51088 7.34337 8.67171 7.34337 8.22412 7.01049L3.00303 3.25689C2.10797 2.59549 1.32891 3.08109 1.32891 4.24025V19.7598C1.32891 20.919 2.10797 21.4048 3.00303 20.7429L8.22412 16.9893C8.67171 16.6564 9.51088 16.6564 9.95846 16.9893L16.6738 21.8435Z"/>
                                    </svg>
                                </button>
                                <button 
                                    onClick={skipBackward}
                                    className='p-1.5 sm:p-2 hover:bg-white/10 rounded-full hidden xs:block'
                                    title="Back 5 seconds"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                        fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                        <path fillRule="evenodd" 
                                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" 
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button onClick={playStatus ? pause : play} 
                                    className='w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white rounded-full 
                                    hover:scale-105 active:scale-95 transition-transform'>
                                    {playStatus ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                            fill="black" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                                            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                            fill="black" className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5">
                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                                        </svg>
                                    )}
                                </button>
                                <button 
                                    onClick={skipForward}
                                    className='p-1.5 sm:p-2 hover:bg-white/10 rounded-full hidden xs:block'
                                    title="Forward 5 seconds"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                        fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                        <path fillRule="evenodd" 
                                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" 
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button onClick={next} className='p-1.5 sm:p-2 hover:bg-white/10 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                        <path d="M7.32891 2.15649C6.43385 1.49509 5.65479 1.98069 5.65479 3.13985V20.86C5.65479 22.0192 6.43385 22.505 7.32891 21.8431L14.0443 16.9895C14.4918 16.6566 15.331 16.6566 15.7786 16.9895L20.9997 20.7431C21.8948 21.4045 22.6738 20.9189 22.6738 19.7597V4.24015C22.6738 3.08099 21.8948 2.59519 20.9997 3.25709L15.7786 7.01069C15.331 7.34357 14.4918 7.34357 14.0443 7.01069L7.32891 2.15649Z"/>
                                    </svg>
                                </button>
                                <button 
                                    onClick={handlePlaylistClick}
                                    className='p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors'
                                    title="Add to playlist"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                        fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                        <path fillRule="evenodd" 
                                            d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className='flex items-center gap-2'>
                                <span className='text-xs text-gray-400 w-10 text-right select-none'>
                                    {formatTime(audioRef.current?.currentTime || 0)}
                                </span>
                                <div className='flex-1'>
                                    <Seekbar
                                        value={(audioRef.current?.currentTime / (audioRef.current?.duration || 1)) * 100 || 0}
                                        onChange={(percentage) => {
                                            if (audioRef.current) {
                                                const time = (percentage / 100) * audioRef.current.duration;
                                                audioRef.current.currentTime = time;
                                            }
                                        }}
                                        hideThumb={false}
                                    />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <NowPlayingAnimation />
                                    <span className='text-xs text-gray-400 w-10 select-none'>
                                        {formatTime(audioRef.current?.duration || 0)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Volume Control - Now visible on mobile as icon only */}
                        <div className='flex items-center justify-end gap-4'>
                            <button 
                                onClick={() => setShowVolumeSlider(prev => !prev)} 
                                className='p-2 hover:bg-white/10 rounded-full md:hidden'
                            >
                                {getVolumeIcon()}
                            </button>
                            
                            {/* Desktop Volume Slider */}
                            <div className='hidden md:flex items-center gap-4'>
                                <button onClick={toggleMute} className='p-2 hover:bg-white/10 rounded-full'>
                                    {getVolumeIcon()}
                                </button>
                                <div className='w-32'>
                                    <Seekbar
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        onSeekStart={() => {}}
                                        onSeekEnd={() => {}}
                                        hideThumb={false}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Add to Playlist Modal */}
                        {showAddToPlaylist && (
                            <AddToPlaylistModal 
                                song={track}
                                onClose={() => setShowAddToPlaylist(false)}
                            />
                        )}
                    </div>

                    {/* Mobile Volume Slider - Appears when volume icon is clicked */}
                    {showVolumeSlider && (
                        <div className='px-4 pb-2 md:hidden animate-slide-up'>
                            <Seekbar
                                value={volume}
                                onChange={handleVolumeChange}
                                onSeekStart={() => {}}
                                onSeekEnd={() => {}}
                                hideThumb={false}
                                className="w-full"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Playlist Slidedown */}
            {showMobilePlaylist && (
                <div className="modal-overlay" onClick={() => setShowMobilePlaylist(false)} />
            )}
            <div className={`slidedown-modal ${showMobilePlaylist ? 'open' : 'closed'}`}>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Add to Playlist</h3>
                        <button 
                            onClick={() => setShowMobilePlaylist(false)}
                            className="p-2 hover:bg-white/10 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="max-h-[50vh] overflow-y-auto">
                        {/* Reuse the content from AddToPlaylistModal but styled for mobile */}
                        <AddToPlaylistModal 
                            song={track}
                            onClose={() => setShowMobilePlaylist(false)}
                            isMobile={true}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Player