
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, ChevronDown } from 'lucide-react';
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
      theme: { light: "#33a0ff", dark: "#33a0ff" }
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4 p-2">
          <ArrowLeft size={16} />
        </Button>
        <h2 className="text-xl font-medium">Price Simulator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium mb-4">Settings</h3>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Type</label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="w-full">
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
                  <label className="text-sm font-medium">Underlying</label>
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
                  <SelectTrigger className="w-full">
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
                    <label className="text-sm font-medium">Barrier Type</label>
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
                          <label className="text-sm font-medium">Barrier</label>
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
                    <label className="text-sm font-medium">Cap</label>
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
                  <label className="text-sm font-medium">Final Fixing</label>
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
            </div>

            <button 
              className="text-sm text-blue-600 hover:underline mt-8 block"
              onClick={() => {}}
            >
              Disclaimer
            </button>
          </div>
        </div>

        {/* Right column - Price Result */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Price Result Overview</h3>
              <span className="text-sm text-gray-500">Last price update: 11.04.25</span>
            </div>

            <div className="bg-gray-50 p-6 flex flex-col items-center justify-center rounded-md mb-4">
              <p className="text-sm text-gray-600 mb-2">{getResultLabel()}</p>
              <p className="text-4xl font-bold text-red-500 mb-1">{getResultValue()}</p>
              {(selectedProduct === 'Reverse Convertible' || 
                selectedProduct === 'Barrier Reverse Convertible') && (
                <p className="text-sm text-gray-500">p.a.</p>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">Product</div>
                <div className="text-sm font-medium text-right">{selectedProduct}</div>
                
                {(selectedProduct === 'Barrier Reverse Convertible') && (
                  <>
                    <div className="text-sm text-gray-500">Barrier Type</div>
                    <div className="text-sm font-medium text-right">{selectedBarrierType}</div>
                  </>
                )}
                
                <div className="text-sm text-gray-500">Final Fixing</div>
                <div className="text-sm font-medium text-right">{selectedFixing}</div>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                className="bg-quant-yellow text-quant-navy hover:bg-quant-yellow/90 w-full"
              >
                Subscribe to this product
              </Button>
            </div>
          </div>

          {/* Historical Performance Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium mb-4">Historical Performance</h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm">
                  {underlying} Performance
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#022b54] rounded-full mr-1"></div>
                    <span className="text-xs text-gray-600">Underlying</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#33a0ff] rounded-full mr-1"></div>
                    <span className="text-xs text-gray-600">Product</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm mb-2">
                <div>
                  <span className="text-gray-500">USD {historicalData[historicalData.length - 1].underlying.toFixed(2)}</span>
                  <span className="ml-4 text-xs px-2 py-0.5 bg-gray-100 rounded">
                    {(((historicalData[historicalData.length - 1].underlying / historicalData[0].underlying) - 1) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  from: 11.04.22
                </div>
              </div>
            </div>

            <div className="h-64 w-full">
              <ChartContainer 
                config={chartConfig}
                className="h-full w-full"
              >
                <LineChart data={historicalData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10 }}
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
                    name="underlying"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="product" 
                    stroke="#33a0ff" 
                    strokeWidth={2}
                    dot={false} 
                    activeDot={{ r: 6 }}
                    name="product"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ChartContainer>
            </div>

            <div className="text-xs text-gray-500 mt-4">
              The parameters for the historical performance are determined on the basis of the term of the product and the market situation when the
              product was issued. For the valuation of a product issued, e.g. one year ago, parameters such as the price of the underlying, volatility and
              dividend yield that could be determined in the market one year ago are used. Therefore, the historical valuation may differ from the
              current valuation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuote;
