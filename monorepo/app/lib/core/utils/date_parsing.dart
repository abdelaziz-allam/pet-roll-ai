DateTime? parseDateTime(dynamic value) {
  if (value == null) return null;
  if (value is String) return DateTime.tryParse(value);
  if (value is Map) {
    final seconds = value['_seconds'] as int?;
    if (seconds != null) {
      return DateTime.fromMillisecondsSinceEpoch(seconds * 1000);
    }
  }
  return null;
}
