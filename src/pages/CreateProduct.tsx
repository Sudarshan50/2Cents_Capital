
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 bg-white text-gray-900 min-h-[80vh] flex flex-col">
        {/* Hero section */}
        <div className="max-w-5xl mx-auto text-center px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Design Your Perfect <span className="text-quant-yellow">Investment Product</span>
          </h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-600">
            Create customized structured products that match your investment goals, 
            risk tolerance, and market outlook with our intuitive chat interface.
          </p>
          <Button 
            onClick={handleCreateClick}
            size="lg"
            className="bg-quant-yellow text-quant-navy hover:bg-quant-yellow/90 px-8 py-7 text-lg h-auto font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Start Creating
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 overflow-hidden hover:border-quant-yellow/30 group"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="bg-quant-yellow/10 p-3 rounded-md w-fit mb-4 group-hover:bg-quant-yellow/20 transition-all">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Steps section */}
        <div className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  number: "01", 
                  title: "Chat with our AI", 
                  description: "Share your investment preferences through our intuitive chat interface" 
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
                <div key={index} className="relative pl-12 md:pl-0 md:pt-8 group">
                  <div className="md:absolute md:top-0 md:left-0 text-quant-yellow text-2xl font-bold mb-2 group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
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
