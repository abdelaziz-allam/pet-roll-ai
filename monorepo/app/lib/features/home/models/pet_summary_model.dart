class PetSummaryModel {
  final String vaccineStatus;
  final String? nextCheckup;
  final double? weight;
  final int totalVaccinations;
  final int totalHealthRecords;

  PetSummaryModel({
    required this.vaccineStatus,
    this.nextCheckup,
    this.weight,
    required this.totalVaccinations,
    required this.totalHealthRecords,
  });

  factory PetSummaryModel.fromJson(Map<String, dynamic> json) {
    return PetSummaryModel(
      vaccineStatus: json['vaccineStatus'] as String? ?? 'No records',
      nextCheckup: json['nextCheckup'] as String?,
      weight: (json['weight'] as num?)?.toDouble(),
      totalVaccinations: json['totalVaccinations'] as int? ?? 0,
      totalHealthRecords: json['totalHealthRecords'] as int? ?? 0,
    );
  }

  static PetSummaryModel get empty => PetSummaryModel(
        vaccineStatus: 'No records',
        totalVaccinations: 0,
        totalHealthRecords: 0,
      );

  String get formattedWeight {
    if (weight == null) return 'N/A';
    return '${weight!.toStringAsFixed(1)} kg';
  }

  String get formattedCheckup {
    if (nextCheckup == null) return 'None scheduled';
    try {
      final date = DateTime.parse(nextCheckup!);
      final months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return '${months[date.month - 1]} ${date.day}';
    } catch (_) {
      return nextCheckup!;
    }
  }
}
