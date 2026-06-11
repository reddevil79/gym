import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import client from '../services/api';

const SettingsPage = () => {
  const { register, handleSubmit } = useForm();
  const [settings, setSettings] = useState({
    gymName: 'Gymnasium',
    email: 'admin@gymnasium.com',
    phone: '+1 (555) 123-4567',
    address: '123 Fitness Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    taxRate: 8.5,
  });

  const onSubmit = async (data) => {
    try {
      await client.put('/settings', data);
      alert('Settings updated successfully');
    } catch (error) {
      console.error('Settings update failed:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Gym Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Gym Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register('gymName')}
                defaultValue={settings.gymName}
                placeholder="Gym Name"
                className="border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                {...register('email')}
                defaultValue={settings.email}
                placeholder="Email"
                className="border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                {...register('phone')}
                defaultValue={settings.phone}
                placeholder="Phone"
                className="border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                {...register('address')}
                defaultValue={settings.address}
                placeholder="Address"
                className="border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                {...register('city')}
                defaultValue={settings.city}
                placeholder="City"
                className="border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                {...register('state')}
                defaultValue={settings.state}
                placeholder="State"
                className="border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Billing Settings */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Billing Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register('taxRate')}
                defaultValue={settings.taxRate}
                placeholder="Tax Rate (%)"
                type="number"
                step="0.1"
                className="border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Integration Settings */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Integrations</h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Enable Email Notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Enable WhatsApp Alerts</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Enable SMS Reminders</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
