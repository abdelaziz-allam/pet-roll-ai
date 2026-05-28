import 'dart:math';
import 'package:flutter/material.dart';

class BirthdayCelebration extends StatefulWidget {
  final Widget child;
  final bool showCelebration;

  const BirthdayCelebration({
    super.key,
    required this.child,
    required this.showCelebration,
  });

  @override
  State<BirthdayCelebration> createState() => _BirthdayCelebrationState();
}

class _BirthdayCelebrationState extends State<BirthdayCelebration>
    with TickerProviderStateMixin {
  late AnimationController _confettiController;
  late AnimationController _fadeController;
  final List<_ConfettiParticle> _particles = [];
  final _random = Random();
  bool _showOverlay = false;

  @override
  void initState() {
    super.initState();
    _confettiController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    );
    _fadeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    );

    if (widget.showCelebration) {
      _startCelebration();
    }
  }

  @override
  void didUpdateWidget(BirthdayCelebration oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.showCelebration && !oldWidget.showCelebration) {
      _startCelebration();
    }
  }

  void _startCelebration() {
    _generateParticles();
    setState(() => _showOverlay = true);
    _fadeController.forward();
    _confettiController.forward().then((_) {
      Future.delayed(const Duration(seconds: 1), () {
        if (mounted) {
          _fadeController.reverse().then((_) {
            if (mounted) setState(() => _showOverlay = false);
          });
        }
      });
    });
  }

  void _generateParticles() {
    _particles.clear();
    for (int i = 0; i < 60; i++) {
      _particles.add(_ConfettiParticle(
        x: _random.nextDouble(),
        startY: -0.1 - _random.nextDouble() * 0.3,
        speed: 0.3 + _random.nextDouble() * 0.7,
        size: 6 + _random.nextDouble() * 8,
        color: _confettiColors[_random.nextInt(_confettiColors.length)],
        rotation: _random.nextDouble() * 2 * pi,
        rotationSpeed: (_random.nextDouble() - 0.5) * 4,
        wobble: _random.nextDouble() * 60,
        wobbleSpeed: 1 + _random.nextDouble() * 3,
      ));
    }
  }

  static const _confettiColors = [
    Color(0xFFF1379D),
    Color(0xFFF7A072),
    Color(0xFF7BBECC),
    Color(0xFF4CC287),
    Color(0xFFFFD700),
    Color(0xFFFF6B6B),
    Color(0xFFA78BFA),
    Color(0xFF34D399),
  ];

  @override
  void dispose() {
    _confettiController.dispose();
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        widget.child,
        if (_showOverlay)
          AnimatedBuilder(
            animation: Listenable.merge([_confettiController, _fadeController]),
            builder: (context, _) {
              return IgnorePointer(
                child: Opacity(
                  opacity: _fadeController.value,
                  child: CustomPaint(
                    size: MediaQuery.of(context).size,
                    painter: _ConfettiPainter(
                      particles: _particles,
                      progress: _confettiController.value,
                    ),
                  ),
                ),
              );
            },
          ),
      ],
    );
  }
}

class _ConfettiParticle {
  final double x;
  final double startY;
  final double speed;
  final double size;
  final Color color;
  final double rotation;
  final double rotationSpeed;
  final double wobble;
  final double wobbleSpeed;

  _ConfettiParticle({
    required this.x,
    required this.startY,
    required this.speed,
    required this.size,
    required this.color,
    required this.rotation,
    required this.rotationSpeed,
    required this.wobble,
    required this.wobbleSpeed,
  });
}

class _ConfettiPainter extends CustomPainter {
  final List<_ConfettiParticle> particles;
  final double progress;

  _ConfettiPainter({required this.particles, required this.progress});

  @override
  void paint(Canvas canvas, Size size) {
    for (final p in particles) {
      final y = p.startY + progress * p.speed * 1.4;
      if (y > 1.1) continue;

      final xOffset = sin(progress * p.wobbleSpeed * pi * 2) * p.wobble / size.width;
      final dx = (p.x + xOffset) * size.width;
      final dy = y * size.height;
      final angle = p.rotation + progress * p.rotationSpeed;

      canvas.save();
      canvas.translate(dx, dy);
      canvas.rotate(angle);

      final paint = Paint()..color = p.color.withOpacity(1 - progress * 0.3);
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromCenter(center: Offset.zero, width: p.size, height: p.size * 0.6),
          const Radius.circular(2),
        ),
        paint,
      );
      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(covariant _ConfettiPainter oldDelegate) => true;
}

class PetBirthdayBanner extends StatefulWidget {
  final String petName;
  final int age;
  final VoidCallback? onDismiss;

  const PetBirthdayBanner({
    super.key,
    required this.petName,
    required this.age,
    this.onDismiss,
  });

  @override
  State<PetBirthdayBanner> createState() => _PetBirthdayBannerState();
}

class _PetBirthdayBannerState extends State<PetBirthdayBanner>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnim;
  late Animation<double> _bounceAnim;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );
    _scaleAnim = CurvedAnimation(parent: _controller, curve: Curves.elasticOut);
    _bounceAnim = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: Curves.bounceOut),
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.scale(
          scale: 0.5 + _scaleAnim.value * 0.5,
          child: Opacity(
            opacity: _bounceAnim.value.clamp(0.0, 1.0),
            child: child,
          ),
        );
      },
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFFFFF0F5), Color(0xFFFFF8E1)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: const Color(0xFFFFD700).withOpacity(0.4)),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFFF1379D).withOpacity(0.15),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: const LinearGradient(
                  colors: [Color(0xFFF1379D), Color(0xFFF7A072)],
                ),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFFF1379D).withOpacity(0.3),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: const Center(
                child: Text('🎂', style: TextStyle(fontSize: 28)),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Happy Birthday ${widget.petName}! 🎉',
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF1E1A2E),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${widget.petName} turns ${widget.age} today! 🥳🎈',
                    style: TextStyle(
                      fontSize: 13,
                      color: const Color(0xFF6B6078).withOpacity(0.9),
                    ),
                  ),
                ],
              ),
            ),
            if (widget.onDismiss != null)
              GestureDetector(
                onTap: widget.onDismiss,
                child: const Icon(Icons.close, size: 18, color: Color(0xFFB5AEBF)),
              ),
          ],
        ),
      ),
    );
  }
}
