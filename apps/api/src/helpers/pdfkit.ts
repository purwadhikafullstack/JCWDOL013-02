const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

export const generateInvoicePDF = (invoice: any) => {
  const invoicesDir = path.join(__dirname, 'invoices');
  const fileName = `Invoeasy-${invoice.invoiceNumber}.pdf`;
  const filePath = path.join(invoicesDir, fileName);
  const doc = new PDFDocument({ margin: 50 });

  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
  }

  doc.pipe(fs.createWriteStream(filePath));

  // Title
  doc
    .fontSize(24)
    .font('Helvetica-Bold')
    .text('INVOICE', { align: 'center' })
    .moveDown(1);

  // Invoice Details Section
  doc
    .fontSize(12)
    .font('Helvetica')
    .text(`Invoice Number: ${invoice.invoiceNumber}`, { align: 'left' })
    .text(
      `Invoice Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}`,
      { align: 'left' },
    )
    .moveDown(1);

  // Customer Information Section
  doc
    .font('Helvetica-Bold')
    .text('Bill To:', { align: 'left' })
    .font('Helvetica')
    .text(invoice.customerName, { align: 'left' })
    .text(invoice.customerAddress, { align: 'left' })
    .moveDown(1);

  // Table Headers
  doc
    .font('Helvetica-Bold')
    .text('Description', 100, 300, { width: 200 })
    .text('Quantity', 300, 300, { width: 100, align: 'right' })
    .text('Price', 400, 300, { width: 100, align: 'right' })
    .text('Total', 500, 300, { width: 100, align: 'right' })
    .moveTo(100, 315)
    .lineTo(510, 315)
    .stroke()
    .moveDown(0.5);

  // Ensure items is an array before iterating
  if (Array.isArray(invoice.items)) {
    // Table Rows
    invoice.items.forEach((item: any, index: number) => {
      const y = 340 + index * 20;
      doc
        .font('Helvetica')
        .text(item.description, 100, y, { width: 200 })
        .text(item.quantity, 300, y, { width: 100, align: 'right' })
        .text(
          `Rp. ${item.price.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`,
          400,
          y,
          { width: 100, align: 'right' },
        )
        .text(
          `Rp. ${(item.price * item.quantity).toLocaleString('id-ID', { minimumFractionDigits: 2 })}`,
          500,
          y,
          { width: 100, align: 'right' },
        );
    });
  } else {
    console.error('Items are undefined or not an array');
  }

  // Add a line after the last item
  doc
    .moveTo(100, 340 + (invoice.items?.length || 0) * 20 + 10)
    .lineTo(510, 340 + (invoice.items?.length || 0) * 20 + 10)
    .stroke();

  // Total Amount Section
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .text(
      `Total Amount: Rp. ${invoice.totalPrice.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`,
      400,
      400,
      { align: 'right' },
    )
    .moveDown(1);

  // Footer
  doc
    .fontSize(10)
    .font('Helvetica')
    .text('Thank you for your business!', {
      align: 'center',
      baseline: 'bottom',
    })
    .moveDown(0.5)
    .text('If you have any questions about this invoice, please contact us.', {
      align: 'center',
      baseline: 'bottom',
    });

  // Close and save the document
  doc.end();

  return filePath;
};
