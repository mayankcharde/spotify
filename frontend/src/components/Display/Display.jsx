import React, { useEffect, useRef } from 'react'
import DisplayHome from '../DisplayHome/DisplayHome'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayAlbum from '../DisplayAlbum/DisplayAlbum'
import DisplayLiked from '../DisplayLiked/DisplayLiked'
import { albumsData } from '../../assets/assets'
import DisplayPlaylist from '../DisplayPlaylist/DisplayPlaylist'
import DisplaySearch from '../DisplaySearch/DisplaySearch'

const Display = ({ onMenuClick }) => {

  const displayRef = useRef();
  const location = useLocation();
  let isAlbum = location.pathname.includes("album");
  let albumId = isAlbum ? location.pathname.slice(-1) : ""
  let bgColor = albumsData[Number(albumId)].bgColor;

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    }
    else {
      displayRef.current.style.background = "#121212";
    }
  })

  return (
    <div ref={displayRef} className='h-full flex flex-col'>
      {/* Mobile Header */}
      <div className='lg:hidden flex items-center p-4 glass-bg sticky top-0 z-10'>
        <button onClick={onMenuClick} className='p-2 hover:bg-white/10 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className='flex-1 px-4 pb-6 overflow-y-auto scrollbar-hidden'>
        <Routes>
          <Route path='/' element={<DisplayHome />} />
          <Route path='/album/:id' element={<DisplayAlbum />} />
          <Route path='/liked' element={<DisplayLiked />} />
          <Route path='/playlist/:id' element={<DisplayPlaylist />} />
          <Route path='/search' element={<DisplaySearch />} />
        </Routes>
      </div>
    </div>
  )
}

export default Display