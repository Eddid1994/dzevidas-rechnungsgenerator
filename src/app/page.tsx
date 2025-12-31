"use client";

import { useState } from "react";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import { InvoiceData } from "@/types/invoice";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    datum: new Date().toISOString().split("T")[0],
    rechnungsnummer: "2026-001",
    items: [{ id: uuidv4(), bezeichnung: "", menge: 1, preis: 0 }],
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Tab Navigation - Hidden on print */}
      <div className="print:hidden sticky top-0 z-50 bg-white shadow-md">
        <div className="flex">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === "form"
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Eingabe
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === "preview"
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Vorschau
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="print:p-0">
        {/* Form View - Hidden on print */}
        <div
          className={`print:hidden ${activeTab === "form" ? "block" : "hidden"}`}
        >
          <div className="p-4 max-w-lg mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
              <h1 className="text-lg font-bold text-gray-800 mb-1">
                Rechnungsgenerator
              </h1>
              <p className="text-sm text-gray-500">Dzevida&apos;s Catering</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4">
              <InvoiceForm data={invoiceData} onChange={setInvoiceData} />
            </div>
            <button
              onClick={() => setActiveTab("preview")}
              className="w-full mt-4 py-4 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
            >
              Vorschau anzeigen →
            </button>
          </div>
        </div>

        {/* Preview View */}
        <div
          className={`${activeTab === "preview" ? "block" : "hidden"} print:block`}
        >
          {/* Print Button - Hidden on print */}
          <div className="print:hidden p-4 max-w-lg mx-auto">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab("form")}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                ← Bearbeiten
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
              >
                PDF Drucken / Speichern
              </button>
            </div>
          </div>

          {/* Invoice Preview */}
          <div className="print:m-0 pb-4 print:pb-0">
            <InvoicePreview data={invoiceData} />
          </div>
        </div>
      </div>
    </div>
  );
}
