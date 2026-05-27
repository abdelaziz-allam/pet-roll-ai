import 'package:flutter/material.dart';
import '../models/breeder_ranking.dart';

class BreederRankingsScreen extends StatefulWidget {
  const BreederRankingsScreen({super.key});

  @override
  State<BreederRankingsScreen> createState() => _BreederRankingsScreenState();
}

class _BreederRankingsScreenState extends State<BreederRankingsScreen> {
  List<BreederRanking> _breeders = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadRankings();
  }

  Future<void> _loadRankings() async {
    setState(() => _loading = true);
    try {
      // TODO: Wire to API - matingService.getBreederRankings()
      await Future.delayed(const Duration(milliseconds: 500));
      setState(() {
        _breeders = [];
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Top Breeders'),
        centerTitle: true,
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [Color(0xFFFFA726), Color(0xFFFF7043)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
        ),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _breeders.isEmpty
              ? _buildEmpty()
              : RefreshIndicator(
                  onRefresh: _loadRankings,
                  child: CustomScrollView(
                    slivers: [
                      if (_breeders.length >= 3)
                        SliverToBoxAdapter(child: _buildPodium()),
                      SliverList(
                        delegate: SliverChildBuilderDelegate(
                          (context, index) => _buildRankRow(index),
                          childCount: _breeders.length,
                        ),
                      ),
                    ],
                  ),
                ),
    );
  }

  Widget _buildEmpty() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.emoji_events_outlined, size: 64, color: Colors.grey[300]),
          const SizedBox(height: 16),
          Text('No rankings yet', style: TextStyle(fontSize: 18, color: Colors.grey[600])),
        ],
      ),
    );
  }

  Widget _buildPodium() {
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 32, 24, 24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.orange.shade50, Colors.white],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          _buildPodiumItem(_breeders[1], 2, 80),
          const SizedBox(width: 12),
          _buildPodiumItem(_breeders[0], 1, 100),
          const SizedBox(width: 12),
          _buildPodiumItem(_breeders[2], 3, 65),
        ],
      ),
    );
  }

  Widget _buildPodiumItem(BreederRanking breeder, int rank, double height) {
    final medals = ['', '🥇', '🥈', '🥉'];
    final colors = [
      Colors.grey,
      const Color(0xFFFFD700),
      const Color(0xFFC0C0C0),
      const Color(0xFFCD7F32),
    ];
    final isFirst = rank == 1;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(medals[rank], style: const TextStyle(fontSize: 28)),
        const SizedBox(height: 4),
        Container(
          width: isFirst ? 70 : 56,
          height: isFirst ? 70 : 56,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: const Color(0xFFF1379D),
            border: Border.all(color: colors[rank], width: 3),
            boxShadow: isFirst
                ? [BoxShadow(color: colors[rank].withOpacity(0.4), blurRadius: 12)]
                : null,
          ),
          child: Center(
            child: Text(
              breeder.displayName.isNotEmpty ? breeder.displayName[0] : '?',
              style: TextStyle(
                color: Colors.white,
                fontSize: isFirst ? 28 : 22,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          breeder.displayName,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: isFirst ? 15 : 13,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        const SizedBox(height: 4),
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              '${breeder.totalMatches}',
              style: TextStyle(
                color: const Color(0xFFE91E63),
                fontWeight: FontWeight.bold,
                fontSize: isFirst ? 20 : 16,
              ),
            ),
            Text(
              ' matches',
              style: TextStyle(color: Colors.grey[500], fontSize: 11),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Container(
          width: 60,
          height: 4,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(2),
            color: Colors.grey.shade200,
          ),
          child: FractionallySizedBox(
            alignment: Alignment.centerLeft,
            widthFactor: breeder.successRate / 100,
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(2),
                color: Colors.green,
              ),
            ),
          ),
        ),
        const SizedBox(height: 2),
        Text(
          '${breeder.successRate}% success',
          style: TextStyle(color: Colors.grey[500], fontSize: 10),
        ),
        Container(
          margin: const EdgeInsets.only(top: 8),
          width: isFirst ? 80 : 65,
          height: height,
          decoration: BoxDecoration(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(8)),
            gradient: LinearGradient(
              colors: [colors[rank].withOpacity(0.3), colors[rank].withOpacity(0.6)],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
          child: Center(
            child: Text(
              '#$rank',
              style: TextStyle(
                color: colors[rank],
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildRankRow(int index) {
    final breeder = _breeders[index];
    final medals = ['🥇', '🥈', '🥉'];

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          SizedBox(
            width: 36,
            child: Center(
              child: index < 3
                  ? Text(medals[index], style: const TextStyle(fontSize: 20))
                  : Text(
                      '#${index + 1}',
                      style: TextStyle(
                        color: Colors.grey[500],
                        fontWeight: FontWeight.bold,
                      ),
                    ),
            ),
          ),
          const SizedBox(width: 12),
          CircleAvatar(
            radius: 20,
            backgroundColor: const Color(0xFFF1379D),
            child: Text(
              breeder.displayName.isNotEmpty ? breeder.displayName[0] : '?',
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  breeder.displayName,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                ),
                const SizedBox(height: 2),
                Text(
                  '${breeder.totalListings} listings • ${breeder.totalViews} views',
                  style: TextStyle(color: Colors.grey[500], fontSize: 12),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.favorite, color: Color(0xFFE91E63), size: 14),
                  const SizedBox(width: 4),
                  Text(
                    '${breeder.totalMatches}',
                    style: const TextStyle(
                      color: Color(0xFFE91E63),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Container(
                width: 50,
                height: 4,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(2),
                  color: Colors.grey.shade200,
                ),
                child: FractionallySizedBox(
                  alignment: Alignment.centerLeft,
                  widthFactor: breeder.successRate / 100,
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(2),
                      color: breeder.successRate >= 70
                          ? Colors.green
                          : breeder.successRate >= 40
                              ? Colors.orange
                              : Colors.red,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
