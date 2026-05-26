import PDFDocument from 'pdfkit';

// PET Roll brand colors
const BRAND_PINK = '#F1379D';
const BRAND_BLUE = '#0096D1';

interface PetData {
  id: string;
  name: string;
  species?: string;
  breed?: string;
  dateOfBirth?: string;
  weight?: number;
  weightUnit?: string;
  [key: string]: unknown;
}

interface HealthRecord {
  id: string;
  date?: string;
  type?: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

interface Vaccination {
  id: string;
  vaccineName?: string;
  dateAdministered?: string;
  nextDueDate?: string;
  [key: string]: unknown;
}

export async function generateHealthReport(
  pet: PetData,
  healthRecords: HealthRecord[],
  vaccinations: Vaccination[]
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // --- Header ---
    drawHeader(doc, pet);

    // --- Pet Info Section ---
    drawPetInfo(doc, pet);

    // --- Vaccination Table ---
    if (vaccinations.length > 0) {
      drawVaccinationTable(doc, vaccinations);
    }

    // --- Health Timeline ---
    if (healthRecords.length > 0) {
      drawHealthTimeline(doc, healthRecords);
    }

    // --- Footer ---
    drawFooter(doc);

    doc.end();
  });
}

function drawHeader(doc: PDFKit.PDFDocument, pet: PetData): void {
  // Gradient-like header with brand colors
  doc
    .rect(0, 0, doc.page.width, 80)
    .fill(BRAND_BLUE);

  doc
    .fontSize(24)
    .fillColor('#FFFFFF')
    .text('PET Roll Health Report', 50, 28, { align: 'center' });

  doc
    .fontSize(10)
    .fillColor('#FFFFFF')
    .text(`Generated for: ${pet.name}`, 50, 55, { align: 'center' });

  doc.moveDown(3);
}

function drawPetInfo(doc: PDFKit.PDFDocument, pet: PetData): void {
  const startY = 100;

  doc
    .fontSize(14)
    .fillColor(BRAND_PINK)
    .text('Pet Information', 50, startY);

  doc
    .moveTo(50, startY + 18)
    .lineTo(545, startY + 18)
    .strokeColor(BRAND_PINK)
    .lineWidth(1)
    .stroke();

  doc.moveDown(0.5);

  const infoY = startY + 28;
  doc.fontSize(10).fillColor('#333333');

  const fields = [
    { label: 'Name', value: pet.name },
    { label: 'Species', value: pet.species ?? 'N/A' },
    { label: 'Breed', value: pet.breed ?? 'N/A' },
    { label: 'Date of Birth', value: pet.dateOfBirth ? formatDate(pet.dateOfBirth) : 'N/A' },
    { label: 'Weight', value: pet.weight ? `${pet.weight} ${pet.weightUnit ?? 'kg'}` : 'N/A' },
  ];

  fields.forEach((field, index) => {
    const y = infoY + index * 18;
    doc.font('Helvetica-Bold').text(`${field.label}:`, 50, y, { continued: true });
    doc.font('Helvetica').text(`  ${field.value}`);
  });

  doc.y = infoY + fields.length * 18 + 20;
}

function drawVaccinationTable(doc: PDFKit.PDFDocument, vaccinations: Vaccination[]): void {
  checkPageBreak(doc, 100);

  doc
    .fontSize(14)
    .fillColor(BRAND_PINK)
    .text('Vaccination Record', 50);

  doc
    .moveTo(50, doc.y + 2)
    .lineTo(545, doc.y + 2)
    .strokeColor(BRAND_PINK)
    .lineWidth(1)
    .stroke();

  doc.moveDown(0.8);

  // Table header
  const tableTop = doc.y;
  const colWidths = [180, 120, 120];
  const headers = ['Vaccine Name', 'Date Administered', 'Next Due'];

  doc.font('Helvetica-Bold').fontSize(9).fillColor(BRAND_BLUE);
  headers.forEach((header, i) => {
    const x = 50 + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
    doc.text(header, x, tableTop, { width: colWidths[i] });
  });

  doc
    .moveTo(50, tableTop + 14)
    .lineTo(545, tableTop + 14)
    .strokeColor('#CCCCCC')
    .lineWidth(0.5)
    .stroke();

  // Table rows
  let rowY = tableTop + 20;
  doc.font('Helvetica').fontSize(9).fillColor('#333333');

  vaccinations.forEach((vacc) => {
    checkPageBreak(doc, 20);
    rowY = doc.y;

    const values = [
      vacc.vaccineName ?? 'Unknown',
      vacc.dateAdministered ? formatDate(vacc.dateAdministered) : 'N/A',
      vacc.nextDueDate ? formatDate(vacc.nextDueDate) : 'N/A',
    ];

    values.forEach((value, i) => {
      const x = 50 + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
      doc.text(value, x, rowY, { width: colWidths[i] });
    });

    doc.y = rowY + 16;
  });

  doc.moveDown(1.5);
}

function drawHealthTimeline(doc: PDFKit.PDFDocument, healthRecords: HealthRecord[]): void {
  checkPageBreak(doc, 100);

  doc
    .fontSize(14)
    .fillColor(BRAND_PINK)
    .text('Health Timeline', 50);

  doc
    .moveTo(50, doc.y + 2)
    .lineTo(545, doc.y + 2)
    .strokeColor(BRAND_PINK)
    .lineWidth(1)
    .stroke();

  doc.moveDown(0.8);

  healthRecords.forEach((record) => {
    checkPageBreak(doc, 60);

    const date = record.date ? formatDate(record.date) : 'Unknown date';
    const type = record.type ?? 'General';
    const title = record.title ?? 'Health Record';
    const description = record.description ?? '';

    // Date and type badge
    doc
      .fontSize(9)
      .fillColor(BRAND_BLUE)
      .text(`${date}  |  ${type}`, 50);

    // Title
    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .fillColor('#333333')
      .text(title, 50);

    // Description
    if (description) {
      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('#666666')
        .text(description, 50, undefined, { width: 495 });
    }

    doc.moveDown(0.8);

    // Separator line
    doc
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .strokeColor('#EEEEEE')
      .lineWidth(0.5)
      .stroke();

    doc.moveDown(0.5);
  });
}

function drawFooter(doc: PDFKit.PDFDocument): void {
  const bottomY = doc.page.height - 50;

  doc
    .fontSize(8)
    .fillColor('#999999')
    .text(
      `Generated by Petfolioo - petfolioo.com  |  ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
      50,
      bottomY,
      { align: 'center', width: 495 }
    );
}

function checkPageBreak(doc: PDFKit.PDFDocument, requiredSpace: number): void {
  if (doc.y + requiredSpace > doc.page.height - 80) {
    doc.addPage();
    doc.y = 50;
  }
}

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return isoString;
  }
}
