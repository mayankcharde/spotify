import React, { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Player from './components/Player/Player'
import Display from './components/Display/Display'
import { useContext } from 'react'
import { PlayerContext } from './context/PlayerContext'

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='h-screen bg-black overflow-hidden'>
      <div className='h-[calc(100%-var(--app-footer-height))] flex relative'>
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className='fixed inset-0 bg-black/50 z-40 lg:hidden'
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed top-0 bottom-0 w-[var(--app-sidebar-width)] z-50
          transition-transform duration-300 ease-in-out
          bg-black lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className='flex-1 relative overflow-hidden'>
          <Display onMenuClick={() => setSidebarOpen(true)} />
        </div>
      </div>

      {/* Player */}
      <div className='h-[var(--app-footer-height)] fixed bottom-0 w-full z-50 glass-bg'>
        <Player />
      </div>
      
      <audio ref={audioRef} preload="auto" src={track.file} />
    </div>
  )
}

export default App