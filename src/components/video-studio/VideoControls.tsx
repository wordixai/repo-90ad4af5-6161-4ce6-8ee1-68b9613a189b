import React from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  duration: number;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  onPlayPause,
  duration,
}) => {
  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="text-white border-gray-600 hover:bg-gray-700"
        >
          <SkipBack className="w-4 h-4" />
        </Button>
        
        <Button
          size="sm"
          onClick={onPlayPause}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          className="text-white border-gray-600 hover:bg-gray-700"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="text-center text-sm text-gray-400">
        Duration: {Math.round(duration / 60)}s @ 60fps
      </div>
    </div>
  );
};