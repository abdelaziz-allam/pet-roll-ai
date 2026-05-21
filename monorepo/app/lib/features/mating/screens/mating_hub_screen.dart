import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';
import 'mating_browse_screen.dart';
import 'mating_matches_screen.dart';

class MatingHubScreen extends StatefulWidget {
  const MatingHubScreen({super.key});

  @override
  State<MatingHubScreen> createState() => _MatingHubScreenState();
}

class _MatingHubScreenState extends State<MatingHubScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mating', style: TextStyle(fontWeight: FontWeight.w700)),
        bottom: TabBar(
          controller: _tabController,
          labelColor: AppTheme.primary,
          unselectedLabelColor: AppTheme.textSecondary,
          indicatorColor: AppTheme.primary,
          indicatorWeight: 3,
          tabs: const [
            Tab(icon: Icon(Icons.search, size: 20), text: 'Browse'),
            Tab(icon: Icon(Icons.favorite, size: 20), text: 'My Requests'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: const [
          MatingBrowseScreen(),
          MatingMatchesScreen(),
        ],
      ),
    );
  }
}
