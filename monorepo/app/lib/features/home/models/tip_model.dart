class TipModel {
  final String id;
  final String title;
  final String body;
  final String category;

  const TipModel({
    required this.id,
    required this.title,
    required this.body,
    required this.category,
  });

  factory TipModel.fromJson(Map<String, dynamic> json) {
    return TipModel(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? 'Daily Tip',
      body: json['body'] as String? ?? '',
      category: json['category'] as String? ?? 'general',
    );
  }

  static const TipModel fallback = TipModel(
    id: '',
    title: 'Daily Tip',
    body: 'Keep your pet happy and healthy with regular checkups!',
    category: 'general',
  );
}
