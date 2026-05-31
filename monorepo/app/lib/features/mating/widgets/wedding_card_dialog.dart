import 'dart:math';
import 'package:flutter/material.dart';
import '../../../l10n/generated/app_localizations.dart';

class WeddingCardDialog extends StatefulWidget {
  final String myPetName;
  final String partnerPetName;
  final String ownerName;
  final String? partnerPhotoUrl;

  const WeddingCardDialog({
    super.key,
    required this.myPetName,
    required this.partnerPetName,
    required this.ownerName,
    this.partnerPhotoUrl,
  });

  static Future<void> show(
    BuildContext context, {
    required String myPetName,
    required String partnerPetName,
    required String ownerName,
    String? partnerPhotoUrl,
  }) {
    return showGeneralDialog(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Wedding Card',
      barrierColor: Colors.black54,
      transitionDuration: const Duration(milliseconds: 500),
      pageBuilder: (_, __, ___) => WeddingCardDialog(
        myPetName: myPetName,
        partnerPetName: partnerPetName,
        ownerName: ownerName,
        partnerPhotoUrl: partnerPhotoUrl,
      ),
      transitionBuilder: (context, anim, _, child) {
        return ScaleTransition(
          scale: CurvedAnimation(parent: anim, curve: Curves.elasticOut),
          child: child,
        );
      },
    );
  }

  @override
  State<WeddingCardDialog> createState() => _WeddingCardDialogState();
}

class _WeddingCardDialogState extends State<WeddingCardDialog>
    with TickerProviderStateMixin {
  late AnimationController _heartController;
  late AnimationController _confettiController;
  late Animation<double> _heartScale;
  final List<_WeddingConfetti> _confetti = [];
  final _random = Random();

  @override
  void initState() {
    super.initState();
    _heartController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);
    _heartScale = Tween<double>(begin: 0.9, end: 1.1).animate(
      CurvedAnimation(parent: _heartController, curve: Curves.easeInOut),
    );

    _confettiController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 5),
    )..repeat();
    _generateConfetti();
  }

  void _generateConfetti() {
    for (int i = 0; i < 40; i++) {
      _confetti.add(_WeddingConfetti(
        x: _random.nextDouble(),
        startY: -_random.nextDouble() * 0.3,
        speed: 0.2 + _random.nextDouble() * 0.4,
        size: 5 + _random.nextDouble() * 7,
        color: _colors[_random.nextInt(_colors.length)],
        isHeart: _random.nextDouble() > 0.6,
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

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    return Center(
      child: Stack(
        alignment: Alignment.center,
        children: [
          AnimatedBuilder(
            animation: _confettiController,
            builder: (context, _) {
              return CustomPaint(
                size: MediaQuery.of(context).size,
                painter: _WeddingConfettiPainter(
                  confetti: _confetti,
                  progress: _confettiController.value,
                ),
              );
            },
          ),
          Container(
            width: MediaQuery.of(context).size.width * 0.85,
            margin: const EdgeInsets.symmetric(horizontal: 24),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(28),
              gradient: const LinearGradient(
                colors: [Color(0xFFFFF0F8), Color(0xFFFFFBF0)],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFFF1379D).withOpacity(0.25),
                  blurRadius: 30,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Top ornament
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 20),
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Color(0xFFF1379D), Color(0xFFF7A072)],
                    ),
                    borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                  ),
                  child: Column(
                    children: [
                      const Text(
                        '💒',
                        style: TextStyle(fontSize: 36),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        l10n.matchConfirmed,
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                          color: Colors.white,
                          letterSpacing: 0.5,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        l10n.perfectPairFound,
                        style: TextStyle(
                          fontSize: 13,
                          color: Colors.white.withOpacity(0.9),
                        ),
                      ),
                    ],
                  ),
                ),

                Padding(
                  padding: const EdgeInsets.fromLTRB(24, 28, 24, 24),
                  child: Column(
                    children: [
                      // Pet names with heart
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Flexible(
                            child: Column(
                              children: [
                                Container(
                                  width: 64,
                                  height: 64,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: const Color(0xFFF1379D).withOpacity(0.1),
                                    border: Border.all(
                                      color: const Color(0xFFF1379D).withOpacity(0.3),
                                      width: 2,
                                    ),
                                  ),
                                  child: const Center(
                                    child: Text('🐾', style: TextStyle(fontSize: 28)),
                                  ),
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  widget.myPetName,
                                  style: const TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.w700,
                                    color: Color(0xFF1E1A2E),
                                  ),
                                  textAlign: TextAlign.center,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 12),
                            child: AnimatedBuilder(
                              animation: _heartScale,
                              builder: (context, child) => Transform.scale(
                                scale: _heartScale.value,
                                child: child,
                              ),
                              child: const Text('💕', style: TextStyle(fontSize: 32)),
                            ),
                          ),
                          Flexible(
                            child: Column(
                              children: [
                                Container(
                                  width: 64,
                                  height: 64,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: const Color(0xFFF7A072).withOpacity(0.1),
                                    border: Border.all(
                                      color: const Color(0xFFF7A072).withOpacity(0.3),
                                      width: 2,
                                    ),
                                    image: widget.partnerPhotoUrl != null
                                        ? DecorationImage(
                                            image: NetworkImage(widget.partnerPhotoUrl!),
                                            fit: BoxFit.cover,
                                          )
                                        : null,
                                  ),
                                  child: widget.partnerPhotoUrl == null
                                      ? const Center(
                                          child: Text('🐾', style: TextStyle(fontSize: 28)),
                                        )
                                      : null,
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  widget.partnerPetName,
                                  style: const TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.w700,
                                    color: Color(0xFF1E1A2E),
                                  ),
                                  textAlign: TextAlign.center,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 24),

                      // Congratulations message
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: const Color(0xFFFFD700).withOpacity(0.3),
                          ),
                        ),
                        child: Column(
                          children: [
                            Text(
                              '🎊 ${l10n.congratulations} 🎊',
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w700,
                                color: Color(0xFFF1379D),
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              '${widget.myPetName} and ${widget.partnerPetName} are now matched! '
                              'Connect with ${widget.ownerName} to arrange the meeting.',
                              textAlign: TextAlign.center,
                              style: const TextStyle(
                                fontSize: 13,
                                color: Color(0xFF6B6078),
                                height: 1.5,
                              ),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 20),

                      // Close button
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: () => Navigator.of(context).pop(),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFFF1379D),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(14),
                            ),
                            elevation: 0,
                          ),
                          child: Text(
                            '${l10n.wonderful}! 🎉',
                            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _WeddingConfetti {
  final double x;
  final double startY;
  final double speed;
  final double size;
  final Color color;
  final bool isHeart;

  _WeddingConfetti({
    required this.x,
    required this.startY,
    required this.speed,
    required this.size,
    required this.color,
    required this.isHeart,
  });
}

class _WeddingConfettiPainter extends CustomPainter {
  final List<_WeddingConfetti> confetti;
  final double progress;

  _WeddingConfettiPainter({required this.confetti, required this.progress});

  @override
  void paint(Canvas canvas, Size size) {
    for (final c in confetti) {
      final y = (c.startY + progress * c.speed * 2.5) % 1.3;
      final wobble = sin(progress * pi * 4 + c.x * 10) * 20;
      final dx = c.x * size.width + wobble;
      final dy = y * size.height;

      final paint = Paint()..color = c.color.withOpacity(0.8);

      if (c.isHeart) {
        _drawHeart(canvas, Offset(dx, dy), c.size, paint);
      } else {
        canvas.drawCircle(Offset(dx, dy), c.size / 2, paint);
      }
    }
  }

  void _drawHeart(Canvas canvas, Offset center, double size, Paint paint) {
    final path = Path();
    final s = size * 0.5;
    path.moveTo(center.dx, center.dy + s * 0.4);
    path.cubicTo(
      center.dx - s, center.dy - s * 0.3,
      center.dx - s * 0.5, center.dy - s,
      center.dx, center.dy - s * 0.4,
    );
    path.cubicTo(
      center.dx + s * 0.5, center.dy - s,
      center.dx + s, center.dy - s * 0.3,
      center.dx, center.dy + s * 0.4,
    );
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant _WeddingConfettiPainter oldDelegate) => true;
}
