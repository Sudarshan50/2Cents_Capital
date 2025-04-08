
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import Calendar from "@/components/dashboard/Calendar";
import CashflowChart from "@/components/charts/CashflowChart";
import FilterableTable from "@/components/tables/FilterableTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ChevronRight, FileText, TestTube } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Calendar events
const calendarEvents = [
  {
    date: new Date(),
    title: "Autocallable XYZ Coupon Payment",
    type: "payment" as const,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    title: "Structured Note A Maturity",
    type: "maturity" as const,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 8)),
    title: "New Trade - Capital Protected Note",
    type: "trade" as const,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 12)),
    title: "Credit Linked Note Coupon",
    type: "payment" as const,
  },
];

const Dashboard = () => {
  const [prod, setPod] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [varPercentage, setVarPercentage] = useState("95");

  const fetchProd = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/client/products?ApiKey=${import.meta.env.VITE_API_KEY}`,
      );
      if (res.status === 200) {
        console.log(res.data);
        const mapper = res.data.map((item: any) => {
          return {
            productName: item.isin,
            lastTradeDate: item.strikeDate,
            units: (item?.units)? item.units : 0,
            currency: item.currency,
            marketPrice: item.marketPrice,
            status: item.tradeInfo[0]?.settlementInfo[0]?.status,
            // Additional fields for expanded view
            productType: "Autocallable Barrier Note",
            riskLevel: "Medium-High RISK",
            riskScore: Math.floor(Math.random() * 30) + 60, // Random score between 60-90
            positionValue: Math.floor(Math.random() * 500000) + 100000, // Random value
            var85: Math.floor(Math.random() * 20000) + 8000,
            var90: Math.floor(Math.random() * 22000) + 9000,
            var95: Math.floor(Math.random() * 25000) + 10000,
            varChange: (Math.random() * 5 - 2.5).toFixed(1),
            barrierDistance: (Math.random() * 30 + 10).toFixed(1),
            barrierChange: (Math.random() * -3).toFixed(1),
            autocallProb: (Math.random() * 30 + 60).toFixed(1),
            autocallChange: (Math.random() * 6).toFixed(1),
            underlyingName: ["AAPL", "MSFT", "AMZN", "GOOG"][Math.floor(Math.random() * 4)],
            maxVarStock: ["AAPL", "TSLA", "NVDA", "MSFT"][Math.floor(Math.random() * 4)],
          };
        })
        setPod(mapper);
        setLoading(false);
        console.log("mapper", mapper);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching data");
    }
  };
  useEffect(() => {
    fetchProd();
  }, []);
  // Column definitions for products table
  const productColumns = [
    {
      key: "productName",
      header: "Product Name",
    },
    {
      key: "lastTradeDate",
      header: "Last Trade Date",
    },
    {
      key: "units",
      header: "Units",
    },
    {
      key: "currency",
      header: "Currency",
    },
    {
      key: "marketPrice",
      header: "Market Price",
      render: (value: number) => (
        <span className="font-medium">
          {value?.toLocaleString("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === "Settled"
              ? "bg-green-100 text-green-800"
              : value === "Barrier Breached"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  // Product details expanded view renderer
  const renderProductDetails = (product: any) => {
    const getVarValue = () => {
      switch (varPercentage) {
        case "85": return product.var85;
        case "90": return product.var90;
        case "95": 
        default: return product.var95;
      }
    };

    return (
      <div className="p-1">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-2">
          <div className="flex flex-wrap justify-between items-start gap-4">
            {/* Left side - Risk tag and product name */}
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-red-50 text-red-700 font-medium rounded-md">
                {product.riskLevel}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{product.productName}</h3>
              <p className="text-gray-600">{product.productType}</p>
              
              <div className="mt-6">
                <p className="text-gray-500">Position Value</p>
                <p className="text-2xl font-bold">${product.positionValue?.toLocaleString()}</p>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-500">Underlying</p>
                <p className="text-md font-semibold">{product.underlyingName}</p>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-500">Max VAR Stock</p>
                <p className="text-md font-semibold">{product.maxVarStock}</p>
              </div>
            </div>
            
            {/* Right side - Risk metrics */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Risk Level</span>
                <span className="text-red-600 font-bold">{product.riskScore}/100</span>
              </div>
              
              {/* Risk progress bar */}
              <div className="h-2 w-full bg-gray-200 rounded-full mb-6">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-400" 
                  style={{ width: `${product.riskScore}%` }}
                ></div>
              </div>
              
              {/* Metrics grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-gray-500">VAR</p>
                    <Select value={varPercentage} onValueChange={setVarPercentage}>
                      <SelectTrigger className="w-20 h-7 text-xs">
                        <SelectValue placeholder="%" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="85">85%</SelectItem>
                        <SelectItem value="90">90%</SelectItem>
                        <SelectItem value="95">95%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xl font-bold">${getVarValue()?.toLocaleString()}</p>
                  <p className={`text-sm ${product.varChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.varChange > 0 ? '+' : ''}{product.varChange}%
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500">Barrier Distance</p>
                  <p className="text-xl font-bold">{product.barrierDistance}%</p>
                  <p className="text-sm text-red-600">
                    {product.barrierChange}%
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500">Autocall Prob.</p>
                  <p className="text-xl font-bold">{product.autocallProb}%</p>
                  <p className="text-sm text-green-600">
                    +{product.autocallChange}%
                  </p>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-end mt-6 space-x-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText size={16} /> Details
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <TestTube size={16} /> Stress Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if(loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          <header className="mb-6 mt-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome to your dashboard !</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column (takes 2/3 on large screens) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cashflow Chart */}
              <Card className="shadow-sm border-gray-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Future Cashflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <CashflowChart />
                </CardContent>
              </Card>

              {/* Products Table */}
              <Card className="shadow-sm border-gray-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">My Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterableTable
                    columns={productColumns}
                    data={prod}
                    expandedRowRender={renderProductDetails}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right column (takes 1/3 on large screens) */}
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                <Card className="shadow-sm border-gray-100">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          Total Portfolio Value
                        </p>
                        <p className="text-2xl font-bold mt-1">$1,02,500</p>
                      </div>
                      <div className="p-2 bg-green-100 rounded-lg">
                        <ArrowUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-xs text-green-600 font-medium">
                        +2.5%
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-100">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          Upcoming Payments
                        </p>
                        <p className="text-2xl font-bold mt-1">$2,500</p>
                      </div>
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <ChevronRight className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-gray-500">
                        Next payment:
                      </span>
                      <span className="text-xs text-gray-700 font-medium ml-1">
                        July 5, 2025
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Calendar */}
              <Calendar events={calendarEvents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
