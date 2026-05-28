import { useState, useEffect } from 'react';
import {
  Table, Card, Button, Modal, Form, Input, Switch, Space, Typography, Tag, message, Tooltip, Popconfirm,
} from 'antd';
import {
  PlusOutlined, EditOutlined, DeleteOutlined,
} from '@ant-design/icons';
import { api } from '@/services/api';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ANIMAL_EMOJIS: Array<{ emoji: string; keywords: string }> = [
  // Dogs
  { emoji: '🐕', keywords: 'dog canine pet domestic hound' },
  { emoji: '🐶', keywords: 'dog puppy face pet cute' },
  { emoji: '🐩', keywords: 'poodle dog fancy groomed' },
  { emoji: '🦮', keywords: 'guide dog service assistance' },
  { emoji: '🐕‍🦺', keywords: 'service dog vest working' },
  // Cats
  { emoji: '🐈', keywords: 'cat feline pet domestic' },
  { emoji: '🐱', keywords: 'cat kitten face pet cute' },
  { emoji: '🐈‍⬛', keywords: 'black cat feline dark' },
  // Big cats & wild felines
  { emoji: '🦁', keywords: 'lion king jungle mane wild cat big' },
  { emoji: '🐯', keywords: 'tiger stripes wild cat big' },
  { emoji: '🐆', keywords: 'leopard spots wild cat big panther' },
  { emoji: '🐅', keywords: 'tiger wild cat big stripes' },
  // Horses & equines
  { emoji: '🐴', keywords: 'horse face equine stallion mare' },
  { emoji: '🐎', keywords: 'horse racing gallop equine' },
  { emoji: '🦄', keywords: 'unicorn horse magical mythical' },
  { emoji: '🦓', keywords: 'zebra stripes africa equine' },
  { emoji: '🫏', keywords: 'donkey mule burro equine' },
  // Farm animals
  { emoji: '🐮', keywords: 'cow cattle bovine farm dairy' },
  { emoji: '🐄', keywords: 'cow cattle bovine farm dairy' },
  { emoji: '🐷', keywords: 'pig pork swine farm face' },
  { emoji: '🐖', keywords: 'pig pork swine farm' },
  { emoji: '🐗', keywords: 'boar wild pig tusks' },
  { emoji: '🐑', keywords: 'sheep lamb wool farm ewe' },
  { emoji: '🐏', keywords: 'ram sheep male horns farm' },
  { emoji: '🐐', keywords: 'goat farm billy horns' },
  { emoji: '🐓', keywords: 'rooster chicken cock farm bird' },
  { emoji: '🐔', keywords: 'chicken hen farm bird poultry' },
  { emoji: '🐣', keywords: 'chick hatching baby bird egg' },
  { emoji: '🐤', keywords: 'chick baby bird yellow' },
  { emoji: '🐥', keywords: 'chick front baby bird' },
  { emoji: '🦃', keywords: 'turkey farm bird poultry gobble' },
  { emoji: '🦆', keywords: 'duck farm bird pond mallard' },
  { emoji: '🦢', keywords: 'swan bird elegant white lake' },
  { emoji: '🪿', keywords: 'goose bird farm honk' },
  // Rabbits & rodents
  { emoji: '🐰', keywords: 'rabbit bunny face pet cute' },
  { emoji: '🐇', keywords: 'rabbit bunny hop pet' },
  { emoji: '🐹', keywords: 'hamster face pet rodent small' },
  { emoji: '🐭', keywords: 'mouse face rodent small' },
  { emoji: '🐀', keywords: 'rat rodent' },
  { emoji: '🐿️', keywords: 'squirrel chipmunk rodent' },
  { emoji: '🦫', keywords: 'beaver rodent dam' },
  { emoji: '🦔', keywords: 'hedgehog spiny small pet' },
  { emoji: '🦡', keywords: 'badger striped mustelid' },
  // Bears & large mammals
  { emoji: '🐻', keywords: 'bear grizzly brown wild large' },
  { emoji: '🐻‍❄️', keywords: 'polar bear white arctic' },
  { emoji: '🐼', keywords: 'panda bear bamboo china' },
  { emoji: '🐨', keywords: 'koala bear australia marsupial' },
  // Primates
  { emoji: '🐵', keywords: 'monkey face primate' },
  { emoji: '🙈', keywords: 'monkey see primate' },
  { emoji: '🦍', keywords: 'gorilla ape primate large' },
  { emoji: '🦧', keywords: 'orangutan ape primate' },
  // Marine mammals
  { emoji: '🐬', keywords: 'dolphin marine ocean sea mammal' },
  { emoji: '🐳', keywords: 'whale marine ocean sea large spout' },
  { emoji: '🐋', keywords: 'whale marine ocean sea humpback' },
  { emoji: '🦭', keywords: 'seal marine ocean sea pinniped' },
  { emoji: '🦈', keywords: 'shark marine ocean sea fish predator' },
  // Fish
  { emoji: '🐠', keywords: 'fish tropical aquarium colorful' },
  { emoji: '🐟', keywords: 'fish generic aquarium' },
  { emoji: '🐡', keywords: 'pufferfish blowfish fish' },
  { emoji: '🐙', keywords: 'octopus tentacles marine sea' },
  { emoji: '🦑', keywords: 'squid marine sea tentacles' },
  { emoji: '🦐', keywords: 'shrimp prawn marine seafood' },
  { emoji: '🦞', keywords: 'lobster marine seafood crustacean' },
  { emoji: '🦀', keywords: 'crab marine seafood crustacean' },
  { emoji: '🐚', keywords: 'shell sea conch marine' },
  { emoji: '🪼', keywords: 'jellyfish marine ocean translucent' },
  // Birds
  { emoji: '🦜', keywords: 'parrot bird tropical colorful pet' },
  { emoji: '🐦', keywords: 'bird generic feathered' },
  { emoji: '🐦‍🔥', keywords: 'phoenix bird fire mythical' },
  { emoji: '🦅', keywords: 'eagle bird raptor prey bald' },
  { emoji: '🦉', keywords: 'owl bird night wise nocturnal' },
  { emoji: '🦚', keywords: 'peacock bird colorful display' },
  { emoji: '🦩', keywords: 'flamingo bird pink tropical' },
  { emoji: '🕊️', keywords: 'dove bird peace white pigeon' },
  { emoji: '🐧', keywords: 'penguin bird arctic cold tuxedo' },
  { emoji: '🦤', keywords: 'dodo bird extinct' },
  { emoji: '🪶', keywords: 'feather bird plume' },
  { emoji: '🦇', keywords: 'bat flying nocturnal mammal' },
  // Reptiles
  { emoji: '🦎', keywords: 'lizard reptile gecko iguana pet' },
  { emoji: '🐍', keywords: 'snake reptile serpent python cobra' },
  { emoji: '🐢', keywords: 'turtle tortoise reptile shell pet' },
  { emoji: '🐊', keywords: 'crocodile reptile alligator' },
  { emoji: '🦖', keywords: 'dinosaur trex reptile extinct' },
  { emoji: '🦕', keywords: 'dinosaur sauropod reptile extinct brontosaurus' },
  // Amphibians
  { emoji: '🐸', keywords: 'frog toad amphibian green' },
  { emoji: '🦎', keywords: 'salamander newt amphibian' },
  // Insects & arachnids
  { emoji: '🦋', keywords: 'butterfly insect colorful wings' },
  { emoji: '🐝', keywords: 'bee honeybee insect buzzing' },
  { emoji: '🐛', keywords: 'caterpillar insect bug larva' },
  { emoji: '🐜', keywords: 'ant insect colony' },
  { emoji: '🪲', keywords: 'beetle insect bug' },
  { emoji: '🐞', keywords: 'ladybug ladybird insect spotted' },
  { emoji: '🦗', keywords: 'cricket insect chirp' },
  { emoji: '🪳', keywords: 'cockroach insect bug' },
  { emoji: '🕷️', keywords: 'spider arachnid web' },
  { emoji: '🦂', keywords: 'scorpion arachnid sting' },
  { emoji: '🪰', keywords: 'fly insect bug' },
  { emoji: '🦟', keywords: 'mosquito insect bite' },
  { emoji: '🐌', keywords: 'snail slug shell slow' },
  { emoji: '🪱', keywords: 'worm earthworm' },
  // African & exotic
  { emoji: '🐘', keywords: 'elephant large africa asia tusks' },
  { emoji: '🦏', keywords: 'rhinoceros rhino africa horn' },
  { emoji: '🦛', keywords: 'hippopotamus hippo africa river' },
  { emoji: '🦒', keywords: 'giraffe tall africa spots neck' },
  { emoji: '🐪', keywords: 'camel dromedary one hump desert' },
  { emoji: '🐫', keywords: 'camel bactrian two humps desert' },
  { emoji: '🦙', keywords: 'llama alpaca south america' },
  { emoji: '🦌', keywords: 'deer stag antlers forest' },
  { emoji: '🫎', keywords: 'moose elk antlers large deer' },
  { emoji: '🦬', keywords: 'bison buffalo american plains' },
  // Australian & special
  { emoji: '🦘', keywords: 'kangaroo australia marsupial jump' },
  { emoji: '🦥', keywords: 'sloth slow tree lazy' },
  { emoji: '🦦', keywords: 'otter water playful river sea' },
  { emoji: '🦨', keywords: 'skunk spray striped' },
  { emoji: '🐾', keywords: 'paw print animal pet footprint' },
  { emoji: '🦴', keywords: 'bone dog pet treat' },
  // Additional pets & exotics
  { emoji: '🪺', keywords: 'nest eggs bird home' },
  { emoji: '🐊', keywords: 'crocodile alligator caiman reptile' },
  { emoji: '🦃', keywords: 'turkey bird farm' },
  { emoji: '🐺', keywords: 'wolf wild dog canine' },
  { emoji: '🦊', keywords: 'fox wild red canine' },
  { emoji: '🦝', keywords: 'raccoon masked nocturnal' },
];

const EmojiPicker: React.FC<{ value?: string; onChange?: (val: string) => void }> = ({ value, onChange }) => {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? ANIMAL_EMOJIS.filter((e) => e.keywords.toLowerCase().includes(search.toLowerCase()))
    : ANIMAL_EMOJIS;

  return (
    <div>
      {value && (
        <div style={{ marginBottom: 8 }}>
          <Text>Selected: </Text>
          <span style={{ fontSize: 28 }}>{value}</span>
          <Button size="small" type="link" onClick={() => onChange?.('')}>Clear</Button>
        </div>
      )}
      <Input
        placeholder="Search icons... (e.g. dog, eagle, fish, snake)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
        style={{ marginBottom: 8 }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4, maxHeight: 200, overflowY: 'auto', border: '1px solid #f0f0f0', borderRadius: 8, padding: 8 }}>
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 12, color: '#999' }}>No matching icons</div>
        )}
        {filtered.map((item, idx) => (
          <Tooltip key={`${item.emoji}-${idx}`} title={item.keywords.split(' ').slice(0, 3).join(', ')}>
            <div
              onClick={() => onChange?.(item.emoji)}
              style={{
                fontSize: 22,
                cursor: 'pointer',
                textAlign: 'center',
                padding: '4px 0',
                borderRadius: 6,
                background: value === item.emoji ? '#fff0f6' : undefined,
                border: value === item.emoji ? '2px solid #F1379D' : '2px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              {item.emoji}
            </div>
          </Tooltip>
        ))}
      </div>
      <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: 'block' }}>
        {filtered.length} icons{search ? ` matching "${search}"` : ' available'}
      </Text>
    </div>
  );
};

interface PetCategory {
  id: string;
  name: string;
  label: string;
  icon?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<PetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<PetCategory | null>(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get<PetCategory[]>('/admin/categories');
      setCategories(res);
    } catch (err: any) {
      message.error(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true });
    setModalOpen(true);
  };

  const handleEdit = (category: PetCategory) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      label: category.label,
      icon: category.icon || '',
      description: category.description || '',
      isActive: category.isActive,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/admin/categories/${id}`);
      message.success('Category deleted');
      fetchCategories();
    } catch (err: any) {
      message.error(err.message || 'Failed to delete category');
    }
  };

  const handleSeed = async () => {
    try {
      await api.post('/admin/categories/seed', {});
      message.success('Default categories seeded successfully');
      fetchCategories();
    } catch (err: any) {
      message.error(err.message || 'Failed to seed categories');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await api.put(`/admin/categories/${editingCategory.id}`, {
          label: values.label,
          icon: values.icon || undefined,
          description: values.description || undefined,
          isActive: values.isActive,
        });
        message.success('Category updated');
      } else {
        await api.post('/admin/categories', {
          name: values.name,
          label: values.label,
          icon: values.icon || undefined,
          description: values.description || undefined,
        });
        message.success('Category created');
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      if (err.message) {
        message.error(err.message);
      }
    }
  };

  const handleToggleActive = async (category: PetCategory, checked: boolean) => {
    try {
      await api.put(`/admin/categories/${category.id}`, { isActive: checked });
      message.success(`Category ${checked ? 'activated' : 'deactivated'}`);
      fetchCategories();
    } catch (err: any) {
      message.error(err.message || 'Failed to update category');
    }
  };

  const columns = [
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      width: 60,
      render: (icon: string) => (
        <span style={{ fontSize: 24 }}>{icon || '—'}</span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <Tag>{name}</Tag>,
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
      render: (label: string) => <Text strong>{label}</Text>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (desc: string) => <Text type="secondary">{desc || '—'}</Text>,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: PetCategory) => (
        <Switch
          checked={record.isActive}
          onChange={(checked) => handleToggleActive(record, checked)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: PetCategory) => (
        <Space>
          <Tooltip title="Edit">
            <Button size="small" type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Popconfirm
            title="Delete this category?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete">
              <Button size="small" type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div>
        <Title level={4} style={{ margin: 0 }}>Pet Categories</Title>
        <Text type="secondary">Manage pet species/types available in the platform</Text>
      </div>

      <Card>
        <Space style={{ marginBottom: 16 }}>
          {categories.length === 0 && !loading && (
            <Button onClick={handleSeed}>
              Seed Defaults
            </Button>
          )}
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Category
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={categories}
          rowKey="id"
          loading={loading}
          scroll={{ x: 600 }}
          pagination={{ pageSize: 10, showTotal: (total) => `${total} categories` }}
        />
      </Card>

      <Modal
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        okText={editingCategory ? 'Update' : 'Create'}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: !editingCategory, message: 'Please enter a category name' },
              { pattern: /^[a-z][a-z0-9_-]*$/, message: 'Lowercase letters, numbers, hyphens, underscores only' },
            ]}
          >
            <Input
              placeholder="e.g. dog"
              disabled={!!editingCategory}
            />
          </Form.Item>

          <Form.Item
            name="label"
            label="Label"
            rules={[{ required: true, message: 'Please enter a display label' }]}
          >
            <Input placeholder="e.g. Dog" />
          </Form.Item>

          <Form.Item name="icon" label="Icon">
            <EmojiPicker />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Optional description of this category" />
          </Form.Item>

          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default CategoriesPage;
