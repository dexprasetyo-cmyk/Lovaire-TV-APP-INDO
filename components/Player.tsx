import React, { useState, useEffect } from 'react';
import { AlertCircle, WifiOff, Clock } from 'lucide-react';
import { Channel } from '../types';

interface PlayerProps {
  channel: Channel;
}

export const Player: React.FC<PlayerProps> = ({ channel }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when channel changes
  useEffect(() => {
    setIsLoading(true);
  }, [channel.id]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (channel.status === 'Offline') {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl">
        <div className="flex h-full flex-col items-center justify-center gap-4 text-slate-400">
          <WifiOff size={48} />
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white">Channel Offline</h3>
            <p className="mt-2 text-sm">Maaf, siaran {channel.name} sedang tidak tersedia saat ini.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl ring-1 ring-white/10">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-red-600"></div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          src={channel.url}
          title={`Live Stream ${channel.name}`}
          className="h-full w-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={handleLoad}
        />
        
        {/* Badges Overlay */}
        <div className="absolute left-4 top-4 flex gap-2">
            <span className="flex items-center gap-1 rounded-full bg-red-600/90 px-3 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                LIVE
            </span>
            {channel.limit === 'Limit' && (
                <span className="flex items-center gap-1 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-bold text-black shadow-sm backdrop-blur-sm">
                    <Clock size={12} />
                    LIMIT
                </span>
            )}
        </div>
      </div>

      <div className="flex items-start justify-between rounded-lg bg-slate-800 p-4">
        <div>
            <h1 className="text-2xl font-bold text-white">{channel.name}</h1>
            <p className="text-sm text-slate-400 mt-1">{channel.category || 'General TV'} • Indonesia</p>
        </div>
        <div className="hidden sm:block">
            {channel.limit === 'Limit' ? (
                <div className="flex items-center gap-2 rounded-md bg-amber-900/30 px-3 py-2 text-amber-500 border border-amber-900/50">
                    <AlertCircle size={16} />
                    <span className="text-xs font-medium">Waktu streaming terbatas</span>
                </div>
            ) : (
                <div className="flex items-center gap-2 rounded-md bg-green-900/30 px-3 py-2 text-green-500 border border-green-900/50">
                    <span className="text-xs font-medium">Streaming 24 Jam</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
