
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Sample data for the cashflow chart
const cashflowData = [
  { month: 'Jan', amount: 12500 },
  { month: 'Feb', amount: 15000 },
  { month: 'Mar', amount: 18000 },
  { month: 'Apr', amount: 16000 },
  { month: 'May', amount: 21000 },
  { month: 'Jun', amount: 19000 },
  { month: 'Jul', amount: 22000 },
  { month: 'Aug', amount: 25000 },
  { month: 'Sep', amount: 23000 },
  { month: 'Oct', amount: 20000 },
  { month: 'Nov', amount: 22000 },
  { month: 'Dec', amount: 27000 },
];

// Sample data for the modal
const futureCashflowDetails = {
  product: 'Autocallable Note',
  issuer: 'Goldman Sachs',
  underlying: 'AAPL',
  notionalAmount: 100000,
  coupon: '5.25%',
  maturityDate: '2025-01-15',
  settlementCurrency: 'USD'
};

// Sample logs for the modal
const cashflowLogs = [
  { date: '2023-01-15', description: 'Coupon Payment', amount: 1312.50 },
  { date: '2023-04-15', description: 'Coupon Payment', amount: 1312.50 },
  { date: '2023-07-15', description: 'Coupon Payment', amount: 1312.50 },
  { date: '2023-10-15', description: 'Coupon Payment', amount: 1312.50 },
  { date: '2024-01-15', description: 'Coupon Payment', amount: 1312.50 },
  { date: '2024-04-15', description: 'Coupon Payment', amount: 1312.50 },
  { date: '2024-07-15', description: 'Coupon Payment', amount: 1312.50 },
  { date: '2024-10-15', description: 'Coupon Payment', amount: 1312.50 },
  { date: '2025-01-15', description: 'Maturity + Final Coupon', amount: 101312.50 },
];

interface CashflowChartProps {
  title?: string;
}

const CashflowChart: React.FC<CashflowChartProps> = ({ title = 'Future Cashflows' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<{ month: string; amount: number } | null>(null);

  const handlePointClick = (data: any) => {
    setSelectedPoint(data);
    setIsModalOpen(true);
  };

  const CustomizedDot = (props: any) => {
    const { cx, cy, index } = props;
    
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={5} 
        fill="#FFD700" 
        stroke="#333" 
        strokeWidth={1}
        style={{ cursor: 'pointer' }}
        onClick={() => handlePointClick(cashflowData[index])}
      />
    );
  };

  return (
    <div className="h-full w-full">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={cashflowData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month" tick={{ fill: '#333' }} />
          <YAxis 
            tick={{ fill: '#333' }} 
            tickFormatter={(value) => `$${value.toLocaleString()}`} 
          />
          <Tooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderColor: '#FFD700',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#FFD700" 
            strokeWidth={2}
            dot={<CustomizedDot />}
            activeDot={{ r: 8, fill: '#FFC107', stroke: '#333' }}
            name="Cashflow"
          />
        </LineChart>
      </ResponsiveContainer>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Future Cashflow Details</DialogTitle>
            <DialogDescription>
              {selectedPoint && (
                <span>Details for {selectedPoint.month}: ${selectedPoint.amount.toLocaleString()}</span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-sm text-gray-500">Product</p>
              <p className="font-medium">{futureCashflowDetails.product}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Issuer</p>
              <p className="font-medium">{futureCashflowDetails.issuer}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Underlying</p>
              <p className="font-medium">{futureCashflowDetails.underlying}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Notional Amount</p>
              <p className="font-medium">${futureCashflowDetails.notionalAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Coupon</p>
              <p className="font-medium">{futureCashflowDetails.coupon}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Maturity Date</p>
              <p className="font-medium">{futureCashflowDetails.maturityDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Settlement Currency</p>
              <p className="font-medium">{futureCashflowDetails.settlementCurrency}</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-3">Cashflow Log</h4>
            <div className="border rounded-md max-h-[200px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Date</TableHead>
                    <TableHead className="w-1/3">Description</TableHead>
                    <TableHead className="w-1/3 text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashflowLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.description}</TableCell>
                      <TableCell className="text-right">${log.amount.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CashflowChart;
