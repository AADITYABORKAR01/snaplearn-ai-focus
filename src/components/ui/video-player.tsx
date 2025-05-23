
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Play, Pause, Maximize, Volume2, Volume1, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  onTimeUpdate?: (time: number) => void;
}

export function VideoPlayer({ videoId, title, onTimeUpdate }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // For a real implementation, we would use the YouTube API
  // This is a simplified placeholder using a regular video element
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (playing) {
        video.pause();
      } else {
        video.play().catch(error => {
          toast({
            title: "Playback error",
            description: "Unable to play the video. Please try again.",
            variant: "destructive",
          });
          console.error("Video playback error:", error);
        });
      }
      setPlaying(!playing);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      if (onTimeUpdate) {
        onTimeUpdate(video.currentTime);
      }
    }
  };

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      const newTime = parseFloat(e.target.value);
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleFullscreen = () => {
    const container = document.querySelector('.video-container');
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    }
  };

  // For demonstration purposes, we'll use a placeholder video
  // In a real implementation, we'd use the YouTube IFrame API
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-2">{title || "Video Player"}</h2>
      <div className="video-container bg-black rounded-lg overflow-hidden">
        <div className="relative h-0 pb-[56.25%]">
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src={`${videoUrl}?enablejsapi=1&controls=0&showinfo=0&rel=0&modestbranding=1`}
            title={title || "Video Player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      {/* Custom player controls - simplified for the demo */}
      <div className="mt-4 flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={togglePlay}
            className="hover:bg-snapblue-light/10"
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </Button>
          
          <div className="relative flex items-center flex-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleProgress}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <span className="text-sm font-medium">
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </span>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="hover:bg-snapblue-light/10"
            >
              {isMuted ? (
                <VolumeX size={18} />
              ) : volume > 0.5 ? (
                <Volume2 size={18} />
              ) : (
                <Volume1 size={18} />
              )}
            </Button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="hover:bg-snapblue-light/10"
            >
              <Maximize size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
