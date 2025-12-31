"use client";

import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { v4 as uuidv4 } from "uuid";

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export default function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const addItem = () => {
    onChange({
      ...data,
      items: [...data.items, { id: uuidv4(), bezeichnung: "", menge: 1, preis: 0 }],
    });
  };

  const removeItem = (id: string) => {
    if (data.items.length > 1) {
      onChange({
        ...data,
        items: data.items.filter((item) => item.id !== id),
      });
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    onChange({
      ...data,
      items: data.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const calculateTotal = () => {
    return data.items.reduce((sum, item) => sum + item.menge * item.preis, 0);
  };

  return (
    <div className="space-y-4">
      {/* Date and Invoice Number */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Datum
          </label>
          <input
            type="date"
            value={data.datum}
            onChange={(e) => onChange({ ...data, datum: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Rechnungsnr.
          </label>
          <input
            type="text"
            value={data.rechnungsnummer}
            onChange={(e) => onChange({ ...data, rechnungsnummer: e.target.value })}
            placeholder="2024-001"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
      </div>

      {/* Items */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-900">Positionen</h3>
          <button
            type="button"
            onClick={addItem}
            className="px-3 py-1 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            + Hinzufügen
          </button>
        </div>

        <div className="space-y-2">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-3 rounded-lg space-y-2"
            >
              <input
                type="text"
                value={item.bezeichnung}
                onChange={(e) => updateItem(item.id, "bezeichnung", e.target.value)}
                placeholder="Bezeichnung (z.B. Catering Service)"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Menge</label>
                  <input
                    type="number"
                    min="1"
                    value={item.menge}
                    onChange={(e) =>
                      updateItem(item.id, "menge", parseInt(e.target.value) || 1)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Preis €</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.preis}
                    onChange={(e) =>
                      updateItem(item.id, "preis", parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="w-full px-3 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                    disabled={data.items.length === 1}
                  >
                    Löschen
                  </button>
                </div>
              </div>
              <div className="text-right text-sm font-medium text-gray-700">
                = {(item.menge * item.preis).toFixed(2)} €
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="bg-gray-800 text-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Gesamtbetrag:</span>
          <span className="text-xl font-bold">{calculateTotal().toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
}
