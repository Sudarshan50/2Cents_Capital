
import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import FilterableTable from '@/components/tables/FilterableTable';
import { Button } from '@/components/ui/button';

// Minimal sample data for secondary market
const secondaryMarketData = [
  {
    id: 1,
    product: 'Autocallable Note',
    underlying: 'AAPL',
    referenceUnderlying: 'S&P 500',
    referenceLevel: 4200.50,
    reoffer: 99.50,
    couponType: 'Fixed',
    coupon: 5.25,
    couponFrequency: 'Quarterly',
    strikeDate: '2023-01-15',
    maturityDate: '2025-01-15',
    timeToMaturity: '1.5 years',
    currency: 'USD',
    issuer: 'Goldman Sachs',
    country: 'USA',
    region: 'North America',
    sector: 'Technology',
    analystConsensus: 'Buy'
  },
  {
    id: 2,
    product: 'Reverse Convertible',
    underlying: 'MSFT',
    referenceUnderlying: 'NASDAQ',
    referenceLevel: 13650.75,
    reoffer: 97.30,
    couponType: 'Floating',
    coupon: 4.80,
    couponFrequency: 'Semi-Annual',
    strikeDate: '2023-02-20',
    maturityDate: '2024-08-20',
    timeToMaturity: '1.2 years',
    currency: 'USD',
    issuer: 'JP Morgan',
    country: 'USA',
    region: 'North America',
    sector: 'Technology',
    analystConsensus: 'Strong Buy'
  },
  {
    id: 3,
    product: 'Capital Guaranteed Note',
    underlying: 'TSLA',
    referenceUnderlying: 'S&P 500',
    referenceLevel: 4185.25,
    reoffer: 100.00,
    couponType: 'Conditional',
    coupon: 3.50,
    couponFrequency: 'Annual',
    strikeDate: '2023-03-10',
    maturityDate: '2028-03-10',
    timeToMaturity: '5 years',
    currency: 'USD',
    issuer: 'Credit Suisse',
    country: 'Switzerland',
    region: 'Europe',
    sector: 'Automotive',
    analystConsensus: 'Hold'
  }
];

const SecondaryMarket = () => {
  // Categories for top filter
  const categories = ['All', 'Autocallable', 'Reverse Convertible', 'Capital Guaranteed', 'Participation', 'Credit Linked Notes'];
  
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Filter data based on active category
  const filteredData = activeCategory === 'All' 
    ? secondaryMarketData 
    : secondaryMarketData.filter(item => item.product.includes(activeCategory.replace(' Notes', '').replace(' Certificate', '')));
  
  // Column definitions
  const columns = [
    { key: 'product', header: 'Products', sortable: true },
    { key: 'underlying', header: 'Underlying', sortable: true },
    { key: 'referenceUnderlying', header: 'Reference Underlying', sortable: true },
    { 
      key: 'referenceLevel', 
      header: 'Reference Level', 
      sortable: true,
      render: (value: number) => value.toLocaleString('en-US', { minimumFractionDigits: 2 })
    },
    { 
      key: 'reoffer', 
      header: 'Reoffer', 
      sortable: true,
      render: (value: number) => `${value.toFixed(2)}%`
    },
    { key: 'couponType', header: 'Coupon Type', sortable: true },
    { 
      key: 'coupon', 
      header: 'Coupon', 
      sortable: true,
      render: (value: number) => `${value.toFixed(2)}%`
    },
    { key: 'couponFrequency', header: 'Coupon Frequency', sortable: true },
    { key: 'strikeDate', header: 'Strike Date', sortable: true },
    { key: 'maturityDate', header: 'Maturity Date', sortable: true },
    { key: 'timeToMaturity', header: 'Time to Maturity', sortable: true },
    { key: 'currency', header: 'Currency', sortable: true },
    { key: 'issuer', header: 'Issuer', sortable: true },
    { key: 'country', header: 'Country', sortable: true },
    { key: 'region', header: 'Region', sortable: true },
    { key: 'sector', header: 'Sector', sortable: true },
    { 
      key: 'analystConsensus', 
      header: 'Analyst Consensus', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Strong Buy' ? 'bg-green-100 text-green-800' :
          value === 'Buy' ? 'bg-green-50 text-green-600' :
          value === 'Hold' ? 'bg-yellow-100 text-yellow-800' :
          value === 'Sell' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          <header className="mb-6 mt-8">
            <h1 className="text-2xl font-bold text-gray-900">Secondary Market</h1>
            <p className="text-gray-500">Browse available securities on the secondary market</p>
          </header>

          {/* Category filters */}
          <div className="filter-bar mb-6 space-x-2 flex overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                className={`whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-quant-yellow text-quant-navy hover:bg-quant-yellow/90' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <FilterableTable columns={columns} data={filteredData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryMarket;
