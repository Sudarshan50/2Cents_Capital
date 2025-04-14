import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Info, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductQuoteData } from './ProductCreationDialog';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart
} from "recharts";

interface ProductQuoteProps {
  data: ProductQuoteData;
  underlying: string;
  onBack: () => void;
}

// Generate random historical performance data
const generateHistoricalData = (months = 24) => {
  const data = [];
  let productValue = 100;
  let underlyingValue = 100;
  
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);
  
  for (let i = 0; i <= months; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    
    // Random fluctuation between -5% and +5% for underlying
    const underlyingChange = (Math.random() * 10 - 5) / 100;
    underlyingValue = underlyingValue * (1 + underlyingChange);
    
    // Product fluctuates less than underlying
    const productChange = (Math.random() * 6 - 2) / 100;
    productValue = productValue * (1 + productChange);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      underlying: parseFloat(underlyingValue.toFixed(2)),
      product: parseFloat(productValue.toFixed(2)),
    });
  }
  
  return data;
};

const ProductQuote: React.FC<ProductQuoteProps> = ({ data, underlying, onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState<string>(data.productType);
  const [selectedBarrierType, setSelectedBarrierType] = useState<string>(data.barrierType || 'American');
  const [selectedBarrier, setSelectedBarrier] = useState<number>(Number(data.barrier?.replace('%', '') || 60));
  const [selectedFixing, setSelectedFixing] = useState<string>(data.finalFixing);
  const [selectedCap, setSelectedCap] = useState<string>(data.cap || '130%');
  
  // Generate historical data
  const [historicalData] = useState(() => generateHistoricalData());

  const productOptions = [
    'Capital Protection with Participation',
    'Reverse Convertible',
    'Barrier Reverse Convertible',
    'Outperformance Certificate',
  ];

  const fixingOptions = [
    '9 Mts',
    '12 Mts',
    '18 Mts',
    '1 Year',
    '2 Years',
    '3 Years',
  ];

  const getResultValue = () => {
    switch (selectedProduct) {
      case 'Capital Protection with Participation':
        return '61%';
      case 'Reverse Convertible':
        return '11.7%';
      case 'Barrier Reverse Convertible':
        return '5.4%';
      case 'Outperformance Certificate':
        return '107%';
      default:
        return '61%';
    }
  };

  const getResultLabel = () => {
    switch (selectedProduct) {
      case 'Capital Protection with Participation':
      case 'Outperformance Certificate':
        return 'Current Participation';
      case 'Reverse Convertible':
      case 'Barrier Reverse Convertible':
        return 'Current Coupon';
      default:
        return 'Current Participation';
    }
  };

  const chartConfig = {
    underlying: {
      label: "Underlying",
      theme: { light: "#022b54", dark: "#022b54" }
    },
    product: {
      label: "Product",
      theme: { light: "#ffb800", dark: "#ffb800" }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Product Type</label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="w-full border-gray-200 bg-white hover:border-quant-yellow focus:border-quant-yellow focus:ring-1 focus:ring-quant-yellow/30">
                      <SelectValue placeholder="Select a product type" />
                    </SelectTrigger>
                    <SelectContent>
                      {productOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-900">Underlying</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                          <Info size={14} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="top" className="w-80">
                        <p className="text-sm">Select the underlying asset for your product.</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Select defaultValue={underlying}>
                    <SelectTrigger className="w-full border-gray-200 bg-white hover:border-quant-yellow focus:border-quant-yellow focus:ring-1 focus:ring-quant-yellow/30">
                      <SelectValue placeholder="Select an underlying" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ABB Ltd">ABB Ltd</SelectItem>
                      <SelectItem value="Nestlé SA">Nestlé SA</SelectItem>
                      <SelectItem value="Novartis">Novartis</SelectItem>
                      <SelectItem value="Tesla Inc.">Tesla Inc.</SelectItem>
                      <SelectItem value="Amazon.com Inc.">Amazon.com Inc.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(selectedProduct === 'Barrier Reverse Convertible' || selectedProduct === 'Reverse Convertible') && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Barrier Type</label>
                      <div className="flex gap-2">
                        <Button
                          variant={selectedBarrierType === 'European' ? 'default' : 'outline'}
                          onClick={() => setSelectedBarrierType('European')}
                          className="flex-1"
                        >
                          European
                        </Button>
                        <Button
                          variant={selectedBarrierType === 'American' ? 'default' : 'outline'}
                          onClick={() => setSelectedBarrierType('American')}
                          className="flex-1"
                        >
                          American
                        </Button>
                      </div>
                    </div>

                    {selectedProduct === 'Barrier Reverse Convertible' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <label className="text-sm font-medium text-gray-900">Barrier</label>
                            <span className="ml-2 text-sm">{selectedBarrier}%</span>
                          </div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Info size={14} />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent side="top" className="w-80">
                              <p className="text-sm">The barrier level for the product.</p>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs mr-2">50%</span>
                          <Slider
                            defaultValue={[selectedBarrier]}
                            min={50}
                            max={90}
                            step={1}
                            onValueChange={(value) => setSelectedBarrier(value[0])}
                            className="flex-1"
                          />
                          <span className="text-xs ml-2">90%</span>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {(selectedProduct === 'Capital Protection with Participation' || 
                  selectedProduct === 'Outperformance Certificate') && (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <label className="text-sm font-medium text-gray-900">Cap</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                            <Info size={14} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent side="top" className="w-80">
                          <p className="text-sm">Maximum potential return of the product.</p>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedCap === 'Uncapped' ? 'default' : 'outline'}
                        onClick={() => setSelectedCap('Uncapped')}
                        className="flex-1"
                      >
                        Uncapped
                      </Button>
                      <Button
                        variant={selectedCap === '130%' ? 'default' : 'outline'}
                        onClick={() => setSelectedCap('130%')}
                        className="flex-1"
                      >
                        130%
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-900">Final Fixing</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                          <Info size={14} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="top" className="w-80">
                        <p className="text-sm">When the product will mature.</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {fixingOptions.map((option) => (
                      <Button
                        key={option}
                        variant={selectedFixing === option ? 'default' : 'outline'}
                        onClick={() => setSelectedFixing(option)}
                        className="text-sm"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t mt-6">
                  <button 
                    className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                    onClick={() => {}}
                  >
                    View Disclaimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Price Result */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Price Result Overview</h3>
                <span className="text-sm text-gray-500">Last update: {new Date().toLocaleDateString()}</span>
              </div>

              <div className="bg-gray-50 p-6 flex flex-col items-center justify-center rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2">{getResultLabel()}</p>
                <p className="text-4xl font-bold text-quant-yellow mb-1">{getResultValue()}</p>
                {(selectedProduct === 'Reverse Convertible' || 
                  selectedProduct === 'Barrier Reverse Convertible') && (
                  <p className="text-sm text-gray-500">p.a.</p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-sm text-gray-600">Product</div>
                  <div className="text-sm font-medium text-right">{selectedProduct}</div>
                  
                  {selectedProduct === 'Barrier Reverse Convertible' && (
                    <>
                      <div className="text-sm text-gray-600">Barrier Type</div>
                      <div className="text-sm font-medium text-right">{selectedBarrierType}</div>
                    </>
                  )}
                  
                  <div className="text-sm text-gray-600">Final Fixing</div>
                  <div className="text-sm font-medium text-right">{selectedFixing}</div>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  className="bg-quant-yellow text-quant-navy hover:bg-quant-yellow/90 w-full font-medium"
                >
                  Subscribe to this product
                </Button>
              </div>
            </div>
          </div>

          {/* Historical Performance Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Historical Performance</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-gray-900">
                    {underlying} Performance
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-[#022b54] rounded-full"></div>
                      <span className="text-xs text-gray-600">Underlying</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-quant-yellow rounded-full"></div>
                      <span className="text-xs text-gray-600">Product</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium">
                      USD {historicalData[historicalData.length - 1].underlying.toFixed(2)}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                      {(((historicalData[historicalData.length - 1].underlying / historicalData[0].underlying) - 1) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-gray-500">
                    from: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="h-64 w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <LineChart data={historicalData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10, fill: '#666' }}
                      tickFormatter={(value) => value.split(' ')[0]}
                    />
                    <YAxis 
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10, fill: '#666' }}
                      tickFormatter={(value) => `${value}%`}
                      domain={['dataMin - 10', 'dataMax + 10']}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="underlying" 
                      stroke="#022b54" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="product" 
                      stroke="#ffb800" 
                      strokeWidth={2}
                      dot={false} 
                      activeDot={{ r: 6 }}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </LineChart>
                </ChartContainer>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Historical performance parameters are based on the product term and market conditions at issuance.
                Parameters like underlying price, volatility, and dividend yield from the original issue date are used.
                Current valuations may differ from historical performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuote;
