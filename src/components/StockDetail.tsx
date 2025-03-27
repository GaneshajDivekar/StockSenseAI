import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StockDetailProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    marketCap: string;
    volume: string;
    pe: number;
    dividend: number;
    prediction: number;
    confidence: number;
    data: Array<{ date: string; price: number }>;
  };
}

export const StockDetail: React.FC<StockDetailProps> = ({ stock }) => {
  const isPositive = stock.change > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="glass-card p-8 mb-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-orbitron font-bold mb-2">{stock.symbol}</h2>
            <p className="text-xl text-gray-400">{stock.name}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold mb-2">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-5 h-5 mr-2" /> : <TrendingDown className="w-5 h-5 mr-2" />}
              <span className="text-lg">{isPositive ? '+' : ''}{stock.change}%</span>
            </div>
          </div>
        </div>

        <div className="h-[400px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stock.data}>
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  border: '1px solid rgba(107, 114, 128, 0.2)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? '#34D399' : '#F87171'}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-4">
            <div className="flex items-center mb-2">
              <DollarSign className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-gray-400">Market Cap</span>
            </div>
            <div className="text-xl font-semibold">{stock.marketCap}</div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center mb-2">
              <BarChart3 className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-gray-400">Volume</span>
            </div>
            <div className="text-xl font-semibold">{stock.volume}</div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center mb-2">
              <Activity className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-gray-400">P/E Ratio</span>
            </div>
            <div className="text-xl font-semibold">{stock.pe.toFixed(2)}</div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center mb-2">
              <Globe className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-gray-400">Dividend Yield</span>
            </div>
            <div className="text-xl font-semibold">{stock.dividend.toFixed(2)}%</div>
          </div>
        </div>
      </div>

      <div className="glass-card p-8">
        <h3 className="text-2xl font-orbitron font-bold mb-6">AI Prediction</h3>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-gray-400 mb-2">1-Month Forecast</div>
            <div className={`text-2xl font-bold ${stock.prediction > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stock.prediction > 0 ? '+' : ''}{stock.prediction}%
            </div>
          </div>
          <div>
            <div className="text-gray-400 mb-2">AI Confidence</div>
            <div className="text-2xl font-bold text-purple-400">{stock.confidence}%</div>
          </div>
        </div>
        <div className="text-gray-400">
          <p>Based on our advanced neural network analysis:</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Strong technical indicators suggest continued momentum</li>
            <li>Positive sentiment from recent earnings report</li>
            <li>Sector-wide growth trends support bullish outlook</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};