const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

export const generateInvoicePDF = (invoice: any, customer: any) => {
  const invoicesDir = path.join(__dirname, 'invoices');
  const fileName = `Invoeasy-${invoice.invoiceNumber}.pdf`;
  const filePath = path.join(invoicesDir, fileName);

  const logoPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'assets',
    'logo.png',
  );

  const doc = new PDFDocument({ margin: 50 });

  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
  }

  doc.pipe(fs.createWriteStream(filePath));

  // Add Logo as Watermark
  doc
    .opacity(0) // Adjust opacity to make it look like a watermark
    .rotate(-45, { origin: [300, 400] }) // Adjust rotation and origin
    .image(logoPath, 100, 250, { width: 400 }) // Adjust positioning and size
    .rotate(45, { origin: [300, 400] }) // Reset rotation
    .opacity(1); // Reset opacity to default

  // Header with Title (Aligned to the Left)
  doc.rect(50, 30, 520, 100).fill('#f4f4f4').stroke();
  doc
    .fontSize(24)
    .fillColor('#333')
    .text('INVOICE', 60, 40, { align: 'center' }) // Aligned to the left
    .fontSize(12)
    .text(`Invoice Number: ${invoice.invoiceNumber}`, 60, 70, { align: 'left' })
    .text(
      `Invoice Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}`,
      60,
      85,
      { align: 'left' },
    )
    .text(
      `Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`,
      60,
      100,
      { align: 'left' },
    )
    .moveDown(1);

  // Customer and Invoice Details
  doc
    .fontSize(12)
    .fillColor('#333')
    .text('Bill To:', 60, 140, { align: 'left' })
    .font('Helvetica-Bold')
    .text(customer?.name, 60, 155, { align: 'left' })
    .font('Helvetica')
    .text(customer?.address, 60, 170, { align: 'left' });

  // Invoice Status
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor('#333')
    .text(`Status: ${invoice.status.toUpperCase()}`, 60, 140, {
      align: 'right',
    }); // Add invoice status

  // Table Header
  doc.rect(50, 220, 520, 20).fill('#f4f4f4').stroke();
  doc
    .fillColor('#333')
    .font('Helvetica-Bold')
    .text('Description', 60, 225, { align: 'left' })
    .text('Quantity', 190, 225, { align: 'center' }) // Adjusted position for Quantity
    .text('Price', 345, 225, { align: 'right' }) // Moved Price slightly to the right
    .moveDown(0.5);

  // Table Rows and Subtotal Calculation
  let y = 250;
  let subtotal = 0;

  if (Array.isArray(invoice.products)) {
    invoice.products.forEach((item: any, index: number) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      doc
        .fillColor('#333')
        .font('Helvetica')
        .text(item.name, 60, y, { align: 'left' })
        .text(item.quantity.toString(), 190, y, { align: 'center' }) // Adjusted position for Quantity
        .text(
          `Rp. ${item.price.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`,
          345,
          y,
          { align: 'right' },
        ); // Moved Price slightly to the right

      y += 20;
    });
  }

  // Total Amount Section
  const taxAmount = (invoice.tax / 100) * subtotal;
  const total = subtotal + taxAmount;

  doc
    .rect(50, y + 10, 520, 60)
    .fill('#f4f4f4')
    .stroke();
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor('#333')
    .text(
      `Subtotal: Rp. ${subtotal.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`,
      330,
      y + 15,
      { align: 'right' },
    ) // Moved slightly to the right
    .text(
      `Tax (${invoice.tax || 0}%): Rp. ${taxAmount.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`,
      330,
      y + 30,
      { align: 'right' },
    ) // Moved slightly to the right
    .text(
      `Total Amount: Rp. ${total.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`,
      330,
      y + 45,
      { align: 'right' },
    ); // Moved slightly to the right

  // Terms and Conditions Section
  doc
    .fontSize(10)
    .fillColor('#333')
    .text('Terms and Conditions:', 50, y + 90, { align: 'left' })
    .font('Helvetica')
    .text(invoice.termsCondition, 50, y + 105, {
      align: 'left',
      width: 500,
    })
    .moveDown(1);

  // Footer
  doc
    .fontSize(10)
    .fillColor('#333')
    .text('Thank you for your business!', 50, y + 150, { align: 'center' })
    .text(
      'If you have any questions about this invoice, please contact us.',
      50,
      y + 165,
      { align: 'center' },
    )
    .moveDown(1);

  // Footer Section
  doc
    .fontSize(10)
    .fillColor('#333')
    .font('Helvetica')
    .text('© Invoeasy', 50, y + 250, { align: 'left' })
    .text('8282 Howe Springs', 50, y + 265, { align: 'left' })
    .text('942 Schaden River', 50, y + 280, { align: 'left' })
    .text('Phone: (123) 456-7890', 50, y + 295, { align: 'left' })
    .text('Email: cs@invoeasy.com', 50, y + 310, { align: 'left' })
    .text('Website: www.invoeasy.com', 50, y + 325, { align: 'left' })
    .text('Company Registration Number: 123456789', 50, y + 340, {
      align: 'left',
    })
    .text('VAT Number: GB123456789', 50, y + 355, { align: 'left' })
    .moveDown(1);

  // Disclaimer
  doc
    .fontSize(9)
    .font('Helvetica-Oblique')
    .text(
      'Terms and conditions apply. This invoice is not valid for tax purposes unless signed by an authorized representative of the company.',
      50,
      y + 375,
      { align: 'left', width: 500 },
    );
  // Close and save the document
  doc.end();
  return filePath;
};
