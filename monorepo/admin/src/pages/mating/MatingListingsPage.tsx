import { useState } from 'react';
import { Card, Tabs, Modal, message } from 'antd';
import { useApiQuery, useApiMutation } from '@/hooks/useApiQuery';
import { usePermission } from '@/hooks/usePermission';
import type { PaginatedResponse } from '@/types/common';
import { ListingTable } from './components/ListingTable';
import { FlaggedContent } from './components/FlaggedContent';

export interface MatingListing {
  id: string;
  petName: string;
  petPhoto: string;
  breed: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'horse' | 'other';
  ownerName: string;
  ownerEmail: string;
  location: string;
  status: 'active' | 'flagged' | 'removed' | 'suspended';
  reportsCount: number;
  createdAt: string;
}

export default function MatingListingsPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [suspendTarget, setSuspendTarget] = useState<MatingListing | null>(null);
  const [removeTarget, setRemoveTarget] = useState<MatingListing | null>(null);
  const { can } = usePermission();

  const activeQuery = useApiQuery<PaginatedResponse<MatingListing>>(
    ['mating-listings', 'active'],
    '/admin/mating/listings?status=active',
  );

  const flaggedQuery = useApiQuery<PaginatedResponse<MatingListing>>(
    ['mating-listings', 'flagged'],
    '/admin/mating/listings?status=flagged',
  );

  const suspendMutation = useApiMutation<void, { id: string }>(
    '/admin/mating/listings/suspend',
    'post',
    {
      onSuccess: () => {
        message.success('Listing suspended');
        setSuspendTarget(null);
        activeQuery.refetch();
        flaggedQuery.refetch();
      },
    },
  );

  const removeMutation = useApiMutation<void, { id: string }>(
    '/admin/mating/listings/remove',
    'post',
    {
      onSuccess: () => {
        message.success('Listing removed');
        setRemoveTarget(null);
        activeQuery.refetch();
        flaggedQuery.refetch();
      },
    },
  );

  const handleSuspend = (listing: MatingListing) => setSuspendTarget(listing);
  const handleRemove = (listing: MatingListing) => setRemoveTarget(listing);

  const confirmSuspend = () => {
    if (suspendTarget) suspendMutation.mutate({ id: suspendTarget.id });
  };

  const confirmRemove = () => {
    if (removeTarget) removeMutation.mutate({ id: removeTarget.id });
  };

  return (
    <Card title="Mating Listings Moderation">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'active',
            label: 'Active Listings',
            children: (
              <ListingTable
                data={activeQuery.data?.data || []}
                loading={activeQuery.isLoading}
                onSuspend={can('mating_moderate') ? handleSuspend : undefined}
                onRemove={can('mating_moderate') ? handleRemove : undefined}
              />
            ),
          },
          {
            key: 'flagged',
            label: 'Flagged / Reported',
            children: (
              <>
                <ListingTable
                  data={flaggedQuery.data?.data || []}
                  loading={flaggedQuery.isLoading}
                  onSuspend={can('mating_moderate') ? handleSuspend : undefined}
                  onRemove={can('mating_moderate') ? handleRemove : undefined}
                  highlighted
                />
                <FlaggedContent />
              </>
            ),
          },
        ]}
      />

      <Modal
        title="Suspend Listing"
        open={!!suspendTarget}
        onOk={confirmSuspend}
        onCancel={() => setSuspendTarget(null)}
        confirmLoading={suspendMutation.isPending}
        okText="Suspend"
        okButtonProps={{ style: { background: '#faad14' } }}
      >
        <p>
          Are you sure you want to suspend the listing for{' '}
          <strong>{suspendTarget?.petName}</strong>?
        </p>
      </Modal>

      <Modal
        title="Remove Listing"
        open={!!removeTarget}
        onOk={confirmRemove}
        onCancel={() => setRemoveTarget(null)}
        confirmLoading={removeMutation.isPending}
        okText="Remove"
        okButtonProps={{ danger: true }}
      >
        <p>
          This will permanently remove the listing for{' '}
          <strong>{removeTarget?.petName}</strong>. This action cannot be undone.
        </p>
      </Modal>
    </Card>
  );
}
