import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/album/${id}`)} className='min-w-[180px] p-2 px-3 rounded-lg cursor-pointer bg-[#282828] transition-all duration-300 hover:bg-[#333333] hover:scale-105 hover:shadow-xl'>
      <div className='relative group'>
        <img className='rounded-lg w-full transition-all duration-300 group-hover:opacity-80' src={image} alt="" />
        <div className='absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'>
          <span className='text-white'>▶</span>
        </div>
      </div>
      <p className='font-bold mt-3 mb-1 truncate'>{name}</p>
      <p className='text-gray-400 text-sm truncate'>{desc}</p>
    </div>
  )
}

export default AlbumItem