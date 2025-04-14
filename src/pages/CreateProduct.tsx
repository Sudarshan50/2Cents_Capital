
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navigation/Navbar';
import { FileText, ChevronRight, BarChart2, Sparkles } from 'lucide-react';
import ProductCreationDialog from '@/components/product/ProductCreationDialog';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

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
      description: "Analyze how similar products would have performed in past market conditions",
      icon: <Sparkles className="h-6 w-6 text-quant-yellow" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 bg-gradient-to-b from-[#022b54] via-[#033466] to-[#034275] text-white min-h-[80vh] flex flex-col">
        {/* Hero section */}
        <div className="max-w-5xl mx-auto text-center px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Design Your Perfect <span className="text-quant-yellow">Investment Product</span>
          </h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-100">
            Create customized structured products that match your investment goals, 
            risk tolerance, and market outlook with our intuitive product builder.
          </p>
          <Button 
            onClick={handleCreateClick}
            size="lg"
            className="bg-quant-yellow text-quant-navy hover:bg-quant-yellow/90 px-8 py-7 text-lg h-auto font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Start Creating
          </Button>
        </div>

        {/* Features section */}
        <div className="py-16 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="border-0 bg-white/10 hover:bg-white/15 transition-all duration-300 overflow-hidden shadow-lg"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="bg-[#033660] p-3 rounded-md w-fit mb-4 shadow-md">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                    <p className="text-gray-200">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Steps section - New addition */}
        <div className="py-16 bg-gradient-to-b from-[#034275]/50 to-[#022b54]/80">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  number: "01", 
                  title: "Define Parameters", 
                  description: "Set your investment horizon, risk tolerance, and expected market behavior" 
                },
                { 
                  number: "02", 
                  title: "Review Quote", 
                  description: "Instantly receive a tailored product quote with simulated performance" 
                },
                { 
                  number: "03", 
                  title: "Finalize Investment", 
                  description: "Confirm your structured product and track its performance" 
                }
              ].map((step, index) => (
                <div key={index} className="relative pl-12 md:pl-0 md:pt-8">
                  <div className="md:absolute md:top-0 md:left-0 text-quant-yellow text-2xl font-bold mb-2">{step.number}</div>
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-gray-200">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners section - Redesigned */}
        <div className="mt-auto py-10 bg-[#022b54]/80 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white/70">In collaboration with</span>
              <div className="flex gap-8 items-center flex-wrap justify-center">
                <div className="h-10 w-32 rounded flex items-center justify-center text-white/90 font-medium">
                  University
                </div>
                <div className="h-10 w-24 rounded flex items-center justify-center text-white/90 font-medium">
                  SIX
                </div>
                <div className="h-10 w-28 rounded flex items-center justify-center text-white/90 font-medium">
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
