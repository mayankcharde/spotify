import React, { useCallback, useEffect, useRef, useState } from 'react';

const Seekbar = ({ value = 0, onSeek, className = '', hideThumb = true }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!isDragging) {
            setLocalValue(value);
        }
    }, [value, isDragging]);

    const handleMove = useCallback((clientX) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const position = clientX - rect.left;
            const percentage = Math.min(Math.max((position / rect.width) * 100, 0), 100);
            setLocalValue(percentage);
            onSeek?.(percentage);
        }
    }, [onSeek]);

    const handleMouseDown = useCallback((e) => {
        setIsDragging(true);
        handleMove(e.clientX);

        const handleMouseMove = (e) => {
            handleMove(e.clientX);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [handleMove]);

    const handleTouchStart = useCallback((e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);

        const handleTouchMove = (e) => {
            handleMove(e.touches[0].clientX);
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd);
    }, [handleMove]);

    return (
        <div className={`group ${className}`}>
            <div
                ref={containerRef}
                className='h-1 bg-[#4d4d4d] rounded-full group-hover:h-2 transition-all cursor-pointer'
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <div
                    className='h-full bg-white group-hover:bg-green-500 rounded-full relative'
                    style={{ width: `${localValue}%` }}
                >
                    {!hideThumb && (
                        <div
                            className={`absolute right-0 top-1/2 -translate-y-1/2 
                                w-3 h-3 bg-white rounded-full shadow-lg
                                ${isDragging ? 'scale-125' : 'scale-0 group-hover:scale-100'}
                                transition-all duration-150`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Seekbar;
