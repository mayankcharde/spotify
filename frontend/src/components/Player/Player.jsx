import React, { useContext, useState, useRef } from 'react'
import { PlayerContext } from '../../context/PlayerContext'

const Player = () => {
    const { track, playStatus, play, pause, previous, next, seekBar, seekBg, seekSong, time, audioRef } = useContext(PlayerContext);
    const [volume, setVolume] = useState(100);
    const [previousVolume, setPreviousVolume] = useState(100);
    const volumeBarRef = useRef(null);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    const handleVolumeChange = (e) => {
        const rect = volumeBarRef.current.getBoundingClientRect();
        const position = e.clientX - rect.left;
        const percentage = Math.min(Math.max((position / rect.width) * 100, 0), 100);
        setVolume(Math.round(percentage));
        audioRef.current.volume = percentage / 100;
    };

    const toggleMute = () => {
        if (volume > 0) {
            setPreviousVolume(volume);
            setVolume(0);
            audioRef.current.volume = 0;
        } else {
            setVolume(previousVolume);
            audioRef.current.volume = previousVolume / 100;
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

    return (
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
                        <div className='flex items-center justify-center gap-6'>
                            <button onClick={previous} className='p-2 hover:bg-white/10 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M16.6738 21.8435C17.5689 22.5049 18.3479 22.0193 18.3479 20.8601V3.13995C18.3479 1.98079 17.5689 1.49499 16.6738 2.15689L9.95846 7.01049C9.51088 7.34337 8.67171 7.34337 8.22412 7.01049L3.00303 3.25689C2.10797 2.59549 1.32891 3.08109 1.32891 4.24025V19.7598C1.32891 20.919 2.10797 21.4048 3.00303 20.7429L8.22412 16.9893C8.67171 16.6564 9.51088 16.6564 9.95846 16.9893L16.6738 21.8435Z"/>
                                </svg>
                            </button>
                            <button onClick={skipBackward} className='p-2 hover:bg-white/10 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25" />
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" />
                                </svg>
                            </button>
                            <button onClick={playStatus ? pause : play} 
                                className='w-10 h-10 flex items-center justify-center bg-white rounded-full 
                                hover:scale-105 active:scale-95 transition-transform'>
                                {playStatus ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-5 h-5 ml-0.5">
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                                    </svg>
                                )}
                            </button>
                            <button onClick={skipForward} className='p-2 hover:bg-white/10 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25" />
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6 14.25c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3.75h3.75a.75.75 0 000-1.5h-4.5a.75.75 0 00-.75.75v4.5z" />
                                </svg>
                            </button>
                            <button onClick={next} className='p-2 hover:bg-white/10 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M7.32891 2.15649C6.43385 1.49509 5.65479 1.98069 5.65479 3.13985V20.86C5.65479 22.0192 6.43385 22.505 7.32891 21.8431L14.0443 16.9895C14.4918 16.6566 15.331 16.6566 15.7786 16.9895L20.9997 20.7431C21.8948 21.4045 22.6738 20.9189 22.6738 19.7597V4.24015C22.6738 3.08099 21.8948 2.59519 20.9997 3.25709L15.7786 7.01069C15.331 7.34357 14.4918 7.34357 14.0443 7.01069L7.32891 2.15649Z"/>
                                </svg>
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className='flex items-center gap-2'>
                            <span className='text-xs text-gray-400 w-10 text-right select-none'>
                                {time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')}
                            </span>
                            <div className='flex-1 group' ref={seekBg} onClick={seekSong}>
                                <div className='h-1.5 bg-[#4d4d4d] rounded-full group-hover:h-2 transition-all'>
                                    <div ref={seekBar} className='h-full bg-white group-hover:bg-green-500 rounded-full relative'>
                                        <div className='absolute right-0 top-1/2 -translate-y-1/2 
                                            w-3 h-3 bg-white rounded-full 
                                            opacity-0 group-hover:opacity-100 transition-all'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <NowPlayingAnimation />
                                <span className='text-xs text-gray-400 w-10 select-none'>
                                    {time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}
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
                            <div 
                                className='w-32 group'
                                onClick={handleVolumeChange}
                                ref={volumeBarRef}
                            >
                                <div className='h-1 bg-[#4d4d4d] rounded-full group-hover:h-[6px] transition-all'>
                                    <div 
                                        className='h-full bg-white group-hover:bg-green-500 rounded-full relative'
                                        style={{ width: `${volume}%` }}>
                                        <div className='absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full 
                                            opacity-0 group-hover:opacity-100 transition-all'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Volume Slider - Appears when volume icon is clicked */}
                {showVolumeSlider && (
                    <div className='px-4 pb-2 md:hidden animate-slide-up'>
                        <div 
                            className='w-full group'
                            onClick={handleVolumeChange}
                            ref={volumeBarRef}
                        >
                            <div className='h-1 bg-[#4d4d4d] rounded-full group-hover:h-[6px] transition-all'>
                                <div 
                                    className='h-full bg-white group-hover:bg-green-500 rounded-full relative'
                                    style={{ width: `${volume}%` }}>
                                    <div className='absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full 
                                        opacity-0 group-hover:opacity-100 transition-all'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Player