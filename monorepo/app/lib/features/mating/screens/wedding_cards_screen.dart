import 'package:flutter/material.dart';
import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../widgets/wedding_card_view.dart';

class WeddingCardsScreen extends StatefulWidget {
  const WeddingCardsScreen({super.key});

  @override
  State<WeddingCardsScreen> createState() => _WeddingCardsScreenState();
}

class _WeddingCardsScreenState extends State<WeddingCardsScreen> {
  List<dynamic> _cards = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadCards();
  }

  Future<void> _loadCards() async {
    setState(() => _loading = true);
    try {
      final result = await ApiService().get('/mating/wedding-cards');
      setState(() {
        _cards = result is List ? result : [];
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _cards = [];
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    if (_loading) {
      return const Center(child: CircularProgressIndicator(color: AppTheme.primary));
    }

    if (_cards.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: AppTheme.primary.withOpacity(0.08),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.card_giftcard_rounded,
                  size: 48,
                  color: AppTheme.primary.withOpacity(0.5),
                ),
              ),
              const SizedBox(height: 20),
              Text(
                l10n.noWeddingCardsYet,
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 8),
              Text(
                l10n.noWeddingCardsYet,
                textAlign: TextAlign.center,
                style: const TextStyle(color: AppTheme.textSecondary, fontSize: 14, height: 1.5),
              ),
            ],
          ),
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: _loadCards,
      child: ListView.builder(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 100),
        itemCount: _cards.length,
        itemBuilder: (context, index) => _buildCardPreview(_cards[index]),
      ),
    );
  }

  Widget _buildCardPreview(dynamic card) {
    final senderPet = card['senderPet'] as Map<String, dynamic>? ?? {};
    final receiverPet = card['receiverPet'] as Map<String, dynamic>? ?? {};
    final matchDate = card['matchDate'] as String? ?? '';
    final location = card['location'] as String? ?? '';

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => WeddingCardView(card: Map<String, dynamic>.from(card)),
          ),
        );
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFFFFF0F8), Color(0xFFFFFBF0)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppTheme.primary.withOpacity(0.15)),
          boxShadow: [
            BoxShadow(
              color: AppTheme.primary.withOpacity(0.08),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Row(
                children: [
                  _buildMiniAvatar(senderPet['photo'], senderPet['name'] ?? ''),
                  const SizedBox(width: 10),
                  const Text('💕', style: TextStyle(fontSize: 22)),
                  const SizedBox(width: 10),
                  _buildMiniAvatar(receiverPet['photo'], receiverPet['name'] ?? ''),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${senderPet['name'] ?? 'Pet'} & ${receiverPet['name'] ?? 'Pet'}',
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                            color: Color(0xFF1E1A2E),
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 3),
                        Text(
                          matchDate,
                          style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                        ),
                        if (location.isNotEmpty) ...[
                          const SizedBox(height: 2),
                          Row(
                            children: [
                              Icon(Icons.location_on, size: 12, color: Colors.grey[500]),
                              const SizedBox(width: 3),
                              Expanded(
                                child: Text(
                                  location,
                                  style: TextStyle(fontSize: 11, color: Colors.grey[500]),
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: AppTheme.primary.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(Icons.visibility, size: 18, color: AppTheme.primary),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMiniAvatar(String? photoUrl, String name) {
    return Container(
      width: 42,
      height: 42,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: AppTheme.primary.withOpacity(0.1),
        border: Border.all(color: Colors.white, width: 2),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 4)],
        image: photoUrl != null
            ? DecorationImage(image: NetworkImage(photoUrl), fit: BoxFit.cover)
            : null,
      ),
      child: photoUrl == null
          ? Center(
              child: Text(
                name.isNotEmpty ? name[0].toUpperCase() : '?',
                style: const TextStyle(fontWeight: FontWeight.w700, color: AppTheme.primary, fontSize: 16),
              ),
            )
          : null,
    );
  }
}
