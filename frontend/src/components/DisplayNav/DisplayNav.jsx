import React from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const DisplayNav = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='w-full flex justify-between items-center font-semibold sticky top-0 z-10 backdrop-blur-md bg-black/30 p-4 rounded-t-lg'>
                <div className='flex items-center gap-3'>
                    <button onClick={() => navigate(-1)} className='w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors'>
                        <img className='w-4' src={assets.arrow_left} alt="" />
                    </button>
                    <button onClick={() => navigate(1)} className='w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors'>
                        <img className='w-4' src={assets.arrow_right} alt="" />
                    </button>
                </div>
                <div className='flex items-center gap-4'>
                    <button className='bg-white text-black text-sm px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform hidden md:block'>
                        Explore Premium
                    </button>
                    <button className='bg-black/60 text-white text-sm px-6 py-2 rounded-full hover:bg-black/80 transition-colors'>
                        Install App
                    </button>
                    <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold hover:bg-purple-600 transition-colors'>
                        D
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-2 mt-4 px-2'>
                <button className='bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold hover:scale-105 transition-transform'>All</button>
                <button className='bg-black/60 text-white px-4 py-1.5 rounded-full text-sm hover:bg-black/80 transition-colors'>Music</button>
                <button className='bg-black/60 text-white px-4 py-1.5 rounded-full text-sm hover:bg-black/80 transition-colors'>Podcasts</button>
            </div>
        </>
    )
}

export default DisplayNav