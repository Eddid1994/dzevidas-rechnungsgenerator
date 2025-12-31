"use client";

import { InvoiceData } from "@/types/invoice";
import Logo from "./Logo";

interface InvoicePreviewProps {
  data: InvoiceData;
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2).replace(".", ",") + " €";
  };

  const calculateTotal = () => {
    return data.items.reduce((sum, item) => sum + item.menge * item.preis, 0);
  };

  return (
    <div
      id="invoice-preview"
      className="bg-white w-full max-w-[210mm] mx-auto shadow-lg print:shadow-none"
      style={{ minHeight: "297mm" }}
    >
      <div className="p-6 sm:p-10 relative" style={{ minHeight: "297mm" }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-500 mb-2">
              RECHNUNG
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-500 border-b-2 border-gray-400 pb-2">
              Dzevida&apos;s Catering
            </h2>
          </div>
          <div className="w-24 sm:w-32">
            <Logo className="w-full h-auto" />
          </div>
        </div>

        {/* Contact Info - Right aligned */}
        <div className="text-right mb-6 text-sm">
          <p className="font-bold text-gray-800">Dzevida&apos;s Catering</p>
          <p className="text-gray-600">Bingener str 38</p>
          <p className="text-gray-600">55469 Simmern</p>
          <p className="text-gray-600 mt-2">Tel: 0157 77964382</p>
          <p className="text-gray-600">E-Mail:</p>
          <p className="text-gray-600">dzevidas.catering@hotmail.com</p>
        </div>

        {/* Date and Invoice Number */}
        <div className="flex justify-center gap-8 sm:gap-16 mb-6 text-sm">
          <div className="text-center">
            <p className="text-gray-500 text-xs">Dat:</p>
            <p className="text-gray-800">{formatDate(data.datum)}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs">Rec Nr:</p>
            <p className="text-gray-800">{data.rechnungsnummer || "-"}</p>
          </div>
        </div>

        {/* Table */}
        <div className="mb-8">
          <div className="grid grid-cols-12 gap-2 border-b border-gray-300 pb-2 mb-2 text-sm font-bold text-gray-700">
            <div className="col-span-5">Bezeichnung</div>
            <div className="col-span-2 text-center">Menge</div>
            <div className="col-span-2 text-center">Preis</div>
            <div className="col-span-3 text-right">Gesamt</div>
          </div>

          {data.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-2 py-1 text-sm text-gray-700"
            >
              <div className="col-span-5 truncate">{item.bezeichnung || ""}</div>
              <div className="col-span-2 text-center">
                {item.bezeichnung ? item.menge : ""}
              </div>
              <div className="col-span-2 text-center">
                {item.bezeichnung ? formatCurrency(item.preis) : ""}
              </div>
              <div className="col-span-3 text-right">
                {formatCurrency(item.menge * item.preis)}
              </div>
            </div>
          ))}

          {/* Empty rows */}
          {Array.from({ length: Math.max(0, 10 - data.items.length) }).map(
            (_, index) => (
              <div
                key={`empty-${index}`}
                className="grid grid-cols-12 gap-2 py-1 text-sm text-gray-700"
              >
                <div className="col-span-5"></div>
                <div className="col-span-2 text-center"></div>
                <div className="col-span-2 text-center"></div>
                <div className="col-span-3 text-right">{formatCurrency(0)}</div>
              </div>
            )
          )}
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-64">
            <div className="flex justify-between border-t border-gray-300 py-2 text-sm">
              <span className="text-gray-700">Gesamt</span>
              <span className="text-gray-700">{formatCurrency(calculateTotal())}</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 py-2 font-bold">
              <span className="text-gray-800">Zu zahlender Betrag</span>
              <span className="text-gray-800">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>

        {/* Tax Note */}
        <p className="text-xs text-gray-500 mb-8">
          Kein Ausweis von Umsatzsteuer, da Kleinunternehmer gemäß §19 UStG
        </p>

        {/* Footer - Absolute positioned at bottom */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10">
          <div className="flex flex-col sm:flex-row justify-between border-t border-gray-300 pt-4 text-xs text-gray-600">
            <div className="mb-4 sm:mb-0">
              <p className="font-bold mb-1">Sparda Bank Südwest eG</p>
              <p>IBAN: DE74 5509 0500 0006 6453 05</p>
              <p>BIC: GENODEF1S01</p>
              <p>Dzevida Dizdaric</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-bold mb-1">Inhaber: Dzevida Dizdaric</p>
              <p>Bingener str 38</p>
              <p>55469 Simmern</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-4 text-base italic">
            Wir sagen Danke! :)
          </p>
        </div>
      </div>
    </div>
  );
}
