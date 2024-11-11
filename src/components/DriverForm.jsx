import { Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import { createDriver, updateDriver } from '../api/drivers';

function DriverForm({ visible, onCancel, onSuccess, initialValues }) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (initialValues) {
        await updateDriver(initialValues.id, values);
      } else {
        await createDriver(values);
      }
      onSuccess();
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <Modal
      title={initialValues ? 'Edit Driver' : 'Add Driver'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="licensePlate"
          label="License Plate"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="wechatId" label="WeChat ID">
          <Input />
        </Form.Item>
        <Form.Item name="wechatName" label="WeChat Name">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <Form.Item name="parkingLocation" label="Parking Location">
          <Input />
        </Form.Item>
        <Form.Item name="appUsername" label="App Username">
          <Input />
        </Form.Item>
        <Form.Item name="appPassword" label="App Password">
          <Input.Password />
        </Form.Item>
        <Form.Item name="invoiceDate" label="Invoice Date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="amount" label="Amount">
          <InputNumber />
        </Form.Item>
        <Form.Item name="notes" label="Notes">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DriverForm;
