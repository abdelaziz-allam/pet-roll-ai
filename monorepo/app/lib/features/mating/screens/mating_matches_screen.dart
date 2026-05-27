import 'package:flutter/material.dart';
import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';
import 'mating_request_detail_screen.dart';

class MatingMatchesScreen extends StatefulWidget {
  const MatingMatchesScreen({super.key});

  @override
  State<MatingMatchesScreen> createState() => _MatingMatchesScreenState();
}

class _MatingMatchesScreenState extends State<MatingMatchesScreen> with SingleTickerProviderStateMixin {
  List<dynamic> _sentRequests = [];
  List<dynamic> _receivedRequests = [];
  bool _loading = true;
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadRequests();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _loadRequests() async {
    setState(() => _loading = true);
    try {
      final results = await Future.wait([
        ApiService().get('/mating/requests/sent'),
        ApiService().get('/mating/requests/received'),
      ]);
      setState(() {
        _sentRequests = results[0] is List ? results[0] : [];
        _receivedRequests = results[1] is List ? results[1] : [];
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _sentRequests = [];
        _receivedRequests = [];
        _loading = false;
      });
    }
  }

  Future<void> _respondToRequest(String requestId, String status) async {
    try {
      await ApiService().put('/mating/requests/$requestId/respond', {'status': status});
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(status == 'accepted' ? 'Request accepted!' : 'Request rejected'),
          backgroundColor: status == 'accepted' ? AppTheme.success : AppTheme.textSecondary,
        ),
      );
      _loadRequests();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          margin: const EdgeInsets.fromLTRB(16, 12, 16, 8),
          decoration: BoxDecoration(
            color: Colors.grey.shade100,
            borderRadius: BorderRadius.circular(12),
          ),
          child: TabBar(
            controller: _tabController,
            labelColor: Colors.white,
            unselectedLabelColor: AppTheme.textSecondary,
            indicator: BoxDecoration(
              color: AppTheme.primary,
              borderRadius: BorderRadius.circular(12),
            ),
            indicatorSize: TabBarIndicatorSize.tab,
            dividerHeight: 0,
            tabs: [
              Tab(text: 'Sent (${_sentRequests.length})'),
              Tab(text: 'Received (${_receivedRequests.length})'),
            ],
          ),
        ),
        Expanded(
          child: _loading
              ? const Center(child: CircularProgressIndicator(color: AppTheme.primary))
              : TabBarView(
                  controller: _tabController,
                  children: [
                    _buildRequestsList(_sentRequests, isSent: true),
                    _buildRequestsList(_receivedRequests, isSent: false),
                  ],
                ),
        ),
      ],
    );
  }

  Widget _buildRequestsList(List<dynamic> requests, {required bool isSent}) {
    if (requests.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppTheme.primary.withOpacity(0.08),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  isSent ? Icons.send_outlined : Icons.inbox_outlined,
                  size: 40,
                  color: AppTheme.primary.withOpacity(0.5),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                isSent ? 'No sent requests' : 'No received requests',
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 6),
              Text(
                isSent
                    ? 'Browse listings and send mating requests to other pet owners'
                    : 'When someone sends you a mating request, it will appear here',
                textAlign: TextAlign.center,
                style: const TextStyle(color: AppTheme.textSecondary, fontSize: 13),
              ),
            ],
          ),
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: _loadRequests,
      child: ListView.builder(
        padding: const EdgeInsets.fromLTRB(16, 4, 16, 16),
        itemCount: requests.length,
        itemBuilder: (ctx, i) => _buildRequestCard(requests[i], isSent: isSent),
      ),
    );
  }

  Widget _buildRequestCard(dynamic request, {required bool isSent}) {
    final status = request['status'] ?? 'pending';
    final message = request['message'] as String?;
    final createdAt = request['createdAt'] != null ? _formatDate(request['createdAt']) : '';

    final listing = request['listing'] as Map<String, dynamic>?;
    final pet = request['pet'] as Map<String, dynamic>?;
    final sender = request['sender'] as Map<String, dynamic>?;
    final receiver = request['receiver'] as Map<String, dynamic>?;

    final listingPetName = listing?['petName'] ?? 'Unknown Pet';
    final listingBreed = listing?['breed'] ?? '';
    final listingSpecies = listing?['species'] ?? '';
    final listingLocation = listing?['location'];
    final listingPhotos = listing?['photos'] as List? ?? [];

    final myPetName = pet?['name'] ?? 'My Pet';
    final myPetBreed = pet?['breed'] ?? '';

    final otherPersonName = isSent
        ? (receiver?['displayName'] ?? 'Pet Owner')
        : (sender?['displayName'] ?? 'Pet Owner');

    String? photoUrl;
    if (listingPhotos.isNotEmpty) {
      final p = listingPhotos[0];
      photoUrl = p is String ? p : (p is Map ? p['url'] : null);
    }

    Color statusColor;
    IconData statusIcon;
    String statusLabel;

    switch (status) {
      case 'accepted':
        statusColor = AppTheme.success;
        statusIcon = Icons.check_circle;
        statusLabel = 'Accepted';
        break;
      case 'rejected':
        statusColor = AppTheme.error;
        statusIcon = Icons.cancel;
        statusLabel = 'Rejected';
        break;
      default:
        statusColor = Colors.orange;
        statusIcon = Icons.access_time;
        statusLabel = 'Pending';
    }

    String locationStr = '';
    if (listingLocation != null && listingLocation is Map) {
      final city = listingLocation['city'] ?? '';
      final country = listingLocation['country'] ?? '';
      if (city.isNotEmpty && country.isNotEmpty) {
        locationStr = '$city, $country';
      } else if (city.isNotEmpty) {
        locationStr = city;
      } else if (country.isNotEmpty) {
        locationStr = country;
      }
    }

    return GestureDetector(
      onTap: () async {
        final result = await Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => MatingRequestDetailScreen(
              request: Map<String, dynamic>.from(request),
              isSent: isSent,
            ),
          ),
        );
        if (result == true) _loadRequests();
      },
      child: Container(
      margin: const EdgeInsets.only(bottom: 14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Status header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: statusColor.withOpacity(0.06),
              borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
            ),
            child: Row(
              children: [
                Icon(statusIcon, color: statusColor, size: 18),
                const SizedBox(width: 8),
                Text(statusLabel, style: TextStyle(color: statusColor, fontWeight: FontWeight.w700, fontSize: 14)),
                const Spacer(),
                Text(createdAt, style: TextStyle(color: Colors.grey[500], fontSize: 12)),
              ],
            ),
          ),

          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Pet info row with photo
                Row(
                  children: [
                    // Pet photo or placeholder
                    Container(
                      width: 56,
                      height: 56,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(14),
                        color: AppTheme.primary.withOpacity(0.08),
                        image: photoUrl != null
                            ? DecorationImage(image: NetworkImage(photoUrl), fit: BoxFit.cover)
                            : null,
                      ),
                      child: photoUrl == null
                          ? Icon(Icons.pets, color: AppTheme.primary.withOpacity(0.4), size: 28)
                          : null,
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            listingPetName,
                            style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
                          ),
                          const SizedBox(height: 3),
                          if (listingBreed.isNotEmpty || listingSpecies.isNotEmpty)
                            Text(
                              [listingBreed, listingSpecies].where((s) => s.isNotEmpty).join(' • '),
                              style: TextStyle(color: Colors.grey[600], fontSize: 13),
                            ),
                          if (locationStr.isNotEmpty) ...[
                            const SizedBox(height: 2),
                            Row(
                              children: [
                                Icon(Icons.location_on, size: 13, color: Colors.grey[500]),
                                const SizedBox(width: 3),
                                Expanded(
                                  child: Text(
                                    locationStr,
                                    style: TextStyle(color: Colors.grey[500], fontSize: 12),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ],
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 14),
                // Divider
                Divider(height: 1, color: Colors.grey.shade100),
                const SizedBox(height: 14),

                // Details row
                Row(
                  children: [
                    _buildDetailChip(
                      icon: isSent ? Icons.arrow_upward : Icons.arrow_downward,
                      label: isSent ? 'Sent to' : 'From',
                      value: otherPersonName,
                      color: isSent ? AppTheme.primary : Colors.deepPurple,
                    ),
                    const SizedBox(width: 12),
                    if (pet != null)
                      _buildDetailChip(
                        icon: Icons.pets,
                        label: 'Your Pet',
                        value: myPetName,
                        color: Colors.teal,
                      ),
                  ],
                ),

                // Message
                if (message != null && message.isNotEmpty) ...[
                  const SizedBox(height: 14),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade50,
                      borderRadius: BorderRadius.circular(10),
                      border: Border(left: BorderSide(color: AppTheme.primary.withOpacity(0.4), width: 3)),
                    ),
                    child: Text(
                      '"$message"',
                      style: TextStyle(fontStyle: FontStyle.italic, fontSize: 13, color: Colors.grey[700]),
                    ),
                  ),
                ],

                // Contact info for accepted requests
                if (status == 'accepted') ...[
                  const SizedBox(height: 14),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: AppTheme.success.withOpacity(0.06),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppTheme.success.withOpacity(0.2)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.celebration, color: AppTheme.success, size: 22),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Match Confirmed!',
                                style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: AppTheme.success),
                              ),
                              const SizedBox(height: 3),
                              Text(
                                isSent
                                    ? '$otherPersonName accepted your request for $listingPetName'
                                    : 'You accepted the request from $otherPersonName',
                                style: TextStyle(fontSize: 12, color: Colors.grey[700]),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],

                // Action buttons for pending received requests
                if (!isSent && status == 'pending') ...[
                  const SizedBox(height: 14),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () => _respondToRequest(request['id'], 'rejected'),
                          icon: const Icon(Icons.close, size: 18),
                          label: const Text('Decline'),
                          style: OutlinedButton.styleFrom(
                            foregroundColor: AppTheme.error,
                            side: const BorderSide(color: AppTheme.error),
                            padding: const EdgeInsets.symmetric(vertical: 10),
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () => _respondToRequest(request['id'], 'accepted'),
                          icon: const Icon(Icons.check, size: 18),
                          label: const Text('Accept'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppTheme.success,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 10),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    ),
    );
  }

  Widget _buildDetailChip({
    required IconData icon,
    required String label,
    required String value,
    required Color color,
  }) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        decoration: BoxDecoration(
          color: color.withOpacity(0.06),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          children: [
            Icon(icon, size: 16, color: color),
            const SizedBox(width: 6),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label, style: TextStyle(fontSize: 10, color: color.withOpacity(0.7))),
                  Text(
                    value,
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: color),
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _formatDate(dynamic dateValue) {
    try {
      if (dateValue is String) {
        final date = DateTime.parse(dateValue);
        final months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return '${months[date.month - 1]} ${date.day}';
      }
      if (dateValue is Map && dateValue['_seconds'] != null) {
        final date = DateTime.fromMillisecondsSinceEpoch((dateValue['_seconds'] as num).toInt() * 1000);
        final months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return '${months[date.month - 1]} ${date.day}';
      }
      return '';
    } catch (_) {
      return '';
    }
  }
}
