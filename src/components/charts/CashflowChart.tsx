import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import Spinner from "../ui/spinner";
import axios from "axios";

// Custom tooltip that shows all available data for a point on hover
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p>
          <strong>Date:</strong> {data.date}
        </p>
        <p>
          <strong>Type:</strong> {data.type}
        </p>
        <p>
          <strong>Triggered:</strong> {data.triggered ? "Yes" : "No"}
        </p>
        <p>
          <strong>Amount:</strong> {data.amount}
        </p>
        {data.potentialAmount !== undefined && (
          <p>
            <strong>Potential Amount:</strong> {data.potentialAmount}
          </p>
        )}
        {data.barrier !== undefined && (
          <p>
            <strong>Barrier:</strong> {data.barrier}
          </p>
        )}
        {data.barrierDistance !== undefined && (
          <p>
            <strong>Barrier Distance:</strong> {data.barrierDistance}
          </p>
        )}
        {data.referenceUnderlying && (
          <p>
            <strong>Reference Underlying:</strong> {data.referenceUnderlying}
          </p>
        )}
      </div>
    );
  }
  return null;
};

interface CashflowChartProps {
  title?: string;
}

const CashflowChart: React.FC<CashflowChartProps> = ({
  title = "Future Cashflows",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  // const [jsonData, setJsonData] = useState([]);
  const [isin, setIsin] = useState("");
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/client/cashflows?ApiKey=${import.meta.env.VITE_API_KEY}`,
      );
      if (res.status === 200) {
        setIsin(res.data[0].isin);
        const casflows = res.data[0].casflows.map((flow: any) => ({
          date: flow.date.slice(0, 10),
          amount: flow.amount,
          type: flow.type,
          triggered: flow.triggered,
          potentialAmount: flow.potentialAmount,
          barrier: flow.barrier,
          barrierDistance: flow.barrierDistance,
          referenceUnderlying: flow.referenceUnderlying,
        }));
        setLoading(false);
        setChartData(casflows);
      }
    } catch (err) {
      console.error("Error fetching data", err);
      toast.error("Error fetching data");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePointClick = (data: any) => {
    setSelectedPoint(data);
    setIsModalOpen(true);
  };

  // Customized dot that is clickable to show details for a cashflow event
  const CustomizedDot = (props: any) => {
    const { cx, cy, index } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#FFD700"
        stroke="#333"
        strokeWidth={1}
        style={{ cursor: "pointer" }}
        onClick={() => handlePointClick(chartData[index])}
      />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px] w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <h3 className="text-lg font-medium mb-2">
        {title} for ISIN: {isin}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" tick={{ fill: "#333" }} />
          <YAxis tick={{ fill: "#333" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#FFD700"
            strokeWidth={2}
            dot={<CustomizedDot />}
            activeDot={{ r: 8, fill: "#FFC107", stroke: "#333" }}
            name="Cashflow Amount"
          />
        </LineChart>
      </ResponsiveContainer>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Cashflow Details for ISIN: {isin}</DialogTitle>
            <DialogDescription>
              {selectedPoint && (
                <div>
                  <p>
                    <strong>Date:</strong> {selectedPoint.date}
                  </p>
                  <p>
                    <strong>Type:</strong> {selectedPoint.type}
                  </p>
                  <p>
                    <strong>Triggered:</strong>{" "}
                    {selectedPoint.triggered ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Amount:</strong> {selectedPoint.amount}
                  </p>
                  <p>
                    <strong>Potential Amount:</strong>{" "}
                    {selectedPoint.potentialAmount}
                  </p>
                  <p>
                    <strong>Barrier:</strong> {selectedPoint.barrier}
                  </p>
                  <p>
                    <strong>Barrier Distance:</strong>{" "}
                    {selectedPoint.barrierDistance}
                  </p>
                  <p>
                    <strong>Reference Underlying:</strong>{" "}
                    {selectedPoint.referenceUnderlying || "N/A"}
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <h4 className="font-medium mb-3">All Cashflow Events</h4>
            <div className="border rounded-md max-h-[300px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/6">Date</TableHead>
                    <TableHead className="w-1/6">Type</TableHead>
                    <TableHead className="w-1/6">Triggered</TableHead>
                    <TableHead className="w-1/6">Amount</TableHead>
                    <TableHead className="w-1/6">Potential Amount</TableHead>
                    <TableHead className="w-1/6">Barrier</TableHead>
                    <TableHead className="w-1/6">Barrier Distance</TableHead>
                    <TableHead className="w-1/6">
                      Reference Underlying
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chartData.map((flow, index) => (
                    <TableRow key={index}>
                      <TableCell>{flow.date}</TableCell>
                      <TableCell>{flow.type}</TableCell>
                      <TableCell>{flow.triggered ? "Yes" : "No"}</TableCell>
                      <TableCell>{flow.amount}</TableCell>
                      <TableCell>{flow.potentialAmount}</TableCell>
                      <TableCell>{flow.barrier}</TableCell>
                      <TableCell>{flow.barrierDistance}</TableCell>
                      <TableCell>{flow.referenceUnderlying || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CashflowChart;
