import React from 'react';
import { Tv, Search } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/75">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
            <Tv size={20} />
          </div>
          <span className="hidden text-lg font-bold tracking-tight text-white sm:inline-block">
            Lovaire <span className="text-red-500">TV APP</span>
          </span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 md:justify-end">
          <div className="relative w-full max-w-md md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Cari channel..."
              className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 pl-9 pr-4 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};