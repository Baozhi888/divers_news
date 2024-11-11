import { useState, useEffect } from 'react';
import { Table, Button, Space, Upload, message, Layout, Typography, Popconfirm } from 'antd';
import { 
  UploadOutlined, 
  DownloadOutlined, 
  LogoutOutlined, 
  PlusOutlined, 
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import { getDrivers, deleteDriver, deleteMultipleDrivers } from '../api/drivers';
import DriverForm from '../components/DriverForm';
import { useAuth } from '../context/AuthContext';
import { exportToExcel } from '../utils/excel';

const { Header, Content } = Layout;
const { Title } = Typography;

function Dashboard() {
  const [drivers, setDrivers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const columns = [
    {
      title: '车牌号',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      sorter: (a, b) => a.licensePlate.localeCompare(b.licensePlate)
    },
    {
      title: '司机姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: '停车场',
      dataIndex: 'parkingLocation',
      key: 'parkingLocation',
      filters: Array.from(new Set(drivers.map(d => d.parkingLocation)))
        .filter(Boolean)
        .map(location => ({ text: location, value: location })),
      onFilter: (value, record) => record.parkingLocation === value
    },
    {
      title: '微信号',
      dataIndex: 'wechatId',
      key: 'wechatId'
    },
    {
      title: '微信昵称',
      dataIndex: 'wechatName',
      key: 'wechatName'
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'APP账号',
      dataIndex: 'appUsername',
      key: 'appUsername'
    },
    {
      title: '开票日期',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      sorter: (a, b) => new Date(a.invoiceDate) - new Date(b.invoiceDate)
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (text) => text ? `¥${text.toFixed(2)}` : '-'
    },
    {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: true
    },
    {
      title: '操作',
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      setLoading(true);
      const data = await getDrivers();
      setDrivers(data);
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDriver(id);
      message.success('删除成功');
      loadDrivers();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleBatchDelete = async () => {
    if (!selectedRows.length) {
      message.warning('请选择要删除的记录');
      return;
    }

    try {
      await deleteMultipleDrivers(selectedRows);
      message.success('批量删除成功');
      setSelectedRows([]);
      loadDrivers();
    } catch (error) {
      message.error('批量删除失败');
    }
  };

  const handleExport = () => {
    try {
      exportToExcel(drivers, '货车司机信息表.xlsx');
      message.success('导出成功');
    } catch (error) {
      message.error('导出失败');
    }
  };

  const handleImport = (file) => {
    message.info('导入功能开发中');
    return false;
  };

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>
            货车司机信息管理系统
          </Title>
        </div>
        <Button 
          type="primary" 
          icon={<LogoutOutlined />} 
          onClick={logout}
          danger
        >
          退出登录
        </Button>
      </Header>
      <Content className="dashboard-content">
        <div className="table-container">
          <Space className="table-actions" size="middle" wrap>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              添加司机
            </Button>
            <Upload
              beforeUpload={handleImport}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>
                导入Excel
              </Button>
            </Upload>
            <Button 
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              导出Excel
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={loadDrivers}
            >
              刷新数据
            </Button>
            {selectedRows.length > 0 && (
              <Popconfirm
                title="确定删除所选记录吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={handleBatchDelete}
              >
                <Button 
                  danger 
                  icon={<DeleteOutlined />}
                >
                  批量删除 ({selectedRows.length})
                </Button>
              </Popconfirm>
            )}
          </Space>

          <Table
            columns={columns}
            dataSource={drivers}
            rowKey="id"
            loading={loading}
            scroll={{ x: 1500 }}
            rowSelection={{
              type: 'checkbox',
              onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
              selectedRowKeys: selectedRows
            }}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条记录`,
              defaultPageSize: 10,
              pageSizeOptions: ['10', '20', '50', '100'],
            }}
          />
        </div>

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
            message.success(editingDriver ? '更新成功' : '添加成功');
          }}
        />
      </Content>
    </Layout>
  );
}

export default Dashboard;
