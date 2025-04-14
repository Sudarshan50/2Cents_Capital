
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductFormData } from './ProductCreationDialog';
import { ArrowRight, Calendar, Target, Shield, TrendingUp } from 'lucide-react';

interface ProductCreationFormProps {
  onSubmit: (data: ProductFormData) => void;
}

const ProductCreationForm: React.FC<ProductCreationFormProps> = ({ onSubmit }) => {
  const [investmentHorizon, setInvestmentHorizon] = React.useState<'short' | 'long'>('short');
  const [investmentGoal, setInvestmentGoal] = React.useState<'preserve' | 'medium' | 'max'>('medium');
  const [marketDropProtection, setMarketDropProtection] = React.useState<'40' | '20' | '0'>('40');
  const [marketExpectation, setMarketExpectation] = React.useState<'up' | 'sideways'>('up');
  const [underlying, setUnderlying] = React.useState('ABB Ltd');

  const handleSubmit = () => {
    const formData: ProductFormData = {
      investmentHorizon,
      investmentGoal,
      marketDropProtection,
      marketExpectation,
      underlying,
    };
    onSubmit(formData);
  };

  const underlyingOptions = [
    'ABB Ltd',
    'Nestlé SA',
    'Novartis',
    'Roche',
    'UBS Group',
    'Credit Suisse',
    'Zurich Insurance',
    'Swiss Re',
    'Tesla Inc.',
    'Amazon.com Inc.'
  ];
  
  const renderOptionButton = (
    value: string, 
    currentValue: string, 
    onClick: () => void, 
    label: string,
    description?: string
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center px-4 py-3 rounded-md text-sm font-medium w-full ${
        value === currentValue
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
      }`}
    >
      <div className="flex-grow text-left">
        <div>{label}</div>
        {description && (
          <div className={`text-xs mt-1 ${value === currentValue ? 'text-primary-foreground/80' : 'text-secondary-foreground/70'}`}>
            {description}
          </div>
        )}
      </div>
    </button>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Calendar size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium">What is your investment horizon?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderOptionButton(
            'short', 
            investmentHorizon, 
            () => setInvestmentHorizon('short'),
            'Short / Medium Term',
            'Up to 36 months'
          )}
          {renderOptionButton(
            'long', 
            investmentHorizon, 
            () => setInvestmentHorizon('long'),
            'Long Term',
            'More than 36 months'
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Target size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium">What would you like to achieve with your investments?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderOptionButton(
            'preserve', 
            investmentGoal, 
            () => setInvestmentGoal('preserve'),
            'Preserve Capital',
            'Low risk'
          )}
          {renderOptionButton(
            'medium', 
            investmentGoal, 
            () => setInvestmentGoal('medium'),
            'Medium Growth',
            'Medium risk'
          )}
          {renderOptionButton(
            'max', 
            investmentGoal, 
            () => setInvestmentGoal('max'),
            'Maximum Growth',
            'High risk'
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Shield size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium">I want my investments to be protected against a market drop of:</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderOptionButton(
            '40', 
            marketDropProtection, 
            () => setMarketDropProtection('40'),
            '40%',
            'High protection'
          )}
          {renderOptionButton(
            '20', 
            marketDropProtection, 
            () => setMarketDropProtection('20'),
            '20%',
            'Medium protection'
          )}
          {renderOptionButton(
            '0', 
            marketDropProtection, 
            () => setMarketDropProtection('0'),
            '0%',
            'No protection'
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <TrendingUp size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium">What do you expect from the market?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderOptionButton(
            'up', 
            marketExpectation, 
            () => setMarketExpectation('up'),
            'Going up',
            'Bullish outlook'
          )}
          {renderOptionButton(
            'sideways', 
            marketExpectation, 
            () => setMarketExpectation('sideways'),
            'Moving sideways',
            'Neutral outlook'
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <ArrowRight size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium">Select an underlying asset</h3>
        </div>
        <Select value={underlying} onValueChange={setUnderlying}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an underlying" />
          </SelectTrigger>
          <SelectContent>
            {underlyingOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4">
        <Button 
          onClick={handleSubmit}
          className="bg-quant-yellow text-quant-navy hover:bg-quant-yellow/90 w-full flex items-center justify-center gap-2 py-6"
          size="lg"
        >
          <span>Get Quote</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ProductCreationForm;
