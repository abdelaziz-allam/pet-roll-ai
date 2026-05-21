import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';
import 'pet_mating_profile_screen.dart';

class MatingRequestDetailScreen extends StatefulWidget {
  final Map<String, dynamic> request;
  final bool isSent;

  const MatingRequestDetailScreen({
    super.key,
    required this.request,
    required this.isSent,
  });

  @override
  State<MatingRequestDetailScreen> createState() => _MatingRequestDetailScreenState();
}

class _MatingRequestDetailScreenState extends State<MatingRequestDetailScreen> {
  late Map<String, dynamic> _request;
  bool _responding = false;

  @override
  void initState() {
    super.initState();
    _request = widget.request;
  }

  Future<void> _respondToRequest(String status) async {
    setState(() => _responding = true);
    try {
      await ApiService().put('/mating/requests/${_request['id']}/respond', {'status': status});
      setState(() {
        _request = {..._request, 'status': status};
        _responding = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(status == 'accepted' ? 'Request accepted!' : 'Request declined'),
            backgroundColor: status == 'accepted' ? AppTheme.success : AppTheme.textSecondary,
          ),
        );
      }
    } catch (e) {
      setState(() => _responding = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final status = _request['status'] ?? 'pending';
    final listing = _request['listing'] as Map<String, dynamic>?;
    final pet = _request['pet'] as Map<String, dynamic>?;
    final sender = _request['sender'] as Map<String, dynamic>?;
    final receiver = _request['receiver'] as Map<String, dynamic>?;
    final message = _request['message'] as String?;
    final createdAt = _request['createdAt'];

    final listingPetName = listing?['petName'] ?? 'Unknown Pet';
    final listingBreed = listing?['breed'] ?? '';
    final listingSpecies = listing?['species'] ?? '';
    final listingLocation = listing?['location'];
    final listingPhotos = listing?['photos'] as List? ?? [];
    final listingPetId = listing?['petId'] as String?;

    final myPetName = pet?['name'] ?? 'My Pet';
    final myPetBreed = pet?['breed'] ?? '';
    final myPetSpecies = pet?['species'] ?? '';
    final myPetPhotos = pet?['photos'] as List? ?? [];
    final myPetId = pet?['id'] as String?;

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

    String? listingPhotoUrl;
    if (listingPhotos.isNotEmpty) {
      final p = listingPhotos[0];
      listingPhotoUrl = p is String ? p : (p is Map ? p['url'] : null);
    }

    String? myPetPhotoUrl;
    if (myPetPhotos.isNotEmpty) {
      final p = myPetPhotos[0];
      myPetPhotoUrl = p is String ? p : (p is Map ? p['url'] : null);
    }

    String locationStr = '';
    if (listingLocation is Map) {
      final city = listingLocation['city'] ?? '';
      final country = listingLocation['country'] ?? '';
      locationStr = [city, country].where((s) => s.isNotEmpty).join(', ');
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Request Details', style: TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          // Status badge
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: statusColor.withOpacity(0.08),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: statusColor.withOpacity(0.3)),
            ),
            child: Row(
              children: [
                Icon(statusIcon, color: statusColor, size: 24),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(statusLabel, style: TextStyle(color: statusColor, fontWeight: FontWeight.w700, fontSize: 16)),
                      if (createdAt != null)
                        Text(_formatFullDate(createdAt), style: TextStyle(color: Colors.grey[600], fontSize: 12)),
                    ],
                  ),
                ),
                if (status == 'accepted')
                  const Icon(Icons.celebration, color: AppTheme.success, size: 28),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Listing pet card
          const Text('Listing Pet', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textSecondary)),
          const SizedBox(height: 8),
          _buildPetCard(
            name: listingPetName,
            breed: listingBreed,
            species: listingSpecies,
            photoUrl: listingPhotoUrl,
            location: locationStr,
            ownerName: widget.isSent ? (receiver?['displayName'] ?? 'Pet Owner') : 'You',
            onTap: listingPetId != null
                ? () => Navigator.push(context, MaterialPageRoute(
                    builder: (_) => PetMatingProfileScreen(petId: listingPetId),
                  ))
                : null,
          ),

          const SizedBox(height: 16),

          // Center connector
          Center(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: AppTheme.primary.withOpacity(0.08),
                borderRadius: BorderRadius.circular(20),
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.favorite, color: AppTheme.primary, size: 18),
                  SizedBox(width: 6),
                  Text('Mating Request', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.w600, fontSize: 13)),
                ],
              ),
            ),
          ),

          const SizedBox(height: 16),

          // Your pet card
          const Text('Your Pet', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textSecondary)),
          const SizedBox(height: 8),
          _buildPetCard(
            name: myPetName,
            breed: myPetBreed,
            species: myPetSpecies,
            photoUrl: myPetPhotoUrl,
            ownerName: widget.isSent ? (sender?['displayName'] ?? 'You') : (sender?['displayName'] ?? 'Pet Owner'),
            onTap: myPetId != null
                ? () => Navigator.push(context, MaterialPageRoute(
                    builder: (_) => PetMatingProfileScreen(petId: myPetId),
                  ))
                : null,
          ),

          // Message section
          if (message != null && message.isNotEmpty) ...[
            const SizedBox(height: 24),
            const Text('Message', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textSecondary)),
            const SizedBox(height: 8),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                boxShadow: AppTheme.cardShadow,
                border: Border(left: BorderSide(color: AppTheme.primary.withOpacity(0.5), width: 4)),
              ),
              child: Text(
                '"$message"',
                style: TextStyle(fontSize: 15, fontStyle: FontStyle.italic, color: Colors.grey[700], height: 1.4),
              ),
            ),
          ],

          // Match confirmed section
          if (status == 'accepted') ...[
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppTheme.success.withOpacity(0.08), AppTheme.primary.withOpacity(0.05)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.success.withOpacity(0.3)),
              ),
              child: Column(
                children: [
                  const Icon(Icons.celebration, color: AppTheme.success, size: 40),
                  const SizedBox(height: 12),
                  const Text('Match Confirmed!', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: AppTheme.success)),
                  const SizedBox(height: 8),
                  Text(
                    widget.isSent
                        ? '${receiver?['displayName'] ?? 'The owner'} accepted your mating request for $listingPetName'
                        : 'You accepted the mating request from ${sender?['displayName'] ?? 'the owner'}',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 14, color: Colors.grey[700]),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _buildMiniPetAvatar(listingPhotoUrl, listingPetName),
                      const SizedBox(width: 8),
                      const Icon(Icons.favorite, color: AppTheme.primary, size: 20),
                      const SizedBox(width: 8),
                      _buildMiniPetAvatar(myPetPhotoUrl, myPetName),
                    ],
                  ),
                ],
              ),
            ),
          ],

          // Action buttons for pending received requests
          if (!widget.isSent && status == 'pending') ...[
            const SizedBox(height: 32),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: _responding ? null : () => _respondToRequest('rejected'),
                    icon: const Icon(Icons.close, size: 20),
                    label: const Text('Decline', style: TextStyle(fontSize: 16)),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: AppTheme.error,
                      side: const BorderSide(color: AppTheme.error),
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _responding ? null : () => _respondToRequest('accepted'),
                    icon: const Icon(Icons.check, size: 20),
                    label: const Text('Accept', style: TextStyle(fontSize: 16)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.success,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                  ),
                ),
              ],
            ),
          ],

          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildPetCard({
    required String name,
    required String breed,
    required String species,
    String? photoUrl,
    String? location,
    String? ownerName,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: AppTheme.cardShadow,
        ),
        child: Row(
          children: [
            Container(
              width: 70,
              height: 70,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(14),
                color: AppTheme.primary.withOpacity(0.08),
                image: photoUrl != null
                    ? DecorationImage(
                        image: CachedNetworkImageProvider(photoUrl),
                        fit: BoxFit.cover,
                      )
                    : null,
              ),
              child: photoUrl == null
                  ? Center(child: Text(_speciesEmoji(species), style: const TextStyle(fontSize: 30)))
                  : null,
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(name, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 4),
                  if (breed.isNotEmpty || species.isNotEmpty)
                    Text(
                      [breed, species].where((s) => s.isNotEmpty).join(' • '),
                      style: TextStyle(color: Colors.grey[600], fontSize: 13),
                    ),
                  if (location != null && location.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Icon(Icons.location_on, size: 14, color: Colors.grey[500]),
                        const SizedBox(width: 3),
                        Text(location, style: TextStyle(color: Colors.grey[500], fontSize: 12)),
                      ],
                    ),
                  ],
                  if (ownerName != null) ...[
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Icon(Icons.person, size: 14, color: Colors.grey[500]),
                        const SizedBox(width: 3),
                        Text('Owner: $ownerName', style: TextStyle(color: Colors.grey[500], fontSize: 12)),
                      ],
                    ),
                  ],
                ],
              ),
            ),
            if (onTap != null)
              Icon(Icons.chevron_right, color: Colors.grey[400], size: 22),
          ],
        ),
      ),
    );
  }

  Widget _buildMiniPetAvatar(String? photoUrl, String name) {
    return Container(
      width: 44,
      height: 44,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: AppTheme.primary.withOpacity(0.1),
        border: Border.all(color: Colors.white, width: 2),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 4)],
        image: photoUrl != null
            ? DecorationImage(image: CachedNetworkImageProvider(photoUrl), fit: BoxFit.cover)
            : null,
      ),
      child: photoUrl == null
          ? Center(child: Text(name.isNotEmpty ? name[0] : '?', style: const TextStyle(fontWeight: FontWeight.w700, color: AppTheme.primary)))
          : null,
    );
  }

  String _formatFullDate(dynamic dateValue) {
    try {
      DateTime date;
      if (dateValue is String) {
        date = DateTime.parse(dateValue);
      } else if (dateValue is Map && dateValue['_seconds'] != null) {
        date = DateTime.fromMillisecondsSinceEpoch((dateValue['_seconds'] as num).toInt() * 1000);
      } else {
        return '';
      }
      final months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return '${months[date.month - 1]} ${date.day}, ${date.year}';
    } catch (_) {
      return '';
    }
  }

  String _speciesEmoji(String species) {
    const map = {'dog': '\u{1F415}', 'cat': '\u{1F431}', 'bird': '\u{1F99C}', 'horse': '\u{1F434}', 'rabbit': '\u{1F430}'};
    return map[species] ?? '\u{1F43E}';
  }
}
