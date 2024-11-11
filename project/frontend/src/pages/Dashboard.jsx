import { useState, useEffect } from 'react';
import { Table, Button, Space, Upload, message, Layout, Typography } from 'antd';
import { UploadOutlined, DownloadOutlined, LogoutOutlined } from '@ant-design/icons';
import { getDrivers, deleteDriver, deleteMultipleDrivers } from '../api/drivers';
import DriverForm from '../components/DriverForm';
import { useAuth } from '../context/AuthContext';
import { columns } from '../utils/tableColumns';
import { exportToExcel } from '../utils/excel';

const { Header, Content } = Layout;
const { Title } = Typography;

function Dashboard() {
  const [drivers, setDrivers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (error) {
      message.error('Failed to load drivers');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDriver(id);
      message.success('Driver deleted successfully');
      loadDrivers();
    } catch (error) {
      message.error('Failed to delete driver');
    }
  };

  const handleBatchDelete = async () => {
    try {
      await deleteMultipleDrivers(selectedRows);
      message.success('Selected drivers deleted successfully');
      setSelectedRows([]);
      loadDrivers();
    } catch (error) {
      message.error('Failed to delete selected drivers');
    }
  };

  const handleExport = () => {
    exportToExcel(drivers, 'drivers.xlsx');
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} style={{ color: 'white', margin: 0 }}>
          Truck Driver Management System
        </Title>
        <Button type="primary" icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Button>
      </Header>
      <Content className="dashboard-container">
        <Space className="table-actions">
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Add Driver
          </Button>
          <Upload
            showUploadList={false}
            customRequest={({ file }) => {
              // Handle Excel import
              message.success('Import functionality to be implemented');
            }}
          >
            <Button icon={<UploadOutlined />}>Import Excel</Button>
          </Upload>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>
            Export Excel
          </Button>
          {selectedRows.length > 0 && (
            <Button danger onClick={handleBatchDelete}>
              Delete Selected ({selectedRows.length})
            </Button>
          )}
        </Space>

        <Table
          columns={columns(handleDelete, (record) => {
            setEditingDriver(record);
            setIsModalVisible(true);
          })}
          dataSource={drivers}
          rowKey="id"
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
          }}
        />

        <DriverForm
          visible={isModalVisible}
          initialValues={editingDriver}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingDriver(null);
          }}
          onSuccess={() => {
            setIsModalVisible(false);
            setEditingDriver(null);
            loadDrivers();
          }}
        />
      </Content>
    </Layout>
  );
}

export default Dashboard;
