import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ChevronRight } from 'lucide-react';
import { StockCard } from './components/StockCard';
import { SearchBar } from './components/SearchBar';
import { StockDetail } from './components/StockDetail';
import { Particles } from './components/Particles';

const mockStocks = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    prediction: 12.5,
    confidence: 89,
    price: 788.17,
    change: 4.2,
    marketCap: '$1.95T',
    volume: '45.2M',
    pe: 98.52,
    dividend: 0.05,
    data: Array.from({ length: 20 }, (_, i) => ({
      date: new Date(2024, 1, i + 1).toLocaleDateString(),
      price: 800 + Math.sin(i / 2) * 50 + Math.random() * 20
    }))
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    prediction: -3.2,
    confidence: 76,
    price: 202.64,
    change: -1.8,
    marketCap: '$642.8B',
    volume: '108.9M',
    pe: 44.31,
    dividend: 0,
    data: Array.from({ length: 20 }, (_, i) => ({
      date: new Date(2024, 1, i + 1).toLocaleDateString(),
      price: 180 + Math.cos(i / 2) * 20 + Math.random() * 10
    }))
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    prediction: 5.8,
    confidence: 82,
    price: 182.52,
    change: 1.2,
    marketCap: '$2.82T',
    volume: '62.3M',
    pe: 28.45,
    dividend: 0.51,
    data: Array.from({ length: 20 }, (_, i) => ({
      date: new Date(2024, 1, i + 1).toLocaleDateString(),
      price: 170 + Math.sin(i / 3) * 15 + Math.random() * 5
    }))
  },
];

function App() {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query.toUpperCase());
    const stock = mockStocks.find(s => 
      s.symbol.includes(query.toUpperCase()) || 
      s.name.toLowerCase().includes(query.toLowerCase())
    );
    if (stock) {
      setSelectedStock(stock.symbol);
    }
  };

  const currentStock = mockStocks.find(s => s.symbol === selectedStock);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <Particles />
      
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-orbitron font-bold">StockSense AI</h1>
          </div>
          <div className="text-sm text-gray-400">
            Made by Ganesh Divekar
          </div>
        </div>
        <div className="animate-pulse bg-purple-500/10 text-purple-300 px-4 py-2 rounded-lg inline-flex items-center text-sm">
          <span className="mr-2">●</span>
          AI Engine Status: Active
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {currentStock ? (
        <StockDetail stock={currentStock} />
      ) : (
        <main className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 neon-text">
              AI Forecast: Top Trending Stocks
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powered by advanced neural networks and real-time market analysis
            </p>
          </motion.div>

          {/* Stock Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mockStocks
              .filter(stock => 
                !searchQuery || 
                stock.symbol.includes(searchQuery) || 
                stock.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((stock) => (
                <div key={stock.symbol} onClick={() => setSelectedStock(stock.symbol)} className="cursor-pointer">
                  <StockCard {...stock} />
                </div>
              ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button className="glass-card px-8 py-4 rounded-full font-orbitron flex items-center mx-auto hover:neon-border transition-all duration-300">
              View All Predictions
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </main>
      )}

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12 text-center text-gray-500">
        <p className="text-sm">Generated by NeuralPredict v2.1 • Updated every 24 hours</p>
      </footer>
    </div>
  );
}

export default App;