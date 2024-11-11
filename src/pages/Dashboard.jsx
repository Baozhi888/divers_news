import { useState, useEffect } from 'react';
import { Table, Button, Space, Upload, message } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import DriverForm from '../components/DriverForm';
import { getDrivers, deleteDrivers } from '../api/drivers';
import { exportToExcel, importFromExcel } from '../utils/excel';

function Dashboard() {
  const [drivers, setDrivers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  const columns = [
    { title: 'License Plate', dataIndex: 'licensePlate', key: 'licensePlate' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'WeChat ID', dataIndex: 'wechatId', key: 'wechatId' },
    { title: 'WeChat Name', dataIndex: 'wechatName', key: 'wechatName' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Parking Location', dataIndex: 'parkingLocation', key: 'parkingLocation' },
    { title: 'App Username', dataIndex: 'appUsername', key: 'appUsername' },
    { title: 'Invoice Date', dataIndex: 'invoiceDate', key: 'invoiceDate' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Notes', dataIndex: 'notes', key: 'notes' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete([record.id])}>Delete</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    const data = await getDrivers();
    setDrivers(data);
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setIsModalVisible(true);
  };

  const handleDelete = async (ids) => {
    await deleteDrivers(ids);
    loadDrivers();
    message.success('Deleted successfully');
  };

  const handleExport = () => {
    exportToExcel(drivers, 'drivers.xlsx');
  };

  const handleImport = (file) => {
    importFromExcel(file).then(loadDrivers);
    return false;
  };

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Driver
        </Button>
        <Upload
          beforeUpload={handleImport}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Import Excel</Button>
        </Upload>
        <Button icon={<DownloadOutlined />} onClick={handleExport}>
          Export Excel
        </Button>
        {selectedRows.length > 0 && (
          <Button danger onClick={() => handleDelete(selectedRows)}>
            Delete Selected
          </Button>
        )}
      </Space>

      <Table
        columns={columns}
        dataSource={drivers}
        rowKey="id"
        rowSelection={{
          onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
        }}
      />

      <DriverForm
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingDriver(null);
        }}
        onSuccess={() => {
          setIsModalVisible(false);
          setEditingDriver(null);
          loadDrivers();
        }}
        initialValues={editingDriver}
      />
    </div>
  );
}

export default Dashboard;
