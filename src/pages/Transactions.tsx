import Navbar from "@/components/navigation/Navbar";
import FilterableTable from "@/components/tables/FilterableTable";
import Spinner from "@/components/ui/spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Minimal sample data for the transactions table
const transactionsData = [
  {
    id: 1,
    status: "Completed",
    description: "Structured Note Purchase",
    lastTrade: "2023-06-15",
    issueDate: "2023-06-20",
    expiryDate: "2026-06-20",
    units: 100,
    issuer: "Goldman Sachs",
    currency: "USD",
    marketPrice: 1025.5,
    tradeInfo: [
      {
        date: "2023-06-15",
        client: "ABC Capital",
        type: "Buy",
        units: 100,
        notional: 100000,
        tradePrice: 1000,
        settlements: "T+2",
      },
    ],
  },
  {
    id: 2,
    status: "Completed",
    description: "Autocallable Note Sale",
    lastTrade: "2023-06-10",
    issueDate: "2023-01-10",
    expiryDate: "2025-01-10",
    units: 50,
    issuer: "JP Morgan",
    currency: "EUR",
    marketPrice: 1134.25,
    tradeInfo: [
      {
        date: "2023-06-10",
        client: "XYZ Investments",
        type: "Sell",
        units: 50,
        notional: 55000,
        tradePrice: 1100,
        settlements: "T+2",
      },
      {
        date: "2023-01-05",
        client: "XYZ Investments",
        type: "Buy",
        units: 50,
        notional: 50000,
        tradePrice: 1000,
        settlements: "T+2",
      },
    ],
  },
  {
    id: 3,
    status: "Pending",
    description: "Capital Protected Note Purchase",
    lastTrade: "2023-06-18",
    issueDate: "2023-06-25",
    expiryDate: "2028-06-25",
    units: 200,
    issuer: "Credit Suisse",
    currency: "CHF",
    marketPrice: 1010.75,
    tradeInfo: [
      {
        date: "2023-06-18",
        client: "DEF Advisors",
        type: "Buy",
        units: 200,
        notional: 200000,
        tradePrice: 1000,
        settlements: "T+5",
      },
    ],
  },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState([{}]);
  const [loading,setLoading] = useState(true);
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/client/transactions?ApiKey=${import.meta.env.VITE_API_KEY}`,
      );
      if (res.status == 200) {
        console.log("Transactions fetched successfully", res.data.products);
        type TradeInfo = {
          tradeDate: string;
          clientName: string;
          type: string;
          securityUnits: number;
          notional: number;
          tradePrice: number;
          settlements: string;
        };

        type Transaction = {
          id: number;
          status: string;
          description: string;
          lastTradeDate: string;
          issueDate: string;
          maturityDate: string;
          securityUnits: number;
          issuer: string;
          currency: string;
          marketPrice: number;
          trades: TradeInfo[];
        };

        const transactions = res.data.products.map(
          (transaction: Transaction) => ({
            status: transaction.status,
            description: transaction.description,
            lastTrade: new Date(transaction?.lastTradeDate).toISOString().split('T')[0],
            issueDate: new Date(transaction?.issueDate).toISOString().split('T')[0],
            expiryDate: new Date(transaction?.maturityDate).toISOString().split('T')[0],
            units: transaction.securityUnits,
            issuer: transaction.issuer,
            currency: transaction.currency,
            marketPrice: transaction.marketPrice,
            tradeInfo: transaction?.trades.map((trade: TradeInfo) => ({
              date: trade.tradeDate,
              client: trade.clientName,
              tradePrice: trade.tradePrice,
              type: trade.type,
              units: trade.securityUnits,
              notional: trade.notional,
              settlements:"Unknown",
            })),
          })
        );
        setLoading(false);
        setTransactions(transactions);
      }
    } catch (err) {
      console.error("Error fetching transactions", err);
      toast.error("Error fetching transactions");
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);
  // Column definitions for transactions table
  const transactionColumns = [
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === "LIVE"
              ? "bg-green-100 text-green-800"
              : value === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : value === "Failed"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "description", header: "Description" },
    { key: "lastTrade", header: "Last Trade", sortable: true },
    { key: "issueDate", header: "Issue Date" },
    { key: "expiryDate", header: "Expiry Date" },
    {
      key: "units",
      header: "Units",
      // render: (value: number) => {
      //   value?.toLocaleString("en-US",{
      //     style: "decimal",
      //     minimumFractionDigits: 0,
      //     maximumFractionDigits: 0,
      //   })
      // },
    },
    { key: "issuer", header: "Issuer" },
    { key: "currency", header: "Currency" },
    {
      key: "marketPrice",
      header: "Market Price",
      render: (value: number) =>
        value?.toLocaleString("en-US", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    },
  ];

  // Trade info table for expanded rows
  const renderTradeInfo = (row: any) => {
    return (
      <div className="py-2">
        <h4 className="font-medium mb-3 text-sm">Trade Information</h4>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Units
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notional
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trade Price
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Settlements
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {row.tradeInfo.map((info: any, index: number) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  {info.date}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  {info.client}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      info.type === "Buy"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {info.type}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  {info.units}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  {info.notional.toLocaleString("en-US")}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  {info.tradePrice}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      info.settlements === "Failed"
                        ? "bg-red-100 text-red-800"
                        : info.settlements === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {info.settlements}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          <header className="mb-6 mt-8">
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-500">
              View and manage your transaction history
            </p>
          </header>

          {/* Transactions table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Spinner />
              </div>
            ) : (
              <FilterableTable
              columns={transactionColumns}
              data={transactions}
              expandedRowRender={renderTradeInfo}
              />
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
