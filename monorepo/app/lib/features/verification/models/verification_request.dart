class VerificationDocument {
  final String url;
  final String path;
  final String name;
  final String type;
  final String? uploadedAt;

  VerificationDocument({
    required this.url,
    required this.path,
    required this.name,
    required this.type,
    this.uploadedAt,
  });

  factory VerificationDocument.fromJson(Map<String, dynamic> json) {
    return VerificationDocument(
      url: json['url'] ?? '',
      path: json['path'] ?? '',
      name: json['name'] ?? '',
      type: json['type'] ?? '',
      uploadedAt: json['uploadedAt'],
    );
  }

  Map<String, dynamic> toJson() => {
        'url': url,
        'path': path,
        'name': name,
        'type': type,
        if (uploadedAt != null) 'uploadedAt': uploadedAt,
      };
}

class VerificationRequest {
  final String id;
  final String userId;
  final String kennelName;
  final String breedExperience;
  final List<VerificationDocument> documents;
  final String status;
  final int submissionNumber;
  final String? rejectionReason;
  final String? processedBy;
  final String? processedAt;
  final String? expiryDate;
  final String? revokedAt;
  final String? revokedBy;
  final String? revokeReason;
  final String createdAt;

  VerificationRequest({
    required this.id,
    required this.userId,
    required this.kennelName,
    required this.breedExperience,
    required this.documents,
    required this.status,
    required this.submissionNumber,
    this.rejectionReason,
    this.processedBy,
    this.processedAt,
    this.expiryDate,
    this.revokedAt,
    this.revokedBy,
    this.revokeReason,
    required this.createdAt,
  });

  factory VerificationRequest.fromJson(Map<String, dynamic> json) {
    return VerificationRequest(
      id: json['id'] ?? '',
      userId: json['userId'] ?? '',
      kennelName: json['kennelName'] ?? '',
      breedExperience: json['breedExperience'] ?? '',
      documents: (json['documents'] as List<dynamic>?)
              ?.map((d) => VerificationDocument.fromJson(d as Map<String, dynamic>))
              .toList() ??
          [],
      status: json['status'] ?? 'none',
      submissionNumber: json['submissionNumber'] ?? 0,
      rejectionReason: json['rejectionReason'],
      processedBy: json['processedBy'],
      processedAt: json['processedAt'],
      expiryDate: json['expiryDate'],
      revokedAt: json['revokedAt'],
      revokedBy: json['revokedBy'],
      revokeReason: json['revokeReason'],
      createdAt: json['createdAt'] ?? '',
    );
  }

  bool get isPending => status == 'pending';
  bool get isApproved => status == 'approved';
  bool get isRejected => status == 'rejected';
  bool get isRevoked => status == 'revoked';
  bool get canResubmit => status == 'rejected' || status == 'revoked';

  bool get isExpired {
    if (expiryDate == null) return false;
    try {
      return DateTime.parse(expiryDate!).isBefore(DateTime.now());
    } catch (_) {
      return false;
    }
  }
}

class BreederCertificate {
  final String id;
  final String userId;
  final String userName;
  final String userEmail;
  final String kennelName;
  final String breedExperience;
  final String status;
  final int submissionNumber;
  final String? approvedAt;
  final String? expiryDate;
  final String certificateNumber;

  BreederCertificate({
    required this.id,
    required this.userId,
    required this.userName,
    required this.userEmail,
    required this.kennelName,
    required this.breedExperience,
    required this.status,
    required this.submissionNumber,
    this.approvedAt,
    this.expiryDate,
    required this.certificateNumber,
  });

  factory BreederCertificate.fromJson(Map<String, dynamic> json) {
    return BreederCertificate(
      id: json['id'] ?? '',
      userId: json['userId'] ?? '',
      userName: json['userName'] ?? '',
      userEmail: json['userEmail'] ?? '',
      kennelName: json['kennelName'] ?? '',
      breedExperience: json['breedExperience'] ?? '',
      status: json['status'] ?? '',
      submissionNumber: json['submissionNumber'] ?? 0,
      approvedAt: json['approvedAt'],
      expiryDate: json['expiryDate'],
      certificateNumber: json['certificateNumber'] ?? '',
    );
  }

  bool get isExpired {
    if (expiryDate == null) return false;
    try {
      return DateTime.parse(expiryDate!).isBefore(DateTime.now());
    } catch (_) {
      return false;
    }
  }
}
