import { Table, Card, Spin, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetMeQuery } from "../redux/features/auth/authApi";
import EditProfileModal from "./EditProfileModal";


const ProfilePage = () => {
  const { data: user, isLoading } = useGetMeQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return <p className="text-center text-gray-500">User not found</p>;
  }

  const userInfo = [
    { key: "1", field: "Name", value: user?.data?.name },
    { key: "2", field: "Email", value: user?.data?.email },
    { key: "3", field: "Phone", value: user?.data?.phone || "N/A" },
    { key: "4", field: "Address", value: user?.data?.address || "Not Provided" },
  ];

  const columns = [
    { title: "Field", dataIndex: "field", key: "field", width: "30%", className: "font-bold" },
    { title: "Details", dataIndex: "value", key: "value", width: "60%" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>My Profile</span>
            <Button icon={<EditOutlined />} onClick={() => setIsModalOpen(true)} />
          </div>
        }
        className="w-[700px]"
      >
        <Table columns={columns} dataSource={userInfo} pagination={false} bordered />
      </Card>

      
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={user.data}
      />
    </div>
  );
};

export default ProfilePage;
