import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import PreviewImage from '../../assets/images/about-video-preview.webp';

const LiteYouTube = ({ videoId, title, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  return (
    <div className={`lite-youtube ${className || ''}`.trim()} data-state={isPlaying ? 'playing' : 'idle'}>
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <button
          type="button"
          className="lite-youtube-poster"
          onClick={handlePlay}
          aria-label={`Play video: ${title}`}
        >
          <img
            src={PreviewImage}
            alt={title}
            loading="lazy"
            decoding="async"
            width="1280"
            height="720"
          />
          <span className="lite-youtube-play" aria-hidden="true"></span>
        </button>
      )}
    </div>
  );
};

LiteYouTube.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default LiteYouTube;
