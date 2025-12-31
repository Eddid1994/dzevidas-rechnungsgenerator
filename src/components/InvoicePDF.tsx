"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  Path,
  G,
  Ellipse,
} from "@react-pdf/renderer";
import { InvoiceData } from "@/types/invoice";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    width: 120,
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#666",
    marginBottom: 8,
  },
  companyName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#666",
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    paddingBottom: 5,
  },
  contactSection: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "flex-end",
  },
  contactTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  contactText: {
    fontSize: 9,
    color: "#666",
    marginBottom: 2,
  },
  dateSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 40,
  },
  dateItem: {
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 9,
    color: "#666",
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 10,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderCell: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    minHeight: 20,
  },
  colBezeichnung: {
    width: "40%",
  },
  colMenge: {
    width: "15%",
    textAlign: "center",
  },
  colPreis: {
    width: "20%",
    textAlign: "center",
  },
  colGesamt: {
    width: "25%",
    textAlign: "right",
  },
  totalsSection: {
    marginTop: 40,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 250,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalLabel: {
    width: 150,
    textAlign: "left",
  },
  totalValue: {
    width: 100,
    textAlign: "right",
  },
  finalTotal: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  taxNote: {
    marginTop: 30,
    fontSize: 8,
    color: "#666",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 15,
  },
  footerLeft: {
    fontSize: 8,
    color: "#666",
  },
  footerRight: {
    fontSize: 8,
    color: "#666",
    textAlign: "right",
  },
  thankYou: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
});

const Logo = () => (
  <Svg width="100" height="90" viewBox="0 0 200 180">
    {/* Outer organic shape */}
    <Path
      d="M100 10
         C 160 10, 185 50, 185 90
         C 185 130, 160 165, 100 165
         C 55 165, 25 140, 25 100
         C 25 60, 45 25, 75 15
         C 85 12, 92 10, 100 10"
      fill="none"
      stroke="#7a7a7a"
      strokeWidth="2"
    />
    {/* Inner curve connecting to bottom */}
    <Path
      d="M100 165
         C 115 165, 125 155, 125 140
         C 125 125, 115 115, 100 115
         C 85 115, 75 105, 75 90"
      fill="none"
      stroke="#7a7a7a"
      strokeWidth="2"
    />
    {/* DZEVIDA'S text - vertical */}
    <Text
      x="70"
      y="55"
      style={{
        fontSize: 22,
        fontFamily: "Helvetica-Bold",
        fill: "#7a7a7a",
      }}
    >
      DZEVIDA&apos;S
    </Text>
    {/* CATERING text - angled */}
    <Text
      x="115"
      y="130"
      style={{
        fontSize: 10,
        fontFamily: "Helvetica",
        fill: "#7a7a7a",
        letterSpacing: 2,
      }}
      transform="rotate(-50, 130, 130)"
    >
      CATERING
    </Text>
    {/* Small decorative leaf */}
    <G transform="translate(155, 155)">
      <Path
        d="M0 0 C 5 -5, 10 -3, 12 0 C 10 3, 5 5, 0 0"
        fill="#4a9b8c"
      />
      <Path
        d="M12 0 C 15 -2, 18 -1, 20 2"
        fill="none"
        stroke="#4a9b8c"
        strokeWidth="1"
      />
    </G>
  </Svg>
);

interface InvoicePDFProps {
  data: InvoiceData;
}

export default function InvoicePDF({ data }: InvoicePDFProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2).replace(".", ",") + " \u20AC";
  };

  const calculateTotal = () => {
    return data.items.reduce((sum, item) => sum + item.menge * item.preis, 0);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>RECHNUNG</Text>
            <Text style={styles.companyName}>Dzevida&apos;s Catering</Text>
          </View>
          <View style={styles.headerRight}>
            <Logo />
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Dzevida&apos;s Catering</Text>
          <Text style={styles.contactText}>Bingener str 38</Text>
          <Text style={styles.contactText}>55469 Simmern</Text>
          <Text style={styles.contactText}></Text>
          <Text style={styles.contactText}>Tel: 0157 77964382</Text>
          <Text style={styles.contactText}>E-Mail:</Text>
          <Text style={styles.contactText}>dzevidas.catering@hotmail.com</Text>
        </View>

        {/* Date and Invoice Number */}
        <View style={styles.dateSection}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Dat:</Text>
            <Text style={styles.dateValue}>{formatDate(data.datum)}</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Rec Nr:</Text>
            <Text style={styles.dateValue}>{data.rechnungsnummer}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colBezeichnung]}>
              Bezeichnung
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colMenge]}>Menge</Text>
            <Text style={[styles.tableHeaderCell, styles.colPreis]}>Preis</Text>
            <Text style={[styles.tableHeaderCell, styles.colGesamt]}>
              Gesamt
            </Text>
          </View>

          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colBezeichnung}>{item.bezeichnung}</Text>
              <Text style={styles.colMenge}>{item.menge}</Text>
              <Text style={styles.colPreis}>{formatCurrency(item.preis)}</Text>
              <Text style={styles.colGesamt}>
                {formatCurrency(item.menge * item.preis)}
              </Text>
            </View>
          ))}

          {/* Empty rows to match template */}
          {Array.from({ length: Math.max(0, 12 - data.items.length) }).map(
            (_, index) => (
              <View key={`empty-${index}`} style={styles.tableRow}>
                <Text style={styles.colBezeichnung}></Text>
                <Text style={styles.colMenge}></Text>
                <Text style={styles.colPreis}></Text>
                <Text style={styles.colGesamt}>{formatCurrency(0)}</Text>
              </View>
            )
          )}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Gesamt</Text>
            <Text style={styles.totalValue}>{formatCurrency(calculateTotal())}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, styles.finalTotal]}>
              Zu zahlender Betrag
            </Text>
            <Text style={[styles.totalValue, styles.finalTotal]}>
              {formatCurrency(calculateTotal())}
            </Text>
          </View>
        </View>

        {/* Tax Note */}
        <Text style={styles.taxNote}>
          Kein Ausweis von Umsatzsteuer, da Kleinunternehmer gemäß §19 UStG
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLeft}>
              <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 3 }}>
                Sparda Bank Südwest eG
              </Text>
              <Text>IBAN: DE74 5509 0500 0006 6453 05</Text>
              <Text>BIC: GENODEF1S01</Text>
              <Text>Dzevida Dizdaric</Text>
            </View>
            <View style={styles.footerRight}>
              <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 3 }}>
                Inhaber: Dzevida Dizdaric
              </Text>
              <Text>Bingener str 38</Text>
              <Text>55469 Simmern</Text>
            </View>
          </View>
          <Text style={styles.thankYou}>Wir sagen Danke! :)</Text>
        </View>
      </Page>
    </Document>
  );
}
