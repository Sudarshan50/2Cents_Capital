
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import FilterableTable from '@/components/tables/FilterableTable';
import { ArrowUp, ArrowDown } from 'lucide-react';

// Sample data for the underlying table
const underlyingData = [
  {
    id: 1,
    name: 'Apple Inc.',
    spotPrice: 182.52,
    profit: 1.25,
    totalNotional: 150000,
    volatility: 18.7,
    dividendYield: 0.58
  },
  {
    id: 2,
    name: 'Microsoft Corp.',
    spotPrice: 337.65,
    profit: 0.83,
    totalNotional: 200000,
    volatility: 17.2,
    dividendYield: 0.87
  },
  {
    id: 3,
    name: 'Tesla Inc.',
    spotPrice: 248.50,
    profit: -1.20,
    totalNotional: 80000,
    volatility: 42.5,
    dividendYield: 0.00
  },
  {
    id: 4,
    name: 'NVIDIA Corp.',
    spotPrice: 425.70,
    profit: 2.80,
    totalNotional: 125000,
    volatility: 39.8,
    dividendYield: 0.04
  },
  {
    id: 5,
    name: 'Meta Platforms Inc.',
    spotPrice: 287.45,
    profit: 1.65,
    totalNotional: 95000,
    volatility: 28.3,
    dividendYield: 0.56
  },
  {
    id: 6,
    name: 'Amazon.com Inc.',
    spotPrice: 129.33,
    profit: 0.45,
    totalNotional: 180000,
    volatility: 24.5,
    dividendYield: 0.00
  },
  {
    id: 7,
    name: 'Alphabet Inc.',
    spotPrice: 122.17,
    profit: 0.78,
    totalNotional: 160000,
    volatility: 21.3,
    dividendYield: 0.55
  },
  {
    id: 8,
    name: 'Johnson & Johnson',
    spotPrice: 154.41,
    profit: -0.35,
    totalNotional: 70000,
    volatility: 14.2,
    dividendYield: 3.05
  },
  {
    id: 9,
    name: 'JPMorgan Chase & Co.',
    spotPrice: 144.35,
    profit: 0.28,
    totalNotional: 85000,
    volatility: 18.6,
    dividendYield: 2.78
  },
  {
    id: 10,
    name: 'Walmart Inc.',
    spotPrice: 155.33,
    profit: 0.12,
    totalNotional: 60000,
    volatility: 15.1,
    dividendYield: 1.45
  }
];

const Underlying = () => {
  // Column definitions for underlying table
  const underlyingColumns = [
    { key: 'name', header: 'Name', sortable: true },
    { 
      key: 'spotPrice', 
      header: 'Spot Price',
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">
          ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )
    },
    { 
      key: 'profit', 
      header: 'Profit (1 Day)',
      sortable: true,
      render: (value: number) => (
        <div className={`flex items-center ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {value >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
          <span className="font-medium">
            {Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
          </span>
        </div>
      )
    },
    { 
      key: 'totalNotional', 
      header: 'Total Notional',
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">
          ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </span>
      )
    },
    { 
      key: 'volatility', 
      header: 'Volatility',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
            <div 
              className={`h-2.5 rounded-full ${
                value > 35 ? 'bg-red-500' : 
                value > 25 ? 'bg-yellow-500' : 
                'bg-green-500'
              }`} 
              style={{ width: `${Math.min(100, (value / 50) * 100)}%` }}
            ></div>
          </div>
          <span className="text-sm">{value}%</span>
        </div>
      )
    },
    { 
      key: 'dividendYield', 
      header: 'Dividend Yield',
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">
          {value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          <header className="mb-6 mt-8">
            <h1 className="text-2xl font-bold text-gray-900">Underlying Assets</h1>
            <p className="text-gray-500">Monitor performance of underlying assets</p>
          </header>

          {/* Underlying assets table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <FilterableTable columns={underlyingColumns} data={underlyingData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Underlying;
