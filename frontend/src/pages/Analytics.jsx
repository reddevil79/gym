import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import client from '../services/api';

const AnalyticsPage = () => {
  const { data: revenueData } = useQuery({
    queryKey: ['analytics-revenue'],
    queryFn: () => client.get('/dashboard/revenue'),
  });

  const { data: memberGrowth } = useQuery({
    queryKey: ['analytics-members'],
    queryFn: () => client.get('/dashboard/member-growth'),
  });

  const { data: trainerCommissions } = useQuery({
    queryKey: ['analytics-trainers'],
    queryFn: () => client.get('/dashboard/trainer-commissions'),
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📊 Analytics Dashboard</h1>

      {/* Revenue Trend */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend (Year-over-Year)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData?.monthly || []}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Member Growth */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Member Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={memberGrowth?.data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="paused" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="expired" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trainer Commissions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Top Trainer Commissions (Monthly)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trainerCommissions?.data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="trainerName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="commission" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPage;
