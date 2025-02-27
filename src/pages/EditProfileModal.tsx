/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Form, Input, Button } from "antd";
import { useUpdateProfileMutation } from "../redux/features/auth/authApi";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: { name: string; email: string; phone?: string; address?: string };
}

const EditProfileModal = ({ isOpen, onClose, initialData }: EditProfileModalProps) => {
  const [form] = Form.useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (values: any) => {
    try {
      await updateProfile(values).unwrap();
      onClose(); 
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <Modal
      title="Edit Profile"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} initialValues={initialData} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Update
        </Button>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
