import React, { useState, useMemo } from 'react';
import { CHANNELS } from './constants';
import { Channel } from './types';
import { Header } from './components/Header';
import { Player } from './components/Player';
import { ChannelList } from './components/ChannelList';
import { Github } from 'lucide-react';

const App: React.FC = () => {
  // Initialize with the first available online channel
  const [selectedChannel, setSelectedChannel] = useState<Channel>(
    CHANNELS.find(c => c.status === 'Online') || CHANNELS[0]
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Filter channels based on search query
  const filteredChannels = useMemo(() => {
    return CHANNELS.filter(channel => 
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-red-500/30">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          
          {/* Main Content (Player) - Takes up 8 columns on large screens */}
          <div className="lg:col-span-8 xl:col-span-9">
            <Player channel={selectedChannel} />
            
            {/* Description / Instructions */}
            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Tentang Streaming</h3>
              <div className="grid gap-4 text-sm text-slate-400 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-slate-300">Online</span>: Server aktif dan siap ditonton.
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-500"></span>
                    <span className="text-slate-300">Offline</span>: Server sedang gangguan atau mati.
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-slate-300">No Limit</span>: Streaming tanpa batas waktu.
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    <span className="text-slate-300">Limit</span>: Waktu streaming terbatas.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Channel List) - Takes up 4 columns on large screens */}
          <div className="lg:col-span-4 xl:col-span-3">
             <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2">
               <ChannelList 
                  channels={filteredChannels} 
                  selectedChannelId={selectedChannel.id}
                  onSelect={setSelectedChannel}
                />
             </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-slate-800 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Lovaire TV APP. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <a 
              href="https://github.com/yogibagus/Daftar-Embed-LIVE-STREAM-Channel-TV-Indonesia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Github size={16} />
              <span>Sumber Data</span>
            </a>
            <span className="text-xs">Based on yogibagus repo</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;