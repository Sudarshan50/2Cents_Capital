
import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import FilterableTable from '@/components/tables/FilterableTable';
import { Button } from '@/components/ui/button';

// Sample data for secondary market
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
  },
  {
    id: 4,
    product: 'Participation Certificate',
    underlying: 'NVDA',
    referenceUnderlying: 'NASDAQ',
    referenceLevel: 13500.00,
    reoffer: 98.75,
    couponType: 'Fixed',
    coupon: 4.25,
    couponFrequency: 'Quarterly',
    strikeDate: '2023-04-05',
    maturityDate: '2026-04-05',
    timeToMaturity: '3 years',
    currency: 'USD',
    issuer: 'UBS',
    country: 'Switzerland',
    region: 'Europe',
    sector: 'Technology',
    analystConsensus: 'Buy'
  },
  {
    id: 5,
    product: 'Credit Linked Note',
    underlying: 'META',
    referenceUnderlying: 'S&P 500',
    referenceLevel: 4150.00,
    reoffer: 96.80,
    couponType: 'Fixed',
    coupon: 6.00,
    couponFrequency: 'Quarterly',
    strikeDate: '2023-05-12',
    maturityDate: '2027-05-12',
    timeToMaturity: '4 years',
    currency: 'USD',
    issuer: 'Deutsche Bank',
    country: 'Germany',
    region: 'Europe',
    sector: 'Communication Services',
    analystConsensus: 'Buy'
  },
  {
    id: 6,
    product: 'Autocallable Note',
    underlying: 'GOOG',
    referenceUnderlying: 'NASDAQ',
    referenceLevel: 13700.25,
    reoffer: 99.00,
    couponType: 'Conditional',
    coupon: 5.50,
    couponFrequency: 'Semi-Annual',
    strikeDate: '2023-01-25',
    maturityDate: '2026-01-25',
    timeToMaturity: '2.5 years',
    currency: 'USD',
    issuer: 'Barclays',
    country: 'UK',
    region: 'Europe',
    sector: 'Technology',
    analystConsensus: 'Buy'
  },
  {
    id: 7,
    product: 'Reverse Convertible',
    underlying: 'AMZN',
    referenceUnderlying: 'S&P 500',
    referenceLevel: 4225.75,
    reoffer: 98.25,
    couponType: 'Fixed',
    coupon: 5.75,
    couponFrequency: 'Quarterly',
    strikeDate: '2023-03-20',
    maturityDate: '2025-03-20',
    timeToMaturity: '2 years',
    currency: 'USD',
    issuer: 'BNP Paribas',
    country: 'France',
    region: 'Europe',
    sector: 'Consumer Discretionary',
    analystConsensus: 'Strong Buy'
  },
  {
    id: 8,
    product: 'Capital Guaranteed Note',
    underlying: 'BABA',
    referenceUnderlying: 'Hang Seng',
    referenceLevel: 20500.00,
    reoffer: 100.00,
    couponType: 'Floating',
    coupon: 3.25,
    couponFrequency: 'Annual',
    strikeDate: '2023-02-10',
    maturityDate: '2028-02-10',
    timeToMaturity: '5 years',
    currency: 'USD',
    issuer: 'HSBC',
    country: 'UK',
    region: 'Europe',
    sector: 'Consumer Discretionary',
    analystConsensus: 'Hold'
  },
  {
    id: 9,
    product: 'Participation Certificate',
    underlying: 'NFLX',
    referenceUnderlying: 'NASDAQ',
    referenceLevel: 13550.50,
    reoffer: 98.50,
    couponType: 'Conditional',
    coupon: 4.00,
    couponFrequency: 'Semi-Annual',
    strikeDate: '2023-04-15',
    maturityDate: '2026-04-15',
    timeToMaturity: '3 years',
    currency: 'USD',
    issuer: 'Morgan Stanley',
    country: 'USA',
    region: 'North America',
    sector: 'Communication Services',
    analystConsensus: 'Buy'
  },
  {
    id: 10,
    product: 'Credit Linked Note',
    underlying: 'JNJ',
    referenceUnderlying: 'S&P 500',
    referenceLevel: 4175.25,
    reoffer: 97.00,
    couponType: 'Fixed',
    coupon: 5.50,
    couponFrequency: 'Quarterly',
    strikeDate: '2023-05-05',
    maturityDate: '2027-05-05',
    timeToMaturity: '4 years',
    currency: 'USD',
    issuer: 'Societe Generale',
    country: 'France',
    region: 'Europe',
    sector: 'Healthcare',
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
          <div className="filter-bar">
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
