
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductQuoteData } from './ProductCreationDialog';
import { Slider } from '@/components/ui/slider';
import { Toggle } from '@/components/ui/toggle';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ProductQuoteProps {
  data: ProductQuoteData;
  underlying: string;
  onBack: () => void;
}

const ProductQuote: React.FC<ProductQuoteProps> = ({ data, underlying, onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState<string>(data.productType);
  const [selectedBarrierType, setSelectedBarrierType] = useState<string>(data.barrierType || 'American');
  const [selectedBarrier, setSelectedBarrier] = useState<number>(Number(data.barrier?.replace('%', '') || 60));
  const [selectedFixing, setSelectedFixing] = useState<string>(data.finalFixing);
  const [selectedCap, setSelectedCap] = useState<string>(data.cap || '130%');

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

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4 p-2">
          <ArrowLeft size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Settings */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Settings</h3>

          <div className="space-y-2">
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

          {selectedProduct === 'Barrier Reverse Convertible' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">BRC Type</label>
                <div className="flex gap-2">
                  <Button
                    variant={selectedBarrierType === 'Single' ? 'default' : 'outline'}
                    onClick={() => setSelectedBarrierType('Single')}
                    className="flex-1"
                  >
                    Single
                  </Button>
                  <Button
                    variant={selectedBarrierType === 'Multi' ? 'default' : 'outline'}
                    onClick={() => setSelectedBarrierType('Multi')}
                    className="flex-1"
                  >
                    Multi
                  </Button>
                </div>
              </div>
            </>
          )}

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
              </SelectContent>
            </Select>
          </div>

          {(selectedProduct === 'Barrier Reverse Convertible' || selectedProduct === 'Reverse Convertible') && (
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
          )}

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

          <button 
            className="text-sm text-blue-600 hover:underline mt-8 block"
            onClick={() => {}}
          >
            Disclaimer
          </button>
        </div>

        {/* Right column - Price Result */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Price Result Overview</h3>
            <span className="text-sm text-gray-500">Last price update: 11.04.25</span>
          </div>

          <div className="bg-gray-50 p-6 flex flex-col items-center justify-center rounded-md">
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

          <div className="text-xs text-gray-500 mt-4">
            The Current Price Result is calculated on the basis of the current market situation; i.e. products 
            are valued that could currently be issued. The parameters (including the price of the underlying, 
            volatility and dividend yield) used for the valuation reflect the current market situation.
          </div>

          <div className="mt-8">
            <Button 
              className="bg-quant-yellow text-quant-navy hover:bg-quant-yellow/90 w-full"
            >
              Subscribe to this product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuote;
