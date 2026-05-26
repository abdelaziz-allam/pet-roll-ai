import { Avatar, Card, Tag, Space, Button, Image, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import type { Verification } from '@/services/verification.service';
import { formatDate } from '@/utils/format';
import { relativeTime } from '@/utils/date';

const { Text, Paragraph } = Typography;

interface VerificationCardProps {
  verification: Verification;
  onApprove: (verification: Verification) => void;
  onReject: (verification: Verification) => void;
}

export default function VerificationCard({
  verification,
  onApprove,
  onReject,
}: VerificationCardProps) {
  return (
    <Card
      style={{ marginBottom: 16 }}
      bodyStyle={{ padding: 20 }}
    >
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 200px' }}>
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Avatar
              size={64}
              src={verification.userAvatar}
              icon={<UserOutlined />}
            />
            <Text strong>{verification.userName}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {verification.userEmail}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Joined {relativeTime(verification.userJoinDate)}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {verification.petCount} pet{verification.petCount !== 1 ? 's' : ''} registered
            </Text>
          </Space>
        </div>

        <div style={{ flex: 1, minWidth: 200 }}>
          {verification.breeds?.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              {verification.breeds.map((breed) => (
                <Tag key={breed} color="blue" style={{ marginBottom: 4 }}>
                  {breed}
                </Tag>
              ))}
            </div>
          )}

          {verification.description && (
            <Paragraph
              type="secondary"
              ellipsis={{ rows: 3, expandable: true }}
              style={{ marginBottom: 12 }}
            >
              {verification.description}
            </Paragraph>
          )}

          {verification.documents?.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Documents ({verification.documents.length})
              </Text>
              <Image.PreviewGroup>
                <Space wrap>
                  {verification.documents.map((doc, idx) => (
                    <Image
                      key={idx}
                      src={doc}
                      width={80}
                      height={80}
                      style={{ objectFit: 'cover', borderRadius: 4 }}
                      alt={`Document ${idx + 1}`}
                    />
                  ))}
                </Space>
              </Image.PreviewGroup>
            </div>
          )}

          <Text type="secondary" style={{ fontSize: 12 }}>
            Submitted {formatDate(verification.createdAt)}
          </Text>
        </div>

        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            onClick={() => onApprove(verification)}
          >
            Approve
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => onReject(verification)}
          >
            Reject
          </Button>
        </div>
      </div>
    </Card>
  );
}
