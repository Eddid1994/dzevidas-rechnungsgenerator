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
      className="bg-white w-[210mm] h-[297mm] mx-auto shadow-lg print:shadow-none overflow-hidden"
    >
      <div className="p-[10mm] flex flex-col h-full">
        {/* Logo - Centered */}
        <div className="flex justify-center mb-3">
          <Logo className="w-36 h-auto" />
        </div>

        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-base font-bold text-black mb-1">RECHNUNG</h1>
          <h2 className="text-sm font-bold text-black border-b-2 border-black pb-1 inline-block">
            Dzevida&apos;s Catering
          </h2>
        </div>

        {/* Customer Address (left) and Contact Info (right) */}
        <div className="flex justify-between mb-4 -mt-3">
          {/* Customer Address - Window position */}
          <div className="text-sm leading-relaxed text-black">
            <p className="text-[9px] text-gray-400 mb-1">Dzevida&apos;s Catering · Bingener str 38 · 55469 Simmern</p>
            <div className="min-h-[50px]">
              {data.kundenName && <p className="font-semibold">{data.kundenName}</p>}
              {data.kundenAdresse && <p>{data.kundenAdresse}</p>}
              {(data.kundenPlz || data.kundenOrt) && (
                <p>{data.kundenPlz} {data.kundenOrt}</p>
              )}
            </div>
          </div>

          {/* Contact Info - Right aligned */}
          <div className="text-right text-xs leading-relaxed">
            <p className="font-bold text-black">Dzevida&apos;s Catering</p>
            <p className="text-black">Bingener str 38</p>
            <p className="text-black">55469 Simmern</p>
            <p className="text-black mt-1">Tel: 0157 77964382</p>
            <p className="text-black">E-Mail: dzevidascatering@hotmail.com</p>
          </div>
        </div>

        {/* Date and Invoice Number */}
        <div className="flex justify-center gap-20 mb-5 text-xs">
          <div className="text-center">
            <p className="text-black font-semibold mb-1">Datum:</p>
            <p className="text-black">{formatDate(data.datum)}</p>
          </div>
          <div className="text-center">
            <p className="text-black font-semibold mb-1">Rechnungsnr.:</p>
            <p className="text-black">{data.rechnungsnummer || "-"}</p>
          </div>
        </div>

        {/* Table */}
        <div className="mb-4">
          <div className="grid grid-cols-12 gap-2 border-b-2 border-black pb-2 mb-2 text-xs font-bold text-black">
            <div className="col-span-5">Bezeichnung</div>
            <div className="col-span-2 text-center">Menge</div>
            <div className="col-span-2 text-center">Preis</div>
            <div className="col-span-3 text-right">Gesamt</div>
          </div>

          {data.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-2 py-1 text-xs text-black"
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
          {Array.from({ length: Math.max(0, 8 - data.items.length) }).map(
            (_, index) => (
              <div
                key={`empty-${index}`}
                className="grid grid-cols-12 gap-2 py-1 text-xs text-black"
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
          <div className="w-52">
            <div className="flex justify-between border-t border-black py-2 text-xs">
              <span className="text-black">Gesamt</span>
              <span className="text-black">{formatCurrency(calculateTotal())}</span>
            </div>
            <div className="flex justify-between border-t-2 border-black py-2 text-sm font-bold">
              <span className="text-black">Zu zahlender Betrag</span>
              <span className="text-black">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>

        {/* Tax Note */}
        <p className="text-[10px] text-gray-500 mb-4">
          Kein Ausweis von Umsatzsteuer, da Kleinunternehmer gemäß §19 UStG
        </p>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex justify-between border-t border-black pt-3 text-[10px] text-black leading-relaxed">
            <div>
              <p className="font-bold">Sparda Bank Südwest eG</p>
              <p>IBAN: DE74 5509 0500 0006 6453 05</p>
              <p>BIC: GENODEF1S01</p>
              <p>Dzevida Dizdaric</p>
            </div>
            <div className="text-right">
              <p className="font-bold">Inhaber: Dzevida Dizdaric</p>
              <p>Bingener str 38</p>
              <p>55469 Simmern</p>
            </div>
          </div>
          <p className="text-center text-black mt-3 text-sm italic">
            Wir sagen Danke! :)
          </p>
        </div>
      </div>
    </div>
  );
}
