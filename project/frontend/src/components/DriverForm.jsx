import { Form, Input, Modal, DatePicker, InputNumber } from 'antd';
import { createDriver, updateDriver } from '../api/drivers';
import moment from 'moment';

function DriverForm({ visible, onCancel, onSuccess, initialValues }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      if (initialValues) {
        await updateDriver(initialValues.id, values);
      } else {
        await createDriver(values);
      }
      onSuccess();
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: 'Failed to save driver information'
      });
    }
  };

  return (
    <Modal
      title={initialValues ? 'Edit Driver' : 'Add Driver'}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues ? {
          ...initialValues,
          invoiceDate: initialValues.invoiceDate ? moment(initialValues.invoiceDate) : null
        } : undefined}
        onFinish={onFinish}
      >
        <Form.Item
          name="licensePlate"
          label="License Plate"
          rules={[{ required: true, message: 'Please input license plate' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="parkingLocation"
          label="Parking Location"
          rules={[{ required: true, message: 'Please input parking location' }]}
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

        <Form.Item name="appUsername" label="App Username">
          <Input />
        </Form.Item>

        <Form.Item name="appPassword" label="App Password">
          <Input.Password />
        </Form.Item>

        <Form.Item name="invoiceDate" label="Invoice Date">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="amount" label="Amount">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="notes" label="Notes">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DriverForm;
