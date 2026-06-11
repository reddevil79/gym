import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import client from '../services/api';

const TrainersPage = () => {
  const { data: trainersData } = useQuery({
    queryKey: ['trainers'],
    queryFn: () => client.get('/trainers'),
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">👨‍🏫 Trainers Management</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
          + Add Trainer
        </button>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainersData?.data?.map((trainer) => (
          <div key={trainer.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <img src={trainer.photo} alt={trainer.name} className="w-20 h-20 rounded-full mb-4" />
            <h3 className="text-lg font-semibold mb-2">{trainer.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{trainer.specialization}</p>
            <div className="space-y-2 mb-4">
              <p className="text-sm">📊 Experience: {trainer.experience} years</p>
              <p className="text-sm">💰 Hourly Rate: ${trainer.hourlyRate}</p>
              <p className="text-sm">📈 Commission: {trainer.commissionPercentage}%</p>
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainersPage;
