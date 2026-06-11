import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import client from '../services/api';

const AttendancePage = () => {
  const [recentCheckIns, setRecentCheckIns] = useState([]);

  const { data: attendanceData } = useQuery({
    queryKey: ['attendance-today'],
    queryFn: () => client.get('/attendance/today'),
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  const { data: peakHoursData } = useQuery({
    queryKey: ['peak-hours'],
    queryFn: () => client.get('/attendance/peak-hours'),
  });

  useEffect(() => {
    if (attendanceData?.data) {
      setRecentCheckIns(attendanceData.data);
    }
  }, [attendanceData]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Attendance & Analytics</h1>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm">Today's Check-ins</h3>
          <p className="text-3xl font-bold mt-2">{recentCheckIns.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm">Peak Hour</h3>
          <p className="text-3xl font-bold mt-2">6-7 PM</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm">Active Members</h3>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>
      </div>

      {/* Peak Hours Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Peak Hours Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={peakHoursData?.data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="members" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Real-time Check-in Feed */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">📱 Live Check-in Feed</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {recentCheckIns.length > 0 ? (
            recentCheckIns.map((checkin, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <p className="font-medium">{checkin.memberName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{checkin.entryMethod}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{new Date(checkin.checkInTime).toLocaleTimeString()}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">✓ Verified</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No check-ins yet today</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
