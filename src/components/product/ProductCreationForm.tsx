
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductFormData } from './ProductCreationDialog';

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
    'Nestle SA',
    'Novartis',
    'Roche',
    'UBS Group',
    'Credit Suisse',
    'Zurich Insurance',
    'Swiss Re',
    'Tesla Inc.',
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">What is your investment horizon?</h3>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setInvestmentHorizon('short')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              investmentHorizon === 'short'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            Short / Medium
          </button>
          <button
            type="button"
            onClick={() => setInvestmentHorizon('long')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              investmentHorizon === 'long'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            Long
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          {investmentHorizon === 'short' ? 'Up to 36 months' : 'More than 36 months'}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">What would you like to achieve with your investments?</h3>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setInvestmentGoal('preserve')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              investmentGoal === 'preserve'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            Preserve
          </button>
          <button
            type="button"
            onClick={() => setInvestmentGoal('medium')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              investmentGoal === 'medium'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            Medium increase
          </button>
          <button
            type="button"
            onClick={() => setInvestmentGoal('max')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              investmentGoal === 'max'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            Max increase
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          {investmentGoal === 'preserve' ? 'Low risk' : investmentGoal === 'medium' ? 'Medium risk' : 'High risk'}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">I want my investments to be protected against a market drop of:</h3>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setMarketDropProtection('40')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              marketDropProtection === '40'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            40%
          </button>
          <button
            type="button"
            onClick={() => setMarketDropProtection('20')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              marketDropProtection === '20'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            20%
          </button>
          <button
            type="button"
            onClick={() => setMarketDropProtection('0')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              marketDropProtection === '0'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            0%
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">What do you expect from the Swiss market?</h3>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setMarketExpectation('up')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              marketExpectation === 'up'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            Going up
          </button>
          <button
            type="button"
            onClick={() => setMarketExpectation('sideways')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              marketExpectation === 'sideways'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            Sideways
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Underlying?</h3>
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
          className="bg-quant-yellow text-quant-navy hover:bg-quant-yellow/90 w-full"
        >
          Get Quote
        </Button>
      </div>
    </div>
  );
};

export default ProductCreationForm;
