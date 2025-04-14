
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft } from 'lucide-react';
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
      <DialogContent className="sm:max-w-[600px] md:max-w-[900px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl bg-white rounded-xl">
        <div className="relative">
          {/* Header with step indicator */}
          <div className="bg-gradient-to-r from-quant-navy to-[#034275] text-white p-4 md:p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {step === 'form' ? 'Create Your Product' : 'Product Preview'}
              </h2>
              <DialogClose className="rounded-full hover:bg-white/10 p-2 transition-colors">
                <X className="h-4 w-4 text-white" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 flex items-center">
              <div className={`h-2 w-2 rounded-full ${step === 'form' ? 'bg-quant-yellow' : 'bg-white'}`}></div>
              <div className={`h-0.5 w-10 ${step === 'form' ? 'bg-gray-400' : 'bg-quant-yellow'}`}></div>
              <div className={`h-2 w-2 rounded-full ${step === 'quote' ? 'bg-quant-yellow' : 'bg-white'}`}></div>
            </div>
          </div>
          
          {/* Back button for quote step */}
          {step === 'quote' && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleReset} 
              className="absolute left-4 top-20 flex items-center text-sm text-gray-600 hover:text-gray-800 z-10"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to form
            </Button>
          )}
          
          <div className="p-6">
            {step === 'form' && (
              <>
                <p className="text-gray-600 mb-8">
                  Answer a few questions to help us suggest the right structured product for your needs.
                </p>
                <ProductCreationForm onSubmit={handleFormSubmit} />
              </>
            )}
            
            {step === 'quote' && quoteData && formData && (
              <ProductQuote data={quoteData} underlying={formData.underlying} onBack={handleReset} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCreationDialog;
