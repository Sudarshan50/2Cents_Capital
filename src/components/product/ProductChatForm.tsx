
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductFormData } from './ProductCreationDialog';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  options?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  isOptionQuestion?: boolean;
  questionKey?: keyof ProductFormData;
}

interface ProductChatFormProps {
  onSubmit: (data: ProductFormData) => void;
}

const ProductChatForm: React.FC<ProductChatFormProps> = ({ onSubmit }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    investmentHorizon: 'short',
    investmentGoal: 'medium',
    marketDropProtection: '40',
    marketExpectation: 'up',
    underlying: 'ABB Ltd',
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
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
  
  // Define the questions in a chat-like format
  const questions: Message[] = [
    {
      sender: 'bot',
      text: 'Welcome! Let me help you create your customized investment product. What is your investment horizon?',
      options: [
        { value: 'short', label: 'Short / Medium Term', description: 'Up to 36 months' },
        { value: 'long', label: 'Long Term', description: 'More than 36 months' }
      ],
      isOptionQuestion: true,
      questionKey: 'investmentHorizon'
    },
    {
      sender: 'bot',
      text: 'What would you like to achieve with your investments?',
      options: [
        { value: 'preserve', label: 'Preserve Capital', description: 'Low risk' },
        { value: 'medium', label: 'Medium Growth', description: 'Medium risk' },
        { value: 'max', label: 'Maximum Growth', description: 'High risk' }
      ],
      isOptionQuestion: true,
      questionKey: 'investmentGoal'
    },
    {
      sender: 'bot',
      text: 'I want your investments to be protected against market drops. How much protection would you like?',
      options: [
        { value: '40', label: '40%', description: 'High protection' },
        { value: '20', label: '20%', description: 'Medium protection' },
        { value: '0', label: '0%', description: 'No protection' }
      ],
      isOptionQuestion: true,
      questionKey: 'marketDropProtection'
    },
    {
      sender: 'bot',
      text: 'What do you expect from the market?',
      options: [
        { value: 'up', label: 'Going up', description: 'Bullish outlook' },
        { value: 'sideways', label: 'Moving sideways', description: 'Neutral outlook' }
      ],
      isOptionQuestion: true,
      questionKey: 'marketExpectation'
    },
    {
      sender: 'bot',
      text: 'Please select an underlying asset for your product:',
      isOptionQuestion: false,
      questionKey: 'underlying'
    }
  ];

  // Initial message when component mounts
  useEffect(() => {
    setTimeout(() => {
      setMessages([questions[0]]);
    }, 500);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle option selection
  const handleOptionSelect = (value: string, questionKey: keyof ProductFormData) => {
    // Add user selection to messages
    const selectedOption = questions[currentQuestionIndex].options?.find(opt => opt.value === value);
    
    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: selectedOption?.label || value,
      }
    ]);
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [questionKey]: value
    }));
    
    // Move to next question after a brief delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setMessages(prev => [...prev, questions[currentQuestionIndex + 1]]);
      } else {
        // All questions answered, ready to submit
        handleSubmitForm();
      }
    }, 700);
  };

  // Handle underlying asset selection
  const handleUnderlyingChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      underlying: value
    }));
    
    // Add selection to messages
    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: `Selected: ${value}`
      }
    ]);
    
    // Show confirmation message and proceed
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Thank you for providing all the information. Ready to generate your product quote?'
        }
      ]);
    }, 700);
  };

  // Handle form submission
  const handleSubmitForm = () => {
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col h-full max-h-[60vh] rounded-lg border border-gray-100 overflow-hidden shadow-sm">
      {/* Chat header */}
      <div className="bg-quant-yellow/20 py-3 px-4 border-b border-gray-100">
        <h3 className="font-medium text-quant-navy">Investment AI Assistant</h3>
        <p className="text-xs text-gray-600">Let's build your custom investment product</p>
      </div>
      
      {/* Chat messages area */}
      <div className="flex-grow overflow-y-auto px-4 py-5 space-y-5 bg-gray-50/50">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'} animate-fade-in`}>
            <div 
              className={`rounded-2xl px-4 py-3 max-w-[85%] shadow-sm ${
                message.sender === 'bot' 
                  ? 'bg-white text-gray-900 rounded-bl-none' 
                  : 'bg-quant-yellow text-quant-navy rounded-br-none'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              
              {/* Render options if this is a question with options */}
              {message.isOptionQuestion && message.options && message.sender === 'bot' && (
                <div className="mt-3 space-y-2">
                  {message.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect(option.value, message.questionKey as keyof ProductFormData)}
                      className="w-full text-left px-3 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 hover:border-quant-yellow/50 transition-all text-sm group shadow-sm hover:shadow"
                    >
                      <div className="font-medium group-hover:text-quant-navy">{option.label}</div>
                      {option.description && (
                        <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Render underlying asset dropdown */}
              {!message.isOptionQuestion && message.questionKey === 'underlying' && message.sender === 'bot' && (
                <div className="mt-3">
                  <Select 
                    value={formData.underlying} 
                    onValueChange={handleUnderlyingChange}
                  >
                    <SelectTrigger className="w-full bg-white border-gray-200 hover:border-quant-yellow/70 transition-colors">
                      <SelectValue placeholder="Select an underlying asset" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[280px]">
                      {underlyingOptions.map((option) => (
                        <SelectItem key={option} value={option} className="cursor-pointer">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* This is for auto-scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input area - shown after all questions are answered */}
      {currentQuestionIndex >= questions.length - 1 && formData.underlying !== '' && (
        <div className="p-3 border-t border-gray-200 bg-white">
          <Button 
            onClick={handleSubmitForm}
            className="w-full bg-quant-yellow text-quant-navy hover:bg-quant-yellow/90 py-5 rounded-xl shadow-md hover:shadow-lg transition-all"
            size="lg"
          >
            <span className="font-medium">Get Product Quote</span>
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductChatForm;
