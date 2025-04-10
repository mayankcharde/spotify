import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import PlayerContextProvider from './context/PlayerContext.jsx'
import LikedSongsProvider from './context/LikedSongsContext.jsx'
import PlaylistProvider from './context/PlaylistContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import SearchProvider from './context/SearchContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <SearchProvider>
            <PlaylistProvider>
                <LikedSongsProvider>
                    <PlayerContextProvider>
                        <App />
                    </PlayerContextProvider>
                </LikedSongsProvider>
            </PlaylistProvider>
        </SearchProvider>
    </BrowserRouter>
)
