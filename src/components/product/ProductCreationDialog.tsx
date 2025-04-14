
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ProductCreationForm from './ProductCreationForm';
import ProductQuote from './ProductQuote';

interface ProductCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type ProductFormData = {
  investmentHorizon: 'short' | 'long';
  investmentGoal: 'preserve' | 'medium' | 'max';
  marketDropProtection: '40' | '20' | '0';
  marketExpectation: 'up' | 'sideways';
  underlying: string;
};

export type ProductQuoteData = {
  productType: 'Capital Protection with Participation' | 'Reverse Convertible' | 'Barrier Reverse Convertible' | 'Outperformance Certificate';
  finalFixing: string;
  barrierType?: string;
  barrier?: string;
  cap?: string;
  participation?: string;
  coupon?: string;
};

const ProductCreationDialog: React.FC<ProductCreationDialogProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState<'form' | 'quote'>('form');
  const [formData, setFormData] = useState<ProductFormData | null>(null);
  const [quoteData, setQuoteData] = useState<ProductQuoteData | null>(null);

  const handleFormSubmit = (data: ProductFormData) => {
    setFormData(data);
    // Based on the form data, generate a product quote
    const suggestedProduct = generateProductSuggestion(data);
    setQuoteData(suggestedProduct);
    setStep('quote');
  };

  const generateProductSuggestion = (data: ProductFormData): ProductQuoteData => {
    // This is a simplified logic to determine product type based on user preferences
    if (data.marketDropProtection === '40') {
      return {
        productType: 'Capital Protection with Participation',
        finalFixing: '12 Months',
        cap: '130%',
        participation: '61%'
      };
    } else if (data.investmentGoal === 'preserve') {
      return {
        productType: 'Reverse Convertible',
        finalFixing: '12 Mts',
        coupon: '11.7%'
      };
    } else if (data.marketExpectation === 'sideways') {
      return {
        productType: 'Barrier Reverse Convertible',
        finalFixing: '12 Mts',
        barrierType: 'American',
        barrier: '60%',
        coupon: '5.4%'
      };
    } else {
      return {
        productType: 'Outperformance Certificate',
        finalFixing: '12 Mts',
        participation: '107%',
        cap: '130%'
      };
    }
  };

  const handleReset = () => {
    setStep('form');
    setFormData(null);
    setQuoteData(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      handleReset();
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] p-0 overflow-hidden max-h-[90vh]">
        <div className="relative">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-quant-navy mb-6">
              {step === 'form' ? 'Product Creation' : 'Price Simulator'}
            </h2>
            
            {step === 'form' ? (
              <ProductCreationForm onSubmit={handleFormSubmit} />
            ) : (
              <ProductQuote data={quoteData!} underlying={formData?.underlying || ''} onBack={handleReset} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCreationDialog;
