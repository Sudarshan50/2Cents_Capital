
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navigation/Navbar';
import { FileText, ChevronRight, BarChart2 } from 'lucide-react';
import ProductCreationDialog from '@/components/product/ProductCreationDialog';
import { useToast } from '@/hooks/use-toast';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const handleCreateClick = () => {
    setIsDialogOpen(true);
  };

  const features = [
    {
      title: "Customizable Products",
      description: "Create structured products tailored to your specific investment needs and risk profile",
      icon: <FileText className="h-6 w-6 text-quant-yellow" />
    },
    {
      title: "Real-time Simulation",
      description: "Get instant price simulation based on current market conditions",
      icon: <BarChart2 className="h-6 w-6 text-quant-yellow" />
    },
    {
      title: "Historical Performance",
      description: "Analyze how similar products would have performed in the past",
      icon: <ChevronRight className="h-6 w-6 text-quant-yellow" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 bg-gradient-to-b from-[#022b54] to-[#034275] text-white min-h-[80vh] flex flex-col">
        {/* Hero section */}
        <div className="max-w-5xl mx-auto text-center px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Design Your Perfect Investment Product</h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-100">
            Create customized structured products that match your investment goals, 
            risk tolerance, and market outlook with our intuitive product builder.
          </p>
          <Button 
            onClick={handleCreateClick}
            size="lg"
            className="bg-quant-yellow text-quant-navy hover:bg-quant-yellow/90 px-6 py-6 text-lg h-auto"
          >
            Start Creating
          </Button>
        </div>

        {/* Features section */}
        <div className="bg-white/5 backdrop-blur-sm py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 p-6 rounded-lg border border-white/20 flex flex-col"
                >
                  <div className="bg-[#033660] p-3 rounded-md w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-200">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners section */}
        <div className="mt-auto py-10 bg-[#022b54]/70 text-white/70">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <span className="text-sm uppercase tracking-wider">Powered by</span>
              <div className="flex gap-8 items-center flex-wrap justify-center">
                <div className="h-10 w-32 bg-white/10 rounded flex items-center justify-center border border-white/10">
                  University
                </div>
                <div className="h-10 w-24 bg-white/10 rounded flex items-center justify-center border border-white/10">
                  SIX
                </div>
                <div className="h-10 w-28 bg-white/10 rounded flex items-center justify-center border border-white/10">
                  Payoff
                </div>
              </div>
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
