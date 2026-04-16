// PDF Generator utility for quotes
// This generates a professional PDF quote document

export interface QuoteData {
  id: string
  client: {
    name: string
    email: string
    phone: string
    company?: string
    address: string
    city: string
  }
  services: Array<{
    name: string
    description: string
    quantity: number
    unitPrice: number
  }>
  notes?: string
  validityDays: number
  date: string
}

export interface CompanyInfo {
  name: string
  address: string
  city: string
  phone: string
  email: string
  website: string
  siret: string
  logo?: string
}

const COMPANY_INFO: CompanyInfo = {
  name: "GUYA FIBRE SARL",
  address: "12 Rue des Palmiers",
  city: "97320 Saint-Laurent-du-Maroni, Guyane française",
  phone: "+594 6 94 43 54 84",
  email: "contact@guyafibre.com",
  website: "www.guyafibre.com",
  siret: "123 456 789 00012",
}

export function generateQuotePDF(quoteData: QuoteData): string {
  const subtotal = quoteData.services.reduce(
    (sum, service) => sum + service.quantity * service.unitPrice,
    0
  )
  const tva = subtotal * 0.085 // TVA Guyane 8.5%
  const total = subtotal + tva

  const validUntil = new Date(quoteData.date)
  validUntil.setDate(validUntil.getDate() + quoteData.validityDays)

  // Generate HTML that will be converted to PDF
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Devis ${quoteData.id} - GUYA FIBRE</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 12px;
      line-height: 1.5;
      color: #1a1a2e;
      padding: 40px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #00c4b0;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #00c4b0;
    }
    .logo span {
      color: #1a1a2e;
    }
    .company-info {
      text-align: right;
      font-size: 11px;
      color: #666;
    }
    .quote-title {
      background: linear-gradient(135deg, #00c4b0 0%, #009e8e 100%);
      color: white;
      padding: 20px;
      margin-bottom: 30px;
      border-radius: 8px;
    }
    .quote-title h1 {
      font-size: 24px;
      margin-bottom: 5px;
    }
    .quote-meta {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      opacity: 0.9;
    }
    .parties {
      display: flex;
      gap: 40px;
      margin-bottom: 30px;
    }
    .party {
      flex: 1;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .party h3 {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #00c4b0;
      margin-bottom: 10px;
    }
    .party p {
      margin-bottom: 5px;
    }
    .party strong {
      font-size: 14px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    th {
      background: #1a1a2e;
      color: white;
      padding: 12px;
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    th:last-child {
      text-align: right;
    }
    td {
      padding: 15px 12px;
      border-bottom: 1px solid #eee;
    }
    td:last-child {
      text-align: right;
      font-weight: 600;
    }
    .service-name {
      font-weight: 600;
      color: #1a1a2e;
    }
    .service-desc {
      font-size: 11px;
      color: #666;
      margin-top: 4px;
    }
    .totals {
      display: flex;
      justify-content: flex-end;
    }
    .totals-table {
      width: 300px;
    }
    .totals-table tr td {
      padding: 8px 12px;
      border: none;
    }
    .totals-table tr:last-child {
      background: #00c4b0;
      color: white;
      font-size: 16px;
      font-weight: bold;
    }
    .totals-table tr:last-child td {
      padding: 15px 12px;
    }
    .notes {
      margin-top: 30px;
      padding: 20px;
      background: #fff9e6;
      border-left: 4px solid #f5a20f;
      border-radius: 4px;
    }
    .notes h4 {
      color: #f5a20f;
      margin-bottom: 10px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      font-size: 10px;
      color: #999;
      text-align: center;
    }
    .validity {
      display: inline-block;
      padding: 8px 16px;
      background: #e8f5f3;
      color: #00c4b0;
      border-radius: 20px;
      font-weight: 600;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">GUYA<span>FIBRE</span></div>
    <div class="company-info">
      <p><strong>${COMPANY_INFO.name}</strong></p>
      <p>${COMPANY_INFO.address}</p>
      <p>${COMPANY_INFO.city}</p>
      <p>Tél: ${COMPANY_INFO.phone}</p>
      <p>Email: ${COMPANY_INFO.email}</p>
      <p>SIRET: ${COMPANY_INFO.siret}</p>
    </div>
  </div>

  <div class="quote-title">
    <h1>DEVIS N° ${quoteData.id}</h1>
    <div class="quote-meta">
      <span>Date d'émission: ${formatDate(quoteData.date)}</span>
      <span>Valide jusqu'au: ${formatDate(validUntil.toISOString().split('T')[0])}</span>
    </div>
  </div>

  <div class="parties">
    <div class="party">
      <h3>Émetteur</h3>
      <p><strong>${COMPANY_INFO.name}</strong></p>
      <p>${COMPANY_INFO.address}</p>
      <p>${COMPANY_INFO.city}</p>
      <p>Tél: ${COMPANY_INFO.phone}</p>
    </div>
    <div class="party">
      <h3>Destinataire</h3>
      <p><strong>${quoteData.client.name}</strong></p>
      ${quoteData.client.company ? `<p>${quoteData.client.company}</p>` : ''}
      <p>${quoteData.client.address}</p>
      <p>${quoteData.client.city}</p>
      <p>Tél: ${quoteData.client.phone}</p>
      <p>Email: ${quoteData.client.email}</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 50%">Désignation</th>
        <th style="width: 15%">Quantité</th>
        <th style="width: 15%">Prix unitaire HT</th>
        <th style="width: 20%">Total HT</th>
      </tr>
    </thead>
    <tbody>
      ${quoteData.services.map(service => `
        <tr>
          <td>
            <div class="service-name">${service.name}</div>
            <div class="service-desc">${service.description}</div>
          </td>
          <td>${service.quantity}</td>
          <td>${formatCurrency(service.unitPrice)}</td>
          <td>${formatCurrency(service.quantity * service.unitPrice)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="totals">
    <table class="totals-table">
      <tr>
        <td>Sous-total HT</td>
        <td>${formatCurrency(subtotal)}</td>
      </tr>
      <tr>
        <td>TVA (8,5%)</td>
        <td>${formatCurrency(tva)}</td>
      </tr>
      <tr>
        <td>TOTAL TTC</td>
        <td>${formatCurrency(total)}</td>
      </tr>
    </table>
  </div>

  ${quoteData.notes ? `
    <div class="notes">
      <h4>Notes et conditions</h4>
      <p>${quoteData.notes}</p>
    </div>
  ` : ''}

  <div style="text-align: center;">
    <div class="validity">
      Ce devis est valable ${quoteData.validityDays} jours
    </div>
  </div>

  <div class="footer">
    <p>${COMPANY_INFO.name} - ${COMPANY_INFO.address}, ${COMPANY_INFO.city}</p>
    <p>SIRET: ${COMPANY_INFO.siret} | Tél: ${COMPANY_INFO.phone} | Email: ${COMPANY_INFO.email} | ${COMPANY_INFO.website}</p>
  </div>
</body>
</html>
  `

  return html
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

// Function to trigger PDF download in browser
export async function downloadQuotePDF(quoteData: QuoteData): Promise<void> {
  const html = generateQuotePDF(quoteData)
  
  // Create a new window with the HTML content for printing
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.focus()
    
    // Wait for content to load then trigger print
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }
}

// Example usage:
export const exampleQuote: QuoteData = {
  id: "DEV-2024-001",
  client: {
    name: "Jean-Pierre Moreau",
    email: "jp.moreau@sfg.gf",
    phone: "+594 694 12 34 56",
    company: "Société Forestière Guyane",
    address: "12 Avenue du Général de Gaulle",
    city: "97300 Cayenne, Guyane française",
  },
  services: [
    {
      name: "Étude technique et conception",
      description: "Relevé terrain, étude de faisabilité, conception du réseau",
      quantity: 1,
      unitPrice: 1500,
    },
    {
      name: "Déploiement fibre FTTO",
      description: "Installation liaison fibre dédiée 100 Mbps symétrique",
      quantity: 1,
      unitPrice: 5500,
    },
    {
      name: "Équipements actifs",
      description: "ONT, routeur professionnel, câblage intérieur",
      quantity: 1,
      unitPrice: 1200,
    },
    {
      name: "Mise en service",
      description: "Configuration, tests et validation de la liaison",
      quantity: 1,
      unitPrice: 300,
    },
  ],
  notes: "Ce devis comprend la fourniture et l'installation de tous les équipements nécessaires. Un contrat de maintenance peut être souscrit en complément. Les travaux débuteront sous 15 jours après acceptation du devis.",
  validityDays: 30,
  date: new Date().toISOString().split('T')[0],
}
