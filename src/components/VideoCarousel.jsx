import { useState, useEffect } from 'react';

const OVERLAY_URL = 'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png';

const videos = [
  {
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
    label: 'BG Remove',
  },
  {
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
    label: 'Upscale',
  },
  {
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
    label: 'Imagine',
  },
  {
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
    label: 'AI BG',
  },
];

export default function VideoCarousel({ activeIndex, onActiveChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeIndex !== undefined) {
      setCurrentIndex(activeIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % videos.length;
        if (onActiveChange) onActiveChange(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [onActiveChange]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Video layers */}
      {videos.map((video, index) => (
        <video
          key={video.src}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ))}

      {/* PNG overlay with train-bob animation */}
      <div className="overlay-bob absolute inset-0 z-[1] pointer-events-none">
        <img
          src={OVERLAY_URL}
          alt=""
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.03)' }}
        />
      </div>

      {/* Bottom gradient fade to black */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[2]" />
    </div>
  );
}

export { videos };
