import React, { useContext, useState, useCallback } from 'react'
import { PlayerContext } from '../../context/PlayerContext'
import { LikedSongsContext } from '../../context/LikedSongsContext'
import AddToPlaylistModal from '../AddToPlaylistModal/AddToPlaylistModal'

const SongItem = ({ name, image, desc, id }) => {
  const { playWithId, playStatus, track } = useContext(PlayerContext);
  const { toggleLike, isLiked } = useContext(LikedSongsContext);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const liked = isLiked(id);
  const isPlaying = playStatus && track.id === id;

  const handleAddToPlaylist = useCallback((e) => {
    e.stopPropagation();
    setShowAddToPlaylist(true);
  }, []);

  return (
    <>
      <div className={`w-full bg-[#282828] rounded-lg p-4 group transition-all duration-300 
        hover:bg-[#333333] cursor-pointer relative
        ${isPlaying ? 'ring-2 ring-green-500' : ''}`}>
        {/* Image container */}
        <div className='relative w-full aspect-square mb-4 rounded-lg overflow-hidden'>
          <img 
            className='w-full h-full object-cover transition-transform duration-300 
              group-hover:scale-105 group-hover:opacity-70' 
            src={image} 
            alt={name} 
          />
          {/* Control overlay - Always visible on mobile, hidden on desktop until hover */}
          <div className='absolute inset-0 flex flex-col justify-between p-3
            bg-black/40 opacity-100 transition-opacity duration-300
            md:opacity-0 md:group-hover:opacity-100'>
            {/* Top row - Like button */}
            <div className='flex justify-end'>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike({ id, name, image, desc });
                }}
                className='w-10 h-10 rounded-full bg-black/60 flex items-center justify-center 
                  hover:scale-105 active:scale-95 transition-all duration-300'
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                  fill={liked ? "#1DB954" : "white"} className="w-5 h-5">
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              </button>
            </div>
            
            {/* Bottom row - Play and Add to Playlist buttons */}
            <div className='flex justify-between items-center'>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToPlaylist(e);
                }}
                className='w-10 h-10 rounded-full bg-black/60 flex items-center justify-center
                  hover:scale-105 active:scale-95 transition-all duration-300'
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" />
                </svg>
              </button>
              
              <button 
                onClick={() => playWithId(id)}
                className='w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center 
                  hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg'
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6 ml-0.5">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div>
          <p className={`font-bold truncate text-base ${isPlaying ? 'text-green-500' : ''}`}>
            {name}
          </p>
          <p className='text-gray-400 text-sm truncate mt-1'>{desc}</p>
        </div>
      </div>

      {showAddToPlaylist && (
        <AddToPlaylistModal 
          song={{ id, name, image, desc }}
          onClose={(e) => {
            e?.stopPropagation?.();
            setShowAddToPlaylist(false);
          }}
        />
      )}
    </>
  )
}

export default SongItem