"use client";

import { useState, useEffect } from "react";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import { InvoiceData } from "@/types/invoice";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "dzevidas-last-invoice-number";

function getNextInvoiceNumber(): string {
  if (typeof window === "undefined") return "2026-001";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return "2026-001";

  // Parse the stored number (format: YYYY-NNN)
  const match = stored.match(/^(\d{4})-(\d{3})$/);
  if (!match) return "2026-001";

  const year = parseInt(match[1]);
  const number = parseInt(match[2]);
  const currentYear = new Date().getFullYear();

  // If new year, reset to 001
  if (currentYear > year) {
    return `${currentYear}-001`;
  }

  // Otherwise increment
  const nextNumber = (number + 1).toString().padStart(3, "0");
  return `${year}-${nextNumber}`;
}

function saveInvoiceNumber(invoiceNumber: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, invoiceNumber);
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    datum: new Date().toISOString().split("T")[0],
    rechnungsnummer: "2026-001",
    items: [{ id: uuidv4(), bezeichnung: "", menge: 1, preis: 0 }],
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Load next invoice number on mount
  useEffect(() => {
    const nextNumber = getNextInvoiceNumber();
    setInvoiceData((prev) => ({
      ...prev,
      rechnungsnummer: nextNumber,
    }));
    setIsInitialized(true);
  }, []);

  const handlePrint = () => {
    // Save the current invoice number before printing
    saveInvoiceNumber(invoiceData.rechnungsnummer);
    window.print();
  };

  const handleNewInvoice = () => {
    // Save current number and get next one
    saveInvoiceNumber(invoiceData.rechnungsnummer);
    const nextNumber = getNextInvoiceNumber();

    setInvoiceData({
      datum: new Date().toISOString().split("T")[0],
      rechnungsnummer: nextNumber,
      items: [{ id: uuidv4(), bezeichnung: "", menge: 1, preis: 0 }],
    });
    setActiveTab("form");
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
              Vorschau anzeigen
            </button>
          </div>
        </div>

        {/* Preview View */}
        <div
          className={`${activeTab === "preview" ? "block" : "hidden"} print:block`}
        >
          {/* Print Button - Hidden on print */}
          <div className="print:hidden p-4 max-w-lg mx-auto">
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("form")}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Bearbeiten
                </button>
                <button
                  onClick={handlePrint}
                  className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
                >
                  PDF Speichern
                </button>
              </div>
              <button
                onClick={handleNewInvoice}
                className="w-full py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
              >
                Neue Rechnung erstellen
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
