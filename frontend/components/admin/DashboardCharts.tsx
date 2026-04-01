"use client";

import {
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  Legend
} from "recharts";

interface ChartData {
  occupancyData: { name: string; value: number; color: string }[];
  revenueData: { month: string; revenue: number; payments: number }[];
  paymentStatusData: { name: string; value: number; color: string }[];
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard = ({ title, children, className = "" }: ChartCardProps) => (
  <div className={`bg-background-card rounded-xl p-6 border border-border ${className}`}>
    <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
    {children}
  </div>
);

interface DashboardChartsProps {
  chartData: ChartData;
}

export default function DashboardCharts({ chartData }: DashboardChartsProps) {
  return (
    <>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Occupancy Chart */}
        <ChartCard title="Room Occupancy">
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={chartData.occupancyData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.occupancyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} beds`, 'Count']}
                labelFormatter={() => ''}
              />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {chartData.occupancyData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-text-secondary">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Payment Status Chart */}
        <ChartCard title="Payment Status">
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={chartData.paymentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} payments`, 'Count']}
                labelFormatter={() => ''}
              />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {chartData.paymentStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-text-secondary">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Revenue Chart */}
      <ChartCard title="Monthly Revenue Trend" className="mb-8">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData.revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              formatter={(value, name) => [
                name === 'revenue' ? `₹${value}` : value,
                name === 'revenue' ? 'Revenue' : 'Payments'
              ]}
              labelStyle={{ color: '#111827' }}
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </>
  );
}