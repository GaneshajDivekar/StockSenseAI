import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

interface StockCardProps {
  symbol: string;
  name: string;
  prediction: number;
  confidence: number;
  data: { price: number }[];
}

export const StockCard: React.FC<StockCardProps> = ({
  symbol,
  name,
  prediction,
  confidence,
  data,
}) => {
  const isPositive = prediction > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 hover:neon-border transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-orbitron font-bold">{symbol}</h3>
          <p className="text-gray-400 text-sm">{name}</p>
        </div>
        <div className="flex items-center">
          <span className={`text-lg font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{prediction}%
          </span>
          {isPositive ? (
            <TrendingUp className="ml-2 w-5 h-5 text-green-400" />
          ) : (
            <TrendingDown className="ml-2 w-5 h-5 text-red-400" />
          )}
        </div>
      </div>

      <div className="h-20 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#34D399' : '#F87171'} stopOpacity={0.3} />
                <stop offset="100%" stopColor={isPositive ? '#34D399' : '#F87171'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? '#34D399' : '#F87171'}
              fill={`url(#gradient-${symbol})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="w-2 h-2 rounded-full mr-2"
            style={{
              backgroundColor: confidence > 75 ? '#34D399' : confidence > 50 ? '#FBBF24' : '#F87171',
            }}
          />
          <span className="text-sm text-gray-400">
            AI Confidence: {confidence}%
          </span>
        </div>
        <AlertCircle
          className="w-5 h-5 text-gray-400 cursor-help"
          title="AI-generated prediction based on market analysis"
        />
      </div>
    </motion.div>
  );
};