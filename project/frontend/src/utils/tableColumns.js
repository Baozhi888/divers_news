import { Space, Button } from 'antd';

export const columns = (onDelete, onEdit) => [
  {
    title: 'License Plate',
    dataIndex: 'licensePlate',
    key: 'licensePlate',
    sorter: (a, b) => a.licensePlate.localeCompare(b.licensePlate)
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  {
    title: 'Parking Location',
    dataIndex: 'parkingLocation',
    key: 'parkingLocation',
    filters: [],
    onFilter: (value, record) => record.parkingLocation === value
  },
  {
    title: 'WeChat ID',
    dataIndex: 'wechatId',
    key: 'wechatId'
  },
  {
    title: 'WeChat Name',
    dataIndex: 'wechatName',
    key: 'wechatName'
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'App Username',
    dataIndex: 'appUsername',
    key: 'appUsername'
  },
  {
    title: 'Invoice Date',
    dataIndex: 'invoiceDate',
    key: 'invoiceDate',
    sorter: (a, b) => new Date(a.invoiceDate) - new Date(b.invoiceDate)
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => a.amount - b.amount
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space size="small">
        <Button type="primary" size="small" onClick={() => onEdit(record)}>
          Edit
        </Button>
        <Button type="primary" danger size="small" onClick={() => onDelete(record.id)}>
          Delete
        </Button>
      </Space>
    )
  }
];
