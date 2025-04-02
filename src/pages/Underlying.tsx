import React, { useEffect, useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import FilterableTable from "@/components/tables/FilterableTable";
import { ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Spinner from "@/components/ui/spinner";

// Minimal sample data for the underlying table
const underlyingData = [
  {
    id: 1,
    name: "Apple Inc.",
    spotPrice: 182.52,
    profit: 1.25,
    totalNotional: 150000,
    volatility: 18.7,
    dividendYield: 0.58,
  },
  {
    id: 2,
    name: "Microsoft Corp.",
    spotPrice: 337.65,
    profit: 0.83,
    totalNotional: 200000,
    volatility: 17.2,
    dividendYield: 0.87,
  },
  {
    id: 3,
    name: "Tesla Inc.",
    spotPrice: 248.5,
    profit: -1.2,
    totalNotional: 80000,
    volatility: 42.5,
    dividendYield: 0.0,
  },
];

const Underlying = () => {
  const [underlyingAssets, setUnderlyingAssets] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const fetchUnderlyingAssets = async () => {
    try {
      setLoading(true); 
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/client/underlyings?ApiKey=${import.meta.env.VITE_API_KEY}`,
      );
      if (res.status === 200) {
        type UnderlyingAsset = {
          paRityID: string;
          name: string;
          spot: number;
          performance: number;
          totalNotional: number;
          impliedVolatility: number;
          dividendYield: number;
        };

        const data: UnderlyingAsset[] = res.data.map((item: UnderlyingAsset) => ({
          id: item.paRityID,
          name: item.name,
          spotPrice: item.spot,
          profit: item.performance,
          totalNotional: item.totalNotional,
          volatility: item.impliedVolatility,
          dividendYield: item.dividendYield,
        }));
        setUnderlyingAssets(data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching underlying assets:", err);
      toast.error("Failed to fetch underlying assets");
    }
  };
  useEffect(() => {
    fetchUnderlyingAssets();
  }, []);

  const underlyingColumns = [
    { key: "name", header: "Name", sortable: true },
    {
      key: "spotPrice",
      header: "Spot Price",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">
          $
          {value?.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: "profit",
      header: "Profit (1 Day)",
      sortable: true,
      render: (value: number) => (
        <div
          className={`flex items-center ${
            value >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {value >= 0 ? (
            <ArrowUp className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 mr-1" />
          )}
          <span className="font-medium">
            {Math.abs(value).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %
          </span>
        </div>
      ),
    },
    {
      key: "totalNotional",
      header: "Total Notional",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">
          $
          {value?.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: "volatility",
      header: "Volatility",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
            <div
              className={`h-2.5 rounded-full ${
                value > 35
                  ? "bg-red-500"
                  : value > 25
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${Math.min(100, (value / 50) * 100)}%` }}
            ></div>
          </div>
          <span className="text-sm">{value?.toLocaleString("en-US",{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}%</span>
        </div>
      ),
    },
    {
      key: "dividendYield",
      header: "Dividend Yield",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">
          {value?.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          %
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          <header className="mb-6 mt-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Underlying Assets
            </h1>
            <p className="text-gray-500">
              Monitor performance of underlying assets
            </p>
          </header>

          {/* Underlying assets table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-8">
              <Spinner />
              </div>
            ) : (
              <FilterableTable
              columns={underlyingColumns}
              data={underlyingAssets}
              />
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Underlying;
