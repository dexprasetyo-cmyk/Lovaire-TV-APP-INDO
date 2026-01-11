import React from 'react';
import { Play, Lock, Clock } from 'lucide-react';
import { Channel } from '../types';

interface ChannelListProps {
  channels: Channel[];
  selectedChannelId: string;
  onSelect: (channel: Channel) => void;
}

export const ChannelList: React.FC<ChannelListProps> = ({ channels, selectedChannelId, onSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Daftar Channel</h2>
        <span className="text-xs font-medium text-slate-500">{channels.length} Saluran</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-1">
        {channels.map((channel) => {
          const isSelected = selectedChannelId === channel.id;
          const isOffline = channel.status === 'Offline';
          
          return (
            <button
              key={channel.id}
              onClick={() => onSelect(channel)}
              disabled={isOffline}
              className={`group relative flex w-full flex-col gap-3 rounded-lg border p-3 text-left transition-all hover:shadow-lg lg:flex-row lg:items-center
                ${isSelected 
                  ? 'border-red-500 bg-red-950/20 ring-1 ring-red-500' 
                  : 'border-slate-800 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                }
                ${isOffline ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              `}
            >
              {/* Icon/Thumbnail Placeholder */}
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm font-bold shadow-sm transition-colors
                ${isSelected ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'}
              `}>
                {channel.name.substring(0, 2).toUpperCase()}
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <span className={`truncate text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {channel.name}
                </span>
                <span className="truncate text-xs text-slate-500">
                  {isOffline ? 'Offline' : channel.category || 'TV Indonesia'}
                </span>
              </div>

              {/* Status Indicators */}
              <div className="absolute right-3 top-3 lg:static lg:block">
                {isSelected && !isOffline && <div className="h-2 w-2 animate-pulse rounded-full bg-red-500 lg:hidden" />}
                
                {/* Desktop Play Icon / Status Icons */}
                <div className="hidden lg:flex lg:items-center lg:gap-2">
                    {channel.limit === 'Limit' && !isOffline && (
                        <Clock size={14} className="text-amber-500" />
                    )}
                    {isOffline ? (
                        <Lock size={14} className="text-slate-500" />
                    ) : isSelected ? (
                        <div className="flex items-center gap-1">
                             <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                            </span>
                        </div>
                    ) : (
                        <Play size={14} className="text-slate-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                </div>
              </div>
              
              {/* Mobile Limit Badge */}
              {channel.limit === 'Limit' && !isOffline && (
                 <div className="absolute bottom-3 right-3 lg:hidden">
                    <Clock size={12} className="text-amber-500" />
                 </div>
              )}
            </button>
          );
        })}
      </div>
      
      {channels.length === 0 && (
        <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 text-slate-500">
            <p>Tidak ada channel ditemukan.</p>
        </div>
      )}
    </div>
  );
};
