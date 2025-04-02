
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface CashflowDataPoint {
  month: string;
  price: number;
  logs?: {
    date: string;
    type: string;
    amount: number;
    status: string;
  }[];
}

interface CashflowChartProps {
  data: CashflowDataPoint[];
}

const CashflowChart: React.FC<CashflowChartProps> = ({ data }) => {
  const [selectedPoint, setSelectedPoint] = useState<CashflowDataPoint | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePointClick = (dataPoint: CashflowDataPoint) => {
    setSelectedPoint(dataPoint);
    setIsModalOpen(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="text-sm font-medium">{payload[0].payload.month}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="w-full h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F7B801" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F7B801" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value)}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#F7B801"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              activeDot={{
                onClick: (_, index) => handlePointClick(data[index]),
                style: { cursor: 'pointer' }
              }}
            />
            {data.map((point, index) => (
              <ReferenceDot
                key={index}
                x={point.month}
                y={point.price}
                r={4}
                fill="#F7B801"
                stroke="#fff"
                strokeWidth={2}
                onClick={() => handlePointClick(point)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Future Cashflow - {selectedPoint?.month}</DialogTitle>
            <DialogDescription>
              Details for expected cashflow in {selectedPoint?.month}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Amount: {selectedPoint ? formatCurrency(selectedPoint.price) : '-'}</h3>
              <p className="text-sm text-gray-500">Projected cashflow for {selectedPoint?.month}</p>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Transaction Logs</h4>
              {selectedPoint?.logs && selectedPoint.logs.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedPoint.logs.map((log, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">{log.date}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">{log.type}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">{formatCurrency(log.amount)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              log.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              log.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No transaction logs available</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CashflowChart;
