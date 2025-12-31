export interface InvoiceItem {
  id: string;
  bezeichnung: string;
  menge: number;
  preis: number;
}

export interface InvoiceData {
  datum: string;
  rechnungsnummer: string;
  items: InvoiceItem[];
}
