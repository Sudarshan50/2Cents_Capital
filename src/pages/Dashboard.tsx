
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Calendar from '@/components/dashboard/Calendar';
import CashflowChart from '@/components/charts/CashflowChart';
import FilterableTable from '@/components/tables/FilterableTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, ChevronRight } from 'lucide-react';

// Sample data for cashflow chart
const cashflowData = [
  {
    month: 'Jan',
    price: 45000,
    logs: [
      { date: '2023-01-05', type: 'Coupon Payment', amount: 25000, status: 'Completed' },
      { date: '2023-01-20', type: 'Dividend', amount: 20000, status: 'Completed' },
    ]
  },
  {
    month: 'Feb',
    price: 42000,
    logs: [
      { date: '2023-02-10', type: 'Coupon Payment', amount: 22000, status: 'Completed' },
      { date: '2023-02-25', type: 'Dividend', amount: 20000, status: 'Completed' },
    ]
  },
  {
    month: 'Mar',
    price: 48000,
    logs: [
      { date: '2023-03-10', type: 'Coupon Payment', amount: 28000, status: 'Completed' },
      { date: '2023-03-20', type: 'Dividend', amount: 20000, status: 'Completed' },
    ]
  },
  {
    month: 'Apr',
    price: 51000,
    logs: [
      { date: '2023-04-05', type: 'Coupon Payment', amount: 31000, status: 'Completed' },
      { date: '2023-04-20', type: 'Dividend', amount: 20000, status: 'Completed' },
    ]
  },
  {
    month: 'May',
    price: 53000,
    logs: [
      { date: '2023-05-10', type: 'Coupon Payment', amount: 33000, status: 'Completed' },
      { date: '2023-05-25', type: 'Dividend', amount: 20000, status: 'Completed' },
    ]
  },
  {
    month: 'Jun',
    price: 58000,
    logs: [
      { date: '2023-06-10', type: 'Coupon Payment', amount: 38000, status: 'Completed' },
      { date: '2023-06-20', type: 'Dividend', amount: 20000, status: 'Completed' },
    ]
  },
  {
    month: 'Jul',
    price: 61000,
    logs: [
      { date: '2023-07-05', type: 'Coupon Payment', amount: 41000, status: 'Pending' },
      { date: '2023-07-20', type: 'Dividend', amount: 20000, status: 'Pending' },
    ]
  },
  {
    month: 'Aug',
    price: 64000,
    logs: [
      { date: '2023-08-10', type: 'Coupon Payment', amount: 44000, status: 'Planned' },
      { date: '2023-08-25', type: 'Dividend', amount: 20000, status: 'Planned' },
    ]
  },
  {
    month: 'Sep',
    price: 67000,
    logs: [
      { date: '2023-09-10', type: 'Coupon Payment', amount: 47000, status: 'Planned' },
      { date: '2023-09-20', type: 'Dividend', amount: 20000, status: 'Planned' },
    ]
  },
  {
    month: 'Oct',
    price: 70000,
    logs: [
      { date: '2023-10-05', type: 'Coupon Payment', amount: 50000, status: 'Planned' },
      { date: '2023-10-20', type: 'Dividend', amount: 20000, status: 'Planned' },
    ]
  },
  {
    month: 'Nov',
    price: 74000,
    logs: [
      { date: '2023-11-10', type: 'Coupon Payment', amount: 54000, status: 'Planned' },
      { date: '2023-11-25', type: 'Dividend', amount: 20000, status: 'Planned' },
    ]
  },
  {
    month: 'Dec',
    price: 78000,
    logs: [
      { date: '2023-12-10', type: 'Coupon Payment', amount: 58000, status: 'Planned' },
      { date: '2023-12-20', type: 'Dividend', amount: 20000, status: 'Planned' },
    ]
  },
];

// Sample data for products table
const productsData = [
  {
    productName: 'Structured Note A',
    lastTradeDate: '2023-06-15',
    units: 100,
    currency: 'USD',
    marketPrice: 135.75,
    status: 'Active',
  },
  {
    productName: 'Autocallable XYZ',
    lastTradeDate: '2023-06-10',
    units: 50,
    currency: 'EUR',
    marketPrice: 142.30,
    status: 'Active',
  },
  {
    productName: 'Reverse Convertible 123',
    lastTradeDate: '2023-05-28',
    units: 75,
    currency: 'USD',
    marketPrice: 98.50,
    status: 'Barrier Breached',
  },
  {
    productName: 'Capital Protected Note',
    lastTradeDate: '2023-05-15',
    units: 200,
    currency: 'CHF',
    marketPrice: 101.25,
    status: 'Active',
  },
  {
    productName: 'Credit Linked Note',
    lastTradeDate: '2023-04-30',
    units: 150,
    currency: 'USD',
    marketPrice: 99.80,
    status: 'Active',
  },
];

// Calendar events
const calendarEvents = [
  {
    date: new Date(),
    title: 'Autocallable XYZ Coupon Payment',
    type: 'payment' as const
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    title: 'Structured Note A Maturity',
    type: 'maturity' as const
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 8)),
    title: 'New Trade - Capital Protected Note',
    type: 'trade' as const
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 12)),
    title: 'Credit Linked Note Coupon',
    type: 'payment' as const
  },
];

const Dashboard = () => {
  // Column definitions for products table
  const productColumns = [
    {
      key: 'productName',
      header: 'Product Name',
    },
    {
      key: 'lastTradeDate',
      header: 'Last Trade Date',
    },
    {
      key: 'units',
      header: 'Units',
    },
    {
      key: 'currency',
      header: 'Currency',
    },
    {
      key: 'marketPrice',
      header: 'Market Price',
      render: (value: number) => (
        <span className="font-medium">
          {value.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === 'Active'
              ? 'bg-green-100 text-green-800'
              : value === 'Barrier Breached'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
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
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome to your QuantGlow dashboard</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column (takes 2/3 on large screens) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cashflow Chart */}
              <Card className="shadow-sm border-gray-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Future Cashflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <CashflowChart data={cashflowData} />
                </CardContent>
              </Card>

              {/* Products Table */}
              <Card className="shadow-sm border-gray-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">My Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterableTable columns={productColumns} data={productsData} />
                </CardContent>
              </Card>
            </div>

            {/* Right column (takes 1/3 on large screens) */}
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                <Card className="shadow-sm border-gray-100">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total Portfolio Value</p>
                        <p className="text-2xl font-bold mt-1">$711,250</p>
                      </div>
                      <div className="p-2 bg-green-100 rounded-lg">
                        <ArrowUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-xs text-green-600 font-medium">+2.5%</span>
                      <span className="text-xs text-gray-500 ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-100">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Upcoming Payments</p>
                        <p className="text-2xl font-bold mt-1">$78,000</p>
                      </div>
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <ChevronRight className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-gray-500">Next payment:</span>
                      <span className="text-xs text-gray-700 font-medium ml-1">July 5, 2023</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Calendar */}
              <Calendar events={calendarEvents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
