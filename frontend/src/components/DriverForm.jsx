import { Modal, Form, Input, DatePicker, InputNumber, Select } from 'antd';
import { createDriver, updateDriver } from '../api/drivers';
import dayjs from 'dayjs';

function DriverForm({ visible, onCancel, onSuccess, initialValues }) {
  const [form] = Form.useForm();
  const isEdit = !!initialValues;

  const onFinish = async (values) => {
    try {
      if (values.invoiceDate) {
        values.invoiceDate = values.invoiceDate.format('YYYY-MM-DD');
      }

      if (isEdit) {
        await updateDriver(initialValues.id, values);
      } else {
        await createDriver(values);
      }
      onSuccess();
    } catch (error) {
      Modal.error({
        title: '保存失败',
        content: error.message || '请稍后重试'
      });
    }
  };

  return (
    <Modal
      title={isEdit ? '编辑司机信息' : '添加新司机'}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={600}
      maskClosable={false}
      okText="确定"
      cancelText="取消"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={
          initialValues
            ? {
                ...initialValues,
                invoiceDate: initialValues.invoiceDate
                  ? dayjs(initialValues.invoiceDate)
                  : null
              }
            : undefined
        }
        onFinish={onFinish}
      >
        <Form.Item
          name="licensePlate"
          label="车牌号"
          rules={[{ required: true, message: '请输入车牌号' }]}
        >
          <Input placeholder="请输入车牌号" />
        </Form.Item>

        <Form.Item
          name="name"
          label="司机姓名"
          rules={[{ required: true, message: '请输入司机姓名' }]}
        >
          <Input placeholder="请输入司机姓名" />
        </Form.Item>

        <Form.Item
          name="parkingLocation"
          label="停车场"
          rules={[{ required: true, message: '请选择停车场' }]}
        >
          <Select
            placeholder="请选择停车场"
            allowClear
            showSearch
            options={[
              { value: '停车场金鹏', label: '停车场金鹏' },
              { value: '停车场广源', label: '停车场广源' },
              { value: '停车场现代', label: '停车场现代' },
              { value: '停车场鸿泽', label: '停车场鸿泽' }
            ]}
          />
        </Form.Item>

        <Form.Item name="wechatId" label="微信号">
          <Input placeholder="请输入微信号" />
        </Form.Item>

        <Form.Item name="wechatName" label="微信昵称">
          <Input placeholder="请输入微信昵称" />
        </Form.Item>

        <Form.Item name="phone" label="手机号码">
          <Input placeholder="请输入手机号码" />
        </Form.Item>

        <Form.Item name="appUsername" label="APP账号">
          <Input placeholder="请输入APP账号" />
        </Form.Item>

        <Form.Item name="appPassword" label="APP密码">
          <Input.Password placeholder="请输入APP密码" />
        </Form.Item>

        <Form.Item name="invoiceDate" label="开票日期">
          <DatePicker 
            style={{ width: '100%' }} 
            format="YYYY-MM-DD"
            placeholder="请选择开票日期"
          />
        </Form.Item>

        <Form.Item name="amount" label="金额">
          <InputNumber
            style={{ width: '100%' }}
            placeholder="请输入金额"
            formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\¥\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item name="notes" label="备注">
          <Input.TextArea rows={4} placeholder="请输入备注信息" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DriverForm;
