import { videos } from './VideoCarousel';

export default function VideoSwitcher({ activeIndex, onSelect }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {videos.map((video, index) => (
        <button
          key={video.label}
          onClick={() => onSelect(index)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border-b-2 ${
            index === activeIndex
              ? 'text-white border-white'
              : 'text-white/50 hover:text-white/80 border-transparent'
          }`}
        >
          {video.label}
        </button>
      ))}
    </div>
  );
}
