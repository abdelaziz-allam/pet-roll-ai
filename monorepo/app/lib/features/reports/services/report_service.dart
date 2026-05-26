import 'dart:typed_data';

import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;

import '../../../core/network/api_client.dart';

class ReportService {
  final ApiClient _api;

  ReportService(this._api);

  Future<Map<String, dynamic>> generateReport(String petId) async {
    final response = await _api.post('/pets/$petId/reports/health');
    return response.data as Map<String, dynamic>;
  }

  Future<List<Map<String, dynamic>>> getReports(String petId) async {
    final response = await _api.get('/pets/$petId/reports');
    final list = response.data['data'] as List;
    return list.cast<Map<String, dynamic>>();
  }

  Future<String> getDownloadUrl(String reportId) async {
    final response = await _api.get('/reports/$reportId/download');
    return response.data['url'] as String;
  }

  Future<Uint8List> downloadPdfBytes(String url) async {
    final response = await _api.get<List<int>>(url);
    return Uint8List.fromList(response.data ?? []);
  }

  Future<pw.Document> generateLocalPdf({
    required Map<String, dynamic> pet,
    required List<Map<String, dynamic>> vaccinations,
    required List<Map<String, dynamic>> healthRecords,
  }) async {
    final pdf = pw.Document();
    final brandColor = PdfColor.fromHex('#F1379D');

    pdf.addPage(
      pw.MultiPage(
        pageFormat: PdfPageFormat.a4,
        margin: const pw.EdgeInsets.all(40),
        header: (context) => _buildHeader(brandColor),
        footer: (context) => _buildFooter(context),
        build: (context) => [
          _buildPetProfile(pet, brandColor),
          pw.SizedBox(height: 24),
          _buildVaccinationTable(vaccinations, brandColor),
          pw.SizedBox(height: 24),
          _buildHealthTimeline(healthRecords, brandColor),
        ],
      ),
    );

    return pdf;
  }

  pw.Widget _buildHeader(PdfColor brandColor) {
    return pw.Container(
      padding: const pw.EdgeInsets.only(bottom: 16),
      decoration: pw.BoxDecoration(
        border: pw.Border(
          bottom: pw.BorderSide(color: brandColor, width: 2),
        ),
      ),
      child: pw.Row(
        mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
        children: [
          pw.Text(
            'Pet Folioo',
            style: pw.TextStyle(
              fontSize: 24,
              fontWeight: pw.FontWeight.bold,
              color: brandColor,
            ),
          ),
          pw.Text(
            'Health Report',
            style: pw.TextStyle(
              fontSize: 16,
              color: PdfColors.grey700,
            ),
          ),
        ],
      ),
    );
  }

  pw.Widget _buildFooter(pw.Context context) {
    return pw.Container(
      padding: const pw.EdgeInsets.only(top: 16),
      decoration: const pw.BoxDecoration(
        border: pw.Border(
          top: pw.BorderSide(color: PdfColors.grey300, width: 0.5),
        ),
      ),
      child: pw.Row(
        mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
        children: [
          pw.Text(
            'Generated: ${DateTime.now().toString().split(' ').first}',
            style: const pw.TextStyle(fontSize: 10, color: PdfColors.grey600),
          ),
          pw.Text(
            'Page ${context.pageNumber} of ${context.pagesCount}',
            style: const pw.TextStyle(fontSize: 10, color: PdfColors.grey600),
          ),
        ],
      ),
    );
  }

  pw.Widget _buildPetProfile(Map<String, dynamic> pet, PdfColor brandColor) {
    return pw.Container(
      padding: const pw.EdgeInsets.all(16),
      decoration: pw.BoxDecoration(
        border: pw.Border.all(color: PdfColors.grey300),
        borderRadius: const pw.BorderRadius.all(pw.Radius.circular(8)),
      ),
      child: pw.Column(
        crossAxisAlignment: pw.CrossAxisAlignment.start,
        children: [
          pw.Text(
            'Pet Profile',
            style: pw.TextStyle(
              fontSize: 18,
              fontWeight: pw.FontWeight.bold,
              color: brandColor,
            ),
          ),
          pw.SizedBox(height: 12),
          _profileRow('Name', pet['name'] ?? '-'),
          _profileRow('Species', pet['species'] ?? '-'),
          _profileRow('Breed', pet['breed'] ?? '-'),
          _profileRow('Date of Birth', pet['dateOfBirth'] ?? '-'),
          _profileRow('Weight', '${pet['weight'] ?? '-'} kg'),
        ],
      ),
    );
  }

  pw.Widget _profileRow(String label, String value) {
    return pw.Padding(
      padding: const pw.EdgeInsets.symmetric(vertical: 4),
      child: pw.Row(
        children: [
          pw.SizedBox(
            width: 120,
            child: pw.Text(
              label,
              style: pw.TextStyle(
                fontWeight: pw.FontWeight.bold,
                fontSize: 12,
                color: PdfColors.grey700,
              ),
            ),
          ),
          pw.Expanded(
            child: pw.Text(value, style: const pw.TextStyle(fontSize: 12)),
          ),
        ],
      ),
    );
  }

  pw.Widget _buildVaccinationTable(
    List<Map<String, dynamic>> vaccinations,
    PdfColor brandColor,
  ) {
    return pw.Column(
      crossAxisAlignment: pw.CrossAxisAlignment.start,
      children: [
        pw.Text(
          'Vaccination Records',
          style: pw.TextStyle(
            fontSize: 18,
            fontWeight: pw.FontWeight.bold,
            color: brandColor,
          ),
        ),
        pw.SizedBox(height: 12),
        if (vaccinations.isEmpty)
          pw.Text(
            'No vaccination records available.',
            style: const pw.TextStyle(fontSize: 12, color: PdfColors.grey600),
          )
        else
          pw.TableHelper.fromTextArray(
            headerStyle: pw.TextStyle(
              fontWeight: pw.FontWeight.bold,
              color: PdfColors.white,
              fontSize: 11,
            ),
            headerDecoration: pw.BoxDecoration(color: brandColor),
            cellStyle: const pw.TextStyle(fontSize: 10),
            cellPadding: const pw.EdgeInsets.all(6),
            headers: ['Vaccine', 'Date', 'Next Due', 'Veterinarian'],
            data: vaccinations.map((v) {
              return [
                v['name'] ?? '-',
                v['date'] ?? '-',
                v['nextDueDate'] ?? '-',
                v['veterinarian'] ?? '-',
              ];
            }).toList(),
          ),
      ],
    );
  }

  pw.Widget _buildHealthTimeline(
    List<Map<String, dynamic>> healthRecords,
    PdfColor brandColor,
  ) {
    return pw.Column(
      crossAxisAlignment: pw.CrossAxisAlignment.start,
      children: [
        pw.Text(
          'Health History',
          style: pw.TextStyle(
            fontSize: 18,
            fontWeight: pw.FontWeight.bold,
            color: brandColor,
          ),
        ),
        pw.SizedBox(height: 12),
        if (healthRecords.isEmpty)
          pw.Text(
            'No health records available.',
            style: const pw.TextStyle(fontSize: 12, color: PdfColors.grey600),
          )
        else
          ...healthRecords.map((record) {
            return pw.Container(
              margin: const pw.EdgeInsets.only(bottom: 8),
              padding: const pw.EdgeInsets.all(12),
              decoration: pw.BoxDecoration(
                border: pw.Border(
                  left: pw.BorderSide(color: brandColor, width: 3),
                ),
                color: PdfColors.grey100,
              ),
              child: pw.Column(
                crossAxisAlignment: pw.CrossAxisAlignment.start,
                children: [
                  pw.Row(
                    mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                    children: [
                      pw.Text(
                        record['type'] ?? 'Record',
                        style: pw.TextStyle(
                          fontWeight: pw.FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                      pw.Text(
                        record['date'] ?? '-',
                        style: const pw.TextStyle(
                          fontSize: 10,
                          color: PdfColors.grey600,
                        ),
                      ),
                    ],
                  ),
                  if (record['notes'] != null) ...[
                    pw.SizedBox(height: 4),
                    pw.Text(
                      record['notes'] as String,
                      style:
                          const pw.TextStyle(fontSize: 10, color: PdfColors.grey700),
                    ),
                  ],
                ],
              ),
            );
          }),
      ],
    );
  }
}
