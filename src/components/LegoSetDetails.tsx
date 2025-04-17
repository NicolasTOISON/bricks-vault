import { useState } from 'react';
import { LegoSet, SetStatus } from '@prisma/client';
import { useRouter } from 'next/router';

interface LegoSetDetailsProps {
  legoSet: LegoSet;
}

export default function LegoSetDetails({ legoSet }: LegoSetDetailsProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: legoSet.name,
    year: legoSet.year,
    pieces: legoSet.pieces,
    minifigs: legoSet.minifigs || 0,
    image: legoSet.image || '',
    status: legoSet.status || 'ACTIVE',
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/lego-sets/${legoSet.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.reload();
      } else {
        console.error('Failed to update LEGO set');
      }
    } catch (error) {
      console.error('Error updating LEGO set:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold">Détails du set LEGO</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Annuler' : 'Modifier'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Année
            </label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de pièces
            </label>
            <input
              type="number"
              value={formData.pieces}
              onChange={(e) =>
                setFormData({ ...formData, pieces: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de minifigures
            </label>
            <input
              type="number"
              value={formData.minifigs}
              onChange={(e) =>
                setFormData({ ...formData, minifigs: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Statut
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as SetStatus,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.values(SetStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{legoSet.name}</h3>
              <p className="text-gray-600">Année: {legoSet.year}</p>
              <p className="text-gray-600">Pièces: {legoSet.pieces}</p>
              {legoSet.minifigs && (
                <p className="text-gray-600">
                  Minifigures: {legoSet.minifigs}
                </p>
              )}
              {legoSet.status && (
                <p className="text-gray-600">Statut: {legoSet.status}</p>
              )}
            </div>
            {legoSet.image && (
              <img
                src={legoSet.image}
                alt={legoSet.name}
                className="w-32 h-32 object-cover rounded"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
} 