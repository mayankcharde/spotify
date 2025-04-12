import React, { useCallback, useEffect, useRef, useState } from 'react';

const Seekbar = ({ 
    value = 0, 
    onChange, 
    onSeekStart, 
    onSeekEnd,
    hideThumb = true,
    className = '' 
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!isDragging) {
            setLocalValue(value);
        }
    }, [value, isDragging]);

    const calculatePercentage = (clientX) => {
        const rect = containerRef.current.getBoundingClientRect();
        return Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    };

    const handleChange = useCallback((percentage) => {
        setLocalValue(percentage);
        onChange?.(percentage);
    }, [onChange]);

    const handleMove = useCallback((event) => {
        if (!isDragging) return;
        
        const clientX = event.type.includes('touch') 
            ? event.touches[0].clientX 
            : event.clientX;
            
        const percentage = calculatePercentage(clientX);
        handleChange(percentage);
    }, [isDragging, handleChange]);

    const handleStart = useCallback((event) => {
        event.stopPropagation();
        setIsDragging(true);
        onSeekStart?.();

        const clientX = event.type.includes('touch') 
            ? event.touches[0].clientX 
            : event.clientX;
            
        const percentage = calculatePercentage(clientX);
        handleChange(percentage);
    }, [handleChange, onSeekStart]);

    const handleEnd = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
            onSeekEnd?.(localValue);
        }
    }, [isDragging, localValue, onSeekEnd]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchend', handleEnd);

            return () => {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('touchmove', handleMove);
                document.removeEventListener('mouseup', handleEnd);
                document.removeEventListener('touchend', handleEnd);
            };
        }
    }, [isDragging, handleMove, handleEnd]);

    return (
        <div className={`group ${className}`}>
            <div
                ref={containerRef}
                className={`h-1 bg-[#4d4d4d] rounded-full transition-all cursor-pointer
                    ${isDragging ? 'h-2' : 'group-hover:h-2'}`}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
            >
                <div
                    className={`h-full rounded-full relative transition-colors
                        ${isDragging ? 'bg-green-500' : 'bg-white group-hover:bg-green-500'}`}
                    style={{ width: `${localValue}%` }}
                >
                    {!hideThumb && (
                        <div
                            className={`absolute right-0 top-1/2 -translate-y-1/2 
                                w-3 h-3 bg-white rounded-full shadow-lg transform
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
