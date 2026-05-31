import 'dart:math';
import 'dart:ui' as ui;
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:share_plus/share_plus.dart';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import '../../../l10n/generated/app_localizations.dart';

class WeddingCardView extends StatefulWidget {
  final Map<String, dynamic> card;

  const WeddingCardView({super.key, required this.card});

  @override
  State<WeddingCardView> createState() => _WeddingCardViewState();
}

class _WeddingCardViewState extends State<WeddingCardView>
    with TickerProviderStateMixin {
  final GlobalKey _cardKey = GlobalKey();
  late AnimationController _heartController;
  late AnimationController _confettiController;
  late Animation<double> _heartScale;
  final List<_Particle> _particles = [];
  final _random = Random();
  bool _sharing = false;

  @override
  void initState() {
    super.initState();
    _heartController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);
    _heartScale = Tween<double>(begin: 0.92, end: 1.08).animate(
      CurvedAnimation(parent: _heartController, curve: Curves.easeInOut),
    );
    _confettiController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 6),
    )..repeat();
    _generateParticles();
  }

  void _generateParticles() {
    for (int i = 0; i < 30; i++) {
      _particles.add(_Particle(
        x: _random.nextDouble(),
        startY: -_random.nextDouble() * 0.2,
        speed: 0.15 + _random.nextDouble() * 0.25,
        size: 4 + _random.nextDouble() * 6,
        color: _colors[_random.nextInt(_colors.length)],
        isHeart: _random.nextDouble() > 0.5,
      ));
    }
  }

  static const _colors = [
    Color(0xFFF1379D),
    Color(0xFFFF6B9D),
    Color(0xFFFFD700),
    Color(0xFFF7A072),
    Color(0xFFA78BFA),
    Color(0xFFFF85C0),
  ];

  @override
  void dispose() {
    _heartController.dispose();
    _confettiController.dispose();
    super.dispose();
  }

  Future<void> _shareCard() async {
    final l10n = AppLocalizations.of(context)!;
    setState(() => _sharing = true);
    try {
      final boundary = _cardKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
      if (boundary == null) return;

      final image = await boundary.toImage(pixelRatio: 3.0);
      final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
      if (byteData == null) return;

      final pngBytes = byteData.buffer.asUint8List();
      final tempDir = await getTemporaryDirectory();
      final file = File('${tempDir.path}/wedding_card.png');
      await file.writeAsBytes(pngBytes);

      final senderPet = widget.card['senderPet'] as Map<String, dynamic>? ?? {};
      final receiverPet = widget.card['receiverPet'] as Map<String, dynamic>? ?? {};

      await Share.shareXFiles(
        [XFile(file.path)],
        text: '💕 ${senderPet['name']} & ${receiverPet['name']} are matched! 🎉 #Petfolioo #PetLove',
      );
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('${l10n.error}: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _sharing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final senderPet = widget.card['senderPet'] as Map<String, dynamic>? ?? {};
    final receiverPet = widget.card['receiverPet'] as Map<String, dynamic>? ?? {};
    final senderOwner = widget.card['senderOwner'] as Map<String, dynamic>? ?? {};
    final receiverOwner = widget.card['receiverOwner'] as Map<String, dynamic>? ?? {};
    final matchDate = widget.card['matchDate'] as String? ?? '';
    final location = widget.card['location'] as String? ?? '';

    return Scaffold(
      backgroundColor: const Color(0xFFFFF5F9),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF1E1A2E)),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          l10n.weddingCard,
          style: const TextStyle(color: Color(0xFF1E1A2E), fontWeight: FontWeight.w700),
        ),
        actions: [
          IconButton(
            onPressed: _sharing ? null : _shareCard,
            icon: _sharing
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFFF1379D)),
                  )
                : const Icon(Icons.share_rounded, color: Color(0xFFF1379D)),
          ),
        ],
      ),
      body: Stack(
        children: [
          AnimatedBuilder(
            animation: _confettiController,
            builder: (context, _) {
              return CustomPaint(
                size: MediaQuery.of(context).size,
                painter: _CardConfettiPainter(
                  particles: _particles,
                  progress: _confettiController.value,
                ),
              );
            },
          ),
          SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(20, 10, 20, 40),
            child: Column(
              children: [
                RepaintBoundary(
                  key: _cardKey,
                  child: Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(28),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFF1379D).withOpacity(0.15),
                          blurRadius: 30,
                          offset: const Offset(0, 10),
                        ),
                      ],
                    ),
                    child: Column(
                      children: [
                        // Header
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(vertical: 28),
                          decoration: const BoxDecoration(
                            gradient: LinearGradient(
                              colors: [Color(0xFFF1379D), Color(0xFFF7A072)],
                            ),
                            borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                          ),
                          child: Column(
                            children: [
                              const Text('💒', style: TextStyle(fontSize: 40)),
                              const SizedBox(height: 10),
                              Text(
                                l10n.matchConfirmed,
                                style: const TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.w800,
                                  color: Colors.white,
                                  letterSpacing: 0.5,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                matchDate,
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Colors.white.withOpacity(0.9),
                                ),
                              ),
                            ],
                          ),
                        ),

                        // Body
                        Padding(
                          padding: const EdgeInsets.fromLTRB(24, 32, 24, 28),
                          child: Column(
                            children: [
                              // Pets row
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Flexible(
                                    child: _buildPetColumn(
                                      senderPet['name'] ?? 'Pet',
                                      senderPet['breed'] ?? '',
                                      senderPet['photo'],
                                      senderOwner['name'] ?? '',
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(horizontal: 16),
                                    child: AnimatedBuilder(
                                      animation: _heartScale,
                                      builder: (context, child) => Transform.scale(
                                        scale: _heartScale.value,
                                        child: child,
                                      ),
                                      child: const Text('💕', style: TextStyle(fontSize: 36)),
                                    ),
                                  ),
                                  Flexible(
                                    child: _buildPetColumn(
                                      receiverPet['name'] ?? 'Pet',
                                      receiverPet['breed'] ?? '',
                                      receiverPet['photo'],
                                      receiverOwner['name'] ?? '',
                                    ),
                                  ),
                                ],
                              ),

                              const SizedBox(height: 28),

                              // Divider with hearts
                              Row(
                                children: [
                                  Expanded(child: Divider(color: Colors.grey.shade200)),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(horizontal: 12),
                                    child: Text(
                                      '🎊 ${l10n.congratulations} 🎊',
                                      style: TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w600,
                                        color: Colors.grey[600],
                                      ),
                                    ),
                                  ),
                                  Expanded(child: Divider(color: Colors.grey.shade200)),
                                ],
                              ),

                              const SizedBox(height: 20),

                              // Message
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(18),
                                decoration: BoxDecoration(
                                  gradient: LinearGradient(
                                    colors: [
                                      const Color(0xFFF1379D).withOpacity(0.05),
                                      const Color(0xFFF7A072).withOpacity(0.05),
                                    ],
                                  ),
                                  borderRadius: BorderRadius.circular(16),
                                  border: Border.all(
                                    color: const Color(0xFFF1379D).withOpacity(0.1),
                                  ),
                                ),
                                child: Column(
                                  children: [
                                    Text(
                                      '${senderPet['name']} & ${receiverPet['name']}',
                                      style: const TextStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.w700,
                                        color: Color(0xFFF1379D),
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      'are officially matched! Wishing these adorable furbabies a wonderful journey together.',
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        fontSize: 14,
                                        color: Colors.grey[700],
                                        height: 1.5,
                                      ),
                                    ),
                                    if (location.isNotEmpty) ...[
                                      const SizedBox(height: 12),
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        children: [
                                          Icon(Icons.location_on, size: 15, color: Colors.grey[500]),
                                          const SizedBox(width: 4),
                                          Text(
                                            location,
                                            style: TextStyle(fontSize: 13, color: Colors.grey[500]),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ],
                                ),
                              ),

                              const SizedBox(height: 20),

                              // Petfolioo branding
                              Text(
                                'Petfolioo',
                                style: TextStyle(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w600,
                                  color: Colors.grey[400],
                                  letterSpacing: 1,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 24),

                // Share button
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: _sharing ? null : _shareCard,
                    icon: _sharing
                        ? const SizedBox(
                            width: 18,
                            height: 18,
                            child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                          )
                        : const Icon(Icons.share_rounded, size: 20),
                    label: Text(_sharing ? l10n.preparingShare : l10n.shareWeddingCard),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFF1379D),
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      elevation: 0,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPetColumn(String name, String breed, String? photoUrl, String ownerName) {
    return Column(
      children: [
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: LinearGradient(
              colors: [
                const Color(0xFFF1379D).withOpacity(0.1),
                const Color(0xFFF7A072).withOpacity(0.1),
              ],
            ),
            border: Border.all(
              color: const Color(0xFFF1379D).withOpacity(0.3),
              width: 3,
            ),
            image: photoUrl != null
                ? DecorationImage(image: NetworkImage(photoUrl), fit: BoxFit.cover)
                : null,
          ),
          child: photoUrl == null
              ? const Center(child: Text('🐾', style: TextStyle(fontSize: 32)))
              : null,
        ),
        const SizedBox(height: 10),
        Text(
          name,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: Color(0xFF1E1A2E),
          ),
          textAlign: TextAlign.center,
          overflow: TextOverflow.ellipsis,
        ),
        if (breed.isNotEmpty)
          Text(
            breed,
            style: TextStyle(fontSize: 12, color: Colors.grey[600]),
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
          ),
        const SizedBox(height: 4),
        Text(
          ownerName,
          style: TextStyle(fontSize: 11, color: Colors.grey[500]),
          textAlign: TextAlign.center,
          overflow: TextOverflow.ellipsis,
        ),
      ],
    );
  }
}

class _Particle {
  final double x;
  final double startY;
  final double speed;
  final double size;
  final Color color;
  final bool isHeart;

  _Particle({
    required this.x,
    required this.startY,
    required this.speed,
    required this.size,
    required this.color,
    required this.isHeart,
  });
}

class _CardConfettiPainter extends CustomPainter {
  final List<_Particle> particles;
  final double progress;

  _CardConfettiPainter({required this.particles, required this.progress});

  @override
  void paint(Canvas canvas, Size size) {
    for (final p in particles) {
      final y = (p.startY + progress * p.speed * 2) % 1.2;
      final wobble = sin(progress * pi * 3 + p.x * 8) * 15;
      final dx = p.x * size.width + wobble;
      final dy = y * size.height;

      final paint = Paint()..color = p.color.withOpacity(0.4);

      if (p.isHeart) {
        _drawHeart(canvas, Offset(dx, dy), p.size * 0.5, paint);
      } else {
        canvas.drawCircle(Offset(dx, dy), p.size / 2, paint);
      }
    }
  }

  void _drawHeart(Canvas canvas, Offset center, double size, Paint paint) {
    final path = Path();
    path.moveTo(center.dx, center.dy + size * 0.4);
    path.cubicTo(
      center.dx - size, center.dy - size * 0.3,
      center.dx - size * 0.5, center.dy - size,
      center.dx, center.dy - size * 0.4,
    );
    path.cubicTo(
      center.dx + size * 0.5, center.dy - size,
      center.dx + size, center.dy - size * 0.3,
      center.dx, center.dy + size * 0.4,
    );
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant _CardConfettiPainter oldDelegate) => true;
}
