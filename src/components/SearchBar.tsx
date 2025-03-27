import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative">
      <div className={`glass-card flex items-center p-2 ${isFocused ? 'neon-border' : ''}`}>
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search stocks by symbol or company name..."
          className="w-full bg-transparent border-none focus:outline-none text-white placeholder-gray-400"
        />
      </div>
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 glass-card divide-y divide-gray-700/50"
          >
            <div className="p-2 text-sm text-gray-400">
              Press Enter to search for "{query}"
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};