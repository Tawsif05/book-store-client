/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  useChangeStatusMutation,
  useGetAllUsersQuery,
} from "../../redux/features/auth/authApi";

const AllUsers = () => {
  // Fetch all users
  const { data: users, isLoading } = useGetAllUsersQuery(undefined);
  const [changeStatus] = useChangeStatusMutation();

  // Handle status change
  const handleStatusChange = async (
    userId: string,
    newStatus: "in-progress" | "block"
  ) => {
    await changeStatus({ userId, status: newStatus });
  };

  // Table columns setup
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: any) => {
        // Determine next status
        const nextStatus = text === "in-progress" ? "block" : "in-progress";

        // Dropdown menu items
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: nextStatus === "block" ? "Block User" : "Set In-Progress",
            onClick: () => handleStatusChange(record._id, nextStatus),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button>{text}</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-7 text-center">All Users</h1>

      {/* Responsive Table Wrapper */}
      <div className="w-full max-w-6xl overflow-x-auto">
        <Table
          columns={columns}
          dataSource={users?.data?.map((user: any) => ({
            ...user,
            key: user._id,
          }))}
          loading={isLoading}
          pagination={{ pageSize: 5 }}
          bordered
          className="min-w-[600px] sm:min-w-full"
        />
      </div>
    </div>
  );
};

export default AllUsers;
