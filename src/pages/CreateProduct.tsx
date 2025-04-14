
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navigation/Navbar';
import { FileText } from 'lucide-react';
import ProductCreationDialog from '@/components/product/ProductCreationDialog';
import { useToast } from '@/hooks/use-toast';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const handleCreateClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 bg-[#022b54] text-white min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Create your own product</h1>
          <div className="mb-12 flex justify-center">
            <div className="bg-white/10 p-8 rounded-lg border border-white/20 flex items-center justify-center w-24 h-24">
              <FileText size={48} className="text-quant-yellow" />
            </div>
          </div>
          <p className="text-xl mb-10">
            With a few simple steps you can create your own structured 
            product, let's go and try it!
          </p>
          <Button 
            onClick={handleCreateClick}
            size="lg"
            className="bg-quant-yellow text-quant-navy hover:bg-quant-yellow/90 px-6 py-6 text-lg h-auto"
          >
            <span className="mr-2">Create</span>
          </Button>
        </div>

        <div className="mt-auto py-8 text-white/70 flex flex-col md:flex-row items-center gap-6">
          <span>Powered by</span>
          <div className="flex gap-8 items-center">
            <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center">
              University
            </div>
            <div className="h-8 w-16 bg-white/20 rounded flex items-center justify-center">
              SIX
            </div>
            <div className="h-8 w-20 bg-white/20 rounded flex items-center justify-center">
              Payoff
            </div>
          </div>
        </div>
      </div>

      {/* Product Creation Dialog */}
      <ProductCreationDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </div>
  );
};

export default CreateProduct;
