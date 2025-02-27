/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, Spin, Tag } from "antd";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/features/order/orderApi";
import { useNavigate } from "react-router-dom";

const UpdateDeleteOrders = () => {
  const { data: orders, isLoading, refetch } = useGetOrdersQuery({});
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    await deleteOrder(id);
    refetch();
  };

  const columns = [
    { title: "Order ID", dataIndex: "_id", key: "_id" },
    { title: "User ID", dataIndex: "user", key: "user" },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Pending" ? "orange" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => navigate(`/admin/update-order/${record._id}`)}>Update</Button>
          <Button type="primary" danger onClick={() => handleDelete(record._id)} loading={isDeleting}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Manage Orders</h2>
      {isLoading ? (
        <Spin size="large" className="flex justify-center" />
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={orders?.data}
            rowKey="_id"
            scroll={{ x: "max-content" }} 
            pagination={{ pageSize: 5 }} 
          />
        </div>
      )}
    </div>
  );
};

export default UpdateDeleteOrders;
